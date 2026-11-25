import type { ExamAttempt, Settings, TpId } from '@/types'

export const MAX_POINTS = 45
export const POINTS_PER_TP = 9
export const PASS_GRADE = 4.0
export const TP_ORDER: TpId[] = ['tp1', 'tp2', 'tp3', 'tp4', 'tp5']

/** Formule officielle (guide CIFC, p. 31) : note = (points × 5 ÷ 45) + 1. */
export const rawGrade = (points: number, max = MAX_POINTS) => (points * 5) / max + 1

/**
 * Arrondi officiel (guide CIFC, version 2026, p. 31) : « le résultat est arrondi à la demi-note ou à la note
 * entière supérieure (par ex. 4,25 → 4,5 ; 5,74 → 6,0) ». C'est le mode « up », appliqué partout.
 * Le mode « nearest » (demi-note la plus proche) n'est conservé que pour les tests de comparaison.
 */
export function roundGrade(raw: number, mode: Settings['rounding'] = 'up') {
  const r = mode === 'up' ? Math.ceil(raw * 2 - 1e-9) / 2 : Math.round(raw * 2 + 1e-9) / 2
  return Math.min(6, Math.max(1, r))
}

export const gradeFromPoints = (points: number, mode: Settings['rounding'] = 'up') => roundGrade(rawGrade(points), mode)

/** Nombre minimal de points pour obtenir 4,0 avec la règle d'arrondi choisie. */
export function minPointsToPass(mode: Settings['rounding'] = 'up') {
  for (let p = 0; p <= MAX_POINTS; p++) if (gradeFromPoints(p, mode) >= PASS_GRADE) return p
  return MAX_POINTS
}

export const tpPoints = (a: ExamAttempt, tp: TpId) => (a.scores?.[tp] ?? []).reduce((x, y) => x + y, 0)

export function examResult(a: ExamAttempt, mode: Settings['rounding'] = 'up') {
  const perTp = TP_ORDER.map((tp) => ({ tp, points: tpPoints(a, tp), max: POINTS_PER_TP }))
  const points = perTp.reduce((s, t) => s + t.points, 0)
  const raw = rawGrade(points)
  const grade = roundGrade(raw, mode)
  return { perTp, points, lost: MAX_POINTS - points, raw, grade, passed: grade >= PASS_GRADE, evaluated: !!a.scores }
}

/**
 * Niveaux de qualité officiels (directive « Travail pratique », CIFC Suisse, 10.10.2025, annexe 2).
 * Les expert-e-s attribuent 0 à 3 points par critère selon ces niveaux ; l'application les reprend pour l'auto-évaluation.
 */
export const SELF_SCALE = [
  { points: 0, label: 'Inutilisable : ne répond pas à la question, affirmations ou justifications erronées, sans structure' },
  { points: 1, label: 'Divergences majeures : souvent lacunaire, superficiel, peu ou pas justifié, parfois faux' },
  { points: 2, label: 'Divergences mineures : en partie lacunaire ou général, correct mais peu justifié' },
  { points: 3, label: 'Réponse exhaustive : tous les aspects requis bien traités, prestation solide' },
]
