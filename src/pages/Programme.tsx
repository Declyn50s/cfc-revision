import { Link } from 'react-router-dom'
import { ArrowRight, Timer } from 'lucide-react'
import { actions, useStore } from '@/services/store'
import { phase, weeklyPlan } from '@/services/planner'
import { weekMinutes } from '@/services/progress'
import { COMP_BY_ID } from '@/data/referentiel'
import { addDays, fmtDate, fmtDuration, mondayOf, pct, todayISO } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, Label, Select, Textarea } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Chip, PageHeader, Stat, TpBadge } from '@/components/shared/bits'

export default function Programme() {
  useDocumentTitle('Mon programme de révision')
  const s = useStore((x) => x)
  const plan = weeklyPlan(s)
  const ph = phase(s)
  const monday = mondayOf(todayISO())
  const done = weekMinutes(s, monday)
  const weekActs = s.activity.filter((a) => mondayOf(a.date.slice(0, 10)) === monday)
  const evaluated = weekActs.filter((a) => a.score !== undefined)
  const avg = evaluated.length ? evaluated.reduce((x, a) => x + (a.score ?? 0), 0) / evaluated.length : null
  const prevWeeks = Object.keys(s.weekly).filter((k) => k !== monday && s.weekly[k].trim()).sort().reverse()

  return (
    <>
      <PageHeader
        title="Mon programme de révision"
        description="Le programme se recalcule à chaque visite à partir de ta date d’examen, de ton temps disponible et de tes résultats réels. Les compétences les moins maîtrisées passent en premier."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Réglages</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="exam-date">Date de l’examen</Label>
              <Input id="exam-date" type="date" value={s.settings.examDate ?? ''} min={todayISO()} onChange={(e) => actions.updateSettings({ examDate: e.target.value || null })} />
            </div>
            <div>
              <Label htmlFor="weekly">Temps disponible par semaine</Label>
              <Select id="weekly" value={s.settings.weeklyMinutes} onChange={(e) => actions.updateSettings({ weeklyMinutes: Number(e.target.value) })}>
                {[60, 90, 120, 180, 240, 300, 360, 480].map((m) => (
                  <option key={m} value={m}>
                    {fmtDuration(m)}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium" id="len-label">
                Durée d’une séance
              </span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="len-label">
                {([15, 30, 45, 60] as const).map((m) => (
                  <Chip key={m} active={s.settings.sessionLength === m} onClick={() => actions.updateSettings({ sessionLength: m })}>
                    {m} min
                  </Chip>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Phase actuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{ph.nom}</Badge>
            {ph.weeks !== null && <p className="mt-2 text-2xl font-semibold tabular-nums">{ph.weeks} semaine{ph.weeks > 1 ? 's' : ''}</p>}
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{ph.detail}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">
        Semaine du {fmtDate(monday, { day: 'numeric', month: 'long' })} au {fmtDate(addDays(monday, 6), { day: 'numeric', month: 'long' })}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plan.sessions.map((sess) => (
          <Card key={sess.numero}>
            <CardHeader>
              <CardTitle as="h3" className="flex items-center justify-between gap-2">
                <span>
                  Séance {sess.numero} · {sess.minutes} min
                </span>
                {sess.focus && <TpBadge tp={COMP_BY_ID[sess.focus].tp} />}
              </CardTitle>
              {sess.focus && (
                <CardDescription>
                  Compétence visée : {sess.focus} — {COMP_BY_ID[sess.focus].court}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ol className="space-y-1">
                {sess.items.map((it, i) => (
                  <li key={i}>
                    <Link to={it.path} className="group flex items-center gap-2 rounded-md px-1 py-1.5 text-sm hover:bg-muted">
                      <span className="w-12 shrink-0 text-xs tabular-nums text-muted-foreground">{it.minutes} min</span>
                      <span className="min-w-0 flex-1 truncate group-hover:underline">{it.label}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
        {plan.exam && (
          <Card className="border-primary/40">
            <CardHeader>
              <CardTitle as="h3" className="flex items-center gap-2">
                <Timer className="size-4" aria-hidden /> Examen blanc · 65 min
              </CardTitle>
              <CardDescription>15 minutes de préparation puis 5 × 10 minutes, sans aide.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/entrainement/examens" className="link text-sm">
                Choisir un examen blanc
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Bilan hebdomadaire</h2>
      <Card>
        <CardContent className="pt-5">
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Stat label="Temps de révision cette semaine" value={fmtDuration(done)} hint={`objectif ${fmtDuration(s.settings.weeklyMinutes)}`} />
              <Progress className="mt-2" value={done / s.settings.weeklyMinutes} label="Temps de révision de la semaine par rapport à l’objectif" />
            </div>
            <Stat label="Activités" value={weekActs.length} />
            <Stat label="Résultat moyen" value={avg === null ? '—' : pct(avg)} hint={avg === null ? 'aucune activité évaluée' : `${evaluated.length} évaluée${evaluated.length > 1 ? 's' : ''}`} />
          </div>
          <div className="mt-5">
            <Label htmlFor="bilan">Mon bilan de la semaine : ce qui a bien marché, ce qui a bloqué, ce que je change la semaine prochaine</Label>
            <Textarea id="bilan" value={s.weekly[monday] ?? ''} onChange={(e) => actions.setWeekly(monday, e.target.value)} placeholder="Trois lignes suffisent. Sauvegarde automatique." />
          </div>
          {prevWeeks.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">Bilans précédents ({prevWeeks.length})</summary>
              <ul className="mt-2 space-y-3">
                {prevWeeks.map((w) => (
                  <li key={w} className="rounded-md border p-3 text-sm leading-6">
                    <p className="text-xs text-muted-foreground">Semaine du {fmtDate(w)}</p>
                    <p className="whitespace-pre-wrap">{s.weekly[w]}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </CardContent>
      </Card>
    </>
  )
}
