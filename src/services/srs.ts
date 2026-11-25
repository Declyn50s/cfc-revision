import type { CardGrade, CardState } from '@/types'
import { addDays, todayISO } from '@/lib/utils'

/**
 * Répétition espacée — variante simplifiée de SM-2 à quatre réponses.
 *  - « À revoir »  : la carte revient le jour même, l'intervalle repart à zéro.
 *  - « Difficile » : intervalle court (×1,2), facilité en baisse.
 *  - « Correct »   : intervalle × facilité.
 *  - « Maîtrisé »  : intervalle × facilité × 1,5, facilité en hausse.
 */
export function schedule(prev: CardState | undefined, grade: CardGrade, today = todayISO()): CardState {
  const c: CardState = prev ?? { ease: 2.3, interval: 0, due: today, reps: 0, lapses: 0, last: today }
  let { ease, interval, reps, lapses } = c

  switch (grade) {
    case 'again':
      ease = Math.max(1.3, ease - 0.2)
      interval = 0
      reps = 0
      lapses += 1
      break
    case 'hard':
      ease = Math.max(1.3, ease - 0.15)
      interval = interval === 0 ? 1 : Math.max(1, Math.round(interval * 1.2))
      reps += 1
      break
    case 'good':
      interval = interval === 0 ? 2 : Math.round(interval * ease)
      reps += 1
      break
    case 'easy':
      ease = Math.min(3, ease + 0.15)
      interval = interval === 0 ? 4 : Math.round(interval * ease * 1.5)
      reps += 1
      break
  }
  interval = Math.min(interval, 120)
  return { ease, interval, reps, lapses, last: today, due: addDays(today, interval) }
}

export const isDue = (c: CardState | undefined, today = todayISO()) => !c || c.due <= today
export const isNew = (c: CardState | undefined) => !c
/** Une carte est considérée comme acquise lorsque son intervalle atteint trois semaines. */
export const isMature = (c: CardState | undefined) => !!c && c.interval >= 21

export const nextIntervalLabel = (prev: CardState | undefined, grade: CardGrade) => {
  const n = schedule(prev, grade).interval
  if (n === 0) return 'aujourd’hui'
  if (n === 1) return 'demain'
  if (n < 30) return `${n} j`
  return `${Math.round(n / 30)} mois`
}
