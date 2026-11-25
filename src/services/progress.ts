import type { AppState, CompId, TpId } from '@/types'
import { COMPETENCES, COMP_IDS, compsOfTp } from '@/data/referentiel'
import { ALL_CARDS } from '@/data'
import { tpPoints } from './grading'
import { mondayOf, todayISO } from '@/lib/utils'

/**
 * Logique de progression — uniquement calculée à partir de l'activité réelle enregistrée.
 * Score d'une compétence (0 à 1) :
 *   25 % leçon (ouverte = 0,3 ; terminée = 1)
 *   20 % meilleur résultat au mini-quiz de la leçon
 *   35 % moyenne des 5 derniers entraînements évalués (questions, cas, jeux de rôle, quiz)
 *   20 % part des flashcards de la compétence dont l'intervalle atteint 7 jours
 */
export interface CompProgress {
  comp: CompId
  score: number
  lesson: number
  quiz: number
  practice: number | null
  practiceCount: number
  cards: number
  started: boolean
  status: 'non-commence' | 'a-retravailler' | 'en-cours' | 'maitrise'
}

export function compProgress(s: AppState, comp: CompId): CompProgress {
  const l = s.lessons[comp]
  const lesson = l ? (l.done ? 1 : 0.3) : 0
  const quiz = l?.quizBest ?? 0
  const evals = s.activity.filter((a) => a.score !== undefined && a.comps.includes(comp)).slice(0, 5)
  const practice = evals.length ? evals.reduce((x, a) => x + (a.score ?? 0), 0) / evals.length : null
  const cards = [...ALL_CARDS, ...s.customCards].filter((c) => c.comp === comp)
  const solid = cards.filter((c) => (s.cards[c.id]?.interval ?? 0) >= 7).length
  const cardRatio = cards.length ? solid / cards.length : 0
  const seenCards = cards.some((c) => s.cards[c.id])
  const score = 0.25 * lesson + 0.2 * quiz + 0.35 * (practice ?? 0) + 0.2 * cardRatio
  const started = !!l || evals.length > 0 || seenCards
  const self = s.selfMastery[comp]
  let status: CompProgress['status'] = 'non-commence'
  if (started) {
    if (score >= 0.75 || (self === 'done' && score >= 0.5)) status = 'maitrise'
    else if ((practice !== null && practice < 0.5) || (l?.quizBest !== undefined && l.quizBest < 0.5) || self === 'todo') status = 'a-retravailler'
    else status = 'en-cours'
  }
  return { comp, score, lesson, quiz, practice, practiceCount: evals.length, cards: cardRatio, started, status }
}

/** Un exemple STAR compte lorsqu'il est complet : situation, tâche, action et résultat rédigés. */
export const starComplete = (e: AppState['star'][number]) => !!(e.situation.trim() && e.tache.trim() && e.action.trim() && e.resultat.trim())

export const allCompProgress = (s: AppState) => COMP_IDS.map((c) => compProgress(s, c))

/** Progression d'une tâche partielle. Le TP5 repose sur les exemples STAR rédigés et les entraînements propres au TP5. */
export function tpProgress(s: AppState, tp: TpId): number {
  if (tp === 'tp5') {
    // Préparation conforme à la directive : deux compétences choisies et justifiées, une situation complète pour chacune.
    const chosen = s.tp5Choice.comps.slice(0, 2)
    const justified = chosen.length === 2 && s.tp5Choice.pourquoi.trim().length >= 40 ? 0.2 : 0
    const covered = chosen.filter((c) => s.star.some((e) => starComplete(e) && e.comps.includes(c))).length * 0.4
    const star = justified + covered
    const evals = s.activity.filter((a) => a.tp === 'tp5' && a.score !== undefined).slice(0, 5)
    const practice = evals.length ? evals.reduce((x, a) => x + (a.score ?? 0), 0) / evals.length : 0
    return 0.4 * star + 0.6 * practice
  }
  const comps = compsOfTp(tp)
  return comps.reduce((x, c) => x + compProgress(s, c.id).score, 0) / comps.length
}

export const overallProgress = (s: AppState) =>
  (['tp1', 'tp2', 'tp3', 'tp4', 'tp5'] as TpId[]).reduce((x, tp) => x + tpProgress(s, tp), 0) / 5

export const totalMinutes = (s: AppState) => Object.values(s.minutes).reduce((a, b) => a + b, 0)

export function weekMinutes(s: AppState, monday = mondayOf(todayISO())) {
  let sum = 0
  for (const [d, m] of Object.entries(s.minutes)) if (mondayOf(d) === monday) sum += m
  return sum
}

export interface WeakPoint {
  comp: CompId
  raisons: string[]
  score: number
}

/** Points faibles : compétences entamées dont les résultats réels sont insuffisants. */
export function weakPoints(s: AppState): WeakPoint[] {
  const out: WeakPoint[] = []
  for (const c of COMPETENCES) {
    const p = compProgress(s, c.id)
    if (!p.started) continue
    const raisons: string[] = []
    if (p.practice !== null && p.practice < 0.6) raisons.push(`Entraînements : ${Math.round(p.practice * 100)} % sur les ${p.practiceCount} derniers`)
    const l = s.lessons[c.id]
    if (l?.quizBest !== undefined && l.quizBest < 0.67) raisons.push(`Mini-quiz : ${Math.round(l.quizBest * 100)} %`)
    const lapses = [...ALL_CARDS, ...s.customCards].filter((k) => k.comp === c.id && (s.cards[k.id]?.lapses ?? 0) >= 2).length
    if (lapses) raisons.push(`${lapses} flashcard${lapses > 1 ? 's' : ''} oubliée${lapses > 1 ? 's' : ''} plusieurs fois`)
    if (s.selfMastery[c.id] === 'todo') raisons.push('Marquée « à travailler » par toi')
    if (raisons.length) out.push({ comp: c.id, raisons, score: p.score })
  }
  return out.sort((a, b) => a.score - b.score)
}

/** Moyenne des points par TP sur les examens blancs évalués. */
export function examTpAverages(s: AppState) {
  const done = s.exams.filter((e) => e.scores)
  return (['tp1', 'tp2', 'tp3', 'tp4', 'tp5'] as TpId[]).map((tp) => ({
    tp,
    n: done.length,
    avg: done.length ? done.reduce((x, e) => x + tpPoints(e, tp), 0) / done.length : null,
  }))
}
