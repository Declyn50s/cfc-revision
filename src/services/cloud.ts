import { useSyncExternalStore } from 'react'
import type { AppState } from '@/types'
import { actions, bootHadData, bootUpdatedAt, getState, onCommit } from './store'
import { capability } from './platform'

/**
 * Sauvegarde distante facultative.
 *
 * Lorsque l'application est publiée comme page hébergée avec les capacités `db` et `user`, l'état de révision
 * est aussi enregistré dans l'espace privé de la personne connectée (`data/users/<id>/…`), ce qui le rend
 * durable et disponible sur ses autres appareils. Sans ces capacités (fichier local, serveur web classique),
 * ce module ne fait rien : seul le stockage du navigateur est utilisé.
 *
 * Stratégie volontairement simple : lecture unique au démarrage, « la copie la plus récente gagne »,
 * puis écriture différée des seuls documents modifiés. C'est le même contrat que devra respecter un futur
 * adaptateur Supabase.
 */
type DocSnap = { exists: boolean; data(): Record<string, unknown> | undefined }
type DocRef = { get(): Promise<DocSnap>; set(data: Record<string, unknown>): Promise<void> }
type Db = { doc(path: string): DocRef }
type User = { id(): Promise<string | null> }

export type CloudStatus =
  | { kind: 'absent' } // pas de sauvegarde distante dans ce contexte
  | { kind: 'connecting' }
  | { kind: 'synced'; at: string }
  | { kind: 'pending' }
  | { kind: 'error'; message: string }

let status: CloudStatus = { kind: 'absent' }
const listeners = new Set<() => void>()
const setStatus = (s: CloudStatus) => {
  status = s
  listeners.forEach((l) => l())
}
export const useCloudStatus = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => status,
  )

const MAX_DOC = 230 * 1024 // marge sous la limite de 256 Kio par document

/** Découpe l'état en trois documents pour rester sous la limite de taille. */
function split(s: AppState): Record<'main' | 'activity' | 'exams', string> {
  const { activity, exams, ...main } = s
  const fit = <T,>(items: T[], n: number) => {
    let arr = items.slice(0, n)
    let json = JSON.stringify(arr)
    while (json.length > MAX_DOC && arr.length > 1) {
      arr = arr.slice(0, Math.floor(arr.length * 0.8))
      json = JSON.stringify(arr)
    }
    return json
  }
  return { main: JSON.stringify(main), activity: fit(activity, 800), exams: fit(exams, 40) }
}

const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T> =>
  new Promise((resolve, reject) => {
    const t = window.setTimeout(() => reject(new Error('timeout')), ms)
    p.then(
      (v) => {
        window.clearTimeout(t)
        resolve(v)
      },
      (e) => {
        window.clearTimeout(t)
        reject(e)
      },
    )
  })

let refs: Record<'main' | 'activity' | 'exams', DocRef> | null = null
const sent: Partial<Record<'main' | 'activity' | 'exams', string>> = {}
let timer: number | undefined
let writing = false
let dirty = false

async function push() {
  if (!refs) return
  if (writing) {
    dirty = true
    return
  }
  writing = true
  try {
    const parts = split(getState())
    if (parts.main.length > MAX_DOC) throw new Error('Données trop volumineuses pour la sauvegarde distante : exporte-les depuis les paramètres.')
    // Une écriture à la fois, et seulement pour les documents réellement modifiés.
    for (const k of ['main', 'activity', 'exams'] as const) {
      if (sent[k] === parts[k]) continue
      await refs[k].set({ updatedAt: getState().updatedAt ?? new Date().toISOString(), json: parts[k] })
      sent[k] = parts[k]
    }
    setStatus({ kind: 'synced', at: new Date().toISOString() })
  } catch (e) {
    const code = (e as { code?: string })?.code
    if (code === 'invalid_argument' || code === 'revoked' || code === 'not_granted') refs = null // pas de droit d'écriture : on arrête
    setStatus({ kind: 'error', message: (e as Error)?.message || code || 'Sauvegarde distante indisponible' })
  } finally {
    writing = false
    if (dirty && refs) {
      dirty = false
      schedule()
    }
  }
}

function schedule() {
  if (!refs) return
  setStatus({ kind: 'pending' })
  window.clearTimeout(timer)
  timer = window.setTimeout(push, 4000)
}

export const syncNow = () => {
  window.clearTimeout(timer)
  return push()
}

const parse = (snap: DocSnap): { updatedAt: string; value: unknown } | null => {
  if (!snap.exists) return null
  const d = snap.data()
  if (!d || typeof d.json !== 'string') return null
  try {
    return { updatedAt: String(d.updatedAt ?? ''), value: JSON.parse(d.json) }
  } catch {
    return null
  }
}

let started = false
export async function startCloudSync() {
  if (started) return
  started = true
  const [db, user] = await Promise.all([capability<Db>('db'), capability<User>('user')])
  if (!db || !user) return
  setStatus({ kind: 'connecting' })
  try {
    const id = await user.id()
    if (!id) return setStatus({ kind: 'absent' })
    const base = `data/users/${id}/`
    refs = { main: db.doc(base + 'cfc-main'), activity: db.doc(base + 'cfc-activity'), exams: db.doc(base + 'cfc-exams') }
    const [m, a, e] = await withTimeout(Promise.all([refs.main.get(), refs.activity.get(), refs.exams.get()]), 10000)
    const main = parse(m)
    // On compare avec l'état tel qu'il était à l'ouverture : les quelques clics faits pendant le chargement
    // ne doivent jamais faire passer une copie locale vide pour « plus récente » que la copie distante.
    if (main && (!bootUpdatedAt || main.updatedAt > bootUpdatedAt)) {
      const remote = { ...(main.value as object), activity: parse(a)?.value ?? [], exams: parse(e)?.value ?? [] }
      actions.adoptRemote(remote)
      Object.assign(sent, split(getState()))
      setStatus({ kind: 'synced', at: new Date().toISOString() })
    } else if (bootHadData || getState().updatedAt) {
      await push() // la copie locale est la plus récente, ou il n'existe pas encore de copie distante
    } else {
      setStatus({ kind: 'synced', at: new Date().toISOString() })
    }
    onCommit(schedule)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && status.kind === 'pending') void syncNow()
    })
  } catch (e) {
    refs = null
    setStatus({ kind: 'error', message: (e as Error)?.message === 'timeout' ? 'La sauvegarde distante ne répond pas pour l’instant.' : 'Sauvegarde distante indisponible.' })
  }
}
