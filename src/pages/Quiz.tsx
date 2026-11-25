import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListChecks, Play } from 'lucide-react'
import type { CompId, QuizQuestion } from '@/types'
import { COMPETENCES, COMP_BY_ID, TPS } from '@/data/referentiel'
import { ALL_QUIZ } from '@/data'
import { actions, useStore } from '@/services/store'
import { fmtDateTime, pct, shuffle } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/input'
import { Chip, KindBadge, PageHeader } from '@/components/shared/bits'
import { QuizRunner } from '@/components/shared/QuizRunner'

export default function Quiz() {
  useDocumentTitle('Quiz')
  useRememberLocation('Quiz')
  const [params, setParams] = useSearchParams()
  const tp = params.get('tp')
  const [comp, setComp] = useState('')
  const [count, setCount] = useState(10)
  const [run, setRun] = useState<{ key: number; questions: QuizQuestion[]; label: string } | null>(null)
  const activity = useStore((s) => s.activity)
  const history = useMemo(() => activity.filter((a) => a.type === 'quiz' && a.ref.startsWith('quiz:')).slice(0, 5), [activity])

  const pool = useMemo(() => ALL_QUIZ.filter((q) => (!tp || COMP_BY_ID[q.comp].tp === tp) && (!comp || q.comp === comp)), [tp, comp])

  const start = () => {
    const questions = shuffle(pool).slice(0, count)
    const label = comp ? `Quiz ${comp}` : tp ? `Quiz ${tp.toUpperCase()}` : 'Quiz général'
    setRun({ key: Date.now(), questions, label })
  }

  return (
    <>
      <PageHeader
        title="Quiz"
        description={`${ALL_QUIZ.length} questions à choix multiple tirées des leçons. Utile pour vérifier les connaissances de base ; l’examen, lui, est oral.`}
        eyebrow={<KindBadge kind="exemple" />}
      />
      {!run ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Composer un quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tâche partielle">
                <Chip active={!tp} onClick={() => { setParams({}, { replace: true }); setComp('') }}>
                  Tout le programme
                </Chip>
                {TPS.filter((t) => t.id !== 'tp5').map((t) => (
                  <Chip key={t.id} active={tp === t.id} onClick={() => { setParams({ tp: t.id }, { replace: true }); setComp('') }}>
                    {t.id.toUpperCase()}
                  </Chip>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Select aria-label="Compétence" value={comp} onChange={(e) => setComp(e.target.value)}>
                  <option value="">Toutes les compétences{tp ? ` du ${tp.toUpperCase()}` : ''}</option>
                  {COMPETENCES.filter((c) => !tp || c.tp === tp).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.court}
                    </option>
                  ))}
                </Select>
                <Select aria-label="Nombre de questions" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                  {[5, 10, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} questions
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={start} disabled={!pool.length}>
                  <Play /> Lancer le quiz
                </Button>
                <span className="text-sm text-muted-foreground">
                  {pool.length} question{pool.length > 1 ? 's' : ''} disponible{pool.length > 1 ? 's' : ''}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Derniers quiz</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length ? (
                <ul className="space-y-2 text-sm">
                  {history.map((h) => (
                    <li key={h.id} className="flex items-center justify-between gap-2">
                      <span className="min-w-0">
                        <span className="block truncate">{h.label}</span>
                        <span className="block text-xs text-muted-foreground">{fmtDateTime(h.date)}</span>
                      </span>
                      <span className="tabular-nums">
                        {h.detail} · {pct(h.score ?? 0)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ListChecks className="size-4" aria-hidden /> Aucun quiz pour l’instant.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {run.label}
              <Button variant="ghost" size="sm" onClick={() => setRun(null)}>
                Quitter
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuizRunner
              key={run.key}
              showComp
              questions={run.questions}
              onFinish={({ correct, total, wrong }) => {
                // Le résultat est attribué à chaque compétence selon ses propres questions.
                const by = new Map<CompId, { ok: number; n: number }>()
                for (const q of run.questions) {
                  const e = by.get(q.comp) ?? { ok: 0, n: 0 }
                  e.n++
                  if (!wrong.includes(q)) e.ok++
                  by.set(q.comp, e)
                }
                actions.log({ type: 'quiz', ref: 'quiz:' + run.key, label: run.label, comps: [], score: correct / total, detail: `${correct}/${total}` })
                for (const [c, e] of by) if (e.n >= 2) actions.log({ type: 'quiz', ref: `quizcomp:${c}`, label: `${run.label} — part ${c}`, comps: [c], tp: COMP_BY_ID[c].tp, score: e.ok / e.n, detail: `${e.ok}/${e.n}` })
              }}
            />
          </CardContent>
        </Card>
      )}
    </>
  )
}
