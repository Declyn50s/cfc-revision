import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Eye, Keyboard, Mic, MicOff, Play, Shuffle, Square } from 'lucide-react'
import type { Level, OralQuestion, TpId } from '@/types'
import { COMPETENCES, LEVEL_LABEL, TPS, TP_BY_ID, isCompId, isTpId } from '@/data/referentiel'
import { LESSON_BY_COMP, QUESTIONS } from '@/data'
import { actions, useStore } from '@/services/store'
import { coach, type AnswerAnalysis } from '@/services/coach'
import { useStopwatch } from '@/hooks/useTimer'
import { cn, fmtClock, norm } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Bullets, Chip, CompBadge, EmptyState, FavoriteButton, KindBadge, PageHeader, TpBadge } from '@/components/shared/bits'
import { SelfEval, evalComplete, evalSum } from '@/components/shared/SelfEval'

export default function Questions() {
  useDocumentTitle('Questions orales')
  useRememberLocation('Questions orales')
  const [params, setParams] = useSearchParams()
  const tp = params.get('tp')
  const comp = params.get('comp')
  const level = params.get('niveau')
  const qid = params.get('q')
  const [text, setText] = useState('')
  const activity = useStore((s) => s.activity)
  const doneIds = useMemo(() => new Set(activity.filter((a) => a.type === 'question').map((a) => a.ref)), [activity])

  const list = useMemo(() => {
    const t = norm(text)
    return QUESTIONS.filter(
      (q) =>
        (!tp || q.tp === tp) &&
        (!comp || q.comp === comp) &&
        (!level || q.niveau === Number(level)) &&
        (!t || norm(q.q + ' ' + q.theme + ' ' + q.motsCles.join(' ')).includes(t)),
    )
  }, [tp, comp, level, text])

  const current = (qid && QUESTIONS.find((q) => q.id === qid)) || list[0]
  const pos = current ? list.findIndex((q) => q.id === current.id) : -1

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    if (k !== 'q') next.delete('q')
    setParams(next, { replace: true })
  }
  const go = (q: OralQuestion | undefined) => q && setParam('q', q.id)

  return (
    <>
      <PageHeader
        title="Questions orales"
        description={`${QUESTIONS.length} questions d’entraînement classées par tâche partielle, compétence, thème et difficulté. La correction ne s’affiche qu’après ton essai.`}
        eyebrow={<KindBadge kind="exemple" />}
      />

      <div className="no-print mb-5 space-y-3 rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrer par tâche partielle">
          <Chip active={!tp} onClick={() => setParam('tp', null)}>
            Toutes
          </Chip>
          {TPS.map((t) => (
            <Chip key={t.id} active={tp === t.id} onClick={() => { const n = new URLSearchParams(params); n.set('tp', t.id); n.delete('comp'); n.delete('q'); setParams(n, { replace: true }) }}>
              {t.id.toUpperCase()}
            </Chip>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Select aria-label="Filtrer par compétence" value={comp ?? ''} onChange={(e) => setParam('comp', e.target.value || null)}>
            <option value="">Toutes les compétences</option>
            {COMPETENCES.filter((c) => !tp || tp === 'tp5' || c.tp === tp).map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.court}
              </option>
            ))}
          </Select>
          <Select aria-label="Filtrer par difficulté" value={level ?? ''} onChange={(e) => setParam('niveau', e.target.value || null)}>
            <option value="">Toutes les difficultés</option>
            {([1, 2, 3] as Level[]).map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABEL[l]}
              </option>
            ))}
          </Select>
          <Input aria-label="Filtrer par thème ou mot-clé" placeholder="Thème ou mot-clé…" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span role="status">
            {list.length} question{list.length > 1 ? 's' : ''} · {list.filter((q) => doneIds.has(q.id)).length} déjà travaillée{list.filter((q) => doneIds.has(q.id)).length > 1 ? 's' : ''}
          </span>
          <Button variant="ghost" size="sm" disabled={!list.length} onClick={() => go(list[Math.floor(Math.random() * list.length)])}>
            <Shuffle /> Question au hasard
          </Button>
        </div>
      </div>

      {!current ? (
        <EmptyState icon={Eye} title="Aucune question ne correspond à ces filtres">
          Élargis la recherche ou retire un filtre.
        </EmptyState>
      ) : (
        <>
          <QuestionPlayer key={current.id} q={current} />
          <div className="no-print mt-4 flex items-center justify-between">
            <Button variant="ghost" disabled={pos <= 0} onClick={() => go(list[pos - 1])}>
              <ArrowLeft /> Précédente
            </Button>
            <span className="text-sm tabular-nums text-muted-foreground">{pos >= 0 ? `${pos + 1} / ${list.length}` : 'Hors filtre'}</span>
            <Button variant="ghost" disabled={pos < 0 || pos >= list.length - 1} onClick={() => go(list[pos + 1])}>
              Suivante <ArrowRight />
            </Button>
          </div>
          <details className="no-print mt-6 rounded-lg border bg-card">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium">Liste des {list.length} questions</summary>
            <ul className="max-h-96 divide-y overflow-y-auto border-t">
              {list.map((q) => (
                <li key={q.id}>
                  <button type="button" onClick={() => { go(q); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={cn('flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-muted', q.id === current.id && 'bg-accent')}>
                    {doneIds.has(q.id) ? <Check className="size-4 shrink-0 text-success" aria-label="Déjà travaillée" /> : <span className="size-4 shrink-0" />}
                    <span className="min-w-0 flex-1 truncate">{q.q}</span>
                    <Badge variant="muted">{q.comp}</Badge>
                    <Badge variant="outline" className="hidden sm:inline-flex">
                      {LEVEL_LABEL[q.niveau]}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </>
  )
}

function QuestionPlayer({ q }: { q: OralQuestion }) {
  const [mode, setMode] = useState<'ecrit' | 'oral'>('ecrit')
  const [answer, setAnswer] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null)
  const [relances, setRelances] = useState<string[]>([])
  const [scores, setScores] = useState<(number | undefined)[]>([])
  const [saved, setSaved] = useState(false)
  const sw = useStopwatch()
  const rec = useRecorder()
  const tp = TP_BY_ID[q.tp as TpId]
  const lesson = LESSON_BY_COMP[q.comp]
  const tried = mode === 'ecrit' ? answer.trim().length >= 20 : sw.elapsed >= 20 && !sw.running

  const reveal = async () => {
    setRevealed(true)
    setRelances(await coach.followUps(q))
    if (mode === 'ecrit') setAnalysis(await coach.analyse(answer, q))
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TpBadge tp={q.tp} />
          <CompBadge comp={q.comp} />
          <Badge variant="outline">{LEVEL_LABEL[q.niveau]}</Badge>
          <Badge variant="muted">{q.theme}</Badge>
          <FavoriteButton id={`question:${q.id}`} label="cette question" className="ml-auto" />
        </div>
        <h2 className="text-lg font-semibold leading-7">{q.q}</h2>

        {!revealed && (
          <div className="mt-5">
            <div className="mb-3 inline-flex rounded-md border p-0.5" role="tablist" aria-label="Mode de réponse">
              {(
                [
                  ['ecrit', 'Par écrit', Keyboard],
                  ['oral', 'À voix haute', Mic],
                ] as const
              ).map(([m, label, Icon]) => (
                <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={cn('flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium', mode === m ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted')}>
                  <Icon className="size-4" aria-hidden /> {label}
                </button>
              ))}
            </div>

            {mode === 'ecrit' ? (
              <>
                <label htmlFor="answer" className="sr-only">
                  Ta réponse
                </label>
                <Textarea id="answer" className="min-h-[160px]" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Rédige ta réponse comme tu la dirais : constat, démarche, justification…" />
              </>
            ) : (
              <div className="rounded-md border bg-muted/40 p-4">
                <p className="text-sm leading-6 text-muted-foreground">Réponds à voix haute comme devant les expert-e-s. Vise 2 à 4 minutes. L’enregistrement est facultatif, reste sur ton appareil et n’est pas sauvegardé.</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-semibold tabular-nums" role="timer" aria-live="off">
                    {fmtClock(sw.elapsed)}
                  </span>
                  {!sw.running ? (
                    <Button onClick={() => { sw.start(); rec.start() }}>
                      <Play /> {sw.elapsed ? 'Reprendre' : 'Démarrer'}
                    </Button>
                  ) : (
                    <Button variant="destructive" onClick={() => { sw.stop(); rec.stop() }}>
                      <Square /> Terminer
                    </Button>
                  )}
                  {rec.state === 'recording' && (
                    <Badge variant="destructive">
                      <Mic className="size-3" /> Enregistrement
                    </Badge>
                  )}
                  {rec.state === 'denied' && (
                    <Badge variant="muted">
                      <MicOff className="size-3" /> Micro indisponible : chronomètre seul
                    </Badge>
                  )}
                </div>
                {rec.url && !sw.running && <audio className="mt-3 w-full" controls src={rec.url} aria-label="Réécouter ma réponse" />}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button onClick={reveal} disabled={!tried}>
                <Eye /> Voir la correction
              </Button>
              {!tried && <span className="text-sm text-muted-foreground">{mode === 'ecrit' ? 'Écris d’abord une réponse (au moins une phrase complète).' : 'Parle au moins 20 secondes, puis clique sur « Terminer ».'}</span>}
            </div>
          </div>
        )}

        {revealed && (
          <div className="mt-6 space-y-6 border-t pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold">Correction détaillée</h3>
              <KindBadge kind="correction" />
            </div>

            {mode === 'ecrit' && answer && (
              <details>
                <summary className="cursor-pointer text-sm font-medium">Ma réponse</summary>
                <p className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm leading-6">{answer}</p>
              </details>
            )}

            <div>
              <h4 className="mb-2 text-sm font-semibold">Éléments attendus</h4>
              <Bullets items={q.attendus} />
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Proposition de réponse orale</h4>
              <p className="rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-[15px] leading-7">{q.reponse}</p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Mots-clés importants</h4>
              <ul className="flex flex-wrap gap-1.5">
                {q.motsCles.map((k) => {
                  const found = analysis?.found.includes(k)
                  return (
                    <li key={k}>
                      <Badge variant={analysis ? (found ? 'success' : 'warning') : 'default'}>
                        {analysis && (found ? <Check className="size-3" aria-hidden /> : null)}
                        {k}
                        {analysis && <span className="sr-only">{found ? ' — présent dans ta réponse' : ' — absent de ta réponse'}</span>}
                      </Badge>
                    </li>
                  )
                })}
              </ul>
              {analysis && (
                <div className="mt-3 rounded-md border bg-muted/40 p-3 text-sm leading-6">
                  <p className="font-medium">
                    Analyse locale : {analysis.found.length} mot{analysis.found.length > 1 ? 's' : ''}-clé{analysis.found.length > 1 ? 's' : ''} sur {q.motsCles.length} repéré{analysis.found.length > 1 ? 's' : ''} · {analysis.wordCount} mots
                  </p>
                  {analysis.remarks.length > 0 && <Bullets items={analysis.remarks} className="mt-1 text-sm" />}
                  <p className="mt-1 text-xs text-muted-foreground">Comparaison automatique de mots-clés, sans intelligence artificielle : elle ne juge ni la logique ni la justification. Ton auto-évaluation ci-dessous fait foi.</p>
                </div>
              )}
            </div>
            {lesson && (
              <div>
                <h4 className="mb-2 text-sm font-semibold">Erreurs fréquentes sur {q.comp}</h4>
                <Bullets items={lesson.erreurs} />
              </div>
            )}
            <div>
              <h4 className="mb-2 text-sm font-semibold">Questions de relance possibles</h4>
              <Bullets items={relances} />
            </div>
            <div>
              <h4 className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                Auto-évaluation selon les critères du {q.tp.toUpperCase()} <KindBadge kind={tp.criteresKind} />
              </h4>
              <SelfEval idPrefix={`q-${q.id}`} criteres={tp.criteres} values={scores} onChange={(v) => { setScores(v); setSaved(false) }} />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button
                  disabled={!evalComplete(scores, tp.criteres.length) || saved}
                  onClick={() => {
                    const pts = evalSum(scores)
                    actions.log({ type: 'question', ref: q.id, label: `Question ${q.comp} · ${q.theme}`, comps: [q.comp], tp: q.tp, score: pts / 9, detail: `${pts}/9 · ${mode === 'ecrit' ? 'écrit' : `oral ${fmtClock(sw.elapsed)}`}` })
                    setSaved(true)
                  }}
                >
                  <Check /> {saved ? 'Résultat enregistré' : 'Enregistrer mon résultat'}
                </Button>
                {evalComplete(scores, tp.criteres.length) && <span className="text-sm tabular-nums text-muted-foreground">{evalSum(scores)} / 9 points</span>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/** Enregistrement audio local facultatif (MediaRecorder). Rien n'est envoyé ni conservé. */
function useRecorder() {
  const [state, setState] = useState<'idle' | 'recording' | 'denied'>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const mr = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  useEffect(
    () => () => {
      mr.current?.stream.getTracks().forEach((t) => t.stop())
      if (url) URL.revokeObjectURL(url)
    },
    [url],
  )

  const start = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('unsupported')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const r = new MediaRecorder(stream)
      chunks.current = []
      r.ondataavailable = (e) => chunks.current.push(e.data)
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        setUrl(URL.createObjectURL(new Blob(chunks.current, { type: r.mimeType })))
        setState('idle')
      }
      mr.current = r
      r.start()
      setState('recording')
    } catch {
      setState('denied')
    }
  }
  const stop = () => {
    if (mr.current && mr.current.state !== 'inactive') mr.current.stop()
  }
  return { state, url, start, stop }
}
