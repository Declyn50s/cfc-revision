import * as React from 'react'
import { Link } from 'react-router-dom'
import { BookOpenCheck, FileCheck2, FlaskConical, HelpCircle, Lightbulb, Star, StickyNote } from 'lucide-react'
import type { Block, CompId, ContentKind, Mastery, TpId } from '@/types'
import { COMP_BY_ID, TP_BY_ID, TP_COLOR } from '@/data/referentiel'
import { actions, useStore } from '@/services/store'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/input'

export function TpBadge({ tp, link = true, className }: { tp: TpId; link?: boolean; className?: string }) {
  const c = TP_COLOR[tp]
  const inner = (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold leading-5', c.soft, c.text, 'border-transparent', className)}>
      <span className={cn('size-1.5 rounded-full', c.bg)} aria-hidden />
      {tp.toUpperCase()}
    </span>
  )
  return link ? (
    <Link to={`/apprendre/${tp}`} title={TP_BY_ID[tp].titre} className="rounded-md">
      {inner}
    </Link>
  ) : (
    inner
  )
}

export function CompBadge({ comp, link = true }: { comp: CompId; link?: boolean }) {
  const c = COMP_BY_ID[comp]
  const inner = (
    <span className="inline-flex items-center rounded-md border bg-card px-2 py-0.5 text-xs font-medium leading-5 text-foreground" title={c.titre}>
      <span className="font-semibold">{c.id}</span>
      <span className="ml-1.5 hidden text-muted-foreground sm:inline">{c.court}</span>
    </span>
  )
  return link ? (
    <Link to={`/apprendre/${c.tp}/${c.id}`} className="rounded-md hover:opacity-80">
      {inner}
    </Link>
  ) : (
    inner
  )
}

const KIND: Record<ContentKind, { label: string; icon: React.ElementType; variant: 'default' | 'muted' | 'success' | 'warning' | 'outline'; help: string }> = {
  officiel: { label: 'Exigence officielle', icon: FileCheck2, variant: 'success', help: 'Repris d’un document officiel fourni.' },
  pedagogique: { label: 'Explication pédagogique', icon: Lightbulb, variant: 'default', help: 'Rédigé pour t’aider à comprendre ; ce n’est pas un texte officiel.' },
  exemple: { label: 'Exemple d’entraînement', icon: FlaskConical, variant: 'muted', help: 'Créé pour l’entraînement. Ce n’est pas une question officielle d’examen.' },
  correction: { label: 'Correction indicative', icon: BookOpenCheck, variant: 'outline', help: 'Proposition de réponse. Les expert-e-s peuvent attendre d’autres éléments.' },
  'a-verifier': { label: 'À vérifier', icon: HelpCircle, variant: 'warning', help: 'Information non confirmée par un document officiel fourni.' },
}

export function KindBadge({ kind, className }: { kind: ContentKind; className?: string }) {
  const k = KIND[kind]
  const Icon = k.icon
  return (
    <Badge variant={k.variant} className={className} title={k.help}>
      <Icon className="size-3" aria-hidden />
      {k.label}
    </Badge>
  )
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions: right,
  children,
}: {
  title: string
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="mb-6">
      {eyebrow && <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">{eyebrow}</div>}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1.5 text-[15px] leading-6 text-muted-foreground">{description}</p>}
        </div>
        {right && <div className="no-print flex flex-wrap items-center gap-2">{right}</div>}
      </div>
      {children}
    </header>
  )
}

export function Section({ title, kind, children, id, className }: { title: string; kind?: ContentKind; children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)} aria-labelledby={id ? id + '-h' : undefined}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 id={id ? id + '-h' : undefined} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {kind && <KindBadge kind={kind} />}
      </div>
      {children}
    </section>
  )
}

/** Rendu des blocs pédagogiques : paragraphes, listes, étapes schématisées, tableaux. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return (
              <p key={i} className="text-[15px] leading-7">
                {b.text}
              </p>
            )
          case 'h':
            return (
              <h3 key={i} className="pt-2 text-[15px] font-semibold">
                {b.text}
              </h3>
            )
          case 'list':
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-[15px] leading-6 marker:text-muted-foreground">
                {b.items.map((x, j) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>
            )
          case 'steps':
            return (
              <ol key={i} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Étapes">
                {b.items.map((x, j) => (
                  <li key={j} className="flex gap-3 rounded-md border bg-muted/40 p-3 text-sm leading-6">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground" aria-hidden>
                      {j + 1}
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            )
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-md border" tabIndex={0} role="region" aria-label="Tableau">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="border-b px-3 py-2 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-b last:border-0">
                        {r.map((cell, k) => (
                          <td key={k} className={cn('px-3 py-2 align-top leading-6', k === 0 && 'font-medium')}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'note':
            return (
              <p key={i} className="rounded-md border-l-4 border-primary bg-accent/50 px-4 py-3 text-sm leading-6">
                {b.text}
              </p>
            )
        }
      })}
    </div>
  )
}

export function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('list-disc space-y-1.5 pl-5 text-[15px] leading-6 marker:text-muted-foreground', className)}>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  )
}

export function FavoriteButton({ id, label, className }: { id: string; label: string; className?: string }) {
  const on = useStore((s) => s.favorites.includes(id))
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        actions.toggleFavorite(id)
      }}
      aria-pressed={on}
      aria-label={on ? `Retirer « ${label} » des favoris` : `Ajouter « ${label} » aux favoris`}
      title={on ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={cn('no-print inline-flex size-9 items-center justify-center rounded-md hover:bg-muted', on ? 'text-warning' : 'text-muted-foreground', className)}
    >
      <Star className="size-4" fill={on ? 'currentColor' : 'none'} />
    </button>
  )
}

export function NoteEditor({ id, placeholder = 'Tes notes personnelles (sauvegardées automatiquement)…' }: { id: string; placeholder?: string }) {
  const value = useStore((s) => s.notes[id] ?? '')
  const fieldId = 'note-' + id.replace(/[^a-z0-9]/gi, '-')
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
        <StickyNote className="size-4 text-muted-foreground" aria-hidden /> Mes notes
      </label>
      <Textarea id={fieldId} value={value} placeholder={placeholder} onChange={(e) => actions.setNote(id, e.target.value)} />
    </div>
  )
}

const MASTERY: { v: Mastery; label: string }[] = [
  { v: 'todo', label: 'À travailler' },
  { v: 'progress', label: 'En cours' },
  { v: 'done', label: 'Maîtrisé' },
]

export function MasteryPicker({ value, onChange, label }: { value: Mastery | undefined; onChange: (m: Mastery) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="no-print inline-flex rounded-md border bg-card p-0.5">
      {MASTERY.map((m) => (
        <button
          key={m.v}
          type="button"
          role="radio"
          aria-checked={value === m.v}
          onClick={() => onChange(m.v)}
          className={cn(
            'rounded px-2.5 py-1 text-xs font-medium',
            value === m.v ? (m.v === 'done' ? 'bg-success/15 text-success' : m.v === 'todo' ? 'bg-warning/15 text-warning' : 'bg-accent text-accent-foreground') : 'text-muted-foreground hover:bg-muted',
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed bg-card/50 px-6 py-10 text-center">
      <Icon className="mx-auto size-6 text-muted-foreground" aria-hidden />
      <p className="mt-3 font-medium">{title}</p>
      {children && <div className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">{children}</div>}
    </div>
  )
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn('h-8 rounded-full border px-3 text-[13px] font-medium', active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted')}
    >
      {children}
    </button>
  )
}

export const STATUS_LABEL = {
  'non-commence': { label: 'Pas commencé', variant: 'muted' as const },
  'a-retravailler': { label: 'À retravailler', variant: 'warning' as const },
  'en-cours': { label: 'En cours', variant: 'default' as const },
  maitrise: { label: 'Maîtrisé', variant: 'success' as const },
}
