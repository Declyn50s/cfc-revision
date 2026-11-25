import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle, CircleDot, Clock, Download, Pencil, Plus, Trash2, Trophy } from 'lucide-react'
import type { CompId, StarExample, TpId } from '@/types'
import { COMPETENCES, COMP_BY_ID, DOMAIN_BY_ID, OPTIONAL_COMPETENCES, TP_BY_ID, TP_COLOR, compsOfTp, isTpId } from '@/data/referentiel'
import { CASES, QUESTIONS, ROLEPLAYS, TP5_GUIDE } from '@/data'
import { actions, useStore } from '@/services/store'
import { compProgress, starComplete, tpProgress } from '@/services/progress'
import { cn, pct } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input, Label, Textarea } from '@/components/ui/input'
import { Bullets, Chip, EmptyState, KindBadge, PageHeader, STATUS_LABEL, Section, TpBadge } from '@/components/shared/bits'

export default function TpHome() {
  const { tp } = useParams()
  if (!tp || !isTpId(tp)) return <Navigate to="/" replace />
  return <TpHomeInner key={tp} tp={tp} />
}

function TpHomeInner({ tp }: { tp: TpId }) {
  const t = TP_BY_ID[tp]
  useDocumentTitle(t.titre)
  useRememberLocation(t.titre)
  const s = useStore((x) => x)
  const color = TP_COLOR[tp]
  const comps = tp === 'tp5' ? [] : compsOfTp(tp)
  const nQ = QUESTIONS.filter((q) => q.tp === tp).length
  const nC = CASES.filter((c) => c.tp === tp).length
  const nR = ROLEPLAYS.filter((r) => r.tp === tp).length
  const progress = tpProgress(s, tp)

  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <TpBadge tp={tp} link={false} />
            <span>{t.methode}</span>
            <span aria-hidden>·</span>
            <span>{t.domaines.map((d) => `Domaine ${d.toUpperCase()}`).join(', ')}</span>
          </>
        }
        title={t.titre}
        description={t.methodeDetail}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              Format de l’épreuve <KindBadge kind="officiel" />
            </CardTitle>
            <CardDescription>
              {tp === 'tp5'
                ? 'Source : directive « Travail pratique » (CIFC Suisse, 10.10.2025), point 4.1.6. La directive ne répartit pas les dix minutes entre les quatre étapes : les durées affichées sont indicatives.'
                : 'Source : directive « Travail pratique » (CIFC Suisse, 10.10.2025) et guide CIFC 2026, p. 31. Pondération : 20 % de la note.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-3 gap-4 border-b pb-4">
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden /> Durée
                </dt>
                <dd className="mt-0.5 text-lg font-semibold">{t.dureeMin} minutes</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Trophy className="size-3.5" aria-hidden /> Points
                </dt>
                <dd className="mt-0.5 text-lg font-semibold">{t.points} maximum</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Méthode</dt>
                <dd className="mt-0.5 text-lg font-semibold">{t.methode}</dd>
              </div>
            </dl>
            <ol className="mt-4 flex flex-col gap-2 sm:flex-row" aria-label="Déroulement des 10 minutes">
              {t.deroulement.map((d, i) => (
                <li key={i} className={cn('rounded-md border-l-4 bg-muted/50 px-3 py-2', color.border)} style={{ flex: d.minutes }}>
                  <span className="block text-sm font-semibold">{d.minutes} min</span>
                  <span className="block text-xs leading-5 text-muted-foreground">{d.label}</span>
                </li>
              ))}
            </ol>
            <h3 className="mb-2 mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold">
              Critères d’évaluation (3 points chacun) <KindBadge kind={t.criteresKind} />
            </h3>
            <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-6">
              {t.criteres.map((c, i) => (
                <li key={i}>
                  {c.titre && <span className="font-semibold">{c.titre}. </span>}
                  {c.texte}
                  {c.plein && <span className="mt-0.5 block text-muted-foreground">Pour 3 points : {c.plein}</span>}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ma progression</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tabular-nums">{pct(progress)}</p>
              <Progress className="mt-2" value={progress} label={`Progression ${t.titre}`} barClassName={color.bg} />
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {tp === 'tp5' ? '40 % pour ta préparation (deux compétences choisies et justifiées, une situation complète pour chacune) et 60 % pour tes entraînements TP5.' : 'Moyenne des compétences du domaine : leçons, quiz, entraînements, flashcards.'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exercices associés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <Link className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-muted" to={`/entrainement/questions?tp=${tp}`}>
                <span>Questions orales</span>
                <Badge variant="muted">{nQ}</Badge>
              </Link>
{nC > 0 && (
              <Link className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-muted" to={`/entrainement/cas?tp=${tp}`}>
                <span>Cas pratiques</span>
                <Badge variant="muted">{nC}</Badge>
              </Link>
              )}
              {tp === 'tp5' && (
                <Link className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-muted" to="/entrainement/examens">
                  <span>TP5 des examens blancs</span>
                  <Badge variant="muted">5</Badge>
                </Link>
              )}
              {nR > 0 && (
                <Link className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-muted" to={`/entrainement/jeux-de-role?tp=${tp}`}>
                  <span>Jeux de rôle</span>
                  <Badge variant="muted">{nR}</Badge>
                </Link>
              )}
              {tp !== 'tp5' && (
                <Link className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-muted" to={`/entrainement/quiz?tp=${tp}`}>
                  <span>Quiz du domaine</span>
                  <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden />
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Section title="Objectifs de l’examen" kind="pedagogique">
          <Bullets items={t.objectifs} />
          <h3 className="mb-2 mt-5 text-sm font-semibold">Conseils de méthode</h3>
          <Bullets items={t.conseils} />
        </Section>
        <Section title="Erreurs fréquentes" kind="pedagogique">
          <Bullets items={t.erreurs} />
        </Section>
      </div>

      {tp === 'tp5' ? (
        <Tp5Space />
      ) : (
        <Section title={`Cours · ${comps.length} compétences`} className="mt-10">
          {t.domaines.map((d) => (
            <div key={d} className="mb-6">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                Domaine {d.toUpperCase()} — {DOMAIN_BY_ID[d].titre}
              </h3>
              <ul className="divide-y rounded-lg border bg-card">
                {comps
                  .filter((c) => c.domaine === d)
                  .map((c) => {
                    const p = compProgress(s, c.id)
                    const Icon = p.status === 'maitrise' ? CheckCircle2 : p.started ? CircleDot : Circle
                    return (
                      <li key={c.id}>
                        <Link to={`/apprendre/${tp}/${c.id}`} className="group flex items-center gap-3 px-4 py-3 hover:bg-muted/60">
                          <Icon className={cn('size-5 shrink-0', p.status === 'maitrise' ? 'text-success' : p.started ? color.text : 'text-muted-foreground/60')} aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium group-hover:underline">
                              {c.id} — {c.court}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">{c.titre}</span>
                          </span>
                          <Badge variant={STATUS_LABEL[p.status].variant} className="hidden sm:inline-flex">
                            {STATUS_LABEL[p.status].label}
                          </Badge>
                          <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct(p.score)}</span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
          {OPTIONAL_COMPETENCES.some((o) => t.domaines.includes(o.id[0] as never)) && (
            <details className="rounded-lg border bg-card px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium">Compétences optionnelles du domaine (non intégrées)</summary>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {OPTIONAL_COMPETENCES.filter((o) => t.domaines.includes(o.id[0] as never)).map((o) => (
                  <li key={o.id}>
                    <span className="font-medium">
                      {o.id} — {o.titre}
                    </span>{' '}
                    <Badge variant="outline">Option « {o.option} »</Badge>
                    <span className="block text-muted-foreground">{o.remarque}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <KindBadge kind="a-verifier" /> Leur pertinence pour ton examen n’est pas confirmée : elles restent facultatives.
              </p>
            </details>
          )}
        </Section>
      )}
    </>
  )
}

// ───────────── Espace TP5 : discussion de réflexion ─────────────

const emptyStar = (): Omit<StarExample, 'id' | 'updatedAt'> & { id?: string } => ({ titre: '', comps: [], situation: '', tache: '', action: '', resultat: '', amelioration: '', variante: '' })

function Tp5Space() {
  const star = useStore((s) => s.star)
  const choice = useStore((s) => s.tp5Choice)
  const [editing, setEditing] = useState<(Omit<StarExample, 'id' | 'updatedAt'> & { id?: string }) | null>(null)
  const [toDelete, setToDelete] = useState<string | null>(null)
  const seedsLeft = TP5_GUIDE.mesSituations.filter((m) => !star.some((e) => e.titre === m.titre))

  return (
    <>
      <Section title="Déroulement officiel de l’entretien" kind="officiel" className="mt-10">
        <ol className="grid gap-3 md:grid-cols-2">
          {TP5_GUIDE.etapesOfficielles.map((e, i) => (
            <li key={i} className="rounded-lg border bg-card p-4">
              <p className="text-sm font-semibold">
                Étape {i + 1} — {e.titre}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Mes deux compétences pour l’entretien" className="mt-10">
        <Card>
          <CardContent className="pt-5">
            <p className="mb-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              La directive te demande d’en choisir deux « qui te conviennent le plus ou qui t’intéressent particulièrement ». Choisis-les maintenant : tu auras le temps de préparer une situation solide pour chacune.
            </p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Choisir deux compétences opérationnelles">
              {COMPETENCES.map((c) => {
                const on = choice.comps.includes(c.id)
                return (
                  <Chip
                    key={c.id}
                    active={on}
                    onClick={() => actions.setTp5Choice({ comps: on ? choice.comps.filter((x) => x !== c.id) : [...choice.comps, c.id].slice(-2) })}
                  >
                    <span title={c.titre}>
                      {c.id} · {c.court}
                    </span>
                  </Chip>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground" role="status">
              {choice.comps.length} sur 2 sélectionnée{choice.comps.length > 1 ? 's' : ''}. En choisir une troisième remplace la plus ancienne.
            </p>
            {choice.comps.length > 0 && (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {choice.comps.map((id) => {
                  const ex = star.filter((e) => e.comps.includes(id))
                  const ready = ex.some(starComplete)
                  return (
                    <li key={id} className="rounded-md border p-3 text-sm leading-6">
                      <p className="font-semibold">
                        {id} — {COMP_BY_ID[id].titre}
                      </p>
                      <p className={ready ? 'text-success' : 'text-warning'}>
                        {ready
                          ? `Situation prête : ${ex.find(starComplete)!.titre}`
                          : ex.length
                            ? `Situation à compléter : ${ex[0].titre}`
                            : 'Aucune situation rattachée : ajoute un exemple ci-dessous et coche cette compétence.'}
                      </p>
                    </li>
                  )
                })}
              </ul>
            )}
            <div className="mt-4">
              <Label htmlFor="tp5-pourquoi">Pourquoi ces deux compétences ? Ce qui me passionne, pourquoi je m’y estime fort</Label>
              <Textarea id="tp5-pourquoi" value={choice.pourquoi} onChange={(e) => actions.setTp5Choice({ pourquoi: e.target.value })} placeholder="Deux ou trois phrases par compétence, appuyées sur des faits. C’est ta réponse à l’étape 1." />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Sept savoir-faire pour réussir l’entretien" kind="pedagogique" className="mt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TP5_GUIDE.savoirFaire.map((sf, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle as="h3">
                  {i + 1}. {sf.titre}
                </CardTitle>
                <CardDescription>{sf.explication}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Formulations utiles</p>
                <Bullets items={sf.phrases} className="text-sm" />
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Piège :</span> {sf.piege}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Questions que les expert-e-s peuvent poser" kind="exemple" className="mt-10">
        <Bullets items={TP5_GUIDE.questionsExperts} />
        <Link to="/entrainement/questions?tp=tp5" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-4')}>
          S’entraîner sur les questions TP5
        </Link>
      </Section>

      <Section title={`Ma bibliothèque d’exemples professionnels · ${star.length}`} className="mt-10">
        <p className="mb-4 max-w-3xl text-[15px] leading-6 text-muted-foreground">
          Rédige ici tes situations vécues avec la méthode STAR (Situation, Tâche, Action, Résultat), complétée par ce que tu ferais autrement et par un scénario alternatif : ce sont exactement les étapes 2 à 4 de l’entretien. Il t’en faut une par compétence choisie, plus une de réserve.
        </p>
        <div className="no-print mb-4 flex flex-wrap gap-2">
          <Button onClick={() => setEditing(emptyStar())}>
            <Plus /> Nouvel exemple
          </Button>
          {seedsLeft.length > 0 && (
            <Button
              variant="outline"
              onClick={() => seedsLeft.forEach((m) => actions.saveStar(m))}
              title="Reprend les trois situations de ta fiche de révision du 6 juin 2026, à compléter et corriger."
            >
              <Download /> Importer {seedsLeft.length === 3 ? 'mes 3 situations' : `${seedsLeft.length} situation${seedsLeft.length > 1 ? 's' : ''}`} de ma fiche 2026
            </Button>
          )}
        </div>
        {star.length === 0 ? (
          <EmptyState icon={Pencil} title="Aucun exemple pour l’instant">
            Tu peux partir d’une page blanche ou importer les trois situations notées dans ta fiche de révision 2026, puis les retravailler.
          </EmptyState>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {star.map((e) => (
              <li key={e.id}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle as="h3" className="flex items-start justify-between gap-2">
                      <span>
                        {e.titre || 'Sans titre'}
                        {!starComplete(e) && (
                          <Badge variant="warning" className="ml-2 align-middle">
                            À compléter
                          </Badge>
                        )}
                      </span>
                      <span className="no-print flex shrink-0 gap-1">
                        <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Modifier « ${e.titre} »`} onClick={() => setEditing(e)}>
                          <Pencil className="size-4" />
                        </button>
                        <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Supprimer « ${e.titre} »`} onClick={() => setToDelete(e.id)}>
                          <Trash2 className="size-4" />
                        </button>
                      </span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {e.comps.map((c) => (
                        <Badge key={c} variant="muted" title={COMP_BY_ID[c].titre}>
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm leading-6">
                      {(
                        [
                          ['Situation', e.situation],
                          ['Tâche', e.tache],
                          ['Action', e.action],
                          ['Résultat', e.resultat],
                          ['À améliorer', e.amelioration],
                          ['Variante', e.variante],
                        ] as const
                      ).map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[6.5rem,1fr] gap-2">
                          <dt className="font-medium text-muted-foreground">{k}</dt>
                          <dd className={cn('whitespace-pre-wrap', !v && 'italic text-muted-foreground')}>{v || 'À compléter'}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="top-[5vh] max-h-[90vh] max-w-2xl">
          <DialogTitle>{editing?.id ? 'Modifier l’exemple' : 'Nouvel exemple STAR'}</DialogTitle>
          <DialogDescription>Écris à la première personne : ce que toi, tu as fait et décidé.</DialogDescription>
          {editing && (
            <form
              className="mt-4 space-y-3"
              onSubmit={(ev) => {
                ev.preventDefault()
                if (!editing.titre.trim()) return
                actions.saveStar(editing)
                setEditing(null)
              }}
            >
              <div>
                <Label htmlFor="st-titre">Titre</Label>
                <Input id="st-titre" required value={editing.titre} onChange={(e) => setEditing({ ...editing, titre: e.target.value })} placeholder="Ex. Annoncer un refus au guichet" />
              </div>
              {(
                [
                  ['situation', 'Situation — le contexte en deux phrases'],
                  ['tache', 'Tâche — ce qui t’était demandé, ton rôle'],
                  ['action', 'Action — ce que tu as fait, étape par étape, et pourquoi'],
                  ['resultat', 'Résultat — ce qui en est sorti, si possible mesurable'],
                  ['amelioration', 'À améliorer — ce que tu ferais différemment'],
                  ['variante', 'Variante — « et si… ? » et ta réaction'],
                ] as const
              ).map(([k, label]) => (
                <div key={k}>
                  <Label htmlFor={'st-' + k}>{label}</Label>
                  <Textarea id={'st-' + k} className="min-h-[72px]" value={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} />
                </div>
              ))}
              <div>
                <span className="mb-1.5 block text-sm font-medium" id="st-comps">
                  Compétences illustrées
                </span>
                <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="st-comps">
                  {COMPETENCES.map((c) => (
                    <Chip
                      key={c.id}
                      active={editing.comps.includes(c.id)}
                      onClick={() => setEditing({ ...editing, comps: editing.comps.includes(c.id) ? editing.comps.filter((x) => x !== c.id) : [...editing.comps, c.id as CompId] })}
                    >
                      <span title={c.titre}>{c.id}</span>
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditing(null)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Supprimer cet exemple ?"
        description="L’exemple sera définitivement supprimé de ta bibliothèque."
        confirmLabel="Supprimer"
        onConfirm={() => toDelete && actions.deleteStar(toDelete)}
      />
    </>
  )
}
