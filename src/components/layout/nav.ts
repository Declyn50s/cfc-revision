import {
  BarChart3, BookMarked, BookOpen, CalendarRange, ClipboardCheck, FileText, FolderOpen, GraduationCap, History, LayoutDashboard,
  Layers, ListChecks, MessageCircleQuestion, MessagesSquare, NotebookPen, Settings, Star, Target, Timer, Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TpId } from '@/types'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  tp?: TpId
}
export const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: 'Espace personnel',
    items: [
      { to: '/', label: 'Tableau de bord', icon: LayoutDashboard },
      { to: '/programme', label: 'Mon programme de révision', icon: CalendarRange },
    ],
  },
  {
    section: 'Apprendre',
    items: [
      { to: '/apprendre/tp1', label: 'TP1 — Domaines A et B', icon: BookOpen, tp: 'tp1' },
      { to: '/apprendre/tp2', label: 'TP2 — Domaine C', icon: BookOpen, tp: 'tp2' },
      { to: '/apprendre/tp3', label: 'TP3 — Domaine D', icon: BookOpen, tp: 'tp3' },
      { to: '/apprendre/tp4', label: 'TP4 — Domaine E', icon: BookOpen, tp: 'tp4' },
      { to: '/apprendre/tp5', label: 'TP5 — Discussion de réflexion', icon: BookOpen, tp: 'tp5' },
    ],
  },
  {
    section: 'S’entraîner',
    items: [
      { to: '/entrainement/questions', label: 'Questions orales', icon: MessageCircleQuestion },
      { to: '/entrainement/cas', label: 'Cas pratiques', icon: ClipboardCheck },
      { to: '/entrainement/jeux-de-role', label: 'Jeux de rôle', icon: MessagesSquare },
      { to: '/entrainement/flashcards', label: 'Flashcards', icon: Layers },
      { to: '/entrainement/quiz', label: 'Quiz', icon: ListChecks },
      { to: '/entrainement/examens', label: 'Examens blancs', icon: Timer },
    ],
  },
  {
    section: 'Mes ressources',
    items: [
      { to: '/ressources/fiches', label: 'Fiches de révision', icon: FileText },
      { to: '/ressources/methodes', label: 'Méthodes et outils', icon: Wrench },
      { to: '/ressources/glossaire', label: 'Glossaire', icon: BookMarked },
      { to: '/ressources/notes', label: 'Mes notes', icon: NotebookPen },
      { to: '/ressources/favoris', label: 'Mes favoris', icon: Star },
      { to: '/ressources/documents', label: 'Documents officiels', icon: FolderOpen },
    ],
  },
  {
    section: 'Mes résultats',
    items: [
      { to: '/resultats/progression', label: 'Progression', icon: BarChart3 },
      { to: '/resultats/historique', label: 'Historique', icon: History },
      { to: '/resultats/points-faibles', label: 'Points faibles', icon: Target },
      { to: '/parametres', label: 'Paramètres', icon: Settings },
    ],
  },
]
export const BrandIcon = GraduationCap
