import { CASES, FICHES, GLOSSARY, LESSONS, QUESTIONS, ROLEPLAYS } from '@/data'
import { COMPETENCES, COMP_BY_ID, TPS } from '@/data/referentiel'
import type { TpId } from '@/types'
import { norm } from '@/lib/utils'

export type SearchKind = 'Tâche partielle' | 'Compétence' | 'Cours' | 'Fiche' | 'Méthode' | 'Question' | 'Cas pratique' | 'Jeu de rôle' | 'Glossaire'

export interface SearchDoc {
  kind: SearchKind
  title: string
  subtitle: string
  path: string
  tp?: TpId
  /** Texte normalisé : titre (poids fort), mots-clés (poids moyen), corps (poids faible). */
  t: string
  k: string
  b: string
}

let index: SearchDoc[] | null = null

function build(): SearchDoc[] {
  const docs: SearchDoc[] = []
  const add = (d: Omit<SearchDoc, 't' | 'k' | 'b'>, keywords: string, body: string) =>
    docs.push({ ...d, t: norm(d.title), k: norm(keywords), b: norm(body) })

  for (const tp of TPS) add({ kind: 'Tâche partielle', title: tp.titre, subtitle: `${tp.methode} · ${tp.court}`, path: `/apprendre/${tp.id}`, tp: tp.id }, tp.court + ' ' + tp.methode, tp.methodeDetail)
  for (const c of COMPETENCES)
    add({ kind: 'Compétence', title: `${c.id} — ${c.titre}`, subtitle: c.court, path: `/apprendre/${c.tp}/${c.id}`, tp: c.tp }, c.court + ' ' + c.id, c.mandats.join(' '))
  for (const l of LESSONS) {
    const c = COMP_BY_ID[l.comp]
    add(
      { kind: 'Cours', title: `Leçon ${c.id} — ${c.court}`, subtitle: c.titre, path: `/apprendre/${c.tp}/${c.id}`, tp: c.tp },
      l.methodes.map((m) => m.nom).join(' ') + ' ' + l.recap.join(' '),
      [l.definition, ...l.aSavoir, l.exemple, l.situation, ...l.explication.map((b) => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : b.rows.flat().join(' ')))].join(' '),
    )
  }
  for (const f of FICHES)
    add(
      { kind: f.categorie === 'methode' ? 'Méthode' : 'Fiche', title: f.titre, subtitle: f.definition, path: `/ressources/fiches/${f.id}`, tp: f.tps[0] },
      f.motsCles.join(' ') + ' ' + f.comps.join(' '),
      [f.utilite, ...f.etapes, f.exemple].join(' '),
    )
  for (const q of QUESTIONS)
    add({ kind: 'Question', title: q.q, subtitle: `${q.comp} · ${q.theme}`, path: `/entrainement/questions?q=${q.id}`, tp: q.tp }, q.theme + ' ' + q.motsCles.join(' ') + ' ' + q.comp, '')
  for (const c of CASES)
    add({ kind: 'Cas pratique', title: c.titre, subtitle: `${c.secteur} · ${c.comps.join(', ')}`, path: `/entrainement/cas/${c.id}`, tp: c.tp }, c.secteur + ' ' + c.comps.join(' '), c.situation + ' ' + c.contexte)
  for (const r of ROLEPLAYS)
    add({ kind: 'Jeu de rôle', title: r.titre, subtitle: r.role, path: `/entrainement/jeux-de-role/${r.id}`, tp: r.tp }, r.comps.join(' '), r.contexte)
  for (const g of GLOSSARY) add({ kind: 'Glossaire', title: g.terme, subtitle: g.definition, path: `/ressources/glossaire?t=${encodeURIComponent(g.terme)}` }, g.comps.join(' '), g.definition)
  return docs
}

const KIND_ORDER: SearchKind[] = ['Cours', 'Compétence', 'Fiche', 'Méthode', 'Tâche partielle', 'Cas pratique', 'Jeu de rôle', 'Question', 'Glossaire']

export function search(query: string, limitPerKind = 5): { kind: SearchKind; items: SearchDoc[] }[] {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1 || /\d/.test(t))
  if (!terms.length) return []
  index ??= build()
  const scored: { d: SearchDoc; s: number }[] = []
  for (const d of index) {
    let s = 0
    let all = true
    for (const t of terms) {
      const inT = d.t.includes(t)
      const inK = d.k.includes(t)
      const inB = d.b.includes(t)
      if (!inT && !inK && !inB) {
        all = false
        break
      }
      s += (inT ? (d.t.startsWith(t) || d.t.includes(' ' + t) ? 10 : 6) : 0) + (inK ? 4 : 0) + (inB ? 1 : 0)
    }
    if (all) scored.push({ d, s })
  }
  scored.sort((a, b) => b.s - a.s)
  return KIND_ORDER.map((kind) => ({ kind, items: scored.filter((x) => x.d.kind === kind).slice(0, limitPerKind).map((x) => x.d) })).filter((g) => g.items.length)
}
