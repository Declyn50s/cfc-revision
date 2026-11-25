import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, Cloud, Copy, Download, RotateCcw, Trash2, Upload } from 'lucide-react'
import { actions, exportState, storageIsPersistent, useStore } from '@/services/store'
import { coach } from '@/services/coach'
import { copyText, embedded, saveTextFile } from '@/services/platform'
import { syncNow, useCloudStatus } from '@/services/cloud'
import { gradeFromPoints, minPointsToPass } from '@/services/grading'
import { fmtDateTime, todayISO } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfirmDialog, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input, Label, Select, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Chip, KindBadge, PageHeader } from '@/components/shared/bits'

export default function Parametres() {
  useDocumentTitle('Paramètres')
  const settings = useStore((s) => s.settings)
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [confirm, setConfirm] = useState<'results' | 'all' | null>(null)
  const [pending, setPending] = useState<unknown>(null)

  const cloud = useCloudStatus()
  const [manual, setManual] = useState<{ mode: 'export' | 'import'; text: string } | null>(null)

  const doExport = async () => {
    const json = exportState()
    const res = await saveTextFile(`cfc-revision-${todayISO()}.json`, json)
    if (res === 'saved') setMsg({ ok: true, text: 'Export enregistré. Conserve ce fichier : il contient toutes tes données personnelles.' })
    else if (res === 'declined') setMsg({ ok: false, text: 'Enregistrement annulé.' })
    else setManual({ mode: 'export', text: json }) // téléchargement impossible ici : on propose la copie
  }

  const parseImport = (text: string) => {
    try {
      const data = JSON.parse(text)
      if (data?.app !== 'cfc-revision' || typeof data.state !== 'object') throw new Error('format')
      setManual(null)
      setPending(data.state)
    } catch {
      setMsg({ ok: false, text: 'Contenu illisible : il faut un export « cfc-revision-….json » produit par cette application.' })
    }
  }

  const onFile = async (f: File | undefined) => {
    if (!f) return
    try {
      parseImport(await f.text())
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <>
      <PageHeader title="Paramètres" description="Date d’examen, domaine du TP4, affichage, sauvegarde et réinitialisation." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Examen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="p-date">Date de l’examen (session 2027)</Label>
              <Input id="p-date" type="date" className="max-w-xs" value={settings.examDate ?? ''} onChange={(e) => actions.updateSettings({ examDate: e.target.value || null })} />
              <p className="mt-1 text-xs text-muted-foreground">À renseigner d’après ta convocation. Sert au compte à rebours et au programme.</p>
            </div>
            <div>
              <Label htmlFor="p-tp4">Domaine spécifique du TP4</Label>
              <Select id="p-tp4" className="max-w-xs" value={settings.tp4Focus} onChange={(e) => actions.updateSettings({ tp4Focus: e.target.value as typeof settings.tp4Focus })}>
                <option value="les-deux">Pas encore confirmé — réviser les deux</option>
                <option value="contenu">Développement de contenu</option>
                <option value="infrastructure">Infrastructure technologique</option>
              </Select>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <KindBadge kind="a-verifier" /> Les deux variantes figurent dans la série zéro. Confirme la tienne auprès de la CIFC.
              </p>
            </div>
            <div>
              <p className="mb-1.5 flex flex-wrap items-center gap-2 text-sm font-medium">
                Calcul de la note <KindBadge kind="officiel" />
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                Note = (points × 5 ÷ 45) + 1, arrondie à la demi-note ou à la note entière supérieure (4,25 → 4,5 ; 5,74 → 6,0). La note 4,0 est donc atteinte dès {minPointsToPass()} points sur 45 ; 30 points donnent {gradeFromPoints(30).toFixed(1)}. Source : guide CIFC, version 2026, page 31.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affichage</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="mb-1.5 block text-sm font-medium" id="theme-l">
              Thème
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="theme-l">
              {(
                [
                  ['light', 'Clair'],
                  ['dark', 'Sombre'],
                  ['system', 'Selon le système'],
                ] as const
              ).map(([v, l]) => (
                <Chip key={v} active={settings.theme === v} onClick={() => actions.updateSettings({ theme: v })}>
                  {l}
                </Chip>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Temps hebdomadaire et durée des séances : dans{' '}
              <Link to="/programme" className="link">
                Mon programme de révision
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes données</CardTitle>
            <CardDescription>
              {storageIsPersistent()
                ? 'Tout est enregistré automatiquement dans ce navigateur, sur cet appareil.'
                : 'Le stockage du navigateur est indisponible : exporte tes données avant de fermer la page.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={doExport}>
                <Download /> Exporter mes données
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <Upload /> Importer un export
              </Button>
              <Button variant="ghost" onClick={() => setManual({ mode: 'import', text: '' })}>
                Coller un export
              </Button>
              <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Fichier d’export à importer" onChange={(e) => onFile(e.target.files?.[0])} tabIndex={-1} />
            </div>
            {cloud.kind !== 'absent' && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border bg-muted/40 px-3 py-2 text-sm" role="status">
                <Cloud className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1">
                  {cloud.kind === 'connecting' && 'Connexion à la sauvegarde de ton compte…'}
                  {cloud.kind === 'pending' && 'Modifications en attente de sauvegarde sur ton compte…'}
                  {cloud.kind === 'synced' && `Sauvegardé aussi dans ton espace privé sur claude.ai (${fmtDateTime(cloud.at)}). Tes révisions te suivent sur tes autres appareils.`}
                  {cloud.kind === 'error' && `Sauvegarde sur ton compte indisponible : ${cloud.message} Les données restent dans ce navigateur.`}
                </span>
                {(cloud.kind === 'pending' || cloud.kind === 'error') && (
                  <Button variant="outline" size="sm" onClick={() => void syncNow()}>
                    Sauvegarder maintenant
                  </Button>
                )}
              </div>
            )}
            {msg && (
              <p role="status" className={`mt-3 text-sm ${msg.ok ? 'text-success' : 'text-destructive'}`}>
                {msg.text}
              </p>
            )}
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Pour changer d’appareil ou de navigateur : exporte ici, puis importe le fichier de l’autre côté. Fais un export régulier, les données d’un navigateur peuvent être effacées avec son historique.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Réinitialisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-sm text-sm leading-6">
                <span className="font-medium">Réinitialiser les résultats.</span> <span className="text-muted-foreground">Efface progression, historique, flashcards et examens. Conserve notes, favoris, exemples STAR et réglages.</span>
              </p>
              <Button variant="outline" onClick={() => setConfirm('results')}>
                <RotateCcw /> Réinitialiser
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              <p className="max-w-sm text-sm leading-6">
                <span className="font-medium">Tout effacer.</span> <span className="text-muted-foreground">Supprime absolument toutes tes données de ce navigateur.</span>
              </p>
              <Button variant="destructive" onClick={() => setConfirm('all')}>
                <Trash2 /> Tout effacer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              <Bot className="size-4 text-muted-foreground" aria-hidden /> Coach pédagogique
              <Badge variant="muted">{coach.isAI ? 'IA connectée' : 'Aucune IA connectée'}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="max-w-3xl text-sm leading-6">
              Fournisseur actif : <span className="font-medium">{coach.label}</span>. Les corrections, relances et analyses proviennent de contenus prédéfinis et d’une comparaison de mots-clés. Aucune connexion à une intelligence artificielle n’est simulée.
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              L’application est prête pour un coach IA (explications alternatives, rôle d’expert, analyse des réponses, génération de cas) : il suffira d’ajouter un fournisseur distant derrière un service qui détient la clé, sans modifier les pages. Voir <code className="rounded bg-muted px-1">src/services/coach.ts</code>.
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!manual} onOpenChange={(o) => !o && setManual(null)}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{manual?.mode === 'export' ? 'Copier mes données' : 'Coller un export'}</DialogTitle>
          <DialogDescription>
            {manual?.mode === 'export'
              ? `Le téléchargement direct n’est pas possible ${embedded ? 'dans cette vue' : 'ici'}. Copie ce texte et conserve-le dans un fichier « cfc-revision.json ».`
              : 'Colle ici le contenu complet d’un export produit par cette application.'}
          </DialogDescription>
          {manual && (
            <>
              <label htmlFor="manual-json" className="sr-only">
                Données au format JSON
              </label>
              <Textarea
                id="manual-json"
                className="mt-4 min-h-[220px] font-mono text-xs"
                value={manual.text}
                readOnly={manual.mode === 'export'}
                onChange={(e) => setManual({ ...manual, text: e.target.value })}
                onFocus={(e) => manual.mode === 'export' && e.currentTarget.select()}
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setManual(null)}>
                  Fermer
                </Button>
                {manual.mode === 'export' ? (
                  <Button
                    onClick={async () => {
                      const ok = await copyText(manual.text)
                      setMsg(ok ? { ok: true, text: 'Données copiées dans le presse-papiers.' } : { ok: false, text: 'Copie automatique refusée : sélectionne le texte et copie-le manuellement.' })
                      if (ok) setManual(null)
                    }}
                  >
                    <Copy /> Copier
                  </Button>
                ) : (
                  <Button disabled={!manual.text.trim()} onClick={() => parseImport(manual.text)}>
                    <Upload /> Importer
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirm === 'results'}
        onOpenChange={(o) => !o && setConfirm(null)}
        title="Réinitialiser tous les résultats ?"
        description="Progression, historique, répétition espacée, temps de révision et examens blancs seront effacés. Cette action est irréversible. Pense à exporter tes données avant."
        confirmLabel="Réinitialiser les résultats"
        onConfirm={() => {
          actions.resetResults()
          setMsg({ ok: true, text: 'Résultats réinitialisés.' })
        }}
      />
      <ConfirmDialog
        open={confirm === 'all'}
        onOpenChange={(o) => !o && setConfirm(null)}
        title="Effacer toutes les données ?"
        description="Résultats, notes, favoris, flashcards personnelles, exemples STAR et réglages seront supprimés définitivement."
        confirmLabel="Tout effacer"
        onConfirm={() => {
          actions.resetAll()
          setMsg({ ok: true, text: 'Toutes les données ont été effacées.' })
        }}
      />
      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title="Remplacer les données actuelles ?"
        description="L’import remplace toutes les données présentes dans ce navigateur par celles du fichier."
        confirmLabel="Importer et remplacer"
        onConfirm={() => {
          actions.importState(pending)
          setPending(null)
          setMsg({ ok: true, text: 'Données importées.' })
        }}
      />
    </>
  )
}
