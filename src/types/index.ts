// Types centraux de CFC Révision.

export type TpId = 'tp1' | 'tp2' | 'tp3' | 'tp4' | 'tp5'
export type DomainId = 'a' | 'b' | 'c' | 'd' | 'e'
export type CompId =
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5'
  | 'd1' | 'd2' | 'd3' | 'd4'
  | 'e1' | 'e2' | 'e3' | 'e4'
export type OptionalCompId = 'c6' | 'd5' | 'd6' | 'e5' | 'e6'

/** Nature d'un contenu — affichée partout pour ne jamais confondre officiel et entraînement. */
export type ContentKind = 'officiel' | 'pedagogique' | 'exemple' | 'correction' | 'a-verifier'

export type Level = 1 | 2 | 3 // 1 Débutant · 2 Intermédiaire · 3 Niveau examen

export interface SourceDoc {
  id: string
  titre: string
  editeur: string
  statut: 'fourni' | 'manquant' | 'consulte-en-ligne'
  detail: string
  url?: string
}

export interface Criterion {
  texte: string
  points: number
  /** Intitulé du critère dans la directive « Travail pratique » (annexe 2). */
  titre?: string
  /** Ce qui est attendu pour obtenir le maximum de points, selon la directive. */
  plein?: string
}

export interface TaskPart {
  id: TpId
  numero: number
  titre: string
  court: string
  domaines: DomainId[]
  methode: string
  methodeDetail: string
  dureeMin: number
  points: number
  objectifs: string[]
  deroulement: { label: string; minutes: number }[]
  criteres: Criterion[]
  criteresKind: ContentKind
  erreurs: string[]
  conseils: string[]
}

export interface Domain {
  id: DomainId
  titre: string
  tp: TpId
}

export interface Competence {
  id: CompId
  domaine: DomainId
  tp: TpId
  titre: string
  court: string
  /** Mandats pratiques fournis (titres officiels Konvink/CIFC) rattachés à la compétence. */
  mandats: string[]
}

/** Étapes opérationnelles d'une compétence, telles qu'elles figurent dans le guide pratique Konvink. */
export type EtapesMap = Record<CompId, { groupe?: string; etapes: string[] }[]>

export interface OptionalCompetence {
  id: OptionalCompId
  titre: string
  option: string
  remarque: string
}

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'steps'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'note'; text: string }

export interface QuizQuestion {
  id: string
  comp: CompId
  q: string
  choix: string[]
  bonne: number
  explication: string
}

export interface Lesson {
  comp: CompId
  definition: string
  objectifs: string[]
  aSavoir: string[]
  explication: Block[]
  methodes: { nom: string; ficheId?: string; resume: string }[]
  exemple: string
  situation: string
  questionOrale: string
  reponse: string[]
  erreurs: string[]
  recap: string[]
  quiz: QuizQuestion[]
  cas: { enonce: string; questions: string[]; corrige: string[] }
  sources: string[]
}

export interface Fiche {
  id: string
  titre: string
  categorie: 'methode' | 'concept' | 'examen'
  officiel: boolean // false = outil pédagogique, pas une exigence officielle
  definition: string
  utilite: string
  etapes: string[]
  exemple: string
  reponseOrale: string
  motsCles: string[]
  erreurs: string[]
  comps: CompId[]
  tps: TpId[]
}

export interface OralQuestion {
  id: string
  comp: CompId
  tp: TpId
  niveau: Level
  theme: string
  q: string
  attendus: string[]
  reponse: string
  motsCles: string[]
  relances: string[]
}

export interface CaseStudy {
  id: string
  titre: string
  tp: TpId
  comps: CompId[]
  contexte: string
  secteur: string
  entreprise: string
  situation: string
  annexes: { titre: string; contenu: Block[] }[]
  consignes: string[]
  questions: string[]
  minutes: number
  attendu: string[]
  correction: string
  bareme: Criterion[]
  variantes: string[]
}

export interface RolePlayStep {
  /** Ce que dit ou fait l'interlocuteur (client, fournisseur, expert). */
  stimulus: string
  consigne: string
  attendus: string[]
  exemple: string
}

export interface RolePlay {
  id: string
  titre: string
  tp: 'tp3' | 'tp4'
  comps: CompId[]
  role: string
  contexte: string
  annexe?: Block[]
  etapes: RolePlayStep[]
  relances: string[]
}

export interface Flashcard {
  id: string
  comp: CompId
  niveau: Level
  recto: string
  verso: string
  exemple: string
  custom?: boolean
}

export interface ExamTask {
  tp: TpId
  titre: string
  contexte: string
  annexe?: { titre: string; contenu: Block[] }
  taches: string[]
  complementaires: string[]
  attendus: string[]
  justification: string
}

export interface MockExam {
  id: string
  titre: string
  entreprise: string
  secteur: string
  /** Domaine spécifique retenu pour le TP4 de cet examen (la série zéro en présente deux). */
  tp4Domaine: 'contenu' | 'infrastructure'
  situationInitiale: Block[]
  role: string
  taches: ExamTask[]
}

export interface GlossaryTerm {
  terme: string
  definition: string
  comps: CompId[]
}

// ───────────── État persistant ─────────────

export type Mastery = 'todo' | 'progress' | 'done'
export type CardGrade = 'again' | 'hard' | 'good' | 'easy'

export interface CardState {
  ease: number
  interval: number // jours
  due: string // ISO date (jour)
  reps: number
  lapses: number
  last: string
}

export interface ExamAttempt {
  id: string
  examId: string
  mode: 'examen' | 'entrainement'
  startedAt: string
  finishedAt?: string
  answers: Record<TpId, string>
  notes: string
  /** Points auto-attribués par critère (3 critères × 0–3) pour chaque TP. */
  scores?: Record<TpId, number[]>
  timeUsedSec: Record<string, number>
  /** Étape en cours tant que l'examen n'est pas terminé (0 = préparation, 1 à 5 = TP). */
  step?: number
}

export interface StarExample {
  id: string
  titre: string
  comps: CompId[]
  situation: string
  tache: string
  action: string
  resultat: string
  amelioration: string
  variante: string
  updatedAt: string
}

export interface FreeNote {
  id: string
  titre: string
  corps: string
  updatedAt: string
}

export interface ActivityLog {
  id: string
  date: string // ISO datetime
  type: 'lecon' | 'quiz' | 'question' | 'cas' | 'role' | 'flashcards' | 'examen'
  ref: string
  label: string
  comps: CompId[]
  tp?: TpId
  /** Résultat normalisé 0–1 lorsque l'activité est évaluée. */
  score?: number
  detail?: string
}

export interface Settings {
  examDate: string | null
  weeklyMinutes: number
  sessionLength: 15 | 30 | 45 | 60
  theme: 'light' | 'dark' | 'system'
  rounding: 'nearest' | 'up'
  tp4Focus: 'contenu' | 'infrastructure' | 'les-deux'
}

export interface AppState {
  version: 1
  settings: Settings
  lessons: Partial<Record<CompId, { done: boolean; quizBest?: number; openedAt: string }>>
  selfMastery: Partial<Record<CompId, Mastery>>
  ficheStatus: Record<string, Mastery>
  favorites: string[] // « type:id »
  notes: Record<string, string> // « type:id » → texte
  freeNotes: FreeNote[]
  cards: Record<string, CardState>
  customCards: Flashcard[]
  activity: ActivityLog[]
  exams: ExamAttempt[]
  star: StarExample[]
  minutes: Record<string, number> // jour ISO → minutes de révision actives
  last: { path: string; label: string; at: string } | null
  weekly: Record<string, string> // lundi ISO → bilan rédigé
  /** TP5 : les deux compétences choisies pour l'entretien de réflexion et la justification de ce choix. */
  tp5Choice: { comps: CompId[]; pourquoi: string }
  /** Horodatage de la dernière modification (sert à départager copie locale et copie synchronisée). */
  updatedAt?: string
}
