import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { actions, useStore } from '@/services/store'

/** Applique le thème clair/sombre choisi (ou celui du système). */
export function useTheme() {
  const theme = useStore((s) => s.settings.theme)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && mq.matches))
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
  return theme
}

const STUDY_PREFIXES = ['/apprendre', '/entrainement', '/ressources/fiches', '/ressources/methodes', '/ressources/glossaire']

/**
 * Mesure le temps de révision réel : seules les minutes passées sur une page d'apprentissage ou d'entraînement,
 * onglet visible et avec une interaction dans les deux dernières minutes, sont comptées.
 */
export function useStudyClock() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!STUDY_PREFIXES.some((p) => pathname.startsWith(p))) return
    let lastInput = Date.now()
    const touch = () => (lastInput = Date.now())
    const events = ['pointerdown', 'keydown', 'scroll', 'pointermove'] as const
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }))
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInput < 120000) actions.addMinutes(0.5)
    }, 30000)
    return () => {
      window.clearInterval(id)
      events.forEach((e) => window.removeEventListener(e, touch))
    }
  }, [pathname])
}

/** Mémorise la dernière page de travail pour le bouton « Reprendre mes révisions ». */
export function useRememberLocation(label: string | null, path?: string) {
  const loc = useLocation()
  useEffect(() => {
    if (label) actions.setLast(path ?? loc.pathname + loc.search, label)
  }, [label, path, loc.pathname, loc.search])
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · CFC Révision`
  }, [title])
}
