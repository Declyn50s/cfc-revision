import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, FolderOpen, NotebookPen, Pencil, Plus, Star, Trash2 } from 'lucide-react'
import type { FreeNote } from '@/types'
import { A_VERIFIER, COMP_BY_ID, EXAM_FORMAT, OPTIONAL_COMPETENCES, SOURCES, isCompId } from '@/data/referentiel'
import { CASES, FICHES, QUESTIONS, ROLEPLAYS } from '@/data'
import { actions, useStore } from '@/services/store'
import { fmtDateTime } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input, Label, Textarea } from '@/components/ui/input'
import { EmptyState, FavoriteButton, KindBadge, PageHeader, Section } from '@/components/shared/bits'

/** Retrouve le titre et le lien d'un élément à partir de sa clé « type:id ». */
export function resolveKey(key: string): { type: string; title: string; path: string } | null {
  const [type, ...rest] = key.split(':')
  const id = rest.join(':')
  if (type === 'lecon' && isCompId(id)) return { type: 'Leçon', title: `${id} — ${COMP_BY_ID[id].court}`, path: `/apprendre/${COMP_BY_ID[id].tp}/${id}` }
  if (type === 'fiche') {
    const f = FICHES.find((x) => x.id === id)
    return f ? { type: 'Fiche', title: f.titre, path: `/ressources/fiches/${id}` } : null
  }
  if (type === 'question') {
    const q = QUESTIONS.find((x) => x.id === id)
    return q ? { type: 'Question', title: q.q, path: `/entrainement/questions?q=${id}` } : null
  }
  if (type === 'cas') {
    const c = CASES.find((x) => x.id === id)
    return c ? { type: 'Cas pratique', title: c.titre, path: `/entrainement/cas/${id}` } : null
  }
  if (type === 'role') {
    const r = ROLEPLAYS.find((x) => x.id === id)
    return r ? { type: 'Jeu de rôle', title: r.titre, path: `/entrainement/jeux-de-role/${id}` } : null
  }
  return null
}

export function Notes() {
  useDocumentTitle('Mes notes')
  const notes = useStore((s) => s.notes)
  const free = useStore((s) => s.freeNotes)
  const [edit, setEdit] = useState<(Partial<FreeNote> & { titre: string; corps: string }) | null>(null)
  const [del, setDel] = useState<string | null>(null)
  const attached = Object.entries(notes)
    .map(([k, v]) => ({ k, v, ref: resolveKey(k) }))
    .filter((x) => x.ref)

  return (
    <>
      <PageHeader
        title="Mes notes"
        description="Tes notes libres et toutes celles que tu as prises dans les leçons, fiches et cas pratiques, réunies au même endroit."
        actions={
          <Button onClick={() => setEdit({ titre: '', corps: '' })}>
            <Plus /> Nouvelle note
          </Button>
        }
      />
      <Section title={`Notes libres · ${free.length}`}>
        {free.length === 0 ? (
          <EmptyState icon={NotebookPen} title="Aucune note libre">
            Utilise-les pour tes pense-bêtes : questions à poser à la CIFC, idées d’exemples pour le TP5, logistique du jour J.
          </EmptyState>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {free.map((n) => (
              <li key={n.id}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle as="h3" className="flex items-start justify-between gap-2">
                      <span>{n.titre || 'Sans titre'}</span>
                      <span className="no-print flex shrink-0 gap-1">
                        <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Modifier la note « ${n.titre} »`} onClick={() => setEdit(n)}>
                          <Pencil className="size-4" />
                        </button>
                        <button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-muted" aria-label={`Supprimer la note « ${n.titre} »`} onClick={() => setDel(n.id)}>
                          <Trash2 className="size-4" />
                        </button>
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm leading-6">{n.corps}</p>
                    <p className="mt-3 text-xs text-muted-foreground">Modifiée le {fmtDateTime(n.updatedAt)}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section title={`Notes prises dans les contenus · ${attached.length}`} className="mt-10">
        {attached.length === 0 ? (
          <p className="text-sm text-muted-foreground">Chaque leçon, fiche et cas pratique possède un champ « Mes notes ». Ce que tu y écris apparaît ici.</p>
        ) : (
          <ul className="divide-y rounded-lg border bg-card">
            {attached.map(({ k, v, ref }) => (
              <li key={k} className="px-4 py-3">
                <Link to={ref!.path} className="text-sm font-medium hover:underline">
                  <Badge variant="muted" className="mr-2">
                    {ref!.type}
                  </Badge>
                  {ref!.title}
                </Link>
                <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{v}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogTitle>{edit?.id ? 'Modifier la note' : 'Nouvelle note'}</DialogTitle>
          <DialogDescription>Enregistrée sur cet appareil.</DialogDescription>
          {edit && (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (!edit.titre.trim() && !edit.corps.trim()) return
                actions.saveFreeNote(edit)
                setEdit(null)
              }}
            >
              <div>
                <Label htmlFor="n-titre">Titre</Label>
                <Input id="n-titre" value={edit.titre} onChange={(e) => setEdit({ ...edit, titre: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="n-corps">Contenu</Label>
                <Textarea id="n-corps" className="min-h-[160px]" value={edit.corps} onChange={(e) => setEdit({ ...edit, corps: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEdit(null)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <ConfirmDialog open={!!del} onOpenChange={(o) => !o && setDel(null)} title="Supprimer cette note ?" description="La note sera définitivement supprimée." confirmLabel="Supprimer" onConfirm={() => del && actions.deleteFreeNote(del)} />
    </>
  )
}

export function Favorites() {
  useDocumentTitle('Mes favoris')
  const favorites = useStore((s) => s.favorites)
  const items = favorites.map((k) => ({ k, ref: resolveKey(k) })).filter((x) => x.ref)
  const types = [...new Set(items.map((i) => i.ref!.type))]
  return (
    <>
      <PageHeader title="Mes favoris" description="Les leçons, fiches, questions, cas et jeux de rôle que tu as marqués d’une étoile." />
      {items.length === 0 ? (
        <EmptyState icon={Star} title="Aucun favori">
          Clique sur l’étoile d’une fiche, d’une leçon ou d’une question pour la retrouver ici.
        </EmptyState>
      ) : (
        types.map((t) => (
          <Section key={t} title={t} className="mb-8">
            <ul className="divide-y rounded-lg border bg-card">
              {items
                .filter((i) => i.ref!.type === t)
                .map(({ k, ref }) => (
                  <li key={k} className="flex items-center gap-2 px-4 py-1.5">
                    <Link to={ref!.path} className="min-w-0 flex-1 truncate py-1.5 text-sm font-medium hover:underline">
                      {ref!.title}
                    </Link>
                    <FavoriteButton id={k} label={ref!.title} />
                  </li>
                ))}
            </ul>
          </Section>
        ))
      )}
    </>
  )
}

const STATUT = {
  fourni: { label: 'Fourni et analysé', variant: 'success' as const },
  manquant: { label: 'Manquant', variant: 'destructive' as const },
  'consulte-en-ligne': { label: 'Consulté en ligne', variant: 'warning' as const },
}

export function Documents() {
  useDocumentTitle('Documents officiels')
  return (
    <>
      <PageHeader
        title="Documents officiels"
        description="Ce sur quoi l’application s’appuie, ce qui manque encore, et ce qui reste à vérifier avant la session 2027. Aucune question de l’application n’est une question officielle d’examen."
      />
      <Section title="Format de l’examen" kind="officiel">
        <Card>
          <CardContent className="pt-5">
            <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-6">
              {[
                ['Préparation', `${EXAM_FORMAT.preparationMin} min`],
                ['Examen', `${EXAM_FORMAT.examenMin} min`],
                ['Tâches partielles', `${EXAM_FORMAT.taches} × ${EXAM_FORMAT.minutesParTache} min`],
                ['Points', `${EXAM_FORMAT.taches} × ${EXAM_FORMAT.pointsParTache} = ${EXAM_FORMAT.pointsMax}`],
                ['Note minimale', EXAM_FORMAT.noteMin.toFixed(1)],
                ['Formule', '(points × 5 ÷ 45) + 1'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Sources : directive « Travail pratique » (CIFC Suisse, 10.10.2025) et guide CIFC 2026, pages 30 et 31. {EXAM_FORMAT.arrondi}.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
              {EXAM_FORMAT.regles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Section title="Sources" className="mt-10">
        <ul className="space-y-3">
          {SOURCES.map((s) => (
            <li key={s.id}>
              <Card>
                <CardContent className="pt-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="max-w-3xl text-[15px] font-semibold leading-6">{s.titre}</h3>
                    <Badge variant={STATUT[s.statut].variant}>{STATUT[s.statut].label}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.editeur}</p>
                  <p className="mt-2 text-sm leading-6">{s.detail}</p>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noreferrer" className="link mt-2 inline-flex items-center gap-1 text-sm">
                      Ouvrir le document <ExternalLink className="size-3.5" aria-hidden />
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="À vérifier avant la session 2027" kind="a-verifier" className="mt-10">
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold">Point</th>
                <th scope="col" className="px-4 py-2 font-semibold">Pourquoi</th>
                <th scope="col" className="px-4 py-2 font-semibold">Où vérifier</th>
              </tr>
            </thead>
            <tbody>
              {A_VERIFIER.map((a) => (
                <tr key={a.point} className="border-t align-top">
                  <td className="px-4 py-3 font-medium">{a.point}</td>
                  <td className="px-4 py-3 leading-6 text-muted-foreground">{a.pourquoi}</td>
                  <td className="px-4 py-3 leading-6">{a.aupres}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Compétences optionnelles (identifiées séparément)" className="mt-10">
        <ul className="divide-y rounded-lg border bg-card">
          {OPTIONAL_COMPETENCES.map((o) => (
            <li key={o.id} className="px-4 py-3 text-sm leading-6">
              <span className="font-semibold">{o.id}</span> — {o.titre} <Badge variant="outline">Option « {o.option} »</Badge>
              <span className="block text-muted-foreground">{o.remarque}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Comment lire les étiquettes" className="mt-10">
        <ul className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
          {(
            [
              ['officiel', 'Texte repris d’un document officiel fourni (critères de la série zéro, intitulés des compétences, titres des mandats pratiques).'],
              ['pedagogique', 'Explications, méthodes et conseils rédigés pour l’apprentissage.'],
              ['exemple', 'Questions, cas, jeux de rôle et examens blancs créés pour l’entraînement.'],
              ['correction', 'Propositions de réponse : d’autres réponses justifiées peuvent être acceptées.'],
              ['a-verifier', 'Information non confirmée par un document officiel présent dans l’archive.'],
            ] as const
          ).map(([k, t]) => (
            <li key={k} className="flex items-start gap-3 rounded-md border bg-card p-3">
              <KindBadge kind={k} className="mt-0.5 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <FolderOpen className="size-4" aria-hidden /> Pour ajouter un document manquant, transmets-le : les contenus concernés seront mis à jour.
        </p>
      </Section>
    </>
  )
}
