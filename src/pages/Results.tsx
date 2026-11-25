import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BarChart3, History as HistoryIcon, Target } from 'lucide-react'
import type { ActivityLog } from '@/types'
import { COMP_BY_ID, DOMAINS, TPS, TP_COLOR, compsOfTp } from '@/data/referentiel'
import { useStore } from '@/services/store'
import { compProgress, examTpAverages, overallProgress, starComplete, tpProgress, totalMinutes, weakPoints } from '@/services/progress'
import { examResult, minPointsToPass } from '@/services/grading'
import { addDays, fmtDate, fmtDateTime, fmtDuration, pct, todayISO } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { CompBadge, EmptyState, PageHeader, STATUS_LABEL, Stat, TpBadge } from '@/components/shared/bits'
import { cn } from '@/lib/utils'

const tooltipStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12, color: 'hsl(var(--foreground))' }
const tick = { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }

export function Progression() {
  useDocumentTitle('Progression')
  const s = useStore((x) => x)
  const today = todayISO()
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(today, i - 13)).map((d) => ({ d, label: fmtDate(d, { day: '2-digit', month: '2-digit' }), minutes: Math.round(s.minutes[d] ?? 0) })), [s.minutes, today])
  const exams = s.exams.filter((e) => e.scores && e.finishedAt).slice().reverse().map((e, i) => ({ n: `n° ${i + 1}`, points: examResult(e, s.settings.rounding).points, date: fmtDate(e.finishedAt!.slice(0, 10)) }))
  const hasMinutes = days.some((d) => d.minutes > 0)
  const lessonsDone = Object.values(s.lessons).filter((l) => l?.done).length
  const evaluated = s.activity.filter((a) => a.score !== undefined && !a.ref.startsWith('quizcomp:') && !a.ref.startsWith('examtp:'))

  return (
    <>
      <PageHeader title="Progression" description="Tout ce qui s’affiche ici est calculé à partir de ton activité réelle dans l’application. Rien n’est estimé ni prérempli." />
      <Card>
        <CardContent className="grid gap-6 pt-5 sm:grid-cols-4">
          <Stat label="Progression générale" value={pct(overallProgress(s))} />
          <Stat label="Leçons terminées" value={`${lessonsDone} / 23`} />
          <Stat label="Entraînements évalués" value={evaluated.length} />
          <Stat label="Temps de révision cumulé" value={fmtDuration(totalMinutes(s))} />
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Temps de révision · 14 derniers jours</CardTitle>
            <CardDescription>Minutes actives sur les pages d’apprentissage et d’entraînement.</CardDescription>
          </CardHeader>
          <CardContent>
            {hasMinutes ? (
              <>
                <div className="h-56" aria-hidden>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={days} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={1} />
                      <YAxis tick={tick} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--muted))' }} formatter={(v: number) => [`${v} min`, 'Révision']} />
                      <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} maxBarSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <table className="sr-only">
                  <caption>Minutes de révision par jour</caption>
                  <tbody>
                    {days.map((d) => (
                      <tr key={d.d}>
                        <th scope="row">{d.label}</th>
                        <td>{d.minutes} minutes</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">Aucune minute de révision enregistrée sur cette période.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Examens blancs · points sur 45</CardTitle>
            <CardDescription>La ligne pointillée marque le seuil de la note 4,0 ({minPointsToPass(s.settings.rounding)} points sur 45).</CardDescription>
          </CardHeader>
          <CardContent>
            {exams.length ? (
              <>
                <div className="h-56" aria-hidden>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={exams} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="n" tick={tick} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 45]} ticks={[0, 9, 18, 27, 36, 45]} tick={tick} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} / 45`, 'Points']} labelFormatter={(l, p) => `${l} · ${p?.[0]?.payload?.date ?? ''}`} />
                      <ReferenceLine y={minPointsToPass(s.settings.rounding)} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" />
                      <Line type="monotone" dataKey="points" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <table className="sr-only">
                  <caption>Points par examen blanc</caption>
                  <tbody>
                    {exams.map((e) => (
                      <tr key={e.n}>
                        <th scope="row">
                          {e.n} ({e.date})
                        </th>
                        <td>{e.points} points sur 45</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Aucun examen blanc évalué.{' '}
                <Link to="/entrainement/examens" className="link">
                  En lancer un
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Par tâche partielle et par compétence</h2>
      <div className="space-y-4">
        {TPS.map((tp) => {
          const v = tpProgress(s, tp.id)
          const comps = tp.id === 'tp5' ? [] : compsOfTp(tp.id)
          return (
            <Card key={tp.id}>
              <CardHeader>
                <CardTitle as="h3" className="flex items-center gap-3">
                  <TpBadge tp={tp.id} />
                  <span className="min-w-0 flex-1 truncate">{tp.court}</span>
                  <span className="tabular-nums">{pct(v)}</span>
                </CardTitle>
                <Progress value={v} label={`Progression ${tp.titre}`} barClassName={TP_COLOR[tp.id].bg} className="mt-2" />
              </CardHeader>
              <CardContent>
                {tp.id === 'tp5' ? (
                  <p className="text-sm text-muted-foreground">
                    {s.star.filter(starComplete).length} exemple(s) STAR complet(s) sur {s.star.length} ·{' '}
                    <Link to="/apprendre/tp5" className="link">
                      Ouvrir l’espace TP5
                    </Link>
                  </p>
                ) : (
                  <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                    {comps.map((c) => {
                      const p = compProgress(s, c.id)
                      return (
                        <li key={c.id}>
                          <Link to={`/apprendre/${c.tp}/${c.id}`} className="group grid grid-cols-[1fr,auto,2.5rem] items-center gap-2 text-sm">
                            <span className="truncate group-hover:underline">
                              <span className="font-medium">{c.id}</span> — {c.court}
                            </span>
                            <Badge variant={STATUS_LABEL[p.status].variant}>{STATUS_LABEL[p.status].label}</Badge>
                            <span className="text-right text-xs tabular-nums text-muted-foreground">{pct(p.score)}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Calcul par compétence : 25 % leçon, 20 % mini-quiz, 35 % moyenne des cinq derniers entraînements évalués, 20 % flashcards consolidées. {DOMAINS.length} domaines, 23 compétences.
      </p>
    </>
  )
}

const TYPE_LABEL: Record<ActivityLog['type'], string> = { lecon: 'Leçon', quiz: 'Quiz', question: 'Question orale', cas: 'Cas pratique', role: 'Jeu de rôle', flashcards: 'Flashcards', examen: 'Examen blanc' }

export function Historique() {
  useDocumentTitle('Historique')
  const activity = useStore((s) => s.activity)
  const [type, setType] = useState('')
  const list = activity.filter((a) => !a.ref.startsWith('quizcomp:') && !a.ref.startsWith('examtp:') && (!type || a.type === type))
  const byDay = useMemo(() => {
    const m = new Map<string, ActivityLog[]>()
    for (const a of list) {
      const d = todayISO(new Date(a.date))
      m.set(d, [...(m.get(d) ?? []), a])
    }
    return [...m.entries()]
  }, [list])

  return (
    <>
      <PageHeader
        title="Historique"
        description="Le journal de tes activités : leçons terminées, quiz, questions, cas, jeux de rôle, flashcards et examens blancs."
        actions={
          <Select className="w-auto" aria-label="Filtrer par type d’activité" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Toutes les activités</option>
            {Object.entries(TYPE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        }
      />
      {byDay.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="Aucune activité enregistrée">
          Ton historique se remplira au fil de tes révisions.
        </EmptyState>
      ) : (
        byDay.map(([d, items]) => (
          <section key={d} className="mb-6" aria-label={fmtDate(d)}>
            <h2 className="mb-2 text-sm font-semibold capitalize text-muted-foreground">{fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
            <ul className="divide-y rounded-lg border bg-card">
              {items.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-sm">
                  <span className="w-12 tabular-nums text-muted-foreground">{fmtDateTime(a.date).slice(-5)}</span>
                  <Badge variant="muted">{TYPE_LABEL[a.type]}</Badge>
                  <span className="min-w-0 flex-1 truncate">{a.label}</span>
                  {a.detail && <span className="text-xs text-muted-foreground">{a.detail}</span>}
                  {a.score !== undefined && <Badge variant={a.score >= 0.67 ? 'success' : a.score >= 0.45 ? 'default' : 'warning'}>{pct(a.score)}</Badge>}
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  )
}

export function PointsFaibles() {
  useDocumentTitle('Points faibles')
  const s = useStore((x) => x)
  const weak = weakPoints(s)
  const examAvg = examTpAverages(s).filter((t) => t.avg !== null)
  const weakTps = examAvg.filter((t) => (t.avg ?? 9) < 6)
  const untouched = TPS.filter((t) => t.id !== 'tp5').flatMap((t) => compsOfTp(t.id)).filter((c) => !compProgress(s, c.id).started)

  return (
    <>
      <PageHeader title="Points faibles" description="Les compétences et tâches partielles où tes résultats réels sont insuffisants, avec l’action la plus utile pour chacune." />
      {weak.length === 0 && weakTps.length === 0 ? (
        <EmptyState icon={Target} title="Aucun point faible détecté">
          {s.activity.length ? 'Tes résultats enregistrés sont satisfaisants. Continue avec un examen blanc pour confirmer.' : 'Les points faibles apparaissent après tes premiers quiz, questions orales ou cas pratiques.'}
        </EmptyState>
      ) : (
        <>
          {weakTps.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tâches partielles sous 6 points sur 9 en examen blanc</CardTitle>
                <CardDescription>Moyenne sur {examAvg[0]?.n} examen{(examAvg[0]?.n ?? 0) > 1 ? 's' : ''} blanc{(examAvg[0]?.n ?? 0) > 1 ? 's' : ''} évalué{(examAvg[0]?.n ?? 0) > 1 ? 's' : ''}.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {weakTps.map((t) => (
                    <li key={t.tp} className="flex flex-wrap items-center gap-3 text-sm">
                      <TpBadge tp={t.tp} />
                      <span className="tabular-nums">{t.avg!.toFixed(1)} / 9</span>
                      <Link to={`/entrainement/cas?tp=${t.tp}`} className="link ml-auto">
                        S’entraîner
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          <ul className="space-y-3">
            {weak.map((w) => {
              const c = COMP_BY_ID[w.comp]
              return (
                <li key={w.comp}>
                  <Card>
                    <CardContent className="flex flex-wrap items-start gap-4 pt-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <TpBadge tp={c.tp} />
                          <CompBadge comp={w.comp} />
                          <span className="text-sm tabular-nums text-muted-foreground">{pct(w.score)}</span>
                        </div>
                        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm leading-6 text-muted-foreground">
                          {w.raisons.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/apprendre/${c.tp}/${c.id}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                          Revoir la leçon
                        </Link>
                        <Link to={`/entrainement/questions?comp=${c.id}`} className={buttonVariants({ size: 'sm' })}>
                          Questions orales
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ul>
        </>
      )}
      {untouched.length > 0 && (
        <section className="mt-10" aria-labelledby="untouched">
          <h2 id="untouched" className="mb-1 text-lg font-semibold">
            Compétences pas encore abordées · {untouched.length}
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">Ce ne sont pas des points faibles, mais des zones encore inconnues.</p>
          <ul className="flex flex-wrap gap-1.5">
            {untouched.map((c) => (
              <li key={c.id}>
                <CompBadge comp={c.id} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
