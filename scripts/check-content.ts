/**
 * Contrôle de cohérence des contenus pédagogiques : volumes réels et intégrité des références.
 * Lancer avec : npm run check:content
 */
import { ALL_CARDS, ALL_QUIZ, CASES, EXAMS, FICHES, GLOSSARY, LESSONS, QUESTIONS, ROLEPLAYS } from '../src/data/index'
import { COMPETENCES, COMP_BY_ID, TPS } from '../src/data/referentiel'
import { ETAPES } from '../src/data/etapes'

const errors: string[] = []
const uniq = (label: string, ids: string[]) => {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${label} : identifiant en double « ${id} »`)
    seen.add(id)
  }
}
const comp = (label: string, c: string) => {
  if (!(c in COMP_BY_ID)) errors.push(`${label} : compétence inconnue « ${c} »`)
}

uniq('Fiches', FICHES.map((f) => f.id))
uniq('Questions', QUESTIONS.map((q) => q.id))
uniq('Cas', CASES.map((c) => c.id))
uniq('Jeux de rôle', ROLEPLAYS.map((r) => r.id))
uniq('Flashcards', ALL_CARDS.map((c) => c.id))
uniq('Quiz', ALL_QUIZ.map((q) => q.id))
uniq('Examens', EXAMS.map((e) => e.id))
uniq('Glossaire', GLOSSARY.map((g) => g.terme))

const ficheIds = new Set(FICHES.map((f) => f.id))
for (const c of COMPETENCES) {
  if (!LESSONS.some((l) => l.comp === c.id)) errors.push(`Leçon manquante pour ${c.id}`)
  if (!ETAPES[c.id]) errors.push(`Étapes manquantes pour ${c.id}`)
}
for (const l of LESSONS) {
  for (const m of l.methodes) if (m.ficheId && !ficheIds.has(m.ficheId)) errors.push(`Leçon ${l.comp} : fiche inconnue « ${m.ficheId} »`)
  for (const q of l.quiz) if (q.bonne < 0 || q.bonne >= q.choix.length) errors.push(`Quiz ${q.id} : index de bonne réponse invalide`)
  if (l.quiz.length < 3) errors.push(`Leçon ${l.comp} : moins de 3 questions de quiz`)
}
FICHES.forEach((f) => f.comps.forEach((c) => comp(`Fiche ${f.id}`, c)))
CASES.forEach((c) => c.comps.forEach((x) => comp(`Cas ${c.id}`, x)))
ROLEPLAYS.forEach((r) => r.comps.forEach((x) => comp(`Jeu de rôle ${r.id}`, x)))
GLOSSARY.forEach((g) => g.comps.forEach((x) => comp(`Glossaire ${g.terme}`, x)))
for (const e of EXAMS) {
  const tps = e.taches.map((t) => t.tp).join(',')
  if (tps !== 'tp1,tp2,tp3,tp4,tp5') errors.push(`Examen ${e.id} : tâches ${tps}`)
  for (const t of e.taches) if (t.taches.length !== (t.tp === 'tp5' ? 4 : 3)) errors.push(`Examen ${e.id} ${t.tp} : ${t.taches.length} sous-tâches`)
}
for (const tp of TPS) {
  const total = tp.deroulement.reduce((s, d) => s + d.minutes, 0)
  if (total !== tp.dureeMin) errors.push(`${tp.id} : déroulement ${total} min ≠ ${tp.dureeMin}`)
  const pts = tp.criteres.reduce((s, c) => s + c.points, 0)
  if (pts !== tp.points) errors.push(`${tp.id} : critères ${pts} pts ≠ ${tp.points}`)
}

const byLevel = [1, 2, 3].map((n) => QUESTIONS.filter((q) => q.niveau === n).length)
const perComp = COMPETENCES.map((c) => `${c.id}:${QUESTIONS.filter((q) => q.comp === c.id && q.tp !== 'tp5').length}`).join(' ')
const words = (v: unknown): number => (typeof v === 'string' ? v.split(/\s+/).filter(Boolean).length : Array.isArray(v) ? v.reduce((s: number, x) => s + words(x), 0) : v && typeof v === 'object' ? Object.values(v).reduce((s: number, x) => s + words(x), 0) : 0)

console.log('Couverture réelle des contenus')
console.table({
  'Leçons (objectif 23)': LESSONS.length,
  'Fiches (objectif 50)': FICHES.length,
  '  dont méthodes': FICHES.filter((f) => f.categorie === 'methode').length,
  'Questions orales (objectif 150)': QUESTIONS.length,
  '  dont TP5': QUESTIONS.filter((q) => q.tp === 'tp5').length,
  'Cas pratiques (objectif 30)': CASES.length,
  'Jeux de rôle': ROLEPLAYS.length,
  'Flashcards (objectif 100)': ALL_CARDS.length,
  'Questions de quiz': ALL_QUIZ.length,
  'Examens blancs (objectif 5)': EXAMS.length,
  'Termes du glossaire': GLOSSARY.length,
})
console.log('Questions par niveau (débutant, intermédiaire, examen) :', byLevel.join(' / '))
console.log('Questions par compétence :', perComp)
console.log('Cas par TP :', TPS.map((t) => `${t.id}:${CASES.filter((c) => c.tp === t.id).length}`).join(' '))
console.log('Mots par leçon (moyenne) :', Math.round(LESSONS.reduce((s, l) => s + words(l), 0) / LESSONS.length))
console.log('Mots au total :', words({ LESSONS, FICHES, QUESTIONS, CASES, ROLEPLAYS, ALL_CARDS, EXAMS, GLOSSARY }))

if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :\n- ` + errors.join('\n- '))
  process.exit(1)
}
console.log('\nAucune incohérence détectée.')
