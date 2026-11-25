import type { Fiche } from '@/types'

/**
 * Génère une version autonome et imprimable d'une ou plusieurs fiches (HTML simple, sans script).
 * Utilisée lorsque l'impression directe n'est pas possible : le fichier s'ouvre dans le navigateur,
 * d'où l'on imprime ou enregistre en PDF.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const ul = (items: string[], tag = 'ul') => `<${tag}>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</${tag}>`

const body = (f: Fiche) => `
<article>
  <h1>${esc(f.titre)}</h1>
  <p class="meta">${f.tps.map((t) => t.toUpperCase()).join(' · ')} — compétences ${f.comps.join(', ')} — ${f.officiel ? 'notion des guides et mandats fournis' : 'outil pédagogique complémentaire'}</p>
  <p class="def">${esc(f.definition)}</p>
  <h2>À quoi ça sert</h2><p>${esc(f.utilite)}</p>
  <h2>Étapes d’application</h2>${ul(f.etapes, 'ol')}
  <h2>Exemple professionnel</h2><p>${esc(f.exemple)}</p>
  <h2>Réponse type à l’oral</h2><p class="quote">« ${esc(f.reponseOrale)} »</p>
  <h2>Mots-clés à retenir</h2><p>${f.motsCles.map(esc).join(' · ')}</p>
  <h2>Erreurs fréquentes</h2>${ul(f.erreurs)}
</article>`

const page = (title: string, content: string) => `<!DOCTYPE html>
<html lang="fr-CH"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — CFC Révision</title>
<style>
  body{font:11pt/1.5 Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#111;max-width:46rem;margin:2rem auto;padding:0 1.25rem}
  h1{font-size:18pt;margin:0 0 .2rem} h2{font-size:11pt;margin:1.1rem 0 .25rem;text-transform:uppercase;letter-spacing:.04em;color:#3730a3}
  .meta{color:#555;font-size:9.5pt;margin:0 0 .8rem} .def{font-size:12pt}
  .quote{border-left:3px solid #4f46e5;padding:.3rem 0 .3rem .8rem;background:#f5f5ff}
  ol,ul{margin:.2rem 0;padding-left:1.3rem} li{margin:.15rem 0} p{margin:.3rem 0}
  article{break-after:page;padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:1px solid #ddd} article:last-child{break-after:auto;border:0}
  footer{color:#777;font-size:8.5pt;margin-top:1rem}
  @media print{body{margin:0;max-width:none} article{border:0}}
</style></head><body>${content}
<footer>CFC Révision — Article 32 · Objectif Réussite 2027. Fiche de synthèse pédagogique, sans valeur officielle.</footer>
</body></html>`

export const ficheToHtml = (f: Fiche) => page(f.titre, body(f))
export const fichesToHtml = (fs: Fiche[], title: string) => page(title, fs.map(body).join('\n'))
