import type { OralQuestion } from '@/types'
import { norm } from '@/lib/utils'

/**
 * Architecture du coach pédagogique.
 *
 * Toute l'application passe par l'interface `CoachProvider`. Aujourd'hui, seul `LocalCoach` existe :
 * il s'appuie sur les corrections prédéfinies et sur une comparaison de mots-clés. Ce n'est pas une IA.
 *
 * Pour brancher un vrai coach IA plus tard :
 *   1. créer un service côté serveur (par ex. fonction Edge Supabase) qui détient la clé API ;
 *   2. écrire une classe `RemoteCoach implements CoachProvider` qui appelle ce service ;
 *   3. remplacer l'export `coach` ci-dessous. Aucune clé ne doit figurer dans le frontend.
 */
export interface AnswerAnalysis {
  found: string[]
  missing: string[]
  coverage: number
  wordCount: number
  remarks: string[]
}

export interface CoachProvider {
  readonly id: 'local' | 'remote'
  readonly label: string
  readonly isAI: boolean
  analyse(answer: string, q: Pick<OralQuestion, 'motsCles' | 'attendus'>): Promise<AnswerAnalysis>
  followUps(q: Pick<OralQuestion, 'relances'>): Promise<string[]>
}

const stem = (w: string) => norm(w).replace(/(es|s|e|er|ation|ations)$/u, '')

export class LocalCoach implements CoachProvider {
  readonly id = 'local' as const
  readonly label = 'Mode local (corrections prédéfinies)'
  readonly isAI = false

  async analyse(answer: string, q: Pick<OralQuestion, 'motsCles' | 'attendus'>): Promise<AnswerAnalysis> {
    const text = norm(answer)
    const found: string[] = []
    const missing: string[] = []
    for (const k of q.motsCles) {
      const parts = norm(k).split(/\s+/).filter((p) => p.length > 3)
      const hit = parts.length ? parts.every((p) => text.includes(stem(p))) : text.includes(norm(k))
      ;(hit ? found : missing).push(k)
    }
    const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0
    const remarks: string[] = []
    if (wordCount < 40) remarks.push('Réponse courte : à l’oral, quatre minutes représentent environ 450 à 550 mots.')
    if (!/(parce que|car |afin de|pour que|ainsi|donc|c’est pourquoi|c'est pourquoi)/i.test(answer)) remarks.push('Aucune justification repérée : ajoute des « parce que » et des « afin de ».')
    if (!/(d’abord|d'abord|premièrement|ensuite|puis|enfin|pour terminer)/i.test(answer)) remarks.push('Peu de connecteurs d’étapes : annonce l’ordre de ta démarche (d’abord, ensuite, enfin).')
    return { found, missing, coverage: q.motsCles.length ? found.length / q.motsCles.length : 0, wordCount, remarks }
  }

  async followUps(q: Pick<OralQuestion, 'relances'>) {
    return q.relances
  }
}

export const coach: CoachProvider = new LocalCoach()
