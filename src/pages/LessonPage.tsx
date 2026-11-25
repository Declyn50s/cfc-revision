import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, FileText } from 'lucide-react'
import type { CompId } from '@/types'
import { COMPETENCES, COMP_BY_ID, DOMAIN_BY_ID, SOURCES, TP_BY_ID, isCompId } from '@/data/referentiel'
import { CASES, FICHES, LESSON_BY_COMP, QUESTIONS } from '@/data'
import { ETAPES } from '@/data/etapes'
import { actions, useStore } from '@/services/store'
import { compProgress } from '@/services/progress'
import { cn, pct } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/input'
import { Blocks, Bullets, EmptyState, FavoriteButton, KindBadge, MasteryPicker, NoteEditor, PageHeader, Section, TpBadge } from '@/components/shared/bits'
import { QuizRunner } from '@/components/shared/QuizRunner'

const TOC = [
  ['definition', 'Définition'],
  ['objectifs', 'Objectifs'],
  ['a-savoir', 'À savoir pour l’examen'],
  ['explication', 'Explication détaillée'],
  ['methodes', 'Méthodes'],
  ['exemple', 'Exemple en entreprise'],
  ['situation', 'Situation professionnelle'],
  ['question', 'Question orale'],
  ['erreurs', 'Erreurs à éviter'],
  ['recap', 'Fiche récapitulative'],
  ['quiz', 'Mini-quiz'],
  ['cas', 'Cas pratique'],
  ['sources', 'Sources'],
] as const

export default function LessonPage() {
  const { comp } = useParams()
  if (!comp || !isCompId(comp)) return <Navigate to="/" replace />
  return <LessonInner key={comp} comp={comp} />
}

function LessonInner({ comp }: { comp: CompId }) {
  const c = COMP_BY_ID[comp]
  const tp = TP_BY_ID[c.tp]
  const lesson = LESSON_BY_COMP[comp]
  useDocumentTitle(`${c.id} — ${c.court}`)
  useRememberLocation(`Leçon ${c.id} — ${c.court}`)
  const s = useStore((x) => x)
  const state = s.lessons[comp]
  const p = compProgress(s, comp)
  const [showAnswer, setShowAnswer] = useState(false)
  const [draft, setDraft] = useState('')
  const [showCase, setShowCase] = useState(false)

  useEffect(() => {
    actions.openLesson(comp)
  }, [comp])

  const idx = COMPETENCES.findIndex((x) => x.id === comp)
  const prev = COMPETENCES[idx - 1]
  const next = COMPETENCES[idx + 1]
  const nQ = QUESTIONS.filter((q) => q.comp === comp).length
  const linkedCases = CASES.filter((x) => x.comps.includes(comp))
  const linkedFiches = FICHES.filter((f) => f.comps.includes(comp))

  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <TpBadge tp={c.tp} />
            <span>
              Domaine {c.domaine.toUpperCase()} — {DOMAIN_BY_ID[c.domaine].titre}
            </span>
          </>
        }
        title={`${c.id} — ${c.titre}`}
        description={
          <>
            Évaluée dans la tâche partielle {tp.numero} ({tp.methode.toLowerCase()}, {tp.dureeMin} minutes, {tp.points} points) et mobilisable dans le TP5.
          </>
        }
        actions={
          <>
            <FavoriteButton id={`lecon:${comp}`} label={`Leçon ${c.id}`} />
            <MasteryPicker label="Mon auto-évaluation de la compétence" value={s.selfMastery[comp]} onChange={(m) => actions.setSelfMastery(comp, m)} />
          </>
        }
      />

      {!lesson ? (
        <EmptyState icon={FileText} title="Leçon en cours de rédaction">
          Cette compétence fait partie du référentiel, mais sa leçon n’est pas encore disponible dans cette version.
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr,13rem]">
          <article className="min-w-0 space-y-10">
            <Section id="definition" title="1. Définition simple" kind="pedagogique">
              <p className="rounded-lg border bg-card p-4 text-[16px] leading-7">{lesson.definition}</p>
            </Section>

            <Section id="objectifs" title="2. Objectifs d’apprentissage" kind="pedagogique">
              <Bullets items={lesson.objectifs} />
            </Section>

            <Section id="a-savoir" title="3. Ce que je dois savoir pour l’examen" kind="pedagogique">
              <Bullets items={lesson.aSavoir} />
              <div className="mt-4 rounded-md border bg-muted/40 p-4">
                <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  Étapes opérationnelles de la compétence <KindBadge kind="officiel" />
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {ETAPES[comp].map((g, i) => (
                    <div key={i}>
                      {g.groupe && <p className="mb-1 text-sm font-medium">{g.groupe}</p>}
                      <ol className="list-decimal space-y-1 pl-5 text-sm leading-6">
                        {g.etapes.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Source : guides pratiques Konvink fournis (structure du plan de formation).</p>
              </div>
              {c.mandats.length > 0 && (
                <div className="mt-4 rounded-md border bg-muted/40 p-4">
                  <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                    Mandats pratiques de la compétence <KindBadge kind="officiel" />
                  </p>
                  <Bullets items={c.mandats} className="text-sm" />
                </div>
              )}
            </Section>

            <Section id="explication" title="4. Explication détaillée" kind="pedagogique">
              <Blocks blocks={lesson.explication} />
            </Section>

            <Section id="methodes" title="5. Méthodes à connaître" kind="pedagogique">
              <ul className="grid gap-3 sm:grid-cols-2">
                {lesson.methodes.map((m) => (
                  <li key={m.nom} className="rounded-md border bg-card p-4">
                    <p className="text-sm font-semibold">{m.nom}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{m.resume}</p>
                    {m.ficheId && (
                      <Link to={`/ressources/fiches/${m.ficheId}`} className="link mt-2 inline-block text-sm">
                        Ouvrir la fiche
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="exemple" title="6. Exemple concret en entreprise" kind="exemple">
              <p className="text-[15px] leading-7">{lesson.exemple}</p>
            </Section>

            <Section id="situation" title="7. Situation professionnelle" kind="exemple">
              <p className="rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-[15px] leading-7">{lesson.situation}</p>
            </Section>

            <Section id="question" title="8. Exemple de question orale" kind="exemple">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-[15px] font-medium leading-7">« {lesson.questionOrale} »</p>
                  {!showAnswer ? (
                    <div className="no-print mt-4">
                      <label htmlFor="draft" className="mb-1.5 block text-sm text-muted-foreground">
                        Essaie d’abord de répondre (quelques mots-clés suffisent), puis compare.
                      </label>
                      <Textarea id="draft" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ma réponse en quelques lignes…" />
                      <Button className="mt-3" variant="outline" disabled={draft.trim().length < 15} onClick={() => setShowAnswer(true)}>
                        <Eye /> Voir la réponse structurée
                      </Button>
                      {draft.trim().length < 15 && <p className="mt-1.5 text-xs text-muted-foreground">La réponse s’affiche après ton essai (au moins une phrase).</p>}
                    </div>
                  ) : (
                    <div className="mt-4 border-t pt-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">9. Exemple de réponse structurée</h3>
                        <KindBadge kind="correction" />
                      </div>
                      <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-7">
                        {lesson.reponse.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ol>
                      {draft && (
                        <details className="mt-3 text-sm">
                          <summary className="cursor-pointer text-muted-foreground">Relire mon essai</summary>
                          <p className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-3">{draft}</p>
                        </details>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Link to={`/entrainement/questions?comp=${comp}`} className="link mt-3 inline-block text-sm">
                {nQ} question{nQ > 1 ? 's' : ''} d’entraînement sur {comp}
              </Link>
            </Section>

            <Section id="erreurs" title="10. Erreurs à éviter" kind="pedagogique">
              <Bullets items={lesson.erreurs} />
            </Section>

            <Section id="recap" title="11. Fiche récapitulative" kind="pedagogique">
              <Card className="border-primary/30 bg-accent/30">
                <CardContent className="pt-5">
                  <Bullets items={lesson.recap} />
                </CardContent>
              </Card>
              {linkedFiches.length > 0 && (
                <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Fiches liées :</span>
                  {linkedFiches.map((f) => (
                    <Link key={f.id} to={`/ressources/fiches/${f.id}`}>
                      <Badge variant="outline" className="hover:bg-muted">
                        {f.titre}
                      </Badge>
                    </Link>
                  ))}
                </p>
              )}
            </Section>

            <Section id="quiz" title="12. Mini-quiz" kind="exemple">
              <Card>
                <CardContent className="pt-5">
                  <QuizRunner
                    questions={lesson.quiz}
                    onFinish={({ correct, total }) => {
                      actions.recordLessonQuiz(comp, correct / total)
                      actions.log({ type: 'quiz', ref: `lecon:${comp}`, label: `Mini-quiz ${comp}`, comps: [comp], tp: c.tp, score: correct / total, detail: `${correct}/${total}` })
                    }}
                  />
                  {state?.quizBest !== undefined && <p className="mt-3 text-xs text-muted-foreground">Meilleur résultat enregistré : {pct(state.quizBest)}</p>}
                </CardContent>
              </Card>
            </Section>

            <Section id="cas" title="13. Cas pratique" kind="exemple">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-[15px] leading-7">{lesson.cas.enonce}</p>
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-[15px] leading-7">
                    {lesson.cas.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ol>
                  {!showCase ? (
                    <Button variant="outline" className="no-print mt-4" onClick={() => setShowCase(true)}>
                      <Eye /> J’ai réfléchi : voir la correction
                    </Button>
                  ) : (
                    <div className="mt-4 border-t pt-4">
                      <KindBadge kind="correction" />
                      <Bullets items={lesson.cas.corrige} className="mt-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
              {linkedCases.length > 0 && (
                <p className="mt-3 text-sm">
                  <Link to={`/entrainement/cas?comp=${comp}`} className="link">
                    {linkedCases.length} cas pratique{linkedCases.length > 1 ? 's' : ''} complet{linkedCases.length > 1 ? 's' : ''} lié{linkedCases.length > 1 ? 's' : ''} à {comp}
                  </Link>
                </p>
              )}
            </Section>

            <Section id="sources" title="14. Sources documentaires">
              <ul className="space-y-2 text-sm leading-6">
                {lesson.sources.map((id) => {
                  const src = SOURCES.find((x) => x.id === id)
                  return src ? (
                    <li key={id} className="flex flex-wrap items-baseline gap-2">
                      <Badge variant={src.statut === 'fourni' ? 'success' : 'warning'}>{src.statut === 'fourni' ? 'Fourni' : src.statut === 'manquant' ? 'Manquant' : 'Consulté en ligne'}</Badge>
                      <span>{src.titre}</span>
                    </li>
                  ) : null
                })}
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Compétence opérationnelle {c.id} · tâche partielle {tp.numero}. Détail dans <Link to="/ressources/documents" className="link">Documents officiels</Link>.
              </p>
            </Section>

            <div className="no-print space-y-5 border-t pt-6">
              <NoteEditor id={`lecon:${comp}`} />
              <div className="flex flex-wrap items-center gap-3">
                <Button variant={state?.done ? 'outline' : 'default'} onClick={() => {
                  actions.completeLesson(comp, !state?.done)
                  if (!state?.done) actions.log({ type: 'lecon', ref: comp, label: `Leçon ${comp} terminée`, comps: [comp], tp: c.tp })
                }}>
                  <CheckCircle2 /> {state?.done ? 'Leçon terminée — annuler' : 'Marquer la leçon comme terminée'}
                </Button>
                <span className="text-sm text-muted-foreground">Progression de la compétence : {pct(p.score)}</span>
              </div>
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                {prev ? (
                  <Link to={`/apprendre/${prev.tp}/${prev.id}`} className={cn(buttonVariants({ variant: 'ghost' }), 'h-auto min-h-10 justify-start whitespace-normal py-2 text-left')}>
                    <ArrowLeft /> {prev.id} — {prev.court}
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link to={`/apprendre/${next.tp}/${next.id}`} className={cn(buttonVariants({ variant: 'ghost' }), 'h-auto min-h-10 justify-end whitespace-normal py-2 text-right')}>
                    {next.id} — {next.court} <ArrowRight />
                  </Link>
                ) : (
                  <Link to="/apprendre/tp5" className={cn(buttonVariants({ variant: 'ghost' }), 'h-auto min-h-10 justify-end whitespace-normal py-2 text-right')}>
                    TP5 — Discussion de réflexion <ArrowRight />
                  </Link>
                )}
              </div>
            </div>
          </article>

          <nav aria-label="Sommaire de la leçon" className="no-print hidden lg:block">
            <div className="sticky top-20">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dans cette leçon</p>
              <ul className="space-y-0.5 border-l text-sm">
                {TOC.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }} className={cn('-ml-px block border-l border-transparent py-1 pl-3 text-muted-foreground hover:border-primary hover:text-foreground')}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
