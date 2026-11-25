import { useSyncExternalStore } from 'react'
import type { ActivityLog, AppState, CardGrade, CompId, ExamAttempt, Flashcard, FreeNote, Mastery, Settings, StarExample } from '@/types'
import { defaultState, hydrate, storage } from './storage'
import { schedule } from './srs'
import { todayISO, uid } from '@/lib/utils'

let state: AppState = storage.load() ?? defaultState()
/** Horodatage de l'état tel qu'il était à l'ouverture, avant toute modification de cette session. */
export const bootUpdatedAt: string | undefined = state.updatedAt
/** Vrai si des données de révision existaient déjà dans ce navigateur à l'ouverture. */
export const bootHadData = state.activity.length > 0 || Object.keys(state.lessons).length > 0 || Object.keys(state.cards).length > 0 || state.star.length > 0 || Object.keys(state.notes).length > 0 || state.freeNotes.length > 0
const listeners = new Set<() => void>()
let saveTimer: number | undefined

const afterCommit = new Set<(s: AppState) => void>()
/** Permet à un service (synchronisation distante) d'être averti de chaque modification. */
export const onCommit = (fn: (s: AppState) => void) => {
  afterCommit.add(fn)
  return () => afterCommit.delete(fn)
}

function commit(next: AppState, opts: { stamp?: boolean } = {}) {
  state = opts.stamp === false ? next : { ...next, updatedAt: new Date().toISOString() }
  listeners.forEach((l) => l())
  afterCommit.forEach((l) => l(state))
  // Sauvegarde automatique, légèrement différée pour regrouper les frappes.
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => storage.save(state), 250)
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => storage.save(state))
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') storage.save(state)
  })
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const getState = () => state

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state))
}

const set = (fn: (s: AppState) => Partial<AppState>) => commit({ ...state, ...fn(state) })

export const actions = {
  updateSettings: (patch: Partial<Settings>) => set((s) => ({ settings: { ...s.settings, ...patch } })),

  setLast: (path: string, label: string) => {
    if (state.last?.path === path) return
    set(() => ({ last: { path, label, at: new Date().toISOString() } }))
  },

  addMinutes: (min: number) =>
    set((s) => {
      const d = todayISO()
      return { minutes: { ...s.minutes, [d]: Math.round(((s.minutes[d] ?? 0) + min) * 100) / 100 } }
    }),

  log: (entry: Omit<ActivityLog, 'id' | 'date'>) =>
    set((s) => ({ activity: [{ ...entry, id: uid(), date: new Date().toISOString() }, ...s.activity].slice(0, 2000) })),

  openLesson: (comp: CompId) =>
    set((s) => (s.lessons[comp] ? {} : { lessons: { ...s.lessons, [comp]: { done: false, openedAt: new Date().toISOString() } } })),

  completeLesson: (comp: CompId, done: boolean) =>
    set((s) => ({
      lessons: { ...s.lessons, [comp]: { openedAt: new Date().toISOString(), ...s.lessons[comp], done } },
    })),

  recordLessonQuiz: (comp: CompId, ratio: number) =>
    set((s) => {
      const prev = s.lessons[comp]
      return {
        lessons: {
          ...s.lessons,
          [comp]: { openedAt: new Date().toISOString(), done: false, ...prev, quizBest: Math.max(prev?.quizBest ?? 0, ratio) },
        },
      }
    }),

  setSelfMastery: (comp: CompId, m: Mastery) => set((s) => ({ selfMastery: { ...s.selfMastery, [comp]: m } })),
  setFicheStatus: (id: string, m: Mastery) => set((s) => ({ ficheStatus: { ...s.ficheStatus, [id]: m } })),

  toggleFavorite: (key: string) =>
    set((s) => ({ favorites: s.favorites.includes(key) ? s.favorites.filter((k) => k !== key) : [key, ...s.favorites] })),

  setNote: (key: string, text: string) =>
    set((s) => {
      const notes = { ...s.notes }
      if (text.trim()) notes[key] = text
      else delete notes[key]
      return { notes }
    }),

  saveFreeNote: (n: Partial<FreeNote> & { titre: string; corps: string }) =>
    set((s) => {
      const now = new Date().toISOString()
      if (n.id && s.freeNotes.some((x) => x.id === n.id))
        return { freeNotes: s.freeNotes.map((x) => (x.id === n.id ? { ...x, ...n, updatedAt: now } : x)) }
      return { freeNotes: [{ id: uid(), titre: n.titre, corps: n.corps, updatedAt: now }, ...s.freeNotes] }
    }),
  deleteFreeNote: (id: string) => set((s) => ({ freeNotes: s.freeNotes.filter((n) => n.id !== id) })),

  gradeCard: (id: string, grade: CardGrade) => set((s) => ({ cards: { ...s.cards, [id]: schedule(s.cards[id], grade) } })),

  saveCustomCard: (c: Omit<Flashcard, 'id' | 'custom'> & { id?: string }) =>
    set((s) => {
      if (c.id) return { customCards: s.customCards.map((x) => (x.id === c.id ? { ...x, ...c, id: x.id, custom: true } : x)) }
      return { customCards: [{ ...c, id: 'perso-' + uid(), custom: true }, ...s.customCards] }
    }),
  deleteCustomCard: (id: string) =>
    set((s) => {
      const cards = { ...s.cards }
      delete cards[id]
      return { customCards: s.customCards.filter((c) => c.id !== id), cards }
    }),

  saveExam: (a: ExamAttempt) =>
    set((s) => ({ exams: s.exams.some((e) => e.id === a.id) ? s.exams.map((e) => (e.id === a.id ? a : e)) : [a, ...s.exams] })),
  deleteExam: (id: string) => set((s) => ({ exams: s.exams.filter((e) => e.id !== id) })),

  saveStar: (e: Omit<StarExample, 'id' | 'updatedAt'> & { id?: string }) =>
    set((s) => {
      const now = new Date().toISOString()
      if (e.id && s.star.some((x) => x.id === e.id)) return { star: s.star.map((x) => (x.id === e.id ? { ...x, ...e, id: x.id, updatedAt: now } : x)) }
      return { star: [{ ...e, id: uid(), updatedAt: now }, ...s.star] }
    }),
  deleteStar: (id: string) => set((s) => ({ star: s.star.filter((x) => x.id !== id) })),

  setTp5Choice: (patch: Partial<AppState['tp5Choice']>) => set((s) => ({ tp5Choice: { ...s.tp5Choice, ...patch } })),

  setWeekly: (monday: string, text: string) => set((s) => ({ weekly: { ...s.weekly, [monday]: text } })),

  /** Efface les résultats (historique, répétition espacée, examens) mais conserve notes, favoris, exemples STAR et réglages. */
  resetResults: () =>
    set(() => ({ lessons: {}, selfMastery: {}, ficheStatus: {}, cards: {}, activity: [], exams: [], minutes: {}, weekly: {}, last: null })),

  resetAll: () => {
    storage.clear()
    commit(defaultState())
  },

  importState: (raw: unknown) => commit(hydrate(raw)),

  /** Remplace l'état local par une copie synchronisée plus récente, en conservant son horodatage. */
  adoptRemote: (raw: unknown) => commit(hydrate(raw), { stamp: false }),
}

export const exportState = () => JSON.stringify({ app: 'cfc-revision', exportedAt: new Date().toISOString(), state }, null, 2)

export const storageIsPersistent = () => storage.persistent
