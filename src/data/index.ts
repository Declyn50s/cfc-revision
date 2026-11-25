import type { CompId, Flashcard, Lesson, QuizQuestion } from '@/types'
import { LESSONS_A } from './lessons/a'
import { LESSONS_B } from './lessons/b'
import { LESSONS_C } from './lessons/c'
import { LESSONS_D } from './lessons/d'
import { LESSONS_E } from './lessons/e'
import { FLASHCARDS } from './flashcards'

export { FICHES } from './fiches'
export { QUESTIONS } from './questions'
export { CASES } from './cases'
export { ROLEPLAYS } from './roleplays'
export { EXAMS } from './exams'
export { GLOSSARY } from './glossary'
export { TP5_GUIDE } from './tp5'

export const LESSONS: Lesson[] = [...LESSONS_A, ...LESSONS_B, ...LESSONS_C, ...LESSONS_D, ...LESSONS_E]
export const LESSON_BY_COMP = Object.fromEntries(LESSONS.map((l) => [l.comp, l])) as Partial<Record<CompId, Lesson>>
export const ALL_CARDS: Flashcard[] = FLASHCARDS
export const ALL_QUIZ: QuizQuestion[] = LESSONS.flatMap((l) => l.quiz)
