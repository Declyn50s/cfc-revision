import { useMemo, useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import type { QuizQuestion } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CompBadge } from './bits'

/** Quiz à choix multiple : une question à la fois, correction immédiate, résultat final. */
export function QuizRunner({
  questions,
  onFinish,
  showComp = false,
}: {
  questions: QuizQuestion[]
  onFinish: (result: { correct: number; total: number; wrong: QuizQuestion[] }) => void
  showComp?: boolean
}) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [done, setDone] = useState(false)
  const q = questions[i]
  const wrong = useMemo(() => questions.filter((_, k) => answers[k] === false), [answers, questions])

  if (!questions.length) return null

  if (done) {
    const correct = answers.filter(Boolean).length
    return (
      <div role="status">
        <p className="text-lg font-semibold">
          Résultat : {correct} / {questions.length}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {correct === questions.length ? 'Tout est juste.' : wrong.length === 1 ? 'Une question à revoir :' : `${wrong.length} questions à revoir :`}
        </p>
        {wrong.length > 0 && (
          <ul className="mt-3 space-y-3">
            {wrong.map((w) => (
              <li key={w.id} className="rounded-md border p-3 text-sm leading-6">
                <p className="font-medium">{w.q}</p>
                <p className="mt-1 text-success">Bonne réponse : {w.choix[w.bonne]}</p>
                <p className="mt-1 text-muted-foreground">{w.explication}</p>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setI(0)
            setPicked(null)
            setAnswers([])
            setDone(false)
          }}
        >
          <RotateCcw /> Recommencer
        </Button>
      </div>
    )
  }

  const validated = picked !== null
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          Question {i + 1} sur {questions.length}
        </span>
        {showComp && <CompBadge comp={q.comp} />}
      </div>
      <fieldset>
        <legend className="text-[15px] font-medium leading-6">{q.q}</legend>
        <div className="mt-3 space-y-2">
          {q.choix.map((c, k) => {
            const isGood = k === q.bonne
            const isPicked = picked === k
            return (
              <button
                key={k}
                type="button"
                disabled={validated}
                onClick={() => {
                  setPicked(k)
                  setAnswers((a) => [...a, k === q.bonne])
                }}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm leading-6',
                  !validated && 'hover:bg-muted',
                  validated && isGood && 'border-success bg-success/10',
                  validated && isPicked && !isGood && 'border-destructive bg-destructive/10',
                  validated && !isGood && !isPicked && 'opacity-60',
                )}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
                  {validated && isGood ? <Check className="size-3 text-success" /> : validated && isPicked ? <X className="size-3 text-destructive" /> : String.fromCharCode(65 + k)}
                </span>
                <span>
                  {c}
                  {validated && isGood && <span className="sr-only"> — bonne réponse</span>}
                  {validated && isPicked && !isGood && <span className="sr-only"> — ta réponse, incorrecte</span>}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>
      {validated && (
        <div className="mt-4" role="status">
          <p className={cn('text-sm font-semibold', picked === q.bonne ? 'text-success' : 'text-destructive')}>{picked === q.bonne ? 'Correct.' : 'Incorrect.'}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{q.explication}</p>
          <Button
            className="mt-3"
            onClick={() => {
              if (i + 1 < questions.length) {
                setI(i + 1)
                setPicked(null)
              } else {
                setDone(true)
                const correct = answers.filter(Boolean).length
                onFinish({ correct, total: questions.length, wrong: questions.filter((_, k) => answers[k] === false) })
              }
            }}
          >
            {i + 1 < questions.length ? 'Question suivante' : 'Voir le résultat'}
          </Button>
        </div>
      )}
    </div>
  )
}
