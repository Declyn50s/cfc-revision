/**
 * Couche « plateforme » : l'application tourne soit seule dans un navigateur (fichier local, serveur web),
 * soit dans une page hébergée sur claude.ai (cadre isolé). Dans ce second cas, l'impression, les téléchargements
 * directs et le micro sont bloqués par le cadre : on passe alors par les capacités offertes par l'hôte
 * (`claude.use(...)`), et l'on n'affiche que les fonctions réellement disponibles.
 */
type Host = { use(name: string): Promise<unknown> }

const host = (): Host | null => {
  const c = (window as unknown as { claude?: Host }).claude
  return c && typeof c.use === 'function' ? c : null
}

/** Vrai lorsque la page est affichée dans un cadre (page hébergée). */
export const embedded = (() => {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
})()

export async function capability<T>(name: string): Promise<T | null> {
  const h = host()
  if (!h) return null
  try {
    return ((await h.use(name)) as T) ?? null
  } catch {
    return null
  }
}

type Downloads = { save(req: { filename: string; data: string | Blob }): Promise<{ status: string }> }

export type SaveOutcome = 'saved' | 'declined' | 'unavailable'

/** Enregistre un fichier texte : téléchargement classique hors cadre, capacité `downloads` dans une page hébergée. */
export async function saveTextFile(filename: string, text: string, mime = 'application/json'): Promise<SaveOutcome> {
  const dl = await capability<Downloads>('downloads')
  if (dl) {
    try {
      await dl.save({ filename, data: text })
      return 'saved'
    } catch (e) {
      return (e as { code?: string })?.code === 'declined' ? 'declined' : 'unavailable'
    }
  }
  if (embedded) return 'unavailable'
  try {
    const url = URL.createObjectURL(new Blob([text], { type: mime }))
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    return 'saved'
  } catch {
    return 'unavailable'
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** L'impression directe n'existe que hors cadre. */
export const canPrint = !embedded
