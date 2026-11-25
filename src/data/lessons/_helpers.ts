import type { CompId, QuizQuestion } from '@/types'

/** Construit les questions d'un mini-quiz : [question, choix, index de la bonne réponse, explication]. */
export const quiz = (comp: CompId, items: [string, string[], number, string][]): QuizQuestion[] =>
  items.map(([q, choix, bonne, explication], i) => ({ id: `${comp}-qz${i + 1}`, comp, q, choix, bonne, explication }))
