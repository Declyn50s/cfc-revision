import { useMemo, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, Eye, Pause, Play, RotateCcw } from 'lucide-react'
import { COMPETENCES, TPS, TP_BY_ID } from '@/data/referentiel'
import { CASES } from '@/data'
import { actions, useStore } from '@/services/store'
import { useCountdown } from '@/hooks/useTimer'
import { cn, fmtClock, pct } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, Textarea } from '@/components/ui/input'
import { Blocks, Bullets, Chip, CompBadge, EmptyState, FavoriteButton, KindBadge, NoteEditor, PageHeader, Section, TpBadge } from '@/components/shared/bits'
import { SelfEval, evalComplete, evalSum } from '@/components/shared/SelfEval'

export function CaseList() {
  useDocumentTitle('Cas pratiques')
  useRememberLocation('Cas pratiques')
  const [params, setParams] = useSearchParams()
  const tp = params.get('tp')
  const comp = params.get('comp')
  const secteur = params.get('secteur')
  const activity = useStore((s) => s.activity)
  const best = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of activity) if (a.type === 'cas' && a.score !== undefined) m.set(a.ref, Math.max(m.get(a.ref) ?? 0, a.score))
    return m
  }, [activity])
  const secteurs = useMemo(() => [...new Set(CASES.map((c) => c.secteur))].sort(), [])
  const list = CASES.filter((c) => (!tp || c.tp === tp) && (!comp || c.comps.includes(comp as never)) && (!secteur || c.secteur === secteur))
  const set = (k: string, v: string | null) => {
    const n = new URLSearchParams(params)
    if (v) n.set(k, v)
    else n.delete(k)
    setParams(n, { replace: true })
  }

  return (
    <>
      <PageHeader
        title="Cas pratiques"
        description={`${CASES.length} situations professionnelles au format de l’examen : contexte, annexe, tâche, correction argumentée et barème. Chaque cas propose des variantes pour ne pas mémoriser une réponse unique.`}
        eyebrow={<KindBadge kind="exemple" />}
      />
      <div className="no-print mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par tâche partielle">
          <Chip active={!tp} onClick={() => set('tp', null)}>
            Tous
          </Chip>
          {TPS.filter((t) => t.id !== 'tp5').map((t) => (
            <Chip key={t.id} active={tp === t.id} onClick={() => set('tp', t.id)}>
              {t.id.toUpperCase()}
            </Chip>
          ))}
        </div>
        <Select className="w-auto" aria-label="Filtrer par compétence" value={comp ?? ''} onChange={(e) => set('comp', e.target.value || null)}>
          <option value="">Toutes les compétences</option>
          {COMPETENCES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id} — {c.court}
            </option>
          ))}
        </Select>
        <Select className="w-auto" aria-label="Filtrer par contexte" value={secteur ?? ''} onChange={(e) => set('secteur', e.target.value || null)}>
          <option value="">Tous les contextes</option>
          {secteurs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Eye} title="Aucun cas ne correspond à ces filtres" />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <li key={c.id}>
              <Link to={`/entrainement/cas/${c.id}`} className="block h-full rounded-lg">
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-1 flex items-center gap-2">
                      <TpBadge tp={c.tp} link={false} />
                      <Badge variant="muted">{c.secteur}</Badge>
                      {best.has(c.id) && (
                        <Badge variant="success" className="ml-auto">
                          <Check className="size-3" aria-hidden /> {pct(best.get(c.id)!)}
                        </Badge>
                      )}
                    </div>
                    <CardTitle as="h3">{c.titre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{c.situation}</p>
                    <p className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden /> {c.minutes} min
                      </span>
                      <span>{c.comps.join(' · ')}</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export function CaseDetail() {
  const { id } = useParams()
  const c = CASES.find((x) => x.id === id)
  if (!c) return <Navigate to="/entrainement/cas" replace />
  return <CaseInner key={c.id} id={c.id} />
}

function CaseInner({ id }: { id: string }) {
  const c = CASES.find((x) => x.id === id)!
  const tp = TP_BY_ID[c.tp]
  useDocumentTitle(c.titre)
  useRememberLocation(`Cas pratique — ${c.titre}`)
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [scores, setScores] = useState<(number | undefined)[]>([])
  const [saved, setSaved] = useState(false)
  const timer = useCountdown(c.minutes * 60)
  const tried = answer.trim().length >= 40

  return (
    <>
      <Link to="/entrainement/cas" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'no-print -ml-2 mb-3')}>
        <ArrowLeft /> Tous les cas
      </Link>
      <PageHeader
        eyebrow={
          <>
            <TpBadge tp={c.tp} />
            {c.comps.map((x) => (
              <CompBadge key={x} comp={x} />
            ))}
            <KindBadge kind="exemple" />
          </>
        }
        title={c.titre}
        description={`${c.secteur} · ${tp.methode} · temps recommandé ${c.minutes} minutes`}
        actions={<FavoriteButton id={`cas:${c.id}`} label={c.titre} />}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,20rem]">
        <div className="min-w-0 space-y-8">
          <Section title="Entreprise fictive">
            <p className="text-[15px] leading-7">{c.entreprise}</p>
          </Section>
          <Section title="Contexte professionnel">
            <p className="text-[15px] leading-7">{c.contexte}</p>
          </Section>
          <Section title="Problématique">
            <p className="rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-[15px] leading-7">{c.situation}</p>
          </Section>
          {c.annexes.map((a, i) => (
            <Section key={i} title={`Annexe ${c.annexes.length > 1 ? i + 1 + ' — ' : '— '}${a.titre}`}>
              <div className="rounded-lg border bg-card p-4">
                <Blocks blocks={a.contenu} />
              </div>
            </Section>
          ))}
          <Section title="Consignes et questions">
            <Bullets items={c.consignes} />
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] font-medium leading-7">
              {c.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </Section>

          {!revealed ? (
            <div className="no-print">
              <label htmlFor="case-answer" className="mb-1.5 block text-sm font-medium">
                Ma réponse (notes structurées, comme sur ta feuille de préparation)
              </label>
              <Textarea id="case-answer" className="min-h-[200px]" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Constat → causes ou incohérences → mesures → justification…" />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button disabled={!tried} onClick={() => { setRevealed(true); timer.pause() }}>
                  <Eye /> Voir la correction
                </Button>
                {!tried && <span className="text-sm text-muted-foreground">Rédige d’abord ta réponse pour afficher la correction.</span>}
              </div>
            </div>
          ) : (
            <>
              <Section title="Réponse attendue" kind="correction">
                <details className="mb-3">
                  <summary className="cursor-pointer text-sm font-medium">Ma réponse</summary>
                  <p className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm leading-6">{answer}</p>
                </details>
                <Bullets items={c.attendu} />
              </Section>
              <Section title="Correction argumentée" kind="correction">
                <p className="text-[15px] leading-7">{c.correction}</p>
              </Section>
              <Section title="Barème indicatif et auto-évaluation" kind={tp.criteresKind === 'officiel' ? 'officiel' : 'a-verifier'}>
                <p className="mb-3 text-sm leading-6 text-muted-foreground">Critères et niveaux de qualité : directive « Travail pratique », annexe 2. L’attribution des points reste ton estimation.</p>
                <SelfEval idPrefix={`cas-${c.id}`} criteres={c.bareme} values={scores} onChange={(v) => { setScores(v); setSaved(false) }} />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button
                    disabled={!evalComplete(scores, c.bareme.length) || saved}
                    onClick={() => {
                      const pts = evalSum(scores)
                      actions.log({ type: 'cas', ref: c.id, label: `Cas — ${c.titre}`, comps: c.comps, tp: c.tp, score: pts / 9, detail: `${pts}/9` })
                      setSaved(true)
                    }}
                  >
                    <Check /> {saved ? 'Résultat enregistré' : 'Enregistrer mon résultat'}
                  </Button>
                  {evalComplete(scores, c.bareme.length) && <span className="text-sm tabular-nums text-muted-foreground">{evalSum(scores)} / 9 points</span>}
                </div>
              </Section>
              <Section title="Variantes pour aller plus loin" kind="exemple">
                <p className="mb-2 text-sm text-muted-foreground">Ce sont les « scénarios alternatifs » que les expert-e-s peuvent poser pendant les trois dernières minutes. Réponds à voix haute.</p>
                <Bullets items={c.variantes} />
              </Section>
            </>
          )}
        </div>

        <aside className="no-print space-y-4">
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle as="h2">Chronomètre</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn('text-4xl font-semibold tabular-nums', timer.remaining <= 60 && timer.running && 'text-destructive')} role="timer" aria-label={`Temps restant ${fmtClock(timer.remaining)}`}>
                {fmtClock(timer.remaining)}
              </p>
              <div className="mt-3 flex gap-2">
                {timer.running ? (
                  <Button variant="outline" size="sm" onClick={timer.pause}>
                    <Pause /> Pause
                  </Button>
                ) : (
                  <Button size="sm" onClick={timer.start} disabled={timer.remaining <= 0}>
                    <Play /> {timer.elapsed > 0 ? 'Reprendre' : 'Démarrer'}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => timer.reset()}>
                  <RotateCcw /> Remettre à zéro
                </Button>
              </div>
              <ol className="mt-4 space-y-1 border-t pt-3 text-xs leading-5 text-muted-foreground">
                {tp.deroulement.map((d, i) => (
                  <li key={i}>
                    <span className="font-medium text-foreground">{d.minutes} min</span> · {d.label}
                  </li>
                ))}
              </ol>
              <div className="mt-4 border-t pt-4">
                <NoteEditor id={`cas:${c.id}`} placeholder="Ce que je retiens de ce cas…" />
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  )
}
