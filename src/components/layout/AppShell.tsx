import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, CornerDownLeft, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { BrandIcon, NAV } from './nav'
import { COMP_BY_ID, TP_BY_ID, TP_COLOR, isCompId, isTpId } from '@/data/referentiel'
import { actions, storageIsPersistent, useStore } from '@/services/store'
import { search } from '@/services/search'
import { useStudyClock, useTheme } from '@/hooks/useApp'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { TpBadge } from '@/components/shared/bits'

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Navigation principale" className="flex h-full flex-col overflow-y-auto px-3 pb-6">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-2 py-4">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BrandIcon className="size-4.5" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold">CFC Révision</span>
          <span className="block text-[11px] text-muted-foreground">Article 32 — Objectif Réussite 2027</span>
        </span>
      </Link>
      {NAV.map((g) => (
        <div key={g.section} className="mt-4">
          <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.section}</p>
          <ul className="space-y-0.5">
            {g.items.map((it) => (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm',
                      isActive ? 'bg-accent font-medium text-accent-foreground' : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                    )
                  }
                >
                  {it.tp ? (
                    <span className={cn('ml-1 mr-0.5 size-2.5 shrink-0 rounded-full', TP_COLOR[it.tp].bg)} aria-hidden />
                  ) : (
                    <it.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  )}
                  <span className="truncate">{it.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/** Fil d'Ariane : indique toujours où l'on se trouve, la tâche partielle et la compétence. */
function Breadcrumb() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; to?: string }[] = []
  let tp = parts[0] === 'apprendre' && parts[1] && isTpId(parts[1]) ? parts[1] : undefined
  if (!parts.length) crumbs.push({ label: 'Tableau de bord' })
  else {
    const flat = NAV.flatMap((g) => g.items.map((i) => ({ ...i, section: g.section })))
    const match = flat.filter((i) => i.to !== '/' && pathname.startsWith(i.to)).sort((a, b) => b.to.length - a.to.length)[0]
    if (match) {
      crumbs.push({ label: match.section })
      crumbs.push({ label: match.label, to: match.to })
    }
    if (parts[0] === 'apprendre' && parts[2] && isCompId(parts[2])) crumbs.push({ label: `${parts[2]} — ${COMP_BY_ID[parts[2]].court}` })
    else if (match && pathname !== match.to && parts.length > 2) crumbs.push({ label: 'Détail' })
  }
  return (
    <nav aria-label="Fil d’Ariane" className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
      {crumbs.map((c, i) => (
        <span key={i} className="flex min-w-0 items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
          {c.to && i < crumbs.length - 1 ? (
            <Link to={c.to} className="truncate hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className={cn('truncate', i === crumbs.length - 1 && 'font-medium text-foreground')} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
              {c.label}
            </span>
          )}
        </span>
      ))}
      {tp && <TpBadge tp={tp} link={false} className="ml-1 hidden sm:inline-flex" />}
    </nav>
  )
}

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const groups = useMemo(() => search(q), [q])
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => setActive(0), [q])
  useEffect(() => {
    if (!open) setQ('')
  }, [open])
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }
  let n = -1
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="top-[10vh] max-w-2xl p-0">
        <DialogTitle className="sr-only">Recherche globale</DialogTitle>
        <DialogDescription className="sr-only">Cherche dans les cours, compétences, fiches, méthodes, questions, cas pratiques et le glossaire.</DialogDescription>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(flat.length - 1, a + 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(0, a - 1))
              } else if (e.key === 'Enter' && flat[active]) go(flat[active].path)
            }}
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls="search-results"
            aria-activedescendant={flat[active] ? `sr-${active}` : undefined}
            aria-label="Rechercher"
            placeholder="Rechercher un cours, une méthode, une question… (ex. SMART)"
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">Échap</kbd>
        </div>
        <div ref={listRef} id="search-results" role="listbox" aria-label="Résultats" className="max-h-[56vh] overflow-y-auto p-2">
          {!q.trim() && <p className="px-3 py-6 text-center text-sm text-muted-foreground">Tape un mot-clé : « réclamation », « SMART », « b2 », « facture »…</p>}
          {q.trim() && !flat.length && <p className="px-3 py-6 text-center text-sm text-muted-foreground">Aucun résultat pour « {q} ».</p>}
          {groups.map((g) => (
            <div key={g.kind} role="group" aria-label={g.kind} className="mb-1">
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.kind}</p>
              {g.items.map((d) => {
                n++
                const i = n
                return (
                  <button
                    key={d.kind + d.path}
                    id={`sr-${i}`}
                    role="option"
                    aria-selected={i === active}
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(d.path)}
                    className={cn('flex w-full items-center gap-3 rounded-md px-3 py-2 text-left', i === active && 'bg-accent')}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{d.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{d.subtitle}</span>
                    </span>
                    {d.tp && <TpBadge tp={d.tp} link={false} />}
                    {i === active && <CornerDownLeft className="size-3.5 text-muted-foreground" aria-hidden />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AppShell() {
  const theme = useTheme()
  useStudyClock()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <div className="min-h-screen">
      <a href="#contenu" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
        Aller au contenu
      </a>
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-card lg:block">
        <Sidebar />
      </aside>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent hideClose className="left-0 top-0 h-full max-h-none w-72 max-w-[85vw] translate-x-0 rounded-none border-y-0 border-l-0 p-0">
          <DialogTitle className="sr-only">Menu</DialogTitle>
          <DialogDescription className="sr-only">Navigation principale de l’application.</DialogDescription>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu" className="absolute right-2 top-3 rounded-md p-2 text-muted-foreground hover:bg-muted">
            <X className="size-4" />
          </button>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </DialogContent>
      </Dialog>

      <div className="lg:pl-72">
        <header className="no-print sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <button type="button" className="rounded-md p-2 hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <Breadcrumb />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground hover:bg-muted"
            aria-label="Ouvrir la recherche"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden md:inline">Rechercher…</span>
            <kbd className="hidden rounded border bg-muted px-1.5 text-[11px] md:inline">{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            type="button"
            onClick={() => actions.updateSettings({ theme: isDark ? 'light' : 'dark' })}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted"
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={`Thème : ${theme === 'system' ? 'système' : theme === 'dark' ? 'sombre' : 'clair'}`}
          >
            {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </button>
        </header>
        {!storageIsPersistent() && (
          <p role="status" className="no-print border-b bg-warning/10 px-6 py-2 text-sm text-warning">
            Le stockage local du navigateur est indisponible : tes données ne seront pas conservées après fermeture. Utilise « Exporter » dans les paramètres.
          </p>
        )}
        <main id="contenu" ref={mainRef} tabIndex={-1} className="mx-auto w-full max-w-6xl px-4 py-8 outline-none sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
