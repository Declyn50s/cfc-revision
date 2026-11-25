import type { CompId, Competence, Domain, OptionalCompetence, SourceDoc, TaskPart, TpId } from '@/types'

// ───────────── Sources documentaires ─────────────
// « fourni » = présent dans l'archive remise ; « manquant » = cité dans le cahier des charges mais absent de l'archive.

export const SOURCES: SourceDoc[] = [
  {
    id: 'serie0',
    titre: 'Série zéro 1 du travail pratique — cas « TechnoSoft Solutions GmbH » (version candidat-e-s, V1.0 du 20.10.2025)',
    editeur: 'Procédure de qualification Employé-e de commerce CFC, branche Services et administration',
    statut: 'fourni',
    detail:
      'Exemple officiel de cas d’examen : situation initiale, tâches partielles 1 à 4 avec leurs critères, deux variantes du TP4. Reçue en deux exemplaires identiques (V1.0 du 20.10.2025). La version candidat-e-s ne contient ni le TP5 ni les solutions.',
  },
  {
    id: 'mandats',
    titre: '73 mandats pratiques (A1 à E6), versions 2021–2023',
    editeur: 'Konvink AG / CIFC',
    statut: 'fourni',
    detail: 'Un à six mandats par compétence opérationnelle. Utilisés pour déterminer ce qu’il faut savoir faire concrètement dans chaque compétence.',
  },
  {
    id: 'konvink',
    titre: 'Éléments d’apprentissage Konvink (captures d’écran des guides pratiques a1 à e6)',
    editeur: 'Konvink AG',
    statut: 'fourni',
    detail: 'Guides pratiques avec les étapes opérationnelles de chaque compétence. Lus par reconnaissance de caractères : les leçons en reprennent la structure, reformulée.',
  },
  {
    id: 'fiche-perso',
    titre: 'Fiche de révision personnelle — oral du 6 juin 2026',
    editeur: 'Document personnel',
    statut: 'fourni',
    detail: 'Format de l’oral tel que vécu en 2026, moyens autorisés, option du TP4 et trois situations professionnelles personnelles.',
  },
  {
    id: 'guide-cifc',
    titre: 'Guide pour la formation Employé-e de commerce CFC Services et administration (version 2026)',
    editeur: 'CIFC Suisse',
    statut: 'fourni',
    detail:
      'Lu en entier (36 pages). Page 5 : profil de qualification et intitulés des compétences a1 à e6. Page 6 : les quatre dimensions d’une compétence opérationnelle. Page 11 : procédure de qualification pour adultes (article 32 OFPr). Page 30 : étude de cas dirigée, 15 minutes de préparation, 50 minutes d’examen, au moins deux expert-e-s, aucune pause, notes manuscrites utilisables. Page 31 : cinq tâches partielles, méthodes, 9 points chacune, formule de la note et arrondi.',
  },
  {
    id: 'profil',
    titre: 'Profil de qualification Employée/Employé de commerce CFC',
    editeur: 'SEFRI / CSBFC',
    statut: 'fourni',
    detail: 'Le tableau des domaines et des compétences opérationnelles figure à la page 5 du guide CIFC : les intitulés a1 à e4 de l’application ont été vérifiés mot pour mot. Le document séparé du profil de qualification n’a pas été fourni.',
  },
  {
    id: 'dispositions',
    titre: 'Dispositions d’exécution relatives à la procédure de qualification avec examen final (version 3 du 13.07.2022)',
    editeur: 'CSBFC',
    statut: 'consulte-en-ligne',
    detail:
      'Version nationale consultée en ligne : travail pratique de 50 minutes devant au moins deux expert-e-s, note arrondie à la note entière ou à la demi-note, note minimale 4. Une version plus récente peut exister.',
    url: 'https://www.swissbanking.ch/_Resources/Persistent/e/3/1/2/e312994692bf59ee21f7d543d8dbd63f9893f114/FR_Ausfuehrungsbestimmungen_QV_2023_V3_20220713.pdf',
  },
  {
    id: 'directive',
    titre: 'Directive « Travail pratique » Employée/Employé de commerce CFC Services et administration (10.10.2025)',
    editeur: 'CIFC Suisse (IGKG Schweiz)',
    statut: 'fourni',
    detail:
      'Lue en entier (28 pages). Concrétise les dispositions d’exécution : déroulement détaillé de chaque tâche partielle, pondération de 20 % par tâche, moyens auxiliaires (de quoi prendre des notes et une calculatrice), convocation, absences, recours, et en annexe 2 la grille d’évaluation complète avec les niveaux de qualité de 0 à 3 points. C’est la référence de l’application pour les critères et l’auto-évaluation.',
  },
  {
    id: 'vue-ensemble',
    titre: 'Vue d’ensemble des compétences opérationnelles des employées et employés de commerce CFC (2023)',
    editeur: 'CSBFC',
    statut: 'fourni',
    detail: 'Tableau des domaines a à e et des compétences a1 à e6. Concorde avec la page 5 du guide CIFC, à une nuance de formulation près pour b4 (« tâches de gestion de projets » en 2023, « tâches de gestion » dans le guide 2026).',
  },
  {
    id: 'solutions',
    titre: 'Série zéro en version expert-e-s (solutions et tâche partielle 5)',
    editeur: 'CIFC Suisse',
    statut: 'manquant',
    detail: 'Non fournie ; elle n’est en principe pas diffusée aux candidat-e-s. Les corrections des cas, questions et examens blancs de l’application restent donc indicatives.',
  },
]

export const A_VERIFIER: { point: string; pourquoi: string; aupres: string }[] = [
  {
    point: 'Ton domaine spécifique pour le TP4',
    pourquoi: 'Selon la directive, le TP4 correspond au domaine choisi dans le contrôle de compétences CI 2 (« développement de contenu » ou « infrastructure technologique »). En tant que candidat article 32, tu n’as pas forcément passé ce contrôle : il faut savoir lequel t’est attribué. Ta fiche 2026 penchait pour « développement de contenu ».',
    aupres: 'CIFC Vaud, avant la convocation',
  },
  {
    point: 'Convocation 2027',
    pourquoi: 'La directive prévoit que la date, le lieu et les moyens auxiliaires autorisés sont communiqués au moins six semaines avant l’examen. Rien de particulier n’est dit sur la répétition d’une seule épreuve.',
    aupres: 'Commission des cours cantonale / CIFC Vaud',
  },
  {
    point: 'Arrondi de la note',
    pourquoi: 'La directive dit « arrondie à une note entière ou à une demi-note » ; le guide CIFC 2026 précise « à la demi-note ou à la note entière supérieure (4,25 → 4,5 ; 5,74 → 6,0) ». L’application applique la règle du guide, plus précise et plus récente.',
    aupres: 'Sans action nécessaire, sauf indication contraire dans ta décision de note',
  },
]

// ───────────── Format de l'examen ─────────────

export const EXAM_FORMAT = {
  preparationMin: 15,
  examenMin: 50,
  taches: 5,
  minutesParTache: 10,
  pointsParTache: 9,
  pointsMax: 45,
  noteMin: 4.0,
  formule: 'Note = (points obtenus × 5 ÷ 45) + 1',
  arrondi: 'Arrondi à la demi-note ou à la note entière supérieure (4,25 → 4,5 ; 5,74 → 6,0)',
  regles: [
    'Travail de cas dirigé, dans la langue nationale du lieu ; la situation initiale sert de base aux tâches partielles 1 à 4.',
    'Chaque tâche partielle compte pour 20 % : 10 minutes, 9 points, trois critères notés de 0 à 3.',
    'Au moins deux expert-e-s aux examens ; aucune pause pendant la préparation ni pendant l’examen.',
    'Moyens auxiliaires : de quoi prendre des notes et une calculatrice. Les notes prises pendant la préparation sont utilisables pendant l’entretien.',
    'Pièce d’identité officielle obligatoire. Un moyen auxiliaire non autorisé entraîne l’exclusion : l’examen est alors considéré comme non réussi.',
    'Convocation (date, lieu, moyens autorisés) au moins six semaines avant l’examen.',
  ],
}

const DEROULEMENT = [
  { label: 'Lire le complément à la description du cas et analyser', minutes: 3 },
  { label: 'Présenter ; les expert-e-s posent des questions de concrétisation et de justification', minutes: 4 },
  { label: 'Questions complémentaires ou scénarios alternatifs', minutes: 3 },
]

const CRIT_QUESTIONS = {
  titre: 'Questions complémentaires / scénarios alternatifs',
  texte: 'Les réponses aux questions complémentaires ou aux scénarios alternatifs sont compréhensibles et justifiées.',
  plein: 'Toutes les questions complémentaires ou relatives à des scénarios alternatifs reçoivent une réponse techniquement correcte. Les réponses sont compréhensibles et justifiées.',
  points: 3,
}

export const TPS: TaskPart[] = [
  {
    id: 'tp1',
    numero: 1,
    titre: 'TP1 — Domaines A et B',
    court: 'Développement professionnel et travail en réseau',
    domaines: ['a', 'b'],
    methode: 'Mini case',
    methodeDetail:
      'Le complément au cas décrit une situation à une interface où le rôle et les tâches de l’employé-e de commerce ne sont pas clairement définis. Tu analyses la situation, le rôle et les tâches, tu identifies les défis, puis tu présentes des stratégies pour y faire face.',
    dureeMin: 10,
    points: 9,
    objectifs: [
      'Identifier tous les problèmes de la situation, pas seulement le plus visible.',
      'En déduire des mesures concrètes, réalistes et attribuées à quelqu’un.',
      'Défendre tes choix face à un scénario modifié par les expert-e-s.',
    ],
    deroulement: DEROULEMENT,
    criteres: [
      { titre: 'Analyse de la situation', texte: 'Les questions, problèmes et défis de la situation sont identifiés dans leur globalité.', plein: 'Les questions, problèmes et défis les plus importants sont identifiés. Les informations mises à disposition sont prises en compte de manière appropriée. Le contenu de l’analyse est étayé et bien compréhensible.', points: 3 },
      { titre: 'Mesures / conséquences', texte: 'Des conséquences ou mesures compréhensibles sont déduites pour la suite.', plein: 'Des mesures appropriées ou des conséquences pour la suite sont déduites. Celles-ci sont compréhensibles et justifiées.', points: 3 },
      CRIT_QUESTIONS,
    ],
    criteresKind: 'officiel',
    erreurs: [
      'Passer directement aux solutions sans nommer les causes.',
      'Ne citer qu’un seul problème alors que le texte en contient quatre ou cinq.',
      'Proposer des mesures vagues (« mieux communiquer ») sans qui, quoi, quand.',
      'Accuser des personnes au lieu de décrire l’organisation et les interfaces.',
    ],
    conseils: [
      'Pendant les 3 minutes, cherche d’abord l’interface et ce qui y est flou : qui est responsable de quoi ? Puis classe les symptômes : rôles, processus, communication, ressources, outils.',
      'Présente en trois temps : constat → causes → mesures à court terme et durables.',
      'Termine par la manière dont tu vérifierais l’effet des mesures.',
    ],
  },
  {
    id: 'tp2',
    numero: 2,
    titre: 'TP2 — Domaine C',
    court: 'Coordination des processus de travail',
    domaines: ['c'],
    methode: 'Mini case',
    methodeDetail:
      'Tu reçois un document supplémentaire, par exemple un plan de projet pour l’introduction d’un outil, un questionnaire de satisfaction ou un procès-verbal de séance. Tu en examines le contenu et la présentation formelle, puis tu proposes des améliorations.',
    dureeMin: 10,
    points: 9,
    objectifs: [
      'Repérer les incohérences de fond et de forme dans un document.',
      'Proposer une amélioration précise pour chaque incohérence.',
      'Relier le document à son objectif et à son public.',
    ],
    deroulement: DEROULEMENT,
    criteres: [
      { titre: 'Analyse de documents', texte: 'Les incohérences sont identifiées.', plein: 'Toutes les incohérences pertinentes sont identifiées. Celles-ci sont justifiées de manière claire et compréhensible.', points: 3 },
      { titre: 'Possibilités d’amélioration', texte: 'Des possibilités d’amélioration pertinentes sont présentées.', plein: 'Des mesures d’amélioration concrètes sont présentées pour tous les points mentionnés. Celles-ci sont pertinentes et compréhensibles.', points: 3 },
      CRIT_QUESTIONS,
    ],
    criteresKind: 'officiel',
    erreurs: [
      'Critiquer la forme (mise en page) et oublier le fond (objectif, logique, exactitude).',
      'Lister des défauts sans dire comment les corriger.',
      'Oublier la protection des données ou les délais.',
      'Ne pas se demander à quoi sert le document.',
    ],
    conseils: [
      'Commence toujours par : « À quoi sert ce document, pour qui ? »',
      'Lis-le ligne par ligne avec une grille : objectif, exhaustivité, exactitude, logique, formulation, données personnelles, suite donnée.',
      'Annonce chaque point sous la forme : constat → conséquence → correction.',
    ],
  },
  {
    id: 'tp3',
    numero: 3,
    titre: 'TP3 — Domaine D',
    court: 'Relations avec les clients et les fournisseurs',
    domaines: ['d'],
    methode: 'Simulation pratique',
    methodeDetail:
      'Le complément au cas décrit une demande concrète d’un client. Tu expliques étape par étape comment tu procéderais ; les expert-e-s jugent notamment si ta communication est adaptée au destinataire et à la situation.',
    dureeMin: 10,
    points: 9,
    objectifs: [
      'Montrer une démarche complète : accueil, clarification, solution, suivi.',
      'Justifier chaque étape par le besoin du client et l’intérêt de l’entreprise.',
      'Garder une posture professionnelle si la situation se complique.',
    ],
    deroulement: DEROULEMENT,
    criteres: [
      { titre: 'Démarche / mise en œuvre', texte: 'La démarche est présentée de manière complète et correcte, ou l’action est mise en œuvre de manière complète et correcte.', plein: 'La communication est adaptée au destinataire et correcte sur le plan technique. Elle est adaptée à la situation décrite.', points: 3 },
      { titre: 'Justification', texte: 'La démarche ou l’action est justifiée de manière compréhensible.', plein: 'L’action est justifiée de manière compréhensible et est techniquement correcte.', points: 3 },
      CRIT_QUESTIONS,
    ],
    criteresKind: 'officiel',
    erreurs: [
      'Se justifier ou chercher un coupable au lieu de reconnaître le désagrément.',
      'Promettre une solution ou un délai que l’on ne maîtrise pas.',
      'S’arrêter à la réponse au client et oublier le suivi interne.',
      'Répondre uniquement par écrit alors qu’un appel serait plus adapté.',
    ],
    conseils: [
      'Sépare toujours le relationnel (excuses, écoute) du factuel (problème, solution, délai).',
      'Cite le canal choisi et explique pourquoi.',
      'Termine par la prévention : que change-t-on pour que cela ne se reproduise pas ?',
    ],
  },
  {
    id: 'tp4',
    numero: 4,
    titre: 'TP4 — Domaine E',
    court: 'Technologies numériques du monde du travail',
    domaines: ['e'],
    methode: 'Simulation pratique',
    methodeDetail:
      'Le complément au cas correspond au domaine spécifique choisi dans le contrôle de compétences CI 2 : « Développement de contenu » ou « Infrastructure technologique ». Tu expliques étape par étape comment tu procéderais ; la démarche doit être structurée, complète et orientée vers la pratique.',
    dureeMin: 10,
    points: 9,
    objectifs: [
      'Planifier une mission numérique : objectif, public, contenu ou outil, contraintes.',
      'Tenir compte de la protection des données, de la sécurité et de la qualité.',
      'Expliquer comment tu accompagnes les utilisateurs et contrôles le résultat.',
    ],
    deroulement: DEROULEMENT,
    criteres: [
      { titre: 'Démarche / mise en œuvre', texte: 'La démarche est présentée de manière complète et correcte, ou l’action est mise en œuvre de manière complète et correcte.', plein: 'La démarche ou la mise en œuvre est pertinente, compréhensible et bien structurée. La description comprend tous les aspects pertinents et est orientée vers la pratique.', points: 3 },
      { titre: 'Justification', texte: 'La démarche ou l’action est justifiée de manière compréhensible.', plein: 'L’action est justifiée de manière compréhensible et est techniquement correcte.', points: 3 },
      { ...CRIT_QUESTIONS, plein: 'Toutes les questions complémentaires ou relatives à des scénarios alternatifs reçoivent une réponse techniquement correcte.' },
    ],
    criteresKind: 'officiel',
    erreurs: [
      'Parler de l’outil sans parler des personnes qui vont l’utiliser.',
      'Oublier les contraintes : données personnelles, droits d’auteur, accès, délais, budget.',
      'Ne prévoir ni test, ni contrôle de qualité, ni mise à jour.',
      'Employer du jargon sans l’expliquer.',
    ],
    conseils: [
      'Structure : objectif → public cible → contenu ou fonctionnement → contraintes → étapes → contrôle.',
      'Nomme les interfaces : qui fournit quoi, qui valide, qui met en ligne.',
      'Prévois toujours une phase de test et un retour d’expérience.',
    ],
  },
  {
    id: 'tp5',
    numero: 5,
    titre: 'TP5 — Discussion de réflexion',
    court: 'Ta propre pratique, domaines A à E',
    domaines: ['a', 'b', 'c', 'd', 'e'],
    methode: 'Entretien de réflexion',
    methodeDetail:
      'Appelé « entretien de réflexion » dans la directive et « discussion de réflexion » dans le guide. Tu choisis deux compétences opérationnelles dans lesquelles tu t’estimes fort, tu décris pour chacune une situation concrète de ton travail, tu l’analyses, puis tu expliques comment tu aurais agi dans d’autres conditions. Aucun document n’est fourni : la description du cas ne sert qu’aux tâches 1 à 4.',
    dureeMin: 10,
    points: 9,
    objectifs: [
      'Choisir deux compétences opérationnelles et justifier ce choix.',
      'Décrire, pour chacune, une situation concrète où tu as relevé un défi avec assurance.',
      'Analyser : défis, facteurs de réussite, ce que tu ferais autrement.',
      'Expliquer comment tu aurais agi si la situation avait évolué différemment.',
    ],
    deroulement: [
      { label: 'Choisir deux compétences et justifier son choix', minutes: 2 },
      { label: 'Décrire une situation concrète pour chacune', minutes: 3 },
      { label: 'Analyser la situation', minutes: 3 },
      { label: 'Scénario alternatif', minutes: 2 },
    ],
    criteres: [
      { titre: 'Choix et description de la situation', texte: 'Le choix des compétences opérationnelles est justifié et une situation pratique concrète est décrite de manière compréhensible.', plein: 'Le choix de deux compétences opérationnelles est justifié de manière claire et compréhensible. Pour chaque compétence, une situation pratique concrète est décrite de manière compréhensible.', points: 3 },
      { titre: 'Analyse de la situation', texte: 'Les défis, les forces et les éventuels problèmes sont identifiés.', plein: 'La situation pratique ainsi que les actions personnelles sont analysées de manière globale. Les conclusions sont pertinentes, compréhensibles et justifiées.', points: 3 },
      { titre: 'Situation alternative', texte: 'Une action appropriée est décrite aussi dans une situation alternative.', plein: 'La démarche dans une situation alternative est décrite de manière structurée et compréhensible. La manière d’agir est pertinente et techniquement correcte.', points: 3 },
    ],
    criteresKind: 'officiel',
    erreurs: [
      'Raconter sans analyser : beaucoup de contexte, pas de « pourquoi ».',
      'Dire « nous » tout le temps : les expert-e-s veulent savoir ce que toi, tu as fait.',
      'Ne citer aucun point à améliorer.',
      'Inventer une situation : les questions de relance le révèlent vite.',
      'Ne présenter qu’une seule compétence, ou ne pas expliquer pourquoi tu l’as choisie : le premier critère en dépend.',
    ],
    conseils: [
      'Décide dès maintenant de tes deux compétences et prépare une situation réelle pour chacune, plus une troisième en réserve.',
      'Dix minutes pour deux situations, c’est court : environ trois minutes par situation, analyse comprise.',
      'Pour chaque situation, prépare la réponse aux trois questions officielles : quels défis ? qu’est-ce qui a fait réussir ? que ferais-je autrement ?',
      'Prépare un scénario alternatif par situation (« et si le client avait refusé ? »).',
    ],
  },
]

export const DOMAINS: Domain[] = [
  { id: 'a', titre: 'Travail au sein de structures d’activité et d’organisation dynamiques', tp: 'tp1' },
  { id: 'b', titre: 'Interaction dans un milieu de travail interconnecté', tp: 'tp1' },
  { id: 'c', titre: 'Coordination des processus de travail en entreprise', tp: 'tp2' },
  { id: 'd', titre: 'Gestion des relations avec les clients et les fournisseurs', tp: 'tp3' },
  { id: 'e', titre: 'Utilisation des technologies numériques du monde du travail', tp: 'tp4' },
]

const c = (id: CompId, tp: TpId, titre: string, court: string, mandats: string[]): Competence => ({
  id,
  domaine: id[0] as Competence['domaine'],
  tp,
  titre,
  court,
  mandats,
})

export const COMPETENCES: Competence[] = [
  c('a1', 'tp1', 'Examiner et développer des compétences commerciales', 'Bilan personnel et objectifs', [
    'Fixer des objectifs SMART et en déduire des mesures',
    'Participer activement aux entretiens de qualification',
    'Découvrir ses talents, ses points forts et ses points faibles',
  ]),
  c('a2', 'tp1', 'Développer et utiliser des réseaux propres au domaine commercial', 'Réseau professionnel', [
    'S’informer sur les réseaux professionnels',
    'Utiliser et entretenir son réseau professionnel',
    'Actualiser son profil professionnel sur les médias sociaux',
  ]),
  c('a3', 'tp1', 'Recevoir et exécuter des mandats propres au domaine commercial', 'Clarifier et exécuter un mandat', [
    'Clarifier et exécuter un mandat',
    'Recevoir des retours',
  ]),
  c('a4', 'tp1', 'Agir de manière responsable dans la société', 'Rôle professionnel et responsabilité', []),
  c('a5', 'tp1', 'Intégrer des questions politiques et une approche culturelle dans ses actions', 'Contexte politique et culturel', []),
  c('b1', 'tp1', 'Collaborer et communiquer dans différentes équipes pour accomplir des mandats propres au domaine commercial', 'Travail en équipe', [
    'Faire preuve d’esprit d’équipe',
  ]),
  c('b2', 'tp1', 'Coordonner les interfaces dans les processus en entreprise', 'Interfaces et flux d’information', [
    'Avoir le sens du service',
    'Recevoir et transmettre des informations',
    'Analyser les interfaces en entreprise',
    'Recueillir et traiter des informations sur les mandats',
  ]),
  c('b3', 'tp1', 'Participer aux discussions économiques', 'Argumenter sur l’économie', [
    'Interpréter les développements économiques et se forger sa propre opinion',
    'Participer aux discussions spécialisées',
  ]),
  c('b4', 'tp1', 'Exécuter des tâches de gestion propres au domaine commercial et traiter des projets partiels', 'Gestion de projet', [
    'Planifier des tâches de gestion de projet',
    'Gérer des environnements de travail dans des projets',
    'Évaluer des projets',
  ]),
  c('b5', 'tp1', 'Participer à la réalisation de processus de changement en entreprise', 'Accompagner le changement', [
    'Contribuer positivement aux changements',
  ]),
  c('c1', 'tp2', 'Planifier, coordonner et optimiser des tâches et des ressources dans un environnement de travail commercial', 'Planification et priorités', [
    'Planifier et coordonner des rendez-vous et des tâches',
    'Planifier une journée de travail',
    'Instaurer un équilibre entre vie professionnelle et vie privée',
    'Organiser un événement',
  ]),
  c('c2', 'tp2', 'Coordonner et mettre en œuvre des processus de soutien propres au domaine commercial', 'Processus de soutien', [
    'Créer un document de soutien',
    'Gérer un agenda',
    'Rédiger un procès-verbal ou un compte-rendu de réunion',
    'Organiser l’archivage',
  ]),
  c('c3', 'tp2', 'Documenter, coordonner et mettre en œuvre des processus en entreprise', 'Documenter et optimiser des processus', [
    'Documenter des processus',
    'Optimiser des processus',
    'Créer et superviser un calendrier',
  ]),
  c('c4', 'tp2', 'Mettre en œuvre des activités de marketing et de communication', 'Marketing et communication', [
    'Définir les caractéristiques du groupe cible',
    'Créer des contenus de communication et mener à bien des mesures de communication',
    'Tenir compte de l’évolution multimédia dans les mesures de communication',
  ]),
  c('c5', 'tp2', 'Assurer le suivi et le contrôle d’opérations financières', 'Opérations financières', [
    'Établir un budget et un décompte',
    'Tenir le livre de caisse',
    'Établir une facture',
    'Contrôler les factures reçues',
    'Établir des ordres de paiement',
    'Contrôler les paiements entrants',
  ]),
  c('d1', 'tp3', 'Prendre en compte les besoins des clients et des fournisseurs', 'Accueil et analyse des besoins', [
    'Prendre en compte les besoins',
    'Instaurer un contact numérique',
    'Téléphoner de manière professionnelle',
    'Traiter ou transférer des demandes',
  ]),
  c('d2', 'tp3', 'Mener des entretiens d’information et de conseil avec des clients et des fournisseurs', 'Information, conseil, réclamations', [
    'Transmettre des informations',
    'Montrer l’avantage client lors des entretiens de conseil',
    'Répondre à des objections',
    'Traiter des plaintes et des réclamations',
  ]),
  c('d3', 'tp3', 'Mener des entretiens de vente et de négociation avec des clients et des fournisseurs', 'Vente et négociation', [
    'Préparer et mener un entretien de vente',
    'Préparer et mener un entretien de négociation',
  ]),
  c('d4', 'tp3', 'Entretenir les relations avec les clients et les fournisseurs', 'Fidélisation et suivi', [
    'Instaurer des relations',
    'Entretenir des relations',
    'Demander des feed-back sur les prises de contact et en tirer profit',
  ]),
  c('e1', 'tp4', 'Utiliser des applications propres au domaine commercial', 'Applications et sécurité des données', [
    'Résoudre des problèmes techniques',
    'Reconnaître des risques en matière de sécurité des données',
    'Travailler avec des logiciels et des bases de données',
  ]),
  c('e2', 'tp4', 'Rechercher et évaluer des informations dans le domaine commercial et économique', 'Recherche et fiabilité des sources', [
    'Effectuer une recherche',
    'Rechercher et utiliser des informations relatives à l’entreprise',
  ]),
  c('e3', 'tp4', 'Évaluer et préparer des données et des statistiques en lien avec le marché et l’entreprise', 'Analyse de données', [
    'Recevoir un mandat d’analyse',
    'Effectuer des évaluations quantitatives',
    'Effectuer des évaluations qualitatives',
    'Interpréter des résultats d’évaluations',
  ]),
  c('e4', 'tp4', 'Préparer des contenus en lien avec l’entreprise à l’aide d’outils multimédias', 'Contenus multimédias', [
    'Effectuer un mandat de préparation',
    'Élaborer un modèle',
    'Vérifier la qualité de contenus multimédias',
  ]),
]

export const OPTIONAL_COMPETENCES: OptionalCompetence[] = [
  { id: 'c6', titre: 'Exécuter des travaux de comptabilité financière', option: 'Finances', remarque: 'Un mandat pratique C6 figure dans l’archive. Non intégrée aux leçons.' },
  { id: 'd5', titre: 'Gérer des situations de conseil, de vente et de négociation exigeantes dans la langue nationale', option: 'Communication dans la langue nationale', remarque: 'Trois mandats pratiques fournis. Non intégrée aux leçons.' },
  { id: 'd6', titre: 'Gérer des situations de conseil, de vente et de négociation exigeantes en langue étrangère', option: 'Communication en langue étrangère', remarque: 'Trois mandats pratiques fournis. Non intégrée aux leçons.' },
  { id: 'e5', titre: 'Mettre en place et gérer des technologies propres au domaine commercial', option: 'Technologie', remarque: 'Proche du domaine spécifique « Infrastructure technologique » du TP4 : ses idées utiles sont reprises dans les leçons e1 et dans les jeux de rôle TP4.' },
  { id: 'e6', titre: 'Évaluer de grandes quantités de données au sein de l’entreprise conformément au mandat reçu', option: 'Technologie', remarque: 'Ses idées utiles (nettoyage et préparation des données) sont reprises dans la leçon e3.' },
]

// ───────────── Accès rapides ─────────────

export const TP_BY_ID = Object.fromEntries(TPS.map((t) => [t.id, t])) as Record<TpId, TaskPart>
export const COMP_BY_ID = Object.fromEntries(COMPETENCES.map((x) => [x.id, x])) as Record<CompId, Competence>
export const DOMAIN_BY_ID = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<string, Domain>
export const compsOfTp = (tp: TpId) => (tp === 'tp5' ? COMPETENCES : COMPETENCES.filter((x) => x.tp === tp))
export const COMP_IDS = COMPETENCES.map((x) => x.id)
export const isCompId = (s: string): s is CompId => s in COMP_BY_ID
export const isTpId = (s: string): s is TpId => s in TP_BY_ID

export const TP_COLOR: Record<TpId, { text: string; bg: string; border: string; soft: string; hsl: string }> = {
  tp1: { text: 'text-tp1', bg: 'bg-tp1', border: 'border-tp1', soft: 'bg-tp1/10', hsl: 'hsl(var(--tp1))' },
  tp2: { text: 'text-tp2', bg: 'bg-tp2', border: 'border-tp2', soft: 'bg-tp2/10', hsl: 'hsl(var(--tp2))' },
  tp3: { text: 'text-tp3', bg: 'bg-tp3', border: 'border-tp3', soft: 'bg-tp3/10', hsl: 'hsl(var(--tp3))' },
  tp4: { text: 'text-tp4', bg: 'bg-tp4', border: 'border-tp4', soft: 'bg-tp4/10', hsl: 'hsl(var(--tp4))' },
  tp5: { text: 'text-tp5', bg: 'bg-tp5', border: 'border-tp5', soft: 'bg-tp5/10', hsl: 'hsl(var(--tp5))' },
}

export const LEVEL_LABEL = { 1: 'Débutant', 2: 'Intermédiaire', 3: 'Niveau examen' } as const
