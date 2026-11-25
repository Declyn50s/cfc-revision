import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarClock, Layers, Play, Timer } from 'lucide-react'
import { useStore } from '@/services/store'
import { allCompProgress, overallProgress, tpProgress, totalMinutes, weekMinutes } from '@/services/progress'
import { dueCardCount, newCardCount, nextSession, phase } from '@/services/planner'
import { examResult } from '@/services/grading'
import { COMP_BY_ID, TPS, TP_COLOR } from '@/data/referentiel'
import { EXAMS } from '@/data'
import { daysBetween, fmtDate, fmtDateTime, fmtDuration, pct, todayISO } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CompBadge, PageHeader, Stat, TpBadge } from '@/components/shared/bits'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  useDocumentTitle('Tableau de bord')
  const s = useStore((x) => x)
  const navigate = useNavigate()
  const comps = allCompProgress(s)
  const mastered = comps.filter((c) => c.status === 'maitrise')
  const weak = comps.filter((c) => c.status === 'a-retravailler')
  const started = comps.filter((c) => c.started).length
  const session = nextSession(s)
  const due = dueCardCount(s)
  const fresh = newCardCount(s)
  const ph = phase(s)
  const days = s.settings.examDate ? daysBetween(todayISO(), s.settings.examDate) : null
  const recent = s.activity.filter((a) => a.score !== undefined && a.type !== 'examen' && !a.ref.startsWith('quizcomp:')).slice(0, 5)
  const lastExam = s.exams.find((e) => e.scores)
  const overall = overallProgress(s)
  const hasActivity = started > 0 || s.activity.length > 0

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Examen pratique oral — CFC d’employé-e de commerce, Services et administration (article 32)."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate('/entrainement/examens')}>
              <Timer /> Lancer un examen blanc
            </Button>
            <Button onClick={() => navigate(s.last?.path ?? session.items[0]?.path ?? '/apprendre/tp1')}>
              <Play /> {s.last ? 'Reprendre mes révisions' : 'Commencer mes révisions'}
            </Button>
          </>
        }
      />
      {s.last && (
        <p className="-mt-3 mb-6 text-sm text-muted-foreground">
          Dernière page : <Link className="link" to={s.last.path}>{s.last.label}</Link> · {fmtDateTime(s.last.at)}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Prochaine séance recommandée · {session.minutes} min</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="divide-y">
              {session.items.map((it, i) => (
                <li key={i}>
                  <Link to={it.path} className="group flex items-center gap-3 py-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium group-hover:underline">{it.label}</span>
                      <span className="block text-xs text-muted-foreground">{it.raison}</span>
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">{it.minutes} min</span>
                    <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">
              Séance calculée d’après tes résultats réels. Durée réglable dans <Link className="link" to="/programme">Mon programme</Link>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="size-4 text-muted-foreground" aria-hidden /> Examen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {s.settings.examDate && days !== null ? (
              <>
                <p className="text-4xl font-semibold tabular-nums tracking-tight">{days >= 0 ? `J − ${days}` : 'Passé'}</p>
                <p className="mt-1 text-sm text-muted-foreground">{fmtDate(s.settings.examDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="mt-3 text-sm">
                  <Badge>{ph.nom}</Badge>
                </p>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{ph.detail}</p>
              </>
            ) : (
              <>
                <p className="text-sm leading-6 text-muted-foreground">La date de ta session 2027 n’est pas encore renseignée. Indique-la dès réception de la convocation pour activer le compte à rebours.</p>
                <Link to="/parametres" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-3')}>
                  Définir la date
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progression par tâche partielle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex items-center gap-4">
              <div className="w-28 shrink-0">
                <p className="text-3xl font-semibold tabular-nums">{pct(overall)}</p>
                <p className="text-xs text-muted-foreground">Progression générale</p>
              </div>
              <Progress value={overall} label="Progression générale" className="h-2.5" />
            </div>
            <ul className="space-y-3">
              {TPS.map((tp) => {
                const v = tpProgress(s, tp.id)
                return (
                  <li key={tp.id}>
                    <Link to={`/apprendre/${tp.id}`} className="group grid grid-cols-[auto,1fr,auto] items-center gap-3">
                      <TpBadge tp={tp.id} link={false} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm group-hover:underline">{tp.court}</span>
                        <Progress value={v} label={`Progression ${tp.titre}`} barClassName={TP_COLOR[tp.id].bg} className="mt-1.5" />
                      </span>
                      <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">{pct(v)}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            {!hasActivity && <p className="mt-4 text-xs text-muted-foreground">Tout est à 0 % : la progression ne reflète que ton activité réelle dans l’application.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="size-4 text-muted-foreground" aria-hidden /> Flashcards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="À réviser" value={due} hint="arrivées à échéance" />
              <Stat label="Nouvelles" value={fresh} hint="jamais vues" />
            </div>
            <Link to="/entrainement/flashcards" className={cn(buttonVariants({ variant: due ? 'default' : 'outline', size: 'sm' }), 'mt-4')}>
              {due ? 'Réviser maintenant' : 'Ouvrir les flashcards'}
            </Link>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4">
              <Stat label="Temps cumulé" value={fmtDuration(totalMinutes(s))} />
              <Stat label="Cette semaine" value={fmtDuration(weekMinutes(s))} hint={`objectif ${fmtDuration(s.settings.weeklyMinutes)}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compétences à retravailler · {weak.length}</CardTitle>
          </CardHeader>
          <CardContent>
            {weak.length ? (
              <ul className="space-y-2">
                {weak.slice(0, 6).map((c) => (
                  <li key={c.comp} className="flex items-center justify-between gap-2">
                    <CompBadge comp={c.comp} />
                    <span className="text-xs tabular-nums text-muted-foreground">{pct(c.score)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">{hasActivity ? 'Aucune compétence en difficulté pour l’instant.' : 'Elles apparaîtront ici après tes premiers entraînements.'}</p>
            )}
            <Link to="/resultats/points-faibles" className="link mt-3 inline-block text-sm">
              Voir mes points faibles
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Compétences maîtrisées · {mastered.length} / {comps.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mastered.length ? (
              <ul className="flex flex-wrap gap-1.5">
                {mastered.map((c) => (
                  <li key={c.comp}>
                    <Link to={`/apprendre/${COMP_BY_ID[c.comp].tp}/${c.comp}`}>
                      <Badge variant="success">{c.comp}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">Une compétence est maîtrisée lorsque sa leçon, son quiz, ses entraînements et ses flashcards atteignent 75 %.</p>
            )}
            <p className="mt-3 text-sm text-muted-foreground">
              {started} compétence{started > 1 ? 's' : ''} entamée{started > 1 ? 's' : ''} sur {comps.length}.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Derniers entraînements</CardTitle>
          </CardHeader>
          <CardContent>
            {lastExam && (
              <Link to={`/entrainement/examens/resultat/${lastExam.id}`} className="mb-3 block rounded-md border p-3 hover:bg-muted">
                <span className="block text-xs text-muted-foreground">Dernier examen blanc · {EXAMS.find((e) => e.id === lastExam.examId)?.entreprise}</span>
                <span className="mt-0.5 block text-sm font-medium">
                  {examResult(lastExam, s.settings.rounding).points} / 45 points · note indicative {examResult(lastExam, s.settings.rounding).grade.toFixed(1)}
                </span>
              </Link>
            )}
            {recent.length ? (
              <ul className="space-y-2">
                {recent.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">{a.label}</span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">{pct(a.score ?? 0)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              !lastExam && <p className="text-sm leading-6 text-muted-foreground">Aucun entraînement évalué pour l’instant.</p>
            )}
            <Link to="/resultats/historique" className="link mt-3 inline-block text-sm">
              Voir l’historique
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
