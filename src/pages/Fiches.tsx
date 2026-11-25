import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, FileDown, Printer, Search } from 'lucide-react'
import type { Mastery } from '@/types'
import { COMPETENCES, TPS } from '@/data/referentiel'
import { FICHES } from '@/data'
import { actions, useStore } from '@/services/store'
import { canPrint, saveTextFile } from '@/services/platform'
import { ficheToHtml, fichesToHtml } from '@/services/printable'
import { cn, norm } from '@/lib/utils'
import { useDocumentTitle, useRememberLocation } from '@/hooks/useApp'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input, Select } from '@/components/ui/input'
import { Bullets, Chip, CompBadge, EmptyState, FavoriteButton, KindBadge, MasteryPicker, NoteEditor, PageHeader, TpBadge } from '@/components/shared/bits'

const STATUS: Record<Mastery, { label: string; variant: 'warning' | 'default' | 'success' }> = {
  todo: { label: 'À travailler', variant: 'warning' },
  progress: { label: 'En cours', variant: 'default' },
  done: { label: 'Maîtrisé', variant: 'success' },
}

export function FicheList({ onlyMethods = false }: { onlyMethods?: boolean }) {
  const title = onlyMethods ? 'Méthodes et outils' : 'Fiches de révision'
  useDocumentTitle(title)
  useRememberLocation(title)
  const [q, setQ] = useState('')
  const [tp, setTp] = useState<string | null>(null)
  const [comp, setComp] = useState('')
  const [status, setStatus] = useState('')
  const [favOnly, setFavOnly] = useState(false)
  const ficheStatus = useStore((s) => s.ficheStatus)
  const favorites = useStore((s) => s.favorites)

  const list = useMemo(() => {
    const t = norm(q)
    return FICHES.filter(
      (f) =>
        (!onlyMethods || f.categorie === 'methode') &&
        (!tp || f.tps.includes(tp as never)) &&
        (!comp || f.comps.includes(comp as never)) &&
        (!status || (status === 'none' ? !ficheStatus[f.id] : ficheStatus[f.id] === status)) &&
        (!favOnly || favorites.includes(`fiche:${f.id}`)) &&
        (!t || norm([f.titre, f.definition, ...f.motsCles].join(' ')).includes(t)),
    )
  }, [q, tp, comp, status, favOnly, onlyMethods, ficheStatus, favorites])

  return (
    <>
      <PageHeader
        title={title}
        description={
          onlyMethods
            ? 'Les méthodes professionnelles utiles à l’oral (SMART, STAR, PDCA, 5 pourquoi…). Ce sont des outils pour structurer tes réponses, pas des exigences officielles : aucune n’est imposée par le règlement.'
            : `${FICHES.length} fiches synthétiques : concept, étapes, exemple, réponse type à l’oral, mots-clés et erreurs fréquentes.`
        }
        eyebrow={<KindBadge kind="pedagogique" />}
        actions={
          canPrint ? (
            <Button variant="outline" onClick={() => window.print()}>
              <Printer /> Imprimer la liste
            </Button>
          ) : (
            <Button variant="outline" disabled={!list.length} onClick={() => void saveTextFile(onlyMethods ? 'cfc-revision-methodes.html' : 'cfc-revision-fiches.html', fichesToHtml(list, title), 'text/html')} title="Enregistre un fichier à ouvrir dans ton navigateur, puis à imprimer ou à enregistrer en PDF.">
              <FileDown /> Télécharger les {list.length} fiches à imprimer
            </Button>
          )
        }
      />
      <div className="no-print mb-5 space-y-3 rounded-lg border bg-card p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden />
          <Input className="pl-9" aria-label="Recherche instantanée dans les fiches" placeholder="Recherche instantanée : SMART, réclamation, facture…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par tâche partielle">
            <Chip active={!tp} onClick={() => setTp(null)}>
              Toutes
            </Chip>
            {TPS.map((t) => (
              <Chip key={t.id} active={tp === t.id} onClick={() => setTp(t.id)}>
                {t.id.toUpperCase()}
              </Chip>
            ))}
          </div>
          <Select className="w-auto" aria-label="Filtrer par compétence" value={comp} onChange={(e) => setComp(e.target.value)}>
            <option value="">Toutes les compétences</option>
            {COMPETENCES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.court}
              </option>
            ))}
          </Select>
          <Select className="w-auto" aria-label="Filtrer par statut de maîtrise" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tous les statuts</option>
            <option value="none">Sans statut</option>
            <option value="todo">À travailler</option>
            <option value="progress">En cours</option>
            <option value="done">Maîtrisé</option>
          </Select>
          <Chip active={favOnly} onClick={() => setFavOnly((v) => !v)}>
            Favoris
          </Chip>
          <span className="ml-auto text-sm text-muted-foreground" role="status">
            {list.length} fiche{list.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Search} title="Aucune fiche ne correspond" />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((f) => (
            <li key={f.id}>
              <Link to={`/ressources/fiches/${f.id}`} className="block h-full rounded-lg">
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader className="pb-1">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle as="h2">{f.titre}</CardTitle>
                      <FavoriteButton id={`fiche:${f.id}`} label={f.titre} className="-mr-2 -mt-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{f.definition}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {f.tps.map((t) => (
                        <TpBadge key={t} tp={t} link={false} />
                      ))}
                      <Badge variant="muted">{f.comps.join(' · ')}</Badge>
                      {ficheStatus[f.id] && <Badge variant={STATUS[ficheStatus[f.id]].variant}>{STATUS[ficheStatus[f.id]].label}</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export function FicheDetail() {
  const { id } = useParams()
  const f = FICHES.find((x) => x.id === id)
  const status = useStore((s) => (id ? s.ficheStatus[id] : undefined))
  useDocumentTitle(f?.titre ?? 'Fiche')
  useRememberLocation(f ? `Fiche — ${f.titre}` : null)
  if (!f) return <Navigate to="/ressources/fiches" replace />

  return (
    <>
      <Link to={f.categorie === 'methode' ? '/ressources/methodes' : '/ressources/fiches'} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'no-print -ml-2 mb-3')}>
        <ArrowLeft /> {f.categorie === 'methode' ? 'Méthodes et outils' : 'Fiches de révision'}
      </Link>
      <PageHeader
        eyebrow={
          <>
            {f.tps.map((t) => (
              <TpBadge key={t} tp={t} />
            ))}
            {f.comps.map((c) => (
              <CompBadge key={c} comp={c} />
            ))}
          </>
        }
        title={f.titre}
        description={f.definition}
        actions={
          <>
            <FavoriteButton id={`fiche:${f.id}`} label={f.titre} />
            <MasteryPicker label="Statut de maîtrise de la fiche" value={status} onChange={(m) => actions.setFicheStatus(f.id, m)} />
            {canPrint ? (
              <>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer /> Imprimer
                </Button>
                <Button variant="outline" onClick={() => window.print()} title="Dans la boîte d’impression, choisis « Enregistrer au format PDF » comme destination.">
                  <FileDown /> Export PDF
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => void saveTextFile(`fiche-${f.id}.html`, ficheToHtml(f), 'text/html')} title="Enregistre la fiche dans un fichier à ouvrir dans ton navigateur, puis à imprimer ou à enregistrer en PDF.">
                <FileDown /> Télécharger pour imprimer ou PDF
              </Button>
            )}
          </>
        }
      />
      <p className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <KindBadge kind="pedagogique" />
        {f.officiel
          ? 'Synthèse pédagogique d’une notion traitée dans les guides pratiques et mandats fournis.'
          : 'Outil pédagogique complémentaire : il ne figure pas dans les documents fournis et aucun texte officiel ne l’impose. Utile pour structurer ta réponse.'}
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>À quoi ça sert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[15px] leading-7">{f.utilite}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Étapes d’application</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-1.5 pl-5 text-[15px] leading-7">
              {f.etapes.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              Exemple professionnel <KindBadge kind="exemple" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[15px] leading-7">{f.exemple}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              Réponse type à l’oral <KindBadge kind="correction" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="rounded-md border-l-4 border-primary bg-accent/40 px-4 py-3 text-[15px] leading-7">« {f.reponseOrale} »</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mots-clés à retenir</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-1.5">
              {f.motsCles.map((m) => (
                <li key={m}>
                  <Badge>{m}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Erreurs fréquentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Bullets items={f.erreurs} />
          </CardContent>
        </Card>
      </div>
      <div className="no-print mt-6 max-w-2xl">
        <NoteEditor id={`fiche:${f.id}`} placeholder="Mon exemple personnel pour cette fiche…" />
      </div>
    </>
  )
}
