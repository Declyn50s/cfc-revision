import { useMemo, useState } from 'react'
import { Layers, Pencil, Plus, RotateCw, Trash2 } from 'lucide-react'
import type { CardGrade, CompId, Flashcard, Level } from '@/types'
import { COMPETENCES, COMP_BY_ID, LEVEL_LABEL, TPS } from '@/data/referentiel'
import { ALL_CARDS } from '@/data'
import { actions, getState, useStore } from '@/services/store'
import { isDue, isMature, nextIntervalLabel } from '@/services/srs'
import { cn, shuffle } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input, Label, Select, Textarea } from '@/components/ui/input'
import { Chip, CompBadge, EmptyState, KindBadge, PageHeader, Stat, TpBadge } from '@/components/shared/bits'

const GRADES: { g: CardGrade; label: string; key: string; cls: string }[] = [
  { g: 'again', label: 'À revoir', key: '1', cls: 'border-destructive/40 hover:bg-destructive/10' },
  { g: 'hard', label: 'Difficile', key: '2', cls: 'border-warning/40 hover:bg-warning/10' },
  { g: 'good', label: 'Correct', key: '3', cls: 'border-primary/40 hover:bg-accent' },
  { g: 'easy', label: 'Maîtrisé', key: '4', cls: 'border-success/40 hover:bg-success/10' },
]

type Draft = { id?: string; comp: CompId; niveau: Level; recto: string; verso: string; exemple: string }

export default function Flashcards() {
  useDocumentTitle('Flashcards')
  useRememberLocation('Flashcards')
  const cards = useStore((s) => s.cards)
  const custom = useStore((s) => s.customCards)
  const all = useMemo(() => [...custom, ...ALL_CARDS], [custom])
  const [tp, setTp] = useState<string | null>(null)
  const [queue, setQueue] = useState<Flashcard[] | null>(null)
  const [reviewed, setReviewed] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [toDelete, setToDelete] = useState<string | null>(null)

  const scope = all.filter((c) => !tp || COMP_BY_ID[c.comp].tp === tp)
  const due = scope.filter((c) => cards[c.id] && isDue(cards[c.id]))
  const fresh = scope.filter((c) => !cards[c.id])
  const mature = scope.filter((c) => isMature(cards[c.id]))

  const start = (kind: 'due' | 'new' | 'all') => {
    const q = kind === 'due' ? shuffle(due) : kind === 'new' ? fresh.slice(0, 10) : shuffle(scope).slice(0, 20)
    setQueue(q)
    setReviewed(0)
    setFlipped(false)
  }

  const grade = (g: CardGrade) => {
    if (!queue?.length) return
    const [card, ...rest] = queue
    actions.gradeCard(card.id, g)
    // « À revoir » : la carte revient en fin de séance.
    const next = g === 'again' ? [...rest, card] : rest
    setReviewed((n) => n + 1)
    setFlipped(false)
    if (!next.length) {
      const n = reviewed + 1
      actions.log({ type: 'flashcards', ref: 'seance', label: `Flashcards — ${n} réponse${n > 1 ? 's' : ''}`, comps: [], detail: tp ? tp.toUpperCase() : 'Toutes' })
    }
    setQueue(next)
  }

  const card = queue?.[0]

  return (
    <>
      <PageHeader
        title="Flashcards"
        description="Répétition espacée : une carte bien connue revient de plus en plus tard, une carte oubliée revient tout de suite. Quatre réponses possibles après chaque carte."
        eyebrow={<KindBadge kind="pedagogique" />}
        actions={
          <Button variant="outline" onClick={() => setDraft({ comp: 'a1', niveau: 2, recto: '', verso: '', exemple: '' })}>
            <Plus /> Créer une carte
          </Button>
        }
      />

      {!queue ? (
        <>
          <div className="no-print mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par tâche partielle">
            <Chip active={!tp} onClick={() => setTp(null)}>
              Toutes
            </Chip>
            {TPS.filter((t) => t.id !== 'tp5').map((t) => (
              <Chip key={t.id} active={tp === t.id} onClick={() => setTp(t.id)}>
                {t.id.toUpperCase()}
              </Chip>
            ))}
          </div>
          <Card>
            <CardContent className="grid gap-6 pt-5 sm:grid-cols-4">
              <Stat label="À réviser aujourd’hui" value={due.length} />
              <Stat label="Nouvelles" value={fresh.length} />
              <Stat label="Acquises" value={mature.length} hint="intervalle ≥ 21 jours" />
              <Stat label="Total" value={scope.length} hint={custom.length ? `dont ${custom.filter((c) => !tp || COMP_BY_ID[c.comp].tp === tp).length} créées par toi` : undefined} />
            </CardContent>
          </Card>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button disabled={!due.length} onClick={() => start('due')}>
              <RotateCw /> Réviser les {due.length} cartes à échéance
            </Button>
            <Button variant="outline" disabled={!fresh.length} onClick={() => start('new')}>
              Découvrir {Math.min(10, fresh.length)} nouvelles cartes
            </Button>
            <Button variant="ghost" disabled={!scope.length} onClick={() => start('all')}>
              Séance libre (20 cartes au hasard)
            </Button>
          </div>

          {custom.length > 0 && (
            <section className="mt-10" aria-labelledby="mes-cartes">
              <h2 id="mes-cartes" className="mb-3 text-lg font-semibold">
                Mes cartes · {custom.length}
              </h2>
              <ul className="divide-y rounded-lg border bg-card">
                {custom.map((c) => (
                  <li key={c.id} className="flex items-center gap-3 px-4 py-2.5">
                    <Badge variant="muted">{c.comp}</Badge>
                    <span className="min-w-0 flex-1 truncate text-sm">{c.recto}</span>
                    <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Modifier la carte « ${c.recto} »`} onClick={() => setDraft({ ...c })}>
                      <Pencil className="size-4" />
                    </button>
                    <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Supprimer la carte « ${c.recto} »`} onClick={() => setToDelete(c.id)}>
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : !card ? (
        <EmptyState icon={Layers} title={`Séance terminée · ${reviewed} réponse${reviewed > 1 ? 's' : ''}`}>
          <p>Les prochaines échéances sont planifiées automatiquement.</p>
          <Button className="mt-4" onClick={() => setQueue(null)}>
            Retour aux flashcards
          </Button>
        </EmptyState>
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
            <span role="status">
              {queue.length} carte{queue.length > 1 ? 's' : ''} restante{queue.length > 1 ? 's' : ''}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setQueue(null)}>
              Arrêter la séance
            </Button>
          </div>
          <Card
            onKeyDown={(e) => {
              if (!flipped && (e.key === ' ' || e.key === 'Enter')) {
                e.preventDefault()
                setFlipped(true)
              } else if (flipped) {
                const g = GRADES.find((x) => x.key === e.key)
                if (g) grade(g.g)
              }
            }}
          >
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <TpBadge tp={COMP_BY_ID[card.comp].tp} />
                <CompBadge comp={card.comp} />
                <Badge variant="outline">{LEVEL_LABEL[card.niveau]}</Badge>
                {card.custom && <Badge variant="muted">Ma carte</Badge>}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question</p>
              <p className="mt-1 text-lg font-medium leading-7">{card.recto}</p>

              {!flipped ? (
                <Button autoFocus className="mt-6 w-full" size="lg" onClick={() => setFlipped(true)}>
                  Afficher la réponse <kbd className="ml-2 rounded border border-primary-foreground/30 px-1.5 text-[11px]">Espace</kbd>
                </Button>
              ) : (
                <div className="mt-5 border-t pt-4" aria-live="polite">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Réponse</p>
                  <p className="mt-1 whitespace-pre-wrap text-[15px] leading-7">{card.verso}</p>
                  {card.exemple && (
                    <p className="mt-3 rounded-md bg-muted/60 px-3 py-2 text-sm leading-6">
                      <span className="font-medium">Exemple :</span> {card.exemple}
                    </p>
                  )}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Comment as-tu répondu ?">
                    {GRADES.map((g, i) => (
                      <button key={g.g} type="button" autoFocus={i === 2} onClick={() => grade(g.g)} className={cn('rounded-md border bg-card px-2 py-2.5 text-center', g.cls)}>
                        <span className="block text-sm font-semibold">{g.label}</span>
                        <span className="block text-xs text-muted-foreground">
                          {nextIntervalLabel(getState().cards[card.id], g.g)} · touche {g.key}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogTitle>{draft?.id ? 'Modifier ma carte' : 'Créer une flashcard'}</DialogTitle>
          <DialogDescription>Une seule idée par carte : question courte, réponse courte.</DialogDescription>
          {draft && (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (!draft.recto.trim() || !draft.verso.trim()) return
                actions.saveCustomCard(draft)
                setDraft(null)
              }}
            >
              <div>
                <Label htmlFor="fc-recto">Question (recto)</Label>
                <Textarea id="fc-recto" required className="min-h-[64px]" value={draft.recto} onChange={(e) => setDraft({ ...draft, recto: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="fc-verso">Réponse (verso)</Label>
                <Textarea id="fc-verso" required className="min-h-[80px]" value={draft.verso} onChange={(e) => setDraft({ ...draft, verso: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="fc-ex">Exemple (facultatif)</Label>
                <Input id="fc-ex" value={draft.exemple} onChange={(e) => setDraft({ ...draft, exemple: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="fc-comp">Compétence</Label>
                  <Select id="fc-comp" value={draft.comp} onChange={(e) => setDraft({ ...draft, comp: e.target.value as CompId })}>
                    {COMPETENCES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id} — {c.court}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fc-niv">Difficulté</Label>
                  <Select id="fc-niv" value={draft.niveau} onChange={(e) => setDraft({ ...draft, niveau: Number(e.target.value) as Level })}>
                    {([1, 2, 3] as Level[]).map((l) => (
                      <option key={l} value={l}>
                        {LEVEL_LABEL[l]}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDraft(null)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <ConfirmDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)} title="Supprimer cette carte ?" description="La carte et son historique de révision seront supprimés." confirmLabel="Supprimer" onConfirm={() => toDelete && actions.deleteCustomCard(toDelete)} />
    </>
  )
}
