import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronRight, Eye, Flag, HelpCircle, Pause, Play, Timer, Trash2 } from 'lucide-react'
import type { ExamAttempt, ExamTask, MockExam, TpId } from '@/types'
import { EXAM_FORMAT, TP_BY_ID, TP_COLOR } from '@/data/referentiel'
import { EXAMS } from '@/data'
import { actions, getState, useStore } from '@/services/store'
import { MAX_POINTS, TP_ORDER, examResult, minPointsToPass } from '@/services/grading'
import { useCountdown } from '@/hooks/useTimer'
import { cn, fmtClock, fmtDateTime, uid } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/input'
import { Blocks, Bullets, KindBadge, PageHeader, Section, Stat, TpBadge } from '@/components/shared/bits'
import { SelfEval } from '@/components/shared/SelfEval'

// ───────────── Liste ─────────────

export function ExamList() {
  useDocumentTitle('Examens blancs')
  const exams = useStore((s) => s.exams)
  const rounding = useStore((s) => s.settings.rounding)
  const [toDelete, setToDelete] = useState<string | null>(null)
  const focus = useStore((s) => s.settings.tp4Focus)
  // Les examens dont le TP4 correspond au domaine spécifique choisi dans les paramètres passent en premier.
  const ordered = [...EXAMS].sort((a, b) => Number(b.tp4Domaine === focus) - Number(a.tp4Domaine === focus))

  return (
    <>
      <PageHeader
        title="Examens blancs"
        description={`Simulation complète : ${EXAM_FORMAT.preparationMin} minutes de préparation, puis cinq tâches partielles de ${EXAM_FORMAT.minutesParTache} minutes dans une même entreprise fictive. ${EXAM_FORMAT.pointsMax} points, note ${EXAM_FORMAT.noteMin.toFixed(1)} pour réussir.`}
        eyebrow={<KindBadge kind="exemple" />}
      />
      <div className="mb-6 grid gap-3 rounded-lg border bg-card p-4 text-sm leading-6 sm:grid-cols-2">
        <p>
          <span className="font-semibold">Mode examen.</span> Chronomètre imposé, pas de pause, pas de retour en arrière, aucune aide ni correction avant la fin. Conditions de la série zéro.
        </p>
        <p>
          <span className="font-semibold">Mode entraînement.</span> Pause possible, navigation libre entre les étapes, aide-mémoire de méthode et correction consultable tâche par tâche.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ordered.map((e) => {
          const tries = exams.filter((a) => a.examId === e.id && a.finishedAt)
          const open = exams.find((a) => a.examId === e.id && !a.finishedAt)
          return (
            <li key={e.id}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="muted">{e.secteur}</Badge>
                    <Badge variant={e.tp4Domaine === focus ? 'default' : 'outline'}>TP4 : {e.tp4Domaine === 'contenu' ? 'Développement de contenu' : 'Infrastructure technologique'}</Badge>
                    {tries.length > 0 && <Badge variant="outline">{tries.length} passage{tries.length > 1 ? 's' : ''}</Badge>}
                  </div>
                  <CardTitle as="h2">{e.titre}</CardTitle>
                  <CardDescription>{e.entreprise}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {open && (
                    <Link to={`/entrainement/examens/passer/${e.id}?mode=${open.mode}&reprendre=${open.id}`} className={buttonVariants({ variant: 'default' })}>
                      <Play /> Reprendre ({open.mode})
                    </Link>
                  )}
                  <Link to={`/entrainement/examens/passer/${e.id}?mode=examen`} className={buttonVariants({ variant: open ? 'outline' : 'default' })}>
                    <Timer /> Mode examen
                  </Link>
                  <Link to={`/entrainement/examens/passer/${e.id}?mode=entrainement`} className={buttonVariants({ variant: 'outline' })}>
                    Mode entraînement
                  </Link>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Historique des examens blancs</h2>
      {exams.filter((a) => a.finishedAt).length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun examen blanc terminé pour l’instant.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {['Date', 'Examen', 'Mode', 'Points', 'Note indicative', ''].map((h) => (
                  <th key={h} scope="col" className="px-4 py-2 font-semibold">
                    {h || <span className="sr-only">Actions</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exams
                .filter((a) => a.finishedAt)
                .map((a) => {
                  const r = examResult(a, rounding)
                  return (
                    <tr key={a.id} className="border-t">
                      <td className="px-4 py-2 tabular-nums">{fmtDateTime(a.finishedAt!)}</td>
                      <td className="px-4 py-2">{EXAMS.find((e) => e.id === a.examId)?.entreprise ?? a.examId}</td>
                      <td className="px-4 py-2 capitalize">{a.mode}</td>
                      <td className="px-4 py-2 tabular-nums">{r.evaluated ? `${r.points} / ${MAX_POINTS}` : '—'}</td>
                      <td className="px-4 py-2">
                        {r.evaluated ? <Badge variant={r.passed ? 'success' : 'destructive'}>{r.grade.toFixed(1)}</Badge> : <Badge variant="warning">À évaluer</Badge>}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link to={`/entrainement/examens/resultat/${a.id}`} className="link mr-3">
                          {r.evaluated ? 'Voir' : 'Corriger'}
                        </Link>
                        <button type="button" className="rounded p-1 text-muted-foreground hover:bg-muted" aria-label="Supprimer ce passage" onClick={() => setToDelete(a.id)}>
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)} title="Supprimer ce passage ?" description="Les réponses et l’évaluation de cet examen blanc seront supprimées." confirmLabel="Supprimer" onConfirm={() => toDelete && actions.deleteExam(toDelete)} />
    </>
  )
}

// ───────────── Passage ─────────────

const STEPS = ['Préparation', 'TP1', 'TP2', 'TP3', 'TP4', 'TP5']
const stepSeconds = (i: number) => (i === 0 ? EXAM_FORMAT.preparationMin : EXAM_FORMAT.minutesParTache) * 60

export function ExamRun() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const exam = EXAMS.find((e) => e.id === id)
  const mode = params.get('mode') === 'entrainement' ? 'entrainement' : 'examen'
  const resumeId = params.get('reprendre')
  if (!exam) return <Navigate to="/entrainement/examens" replace />
  return <ExamRunner key={exam.id + mode + (resumeId ?? '')} exam={exam} mode={mode} resumeId={resumeId} />
}

function ExamRunner({ exam, mode, resumeId }: { exam: MockExam; mode: ExamAttempt['mode']; resumeId: string | null }) {
  useDocumentTitle(`${mode === 'examen' ? 'Examen' : 'Entraînement'} — ${exam.entreprise}`)
  const navigate = useNavigate()
  const isExam = mode === 'examen'
  const initial = useMemo<ExamAttempt>(() => {
    const prev = resumeId ? getState().exams.find((a) => a.id === resumeId && !a.finishedAt) : undefined
    return (
      prev ?? {
        id: uid(),
        examId: exam.id,
        mode,
        startedAt: new Date().toISOString(),
        answers: { tp1: '', tp2: '', tp3: '', tp4: '', tp5: '' },
        notes: '',
        timeUsedSec: {},
        step: 0,
      }
    )
  }, [exam.id, mode, resumeId])
  const [started, setStarted] = useState(!!resumeId && initial.id === resumeId)
  const [attempt, setAttempt] = useState(initial)
  const [step, setStep] = useState(initial.step ?? 0)
  const [confirmEnd, setConfirmEnd] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showFix, setShowFix] = useState(false)
  const attemptRef = useRef(attempt)
  attemptRef.current = attempt
  const headingRef = useRef<HTMLHeadingElement>(null)

  const finish = () => {
    const a = { ...attemptRef.current, finishedAt: new Date().toISOString(), step: undefined }
    actions.saveExam(a)
    navigate(`/entrainement/examens/resultat/${a.id}`, { replace: true })
  }

  const goto = (n: number) => {
    if (n > 5) return finish()
    setStep(n)
    setShowHelp(false)
    setShowFix(false)
    timer.reset(stepSeconds(n), true)
  }

  const timer = useCountdown(stepSeconds(step), {
    autoStart: !!resumeId && initial.id === resumeId,
    onEnd: () => {
      if (isExam) goto(step + 1)
    },
  })

  // Sauvegarde continue : un examen interrompu peut être repris à l'étape en cours.
  useEffect(() => {
    if (started) actions.saveExam({ ...attempt, step })
  }, [attempt, step, started])

  useEffect(() => {
    headingRef.current?.focus()
  }, [step, started])

  // Avertit avant de quitter la page pendant un examen.
  useEffect(() => {
    if (!started) return
    const h = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [started])

  if (!started) {
    return (
      <>
        <Link to="/entrainement/examens" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 mb-3')}>
          <ArrowLeft /> Examens blancs
        </Link>
        <PageHeader title={exam.titre} description={`${exam.entreprise} · ${exam.secteur}`} eyebrow={<Badge>{isExam ? 'Mode examen' : 'Mode entraînement'}</Badge>} />
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Avant de commencer</CardTitle>
          </CardHeader>
          <CardContent>
            <Bullets
              items={
                isExam
                  ? [
                      'Durée totale : 65 minutes sans interruption (15 de préparation, puis 5 × 10).',
                      'Chaque étape se termine automatiquement à la fin du temps. Pas de retour en arrière.',
                      'Aucune aide ni correction pendant l’épreuve.',
                      'Prépare de quoi écrire et une calculatrice, les deux moyens auxiliaires prévus par la directive. Tes notes de préparation restent utilisables pendant l’examen. Parle à voix haute et note ici l’essentiel de ce que tu dis.',
                      'Les questions complémentaires ou scénarios alternatifs s’affichent pour la dernière étape de chaque tâche.',
                    ]
                  : [
                      'Le chronomètre est indicatif : tu peux le mettre en pause et naviguer librement entre les étapes.',
                      'Un aide-mémoire de méthode et la correction sont consultables pour chaque tâche.',
                      'Tes réponses sont enregistrées, tu pourras t’auto-évaluer à la fin.',
                    ]
              }
            />
            <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
              <KindBadge kind="officiel" className="mt-0.5 shrink-0" />
              <span>Durées, déroulement, moyens auxiliaires et critères : directive « Travail pratique » (CIFC Suisse, 10.10.2025) et guide CIFC 2026.</span>
            </p>
            <Button
              size="lg"
              className="mt-5"
              onClick={() => {
                setStarted(true)
                timer.reset(stepSeconds(step), true)
              }}
            >
              <Play /> Démarrer les 15 minutes de préparation
            </Button>
          </CardContent>
        </Card>
      </>
    )
  }

  const task: ExamTask | undefined = step > 0 ? exam.taches[step - 1] : undefined
  const tp = task ? TP_BY_ID[task.tp] : undefined
  const elapsed = stepSeconds(step) - timer.remaining
  // Sous-phases d'une tâche (série zéro) : analyse, présentation, questions complémentaires.
  let acc = 0
  const sub = tp
    ? tp.deroulement.map((d) => {
        const from = acc
        acc += d.minutes * 60
        return { ...d, from, to: acc }
      })
    : []
  const subIdx = sub.findIndex((x) => elapsed < x.to)
  const inQuestions = !!tp && (subIdx === sub.length - 1 || subIdx === -1)
  const low = timer.remaining <= 60

  return (
    <div className="-mt-2">
      <div className="no-print sticky top-14 z-10 -mx-4 mb-6 border-b bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <ol className="flex items-center gap-1 text-xs font-medium" aria-label="Étapes de l’examen">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3 text-muted-foreground" aria-hidden />}
                {isExam ? (
                  <span aria-current={i === step ? 'step' : undefined} className={cn('rounded px-1.5 py-0.5', i === step ? 'bg-primary text-primary-foreground' : i < step ? 'text-muted-foreground line-through' : 'text-muted-foreground')}>
                    {label}
                  </span>
                ) : (
                  <button type="button" aria-current={i === step ? 'step' : undefined} onClick={() => goto(i)} className={cn('rounded px-1.5 py-0.5', i === step ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted')}>
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ol>
          <div className="ml-auto flex items-center gap-3">
            {tp && subIdx >= 0 && (
              <span className="hidden text-xs text-muted-foreground sm:block" aria-live="polite">
                {sub[subIdx].label}
              </span>
            )}
            <span role="timer" aria-label={`Temps restant ${fmtClock(timer.remaining)}`} className={cn('rounded-md border px-2.5 py-1 text-xl font-semibold tabular-nums', low && 'border-destructive text-destructive')}>
              {fmtClock(timer.remaining)}
            </span>
            {!isExam &&
              (timer.running ? (
                <Button variant="outline" size="sm" onClick={timer.pause}>
                  <Pause /> Pause
                </Button>
              ) : (
                <Button size="sm" onClick={timer.start} disabled={timer.remaining <= 0}>
                  <Play /> Reprendre
                </Button>
              ))}
          </div>
        </div>
        {low && timer.running && (
          <p className="sr-only" role="alert">
            Moins d’une minute.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,20rem]">
        <div className="min-w-0">
          {step === 0 ? (
            <>
              <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
                Préparation — cas « {exam.entreprise} »
              </h1>
              <p className="mt-1.5 text-[15px] text-muted-foreground">Lis le cas, repère l’organisation, les interfaces et ton rôle. Prends des notes : tu les garderas pendant les cinq tâches.</p>
              <div className="mt-6 space-y-6">
                <Section title="Situation initiale">
                  <Blocks blocks={exam.situationInitiale} />
                </Section>
                <Section title="Ton rôle et tes tâches">
                  <p className="text-[15px] leading-7">{exam.role}</p>
                </Section>
              </div>
            </>
          ) : (
            task &&
            tp && (
              <>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <TpBadge tp={task.tp} link={false} />
                  <span className="text-sm text-muted-foreground">
                    {tp.methode} · {tp.points} points
                  </span>
                </div>
                <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
                  {task.titre}
                </h1>
                <div className="mt-5 space-y-6">
                  <Section title="Contexte">
                    <p className="text-[15px] leading-7">{task.contexte}</p>
                  </Section>
                  {task.annexe && (
                    <Section title={`Annexe — ${task.annexe.titre}`}>
                      <div className="rounded-lg border bg-card p-4">
                        <Blocks blocks={task.annexe.contenu} />
                      </div>
                    </Section>
                  )}
                  <Section title="Tâche">
                    <ol className="space-y-2">
                      {task.taches.map((t, i) => (
                        <li key={i} className={cn('flex gap-3 rounded-md border-l-4 bg-muted/40 px-3 py-2 text-[15px] leading-7', TP_COLOR[task.tp].border)}>
                          <span className="w-12 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{tp.deroulement[i]?.minutes ?? 3} min</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  {(inQuestions || !isExam) && (
                    <Section title="Questions complémentaires des expert-e-s">
                      {!isExam && !inQuestions && <p className="mb-2 text-sm text-muted-foreground">En mode examen, elles n’apparaissent que pour la dernière étape.</p>}
                      <Bullets items={task.complementaires} />
                    </Section>
                  )}

                  <div>
                    <label htmlFor="exam-answer" className="mb-1.5 block text-sm font-medium">
                      Ma réponse au {task.tp.toUpperCase()} (l’essentiel de ce que je dis aux expert-e-s)
                    </label>
                    <Textarea
                      id="exam-answer"
                      className="min-h-[220px]"
                      value={attempt.answers[task.tp]}
                      onChange={(e) => setAttempt((a) => ({ ...a, answers: { ...a.answers, [task.tp]: e.target.value } }))}
                      placeholder="Mots-clés et structure de ta présentation, puis tes réponses aux questions complémentaires…"
                    />
                  </div>

                  {!isExam && (
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowHelp((v) => !v)} aria-expanded={showHelp}>
                        <HelpCircle /> Aide-mémoire de méthode
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowFix((v) => !v)} aria-expanded={showFix}>
                        <Eye /> {showFix ? 'Masquer la correction' : 'Voir la correction'}
                      </Button>
                    </div>
                  )}
                  {showHelp && (
                    <div className="rounded-md border bg-accent/30 p-4">
                      <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        Méthode {task.tp.toUpperCase()} <KindBadge kind="pedagogique" />
                      </p>
                      <Bullets items={tp.conseils} className="text-sm" />
                    </div>
                  )}
                  {showFix && <TaskCorrection task={task} />}
                </div>
              </>
            )
          )}

          <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
            <Button variant="ghost" onClick={() => setConfirmEnd(true)}>
              <Flag /> Terminer l’examen
            </Button>
            <Button onClick={() => goto(step + 1)}>
              {step === 0 ? 'Commencer le TP1' : step < 5 ? `Passer au TP${step + 1}` : 'Terminer et corriger'} <ArrowRight />
            </Button>
          </div>
          {isExam && step > 0 && step < 5 && (
            <p className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              <AlertTriangle className="size-3.5" aria-hidden /> Pas de retour en arrière en mode examen.
            </p>
          )}
        </div>

        <aside className="no-print">
          <div className="lg:sticky lg:top-36">
            <label htmlFor="exam-notes" className="mb-1.5 block text-sm font-medium">
              Bloc-notes (conservé pendant tout l’examen)
            </label>
            <Textarea id="exam-notes" className="min-h-[280px] font-mono text-[13px]" value={attempt.notes} onChange={(e) => setAttempt((a) => ({ ...a, notes: e.target.value }))} placeholder="Organigramme, interfaces, mots-clés…" />
            {step > 0 && (
              <details className="mt-4 rounded-md border bg-card px-3 py-2">
                <summary className="cursor-pointer text-sm font-medium">Relire le cas</summary>
                <div className="mt-3 max-h-80 overflow-y-auto text-sm">
                  <Blocks blocks={exam.situationInitiale} />
                  <p className="mt-3 leading-6">
                    <span className="font-semibold">Ton rôle.</span> {exam.role}
                  </p>
                </div>
              </details>
            )}
          </div>
        </aside>
      </div>

      <ConfirmDialog open={confirmEnd} onOpenChange={setConfirmEnd} title="Terminer l’examen maintenant ?" description="Les tâches non traitées resteront vides. Tu passeras directement à la correction." confirmLabel="Terminer" onConfirm={finish} />
    </div>
  )
}

function TaskCorrection({ task }: { task: ExamTask }) {
  return (
    <div className="space-y-4 rounded-md border bg-card p-4">
      <div>
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
          Éléments attendus <KindBadge kind="correction" />
        </p>
        <Bullets items={task.attendus} className="text-sm" />
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold">Justification</p>
        <p className="text-sm leading-6">{task.justification}</p>
      </div>
    </div>
  )
}

// ───────────── Résultat et correction ─────────────

export function ExamResult() {
  const { id } = useParams()
  const attempt = useStore((s) => s.exams.find((a) => a.id === id))
  const rounding = useStore((s) => s.settings.rounding)
  const exam = EXAMS.find((e) => e.id === attempt?.examId)
  useDocumentTitle('Résultat de l’examen blanc')
  const [scores, setScores] = useState<Record<TpId, (number | undefined)[]>>(() => {
    const base = { tp1: [], tp2: [], tp3: [], tp4: [], tp5: [] } as Record<TpId, (number | undefined)[]>
    if (attempt?.scores) for (const tp of TP_ORDER) base[tp] = [...attempt.scores[tp]]
    return base
  })
  if (!attempt || !exam) return <Navigate to="/entrainement/examens" replace />

  const complete = TP_ORDER.every((tp) => scores[tp].length >= 3 && scores[tp].slice(0, 3).every((v) => v !== undefined))
  const r = examResult(attempt, rounding)
  const dirty = complete && JSON.stringify(attempt.scores ?? null) !== JSON.stringify(scores)
  const passAt = minPointsToPass(rounding)

  const save = () => {
    const clean = Object.fromEntries(TP_ORDER.map((tp) => [tp, scores[tp].map((v) => v ?? 0)])) as Record<TpId, number[]>
    const first = !attempt.scores
    const next = { ...attempt, scores: clean }
    actions.saveExam(next)
    if (first) {
      const res = examResult(next, rounding)
      actions.log({ type: 'examen', ref: attempt.id, label: `Examen blanc — ${exam.entreprise}`, comps: [], score: res.points / MAX_POINTS, detail: `${res.points}/45 · note ${res.grade.toFixed(1)} · ${attempt.mode}` })
      for (const t of res.perTp) actions.log({ type: 'examen', ref: `examtp:${attempt.id}:${t.tp}`, label: `Examen blanc ${t.tp.toUpperCase()}`, comps: [], tp: t.tp, score: t.points / 9, detail: `${t.points}/9` })
    }
  }

  return (
    <>
      <Link to="/entrainement/examens" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'no-print -ml-2 mb-3')}>
        <ArrowLeft /> Examens blancs
      </Link>
      <PageHeader
        title={`Résultat — ${exam.entreprise}`}
        description={`${attempt.mode === 'examen' ? 'Mode examen' : 'Mode entraînement'} · terminé le ${attempt.finishedAt ? fmtDateTime(attempt.finishedAt) : '—'}`}
        eyebrow={<KindBadge kind="correction" />}
      />

      {r.evaluated ? (
        <Card className="mb-8">
          <CardContent className="pt-5">
            <div className="grid gap-6 sm:grid-cols-4">
              <Stat label="Points obtenus" value={`${r.points} / ${MAX_POINTS}`} hint={`${r.lost} point${r.lost > 1 ? 's' : ''} perdu${r.lost > 1 ? 's' : ''}`} />
              <Stat label="Note calculée" value={r.grade.toFixed(1)} hint={`valeur exacte ${r.raw.toFixed(2)}`} />
              <div>
                <p className="text-sm text-muted-foreground">Résultat indicatif</p>
                <p className="mt-1.5">
                  <Badge variant={r.passed ? 'success' : 'destructive'} className="text-sm">
                    {r.passed ? 'Seuil de 4,0 atteint' : 'Sous le seuil de 4,0'}
                  </Badge>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">4,0 dès {passAt} points sur 45</p>
              </div>
              <div className="text-xs leading-5 text-muted-foreground">
                <p className="font-medium text-foreground">Estimation pédagogique</p>
                Basée sur ton auto-évaluation avec la grille officielle. La vraie note est attribuée par au moins deux expert-e-s.
              </div>
            </div>
            <ul className="mt-5 grid gap-2 border-t pt-4 sm:grid-cols-5">
              {r.perTp.map((t) => (
                <li key={t.tp} className="rounded-md border p-3">
                  <TpBadge tp={t.tp} />
                  <p className="mt-2 text-xl font-semibold tabular-nums">
                    {t.points} <span className="text-sm font-normal text-muted-foreground">/ 9</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Formule du guide CIFC (p. 31) : {EXAM_FORMAT.formule}, arrondie à la demi-note ou à la note entière supérieure.
            </p>
            {r.perTp.some((t) => t.points < 6) && (
              <div className="mt-4 border-t pt-4">
                <h2 className="mb-2 text-sm font-semibold">Recommandations de révision</h2>
                <ul className="space-y-1.5 text-sm leading-6">
                  {r.perTp
                    .filter((t) => t.points < 6)
                    .sort((a, b) => a.points - b.points)
                    .map((t) => (
                      <li key={t.tp}>
                        <span className="font-medium">{t.tp.toUpperCase()}</span> ({t.points}/9) :{' '}
                        <Link className="link" to={`/apprendre/${t.tp}`}>
                          revoir le cours
                        </Link>
                        {t.tp !== 'tp5' && (
                          <>
                            ,{' '}
                            <Link className="link" to={`/entrainement/cas?tp=${t.tp}`}>
                              refaire un cas pratique
                            </Link>
                          </>
                        )}{' '}
                        et{' '}
                        <Link className="link" to={`/entrainement/questions?tp=${t.tp}`}>
                          s’entraîner à l’oral
                        </Link>
                        .
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <p className="mb-8 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-sm leading-6">
          Compare chaque réponse avec la correction, puis attribue-toi les points critère par critère avec la grille officielle (0 à 3 points). La note s’affiche une fois les cinq tâches évaluées.
        </p>
      )}

      <div className="space-y-10">
        {exam.taches.map((task) => {
          const tp = TP_BY_ID[task.tp]
          return (
            <section key={task.tp} aria-labelledby={`res-${task.tp}`}>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <TpBadge tp={task.tp} />
                <h2 id={`res-${task.tp}`} className="text-lg font-semibold">
                  {task.titre}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-sm font-semibold">Ma réponse</p>
                  <p className={cn('min-h-24 whitespace-pre-wrap rounded-md border bg-card p-3 text-sm leading-6', !attempt.answers[task.tp] && 'italic text-muted-foreground')}>{attempt.answers[task.tp] || 'Aucune réponse saisie.'}</p>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium">Revoir l’énoncé et les questions complémentaires</summary>
                    <div className="mt-2 space-y-2 text-sm leading-6">
                      <p>{task.contexte}</p>
                      <Bullets items={task.taches} className="text-sm" />
                      <p className="font-medium">Questions complémentaires</p>
                      <Bullets items={task.complementaires} className="text-sm" />
                    </div>
                  </details>
                </div>
                <TaskCorrection task={task} />
              </div>
              <div className="mt-4">
                <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  Auto-évaluation <KindBadge kind={tp.criteresKind} />
                </p>
                <SelfEval idPrefix={`ex-${task.tp}`} criteres={tp.criteres} values={scores[task.tp]} onChange={(v) => setScores((s) => ({ ...s, [task.tp]: v }))} />
              </div>
            </section>
          )
        })}
      </div>

      {attempt.notes && (
        <details className="mt-8 rounded-lg border bg-card px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium">Mon bloc-notes</summary>
          <p className="mt-2 whitespace-pre-wrap font-mono text-[13px] leading-6">{attempt.notes}</p>
        </details>
      )}

      <div className="no-print sticky bottom-0 -mx-4 mt-8 flex flex-wrap items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Button onClick={save} disabled={!complete || (!dirty && r.evaluated)}>
          <Check /> {r.evaluated && !dirty ? 'Évaluation enregistrée' : 'Enregistrer l’évaluation et calculer la note'}
        </Button>
        {!complete && <span className="text-sm text-muted-foreground">Évalue les trois critères de chaque tâche partielle.</span>}
      </div>
    </>
  )
}
