import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Eye, MessageSquareQuote, RotateCcw } from 'lucide-react'
import { TP_BY_ID } from '@/data/referentiel'
import { ROLEPLAYS } from '@/data'
import { actions, useStore } from '@/services/store'
import { cn, pct } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Blocks, Bullets, Chip, CompBadge, FavoriteButton, KindBadge, PageHeader, TpBadge } from '@/components/shared/bits'

export function RolePlayList() {
  useDocumentTitle('Jeux de rôle')
  useRememberLocation('Jeux de rôle')
  const [params, setParams] = useSearchParams()
  const tp = params.get('tp')
  const activity = useStore((s) => s.activity)
  const list = ROLEPLAYS.filter((r) => !tp || r.tp === tp)
  return (
    <>
      <PageHeader
        title="Jeux de rôle"
        description="Simulations pratiques en plusieurs étapes pour le TP3 (clients et fournisseurs) et le TP4 (technologies numériques). À chaque étape, tu réponds, puis tu compares avec les éléments attendus."
        eyebrow={<KindBadge kind="exemple" />}
      />
      <div className="no-print mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par tâche partielle">
        <Chip active={!tp} onClick={() => setParams({}, { replace: true })}>
          Tous
        </Chip>
        <Chip active={tp === 'tp3'} onClick={() => setParams({ tp: 'tp3' }, { replace: true })}>
          TP3 — Clients et fournisseurs
        </Chip>
        <Chip active={tp === 'tp4'} onClick={() => setParams({ tp: 'tp4' }, { replace: true })}>
          TP4 — Numérique
        </Chip>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => {
          const last = activity.find((a) => a.type === 'role' && a.ref === r.id)
          return (
            <li key={r.id}>
              <Link to={`/entrainement/jeux-de-role/${r.id}`} className="block h-full rounded-lg">
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-1 flex items-center gap-2">
                      <TpBadge tp={r.tp} link={false} />
                      <Badge variant="muted">{r.etapes.length} étapes</Badge>
                      {last?.score !== undefined && (
                        <Badge variant="success" className="ml-auto">
                          <Check className="size-3" aria-hidden /> {pct(last.score)}
                        </Badge>
                      )}
                    </div>
                    <CardTitle as="h3">{r.titre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{r.contexte}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{r.comps.join(' · ')}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export function RolePlayDetail() {
  const { id } = useParams()
  const r = ROLEPLAYS.find((x) => x.id === id)
  if (!r) return <Navigate to="/entrainement/jeux-de-role" replace />
  return <RolePlayInner key={r.id} id={r.id} />
}

const RATING = [
  { v: 0, label: 'Manqué' },
  { v: 1, label: 'Partiel' },
  { v: 2, label: 'Bien' },
  { v: 3, label: 'Complet' },
]

function RolePlayInner({ id }: { id: string }) {
  const r = ROLEPLAYS.find((x) => x.id === id)!
  useDocumentTitle(r.titre)
  useRememberLocation(`Jeu de rôle — ${r.titre}`)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(() => r.etapes.map(() => ''))
  const [shown, setShown] = useState<boolean[]>(() => r.etapes.map(() => false))
  const [ratings, setRatings] = useState<(number | undefined)[]>(() => r.etapes.map(() => undefined))
  const [finished, setFinished] = useState(false)
  const e = r.etapes[step]
  const total = ratings.reduce<number>((a, b) => a + (b ?? 0), 0)
  const max = r.etapes.length * 3

  const restart = () => {
    setStep(0)
    setAnswers(r.etapes.map(() => ''))
    setShown(r.etapes.map(() => false))
    setRatings(r.etapes.map(() => undefined))
    setFinished(false)
  }

  return (
    <>
      <Link to="/entrainement/jeux-de-role" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'no-print -ml-2 mb-3')}>
        <ArrowLeft /> Tous les jeux de rôle
      </Link>
      <PageHeader
        eyebrow={
          <>
            <TpBadge tp={r.tp} />
            {r.comps.map((c) => (
              <CompBadge key={c} comp={c} />
            ))}
            <KindBadge kind="exemple" />
          </>
        }
        title={r.titre}
        description={`${TP_BY_ID[r.tp].methode} · ton rôle : ${r.role}`}
        actions={<FavoriteButton id={`role:${r.id}`} label={r.titre} />}
      />

      <Card className="mb-5">
        <CardContent className="pt-5">
          <h2 className="mb-1 text-sm font-semibold">Contexte</h2>
          <p className="text-[15px] leading-7">{r.contexte}</p>
          {r.annexe && (
            <div className="mt-4 rounded-md border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-semibold">Document à disposition</p>
              <Blocks blocks={r.annexe} />
            </div>
          )}
        </CardContent>
      </Card>

      {!finished ? (
        <Card>
          <CardContent className="pt-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium">
                Étape {step + 1} / {r.etapes.length}
              </span>
              <Progress value={(step + (shown[step] ? 1 : 0)) / r.etapes.length} label="Avancement du jeu de rôle" />
            </div>
            <div className="flex gap-3 rounded-md border bg-muted/40 p-4">
              <MessageSquareQuote className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <p className="text-[15px] leading-7">{e.stimulus}</p>
            </div>
            <p className="mt-4 text-[15px] font-medium leading-7">{e.consigne}</p>

            <label htmlFor="rp-answer" className="sr-only">
              Ta réponse pour l’étape {step + 1}
            </label>
            <Textarea
              id="rp-answer"
              className="mt-3 min-h-[120px]"
              value={answers[step]}
              readOnly={shown[step]}
              onChange={(ev) => setAnswers((a) => a.map((x, i) => (i === step ? ev.target.value : x)))}
              placeholder="Ce que tu dis ou fais, mot pour mot si possible…"
            />

            {!shown[step] ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button disabled={answers[step].trim().length < 15} onClick={() => setShown((s) => s.map((x, i) => (i === step ? true : x)))}>
                  <Eye /> Comparer avec les éléments attendus
                </Button>
                {answers[step].trim().length < 15 && <span className="text-sm text-muted-foreground">Réponds d’abord, même brièvement.</span>}
              </div>
            ) : (
              <div className="mt-5 space-y-4 border-t pt-4">
                <div>
                  <h3 className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                    Éléments attendus <KindBadge kind="correction" />
                  </h3>
                  <Bullets items={e.attendus} />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold">Exemple de formulation</h3>
                  <p className="rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-[15px] leading-7">{e.exemple}</p>
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold">Mon auto-évaluation de cette étape</legend>
                  <div className="flex flex-wrap gap-1.5">
                    {RATING.map((x) => (
                      <Chip key={x.v} active={ratings[step] === x.v} onClick={() => setRatings((rt) => rt.map((y, i) => (i === step ? x.v : y)))}>
                        {x.v} · {x.label}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                <div className="flex justify-between">
                  <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
                    <ArrowLeft /> Étape précédente
                  </Button>
                  {step < r.etapes.length - 1 ? (
                    <Button disabled={ratings[step] === undefined} onClick={() => setStep(step + 1)}>
                      Étape suivante <ArrowRight />
                    </Button>
                  ) : (
                    <Button
                      disabled={ratings.some((x) => x === undefined)}
                      onClick={() => {
                        actions.log({ type: 'role', ref: r.id, label: `Jeu de rôle — ${r.titre}`, comps: r.comps, tp: r.tp, score: total / max, detail: `${total}/${max}` })
                        setFinished(true)
                      }}
                    >
                      <Check /> Terminer et enregistrer
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              Bilan : {total} / {max} points ({pct(total / max)})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm leading-6">
              {r.etapes.map((x, i) => (
                <li key={i} className="flex items-start justify-between gap-3 rounded-md border p-3">
                  <span>
                    <span className="font-medium">Étape {i + 1}.</span> {x.consigne}
                  </span>
                  <Badge variant={(ratings[i] ?? 0) >= 2 ? 'success' : 'warning'}>{ratings[i]} / 3</Badge>
                </li>
              ))}
            </ol>
            <h3 className="mb-2 mt-5 text-sm font-semibold">Questions de relance des expert-e-s</h3>
            <p className="mb-2 text-sm text-muted-foreground">Réponds à voix haute, en 30 à 45 secondes chacune.</p>
            <Bullets items={r.relances} />
            <Button variant="outline" className="mt-5" onClick={restart}>
              <RotateCcw /> Recommencer
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
