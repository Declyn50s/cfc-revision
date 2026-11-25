import type { AppState, CompId } from '@/types'
import { COMPETENCES, COMP_BY_ID } from '@/data/referentiel'
import { ALL_CARDS } from '@/data'
import { allCompProgress, type CompProgress } from './progress'
import { isDue } from './srs'
import { daysBetween, todayISO } from '@/lib/utils'

export interface PlanItem {
  type: 'flashcards' | 'lecon' | 'questions' | 'cas' | 'role' | 'tp5' | 'examen' | 'fiche'
  label: string
  minutes: number
  path: string
  raison: string
}
export interface PlanSession {
  numero: number
  focus: CompId | null
  items: PlanItem[]
  minutes: number
}

export const dueCardCount = (s: AppState) => [...ALL_CARDS, ...s.customCards].filter((c) => s.cards[c.id] && isDue(s.cards[c.id])).length
export const newCardCount = (s: AppState) => [...ALL_CARDS, ...s.customCards].filter((c) => !s.cards[c.id]).length

export function phase(s: AppState) {
  if (!s.settings.examDate) return { nom: 'Date d’examen à définir', detail: 'Indique ta date d’examen pour obtenir un calendrier.', weeks: null as number | null }
  const days = daysBetween(todayISO(), s.settings.examDate)
  const weeks = Math.max(0, Math.ceil(days / 7))
  if (days < 0) return { nom: 'Examen passé', detail: 'Mets à jour la date dans les paramètres si tu te représentes.', weeks: 0 }
  if (weeks > 12) return { nom: 'Acquisition', detail: 'Parcourir les 23 leçons et construire tes exemples STAR.', weeks }
  if (weeks > 4) return { nom: 'Consolidation', detail: 'Questions orales, cas pratiques et un examen blanc toutes les deux semaines.', weeks }
  return { nom: 'Simulation', detail: 'Un examen blanc par semaine en conditions réelles, révision ciblée des points faibles.', weeks }
}

/** Ordre de priorité : d'abord ce qui est faible, puis ce qui est en cours, puis ce qui n'est pas commencé. */
export function priorityList(s: AppState): CompProgress[] {
  const rank = { 'a-retravailler': 0, 'en-cours': 1, 'non-commence': 2, maitrise: 3 } as const
  const order = COMPETENCES.map((c) => c.id)
  return allCompProgress(s).sort(
    (a, b) => rank[a.status] - rank[b.status] || a.score - b.score || order.indexOf(a.comp) - order.indexOf(b.comp),
  )
}

const reason = (p: CompProgress) =>
  p.status === 'a-retravailler'
    ? 'Résultats insuffisants sur cette compétence'
    : p.status === 'en-cours'
      ? 'Compétence en cours, à consolider'
      : p.status === 'non-commence'
        ? 'Compétence pas encore abordée'
        : 'Entretien d’une compétence maîtrisée'

export function buildSession(s: AppState, focus: CompProgress | null, length: number, numero: number, withCards: boolean): PlanSession {
  const items: PlanItem[] = []
  let left = length
  const push = (i: PlanItem) => {
    if (left - i.minutes < 0) return
    items.push(i)
    left -= i.minutes
  }
  const due = dueCardCount(s)
  if (withCards && (due > 0 || newCardCount(s) > 0)) {
    push({
      type: 'flashcards',
      label: due > 0 ? `Réviser ${due} flashcard${due > 1 ? 's' : ''} arrivée${due > 1 ? 's' : ''} à échéance` : 'Découvrir 10 nouvelles flashcards',
      minutes: length >= 45 ? 10 : 5,
      path: '/entrainement/flashcards',
      raison: 'Répétition espacée',
    })
  }
  if (focus) {
    const c = COMP_BY_ID[focus.comp]
    const lessonDone = s.lessons[c.id]?.done
    if (!lessonDone)
      push({ type: 'lecon', label: `Leçon ${c.id} — ${c.court}`, minutes: length >= 30 ? 15 : 10, path: `/apprendre/${c.tp}/${c.id}`, raison: reason(focus) })
    push({ type: 'questions', label: `Questions orales sur ${c.id}`, minutes: 10, path: `/entrainement/questions?comp=${c.id}`, raison: 'Formuler à voix haute ce que tu viens de revoir' })
    if (left >= 15) push({ type: 'cas', label: `Cas pratique ${c.tp.toUpperCase()}`, minutes: 15, path: `/entrainement/cas?tp=${c.tp}`, raison: 'Appliquer dans le format de l’examen' })
    if (left >= 10 && (c.tp === 'tp3' || c.tp === 'tp4')) push({ type: 'role', label: `Jeu de rôle ${c.tp.toUpperCase()}`, minutes: 10, path: `/entrainement/jeux-de-role?tp=${c.tp}`, raison: 'Simulation pratique' })
  }
  if (left >= 10) push({ type: 'tp5', label: 'TP5 — travailler un exemple STAR', minutes: 10, path: '/apprendre/tp5', raison: s.star.length < 3 ? `${s.star.length} exemple${s.star.length > 1 ? 's' : ''} rédigé${s.star.length > 1 ? 's' : ''} sur 3 recommandés` : 'Entretenir tes exemples' })
  if (left >= 5) push({ type: 'fiche', label: 'Relire une fiche de méthode', minutes: 5, path: '/ressources/fiches', raison: 'Ancrer les mots-clés' })
  return { numero, focus: focus?.comp ?? null, items, minutes: length - left }
}

export function weeklyPlan(s: AppState): { sessions: PlanSession[]; exam: boolean } {
  const { weeklyMinutes, sessionLength } = s.settings
  const ph = phase(s)
  const prio = priorityList(s).filter((p) => p.status !== 'maitrise')
  const pool = prio.length ? prio : priorityList(s)
  // Examen blanc (65 min) : chaque semaine en phase de simulation, sinon lorsqu'au moins 12 leçons sont terminées.
  const lessonsDone = Object.values(s.lessons).filter((l) => l?.done).length
  const exam = weeklyMinutes >= 65 + sessionLength && (ph.nom === 'Simulation' || (ph.nom === 'Consolidation' && lessonsDone >= 12))
  const budget = weeklyMinutes - (exam ? 65 : 0)
  const n = Math.max(1, Math.floor(budget / sessionLength))
  const sessions = Array.from({ length: n }, (_, i) => buildSession(s, pool[i % pool.length] ?? null, sessionLength, i + 1, true))
  return { sessions, exam }
}

/** Prochaine séance recommandée (tableau de bord). */
export const nextSession = (s: AppState) => buildSession(s, priorityList(s).find((p) => p.status !== 'maitrise') ?? null, s.settings.sessionLength, 1, true)
