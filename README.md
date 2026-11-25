# CFC Révision — Article 32 · Objectif Réussite 2027

Application web de révision pour l’**examen pratique oral** du CFC d’employé-e de commerce, branche Services et administration (répétition par la voie de l’article 32).

Périmètre strict : les cinq tâches partielles de l’examen pratique (TP1 à TP5). Les examens scolaires, la culture générale, les langues, le TPA, les notes d’expérience et les contrôles de compétences des CI ne sont pas traités.

## Démarrer

```bash
npm install
npm run dev            # développement — http://localhost:5173
npm run build          # version de production dans dist/
npm run build:single   # un seul fichier autonome : dist-single/index.html
npm run check:content  # volumes réels et cohérence des contenus
```

Sans Node.js : ouvrir `dist-single/index.html` dans un navigateur. Tout fonctionne hors ligne.

## Pile technique

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · composants au format shadcn/ui (`src/components/ui`, Radix Dialog) · Lucide React · React Router 6 · Recharts · LocalStorage.

## Architecture

```
src/
  types/            Types du domaine et de l’état persistant
  data/             Données pédagogiques, sans logique
    referentiel.ts  TP, domaines, 23 compétences, sources, points à vérifier
    etapes.ts       Étapes opérationnelles relevées dans les guides fournis
    lessons/        23 leçons (a.ts … e.ts)
    fiches.ts · questions*.ts · cases.ts · roleplays.ts · flashcards.ts · exams.ts · glossary.ts · tp5.ts
  services/
    storage.ts      Adaptateur de persistance (LocalStorage, repli mémoire)
    store.ts        État global, actions, sauvegarde automatique, export / import
    srs.ts          Répétition espacée (variante SM-2 à quatre réponses)
    grading.ts      Formule de note, arrondi, résultat d’examen       ← logique d’évaluation
    progress.ts     Progression par compétence et par TP, points faibles ← logique de progression
    planner.ts      Programme de révision et prochaine séance
    search.ts       Moteur de recherche global
    coach.ts        Interface CoachProvider + coach local (sans IA)
    platform.ts     Téléchargement, copie, impression selon le contexte d’exécution
    cloud.ts        Sauvegarde distante facultative (page hébergée sur claude.ai)
    printable.ts    Fiches en HTML imprimable
  hooks/            Minuteries, thème, temps de révision, mémorisation de la page
  components/       ui/ (primitives) · layout/ (coquille, navigation, recherche) · shared/
  pages/            Une page par entrée de navigation
scripts/check-content.ts
```

### Règles de conception

- **Trois clics au plus** : barre latérale → tâche partielle → leçon. Recherche globale par `Ctrl/Cmd + K`.
- **Toujours situé** : fil d’Ariane, pastille de TP colorée et code de compétence sur chaque contenu.
- **Nature du contenu toujours visible** : exigence officielle · explication pédagogique · exemple d’entraînement · correction indicative · à vérifier.
- **Aucune donnée inventée** : progression, temps et statistiques ne proviennent que de l’activité enregistrée.
- **La correction vient après l’essai** : questions, cas, jeux de rôle ; jamais pendant le mode examen.
- Accessibilité : contrôle automatique axe-core (WCAG 2.2 AA) sans violation sur 17 écrans, en clair et en sombre ; navigation au clavier, lien d’évitement, alternatives textuelles aux graphiques.

### Calculs

- Note : `(points × 5 ÷ 45) + 1`, arrondie à la demi-note ou à la note entière supérieure (guide CIFC 2026, p. 31) ; 4,0 dès 23 points.
- Compétence : 25 % leçon · 20 % mini-quiz · 35 % moyenne des cinq derniers entraînements évalués · 20 % flashcards consolidées.
- TP5 : 40 % préparation (deux compétences choisies et justifiées, une situation complète pour chacune) · 60 % entraînements TP5.

## Couverture des contenus (vérifiée par `npm run check:content`)

| Contenu | Objectif | Livré |
| --- | --- | --- |
| Leçons (compétences non optionnelles) | 23 | 23 |
| Fiches de révision | 50 | 56 (dont les 18 méthodes demandées) |
| Questions orales | 150 | 150 (138 par compétence + 12 TP5 ; trois niveaux) |
| Cas pratiques | 30 | 30 (TP1 : 8 · TP2 : 9 · TP3 : 7 · TP4 : 6) |
| Jeux de rôle | — | 12 (6 TP3, 6 TP4) |
| Flashcards | 100 | 108 |
| Questions de quiz | — | 69 |
| Examens blancs complets | 5 | 5 |
| Glossaire | — | 88 termes |

## Sources et limites

Analysés :

- Directive « Travail pratique » Employée/Employé de commerce CFC SA, CIFC Suisse, 10.10.2025 (28 pages) — **référence pour le déroulement, les critères et la grille d’évaluation**
- Guide CIFC « Employé-e-s de commerce CFC Services et administration », version 2026 (36 pages)
- Série zéro 1 du travail pratique, version candidat-e-s (20.10.2025)
- Vue d’ensemble des compétences opérationnelles (2023)
- 73 mandats pratiques et guides pratiques Konvink (captures d’écran lues par OCR)
- Fiche de révision personnelle du 6 juin 2026

Repris tels quels des documents officiels : structure de l’examen, déroulement en étapes de chaque tâche partielle, pondération de 20 %, moyens auxiliaires, trois critères par tâche avec le descripteur « 3 points », niveaux de qualité de 0 à 3, quatre étapes et critères du TP5, formule et arrondi de la note, intitulés des compétences.

**Toujours absent** : la série zéro en version expert-e-s (solutions, tâche 5). Les corrections des cas, questions et examens blancs sont donc indicatives ; aucune question n’est une question officielle d’examen.

**À confirmer auprès de la CIFC Vaud** : le domaine spécifique du TP4 attribué à un candidat article 32 (la directive le lie au contrôle de compétences CI 2).

## Évolutions prévues par l’architecture

- **Coach IA** : écrire une classe `RemoteCoach implements CoachProvider` qui appelle un service côté serveur détenant la clé, puis remplacer l’export `coach`. Aucune clé dans le frontend.
- **Supabase** : fournir un `StorageAdapter` distant ; `cloud.ts` montre le contrat (lecture au démarrage, la copie la plus récente gagne, écriture différée).
- **Compétences optionnelles** (c6, d5, d6, e5, e6) : listées séparément, non intégrées tant que leur pertinence n’est pas confirmée.
- **IndexedDB** si le volume de données personnelles l’exige.
