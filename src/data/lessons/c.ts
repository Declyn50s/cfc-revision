import type { Lesson } from '@/types'
import { quiz } from './_helpers'

const SRC = ['directive', 'guide-cifc', 'mandats', 'konvink', 'serie0']

export const LESSONS_C: Lesson[] = [
  {
    comp: 'c1',
    definition:
      'Planifier et coordonner, c’est décider quoi faire, dans quel ordre, avec quelles ressources et pour quand, puis vérifier que le plan tient et l’adapter. Cela vaut pour sa journée de travail comme pour un événement.',
    objectifs: ['Fixer des priorités avec un critère clair.', 'Planifier une journée ou une semaine de façon réaliste.', 'Planifier un événement et en assurer le suivi.'],
    aSavoir: [
      'La différence entre urgent (délai proche) et important (conséquences fortes) et la manière de classer une liste de tâches.',
      'Une planification réaliste garde une réserve pour les imprévus : ne planifie qu’environ 60 % de ton temps.',
      'Les ressources à coordonner : temps, personnes, salles, matériel, budget.',
      'Les quatre temps d’un événement : mandat, planification, réalisation, suivi.',
      'Les ressources personnelles : pauses, charge de travail, signaux de stress, équilibre entre vie professionnelle et vie privée.',
    ],
    explication: [
      { t: 'p', text: 'Dans un TP2, tu peux recevoir un planning, un ordre du jour ou une liste de tâches à critiquer. Les incohérences classiques sont toujours les mêmes : des délais impossibles, des tâches sans responsable, des chevauchements, aucune réserve, des priorités absentes.' },
      { t: 'h', text: 'Prioriser' },
      {
        t: 'table',
        head: ['', 'Urgent', 'Pas urgent'],
        rows: [
          ['Important', 'Faire tout de suite (réclamation d’un client clé, délai légal)', 'Planifier (préparer une formation, améliorer un modèle)'],
          ['Peu important', 'Déléguer ou faire vite (demande de routine pressante)', 'Renoncer ou reporter (tri facultatif)'],
        ],
      },
      { t: 'note', text: 'Cette grille, appelée matrice d’Eisenhower, est un outil pédagogique : elle ne figure pas dans les documents officiels fournis, mais elle structure bien une réponse orale sur les priorités.' },
      { t: 'h', text: 'Planifier sa journée' },
      { t: 'steps', items: ['Lister les tâches et les rendez-vous', 'Estimer la durée de chacune', 'Réserver du temps pour les imprévus', 'Décider des priorités et de l’ordre', 'Contrôler en fin de journée et reporter'] },
      { t: 'h', text: 'Organiser un événement' },
      { t: 'p', text: 'Pars toujours du mandat : but, public, date, lieu, budget. Travaille ensuite avec une check-list à rebours depuis la date (« J − 6 semaines : réserver la salle »). Le jour J, tu soutiens le déroulement ; après, tu assures le suivi : remerciements, décompte, bilan et enseignements.' },
      { t: 'p', text: 'Le guide pratique mentionne aussi les mesures respectueuses de l’environnement : limiter les impressions, privilégier les transports publics, choisir des fournisseurs locaux. Un point facile à placer dans une réponse sur un événement.' },
    ],
    methodes: [
      { nom: 'Matrice d’Eisenhower', ficheId: 'eisenhower', resume: 'Classer par urgence et importance.' },
      { nom: 'Gestion des priorités', ficheId: 'priorites', resume: 'Critères, estimation, réserve, contrôle.' },
      { nom: 'Planification de la journée', ficheId: 'planification-journee', resume: 'Lister, estimer, réserver, décider, contrôler.' },
    ],
    exemple:
      'Un lundi matin, une collaboratrice trouve douze courriels, une réclamation d’un client important, un rapport à rendre mercredi et une demande de tri d’archives. Elle traite d’abord la réclamation (urgent et important), bloque deux heures mardi pour le rapport (important, pas encore urgent), répond aux courriels par lots à heures fixes et reporte le tri à la semaine suivante en prévenant le demandeur.',
    situation: 'Deux responsables te confient chacun, le même jour, une tâche « urgente » pour demain midi. Tu ne peux en terminer qu’une.',
    questionOrale: 'Comment organisez-vous votre travail lorsque plusieurs tâches urgentes arrivent en même temps ?',
    reponse: [
      'Je liste tout et j’estime la durée de chaque tâche.',
      'Je classe selon l’urgence réelle (délai) et l’importance (conséquences pour le client et l’entreprise).',
      'Je traite d’abord ce qui est urgent et important, je planifie le reste et je garde une réserve.',
      'S’il y a conflit entre deux mandants, je ne décide pas seul : je les informe et je demande un arbitrage.',
      'En fin de journée, je contrôle, je reporte et j’informe les personnes concernées.',
    ],
    erreurs: ['Confondre « urgent » avec « demandé par la personne qui insiste le plus ».', 'Planifier 100 % de son temps.', 'Trancher seul entre deux supérieurs.', 'Oublier le suivi après un événement.'],
    recap: ['Urgent = délai ; important = conséquences.', 'Planifier 60 %, garder une réserve.', 'Conflit de priorités : informer et faire arbitrer.', 'Événement : mandat, planification, réalisation, suivi.'],
    quiz: quiz('c1', [
      ['Une tâche importante mais pas urgente doit être…', ['faite immédiatement.', 'planifiée à une date précise.', 'abandonnée.', 'déléguée dans tous les cas.'], 1, 'Sans planification, les tâches importantes non urgentes finissent par devenir des urgences.'],
      ['Pourquoi ne planifie-t-on pas toute sa journée ?', ['Pour finir plus tôt.', 'Pour garder du temps pour les imprévus et les interruptions.', 'Parce que c’est interdit.', 'Pour éviter de noter ses tâches.'], 1, 'Une réserve rend le plan réaliste : téléphone, questions et urgences arrivent toujours.'],
      ['Quelle est la première étape pour organiser un événement ?', ['Réserver le traiteur.', 'Envoyer les invitations.', 'Clarifier le mandat : but, public, date, budget.', 'Choisir la décoration.'], 2, 'Tout découle du mandat ; sans lui, on réserve et on invite à l’aveugle.'],
    ]),
    cas: {
      enonce: 'Voici le planning d’un collègue pour mardi : 8 h – 12 h rapport trimestriel ; 12 h – 13 h séance d’équipe ; 13 h – 17 h traitement de 60 dossiers (10 minutes chacun) ; « les courriels entre deux ». Aucune pause.',
      questions: ['Quelles incohérences repères-tu ?', 'Que proposes-tu ?'],
      corrige: [
        'Incohérences : 60 dossiers × 10 min = 10 heures, pas 4 ; aucune pause ni réserve ; séance sur l’heure de midi ; courriels sans créneau ; aucune priorité indiquée.',
        'Propositions : recalculer (24 dossiers en 4 heures), répartir le reste ou demander du renfort, fixer deux créneaux pour les courriels, prévoir pause et réserve, vérifier les délais de chaque tâche.',
        'Suite : informer la responsable du volume irréaliste et faire arbitrer les priorités.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'c2',
    definition:
      'Les processus de soutien sont les travaux administratifs qui permettent aux autres de faire leur métier : rédiger des documents, tenir un agenda, établir un procès-verbal, classer et archiver, renseigner sur les documents.',
    objectifs: ['Citer les critères d’un document professionnel de qualité.', 'Rédiger ou contrôler un procès-verbal.', 'Expliquer les règles de base de l’agenda et de l’archivage.'],
    aSavoir: [
      'Les critères d’un bon document : but et destinataire clairs, contenu complet et exact, structure logique, langue correcte, identité visuelle de l’entreprise, date, auteur et version.',
      'Les types de procès-verbal (de décisions, résumé, mot à mot) et les éléments obligatoires.',
      'La gestion d’agenda : pas de double réservation, temps de trajet et de préparation, confirmation, documents joints.',
      'L’archivage : plan de classement, règle de nommage, droits d’accès, durées de conservation (dix ans pour les pièces comptables), destruction sécurisée.',
    ],
    explication: [
      { t: 'p', text: 'C’est la compétence la plus directement visée par le TP2 : un document de travail t’est remis et tu dois en repérer les incohérences. Entraîne ton œil avec une grille fixe.' },
      {
        t: 'table',
        head: ['Angle de contrôle', 'Questions'],
        rows: [
          ['But et destinataire', 'À quoi sert le document ? Pour qui ? Le ton et le niveau de détail conviennent-ils ?'],
          ['Exhaustivité', 'Manque-t-il une date, un responsable, un délai, une référence, une annexe ?'],
          ['Exactitude', 'Chiffres, noms, dates, calculs : tout concorde-t-il ?'],
          ['Logique', 'Ordre des points, contradictions, doublons ?'],
          ['Forme', 'Structure, lisibilité, orthographe, modèle de l’entreprise ?'],
          ['Données et suite', 'Données personnelles superflues ? Que se passe-t-il après ?'],
        ],
      },
      { t: 'h', text: 'Le procès-verbal' },
      { t: 'list', items: ['En-tête : titre de la séance, date, heure, lieu, présents, excusés, auteur du procès-verbal.', 'Corps : points de l’ordre du jour dans l’ordre, décisions formulées clairement.', 'Tâches : qui fait quoi pour quand.', 'Fin : date de la prochaine séance, date de rédaction, diffusion.'] },
      { t: 'p', text: 'Un procès-verbal de décisions ne raconte pas la discussion : il fixe ce qui a été décidé. Il est rédigé de manière neutre, envoyé rapidement (un à trois jours) et approuvé à la séance suivante.' },
      { t: 'h', text: 'Agenda et classement' },
      { t: 'p', text: 'Un agenda se gère avec des règles : qui peut inscrire quoi, quels créneaux sont protégés, combien de temps entre deux rendez-vous. Le classement suit un plan connu de tous, avec des noms de fichiers uniformes, par exemple « 2027-03-15_PV_seance-equipe_v1 ». Les droits d’accès suivent le principe du besoin d’en connaître.' },
    ],
    methodes: [
      { nom: 'Grille d’analyse d’un document', ficheId: 'analyse-document', resume: 'Six angles pour trouver les incohérences au TP2.' },
      { nom: 'Procès-verbal', ficheId: 'proces-verbal', resume: 'Éléments obligatoires et règles de rédaction.' },
      { nom: 'Archivage', ficheId: 'archivage', resume: 'Plan de classement, nommage, accès, conservation.' },
    ],
    exemple:
      'Après une séance de coordination entre un office communal et trois gérances, la collaboratrice envoie le lendemain un procès-verbal de décisions d’une page : cinq décisions numérotées, un tableau « tâche – responsable – délai », la date de la prochaine séance. Chaque participant sait ce qu’il doit faire sans relire toute la discussion.',
    situation: 'Ta responsable te remet le procès-verbal rédigé par un stagiaire : pas de liste des présents, des phrases du type « on a longuement discuté du problème », des tâches sans nom ni date.',
    questionOrale: 'On vous remet un document rédigé par un collègue en vous demandant votre avis. Comment procédez-vous ?',
    reponse: [
      'Je commence par le but et le destinataire : à quoi sert ce document ?',
      'Je le contrôle avec une grille : exhaustivité, exactitude, logique, forme, données personnelles, suite donnée.',
      'Pour chaque point, j’indique le constat, sa conséquence et une correction concrète.',
      'Je classe mes remarques : ce qui empêche le document de remplir son but d’abord, la forme ensuite.',
      'Je restitue mes remarques de façon constructive, en relevant aussi ce qui est réussi.',
    ],
    erreurs: ['Ne commenter que l’orthographe et la mise en page.', 'Dire « ce n’est pas clair » sans proposer de reformulation.', 'Oublier les éléments absents : on voit mal ce qui manque.', 'Négliger la protection des données dans les documents diffusés.'],
    recap: ['Grille : but, exhaustivité, exactitude, logique, forme, données et suite.', 'Procès-verbal : en-tête, décisions, tâches (qui, quoi, quand), diffusion rapide.', 'Agenda : règles, réserves, confirmations.', 'Archivage : plan, nommage, accès, durée de conservation.'],
    quiz: quiz('c2', [
      ['Quel élément est indispensable dans la partie « tâches » d’un procès-verbal ?', ['Le résumé de la discussion.', 'Le responsable et le délai de chaque tâche.', 'L’avis de l’auteur.', 'La durée de chaque intervention.'], 1, 'Une tâche sans responsable ni délai ne sera pas réalisée.'],
      ['Combien de temps les pièces comptables doivent-elles être conservées en Suisse ?', ['Deux ans.', 'Cinq ans.', 'Dix ans.', 'Indéfiniment.'], 2, 'Le Code des obligations prévoit une conservation de dix ans pour les livres et pièces comptables.'],
      ['En contrôlant un document, par quoi commences-tu ?', ['Par l’orthographe.', 'Par le but du document et son destinataire.', 'Par la police de caractères.', 'Par le nombre de pages.'], 1, 'Sans connaître le but, on ne peut pas juger si le contenu est adapté et complet.'],
    ]),
    cas: {
      enonce: 'Extrait d’un procès-verbal : « Séance du service. Présents : tous. 1. Retards : on en a parlé, il faut faire attention. 2. Nouveau logiciel : Marc s’en occupe bientôt. 3. Divers : Mme Rochat est souvent malade ces temps, il faudra s’organiser. »',
      questions: ['Relève au moins cinq défauts.', 'Reformule le point 2.'],
      corrige: [
        'Défauts : pas de date, d’heure, de lieu ni d’auteur ; « tous » au lieu d’une liste ; point 1 sans décision ; point 2 sans tâche précise ni délai ; point 3 contient une donnée de santé sur une personne nommée ; pas de prochaine séance.',
        'Point 2 reformulé : « Décision : le logiciel X est introduit le 1er mai. Tâche : Marc Dubois planifie la formation de l’équipe — délai : 15 avril. »',
        'Point 3 : remplacer par une formulation neutre, par exemple « Organisation des suppléances : la responsable établit un plan d’ici au 10 avril ».',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'c3',
    definition:
      'Un processus est une suite d’étapes répétées qui transforme une demande en résultat. Le documenter, c’est le décrire pour que chacun le réalise de la même manière ; l’optimiser, c’est le rendre plus simple, plus rapide ou plus sûr.',
    objectifs: ['Décrire un processus : déclencheur, étapes, responsables, résultat.', 'Appliquer une démarche d’optimisation en quatre temps.', 'Établir et surveiller un calendrier, et gérer un report de délai.'],
    aSavoir: [
      'Les éléments d’une description de processus : but, déclencheur, étapes, responsable de chaque étape, documents et outils, délais, résultat, indicateur.',
      'La représentation en diagramme de flux : début et fin, activités, décisions (oui / non), flèches.',
      'Les sources de gaspillage : attentes, doublons, allers-retours, saisies multiples, contrôles inutiles, erreurs à corriger.',
      'La démarche d’optimisation : analyser l’existant, identifier le potentiel, mettre en œuvre une solution, vérifier le résultat.',
      'Comment mesurer : délai de traitement, taux d’erreur, satisfaction, coût.',
    ],
    explication: [
      { t: 'p', text: 'Le TP2 de la série zéro porte sur une enquête de satisfaction envoyée après chaque demande de support : c’est un outil de mesure d’un processus. Tu dois comprendre à quoi sert la mesure pour juger si le questionnaire est bon.' },
      { t: 'h', text: 'Documenter' },
      { t: 'steps', items: ['Délimiter : où commence et où finit le processus', 'Recueillir : observer, interroger ceux qui le font', 'Ordonner les étapes et les décisions', 'Représenter (diagramme) et décrire (texte)', 'Faire valider, diffuser, former'] },
      { t: 'h', text: 'Optimiser' },
      {
        t: 'table',
        head: ['Temps', 'Ce que tu fais', 'Exemple : traitement d’une réclamation'],
        rows: [
          ['1. Analyser', 'Décrire l’existant, mesurer', 'Délai moyen de neuf jours, trois transmissions'],
          ['2. Identifier', 'Trouver les causes et le potentiel', 'Deux jours d’attente à chaque transmission, informations redemandées au client'],
          ['3. Mettre en œuvre', 'Choisir une solution, la tester', 'Formulaire unique, compétence de décision jusqu’à 200 francs au premier niveau'],
          ['4. Vérifier', 'Mesurer à nouveau, ajuster', 'Délai de quatre jours après un mois, satisfaction en hausse'],
        ],
      },
      { t: 'note', text: 'Cette démarche correspond au cycle PDCA (planifier, réaliser, vérifier, ajuster) et s’accompagne bien de la méthode des 5 pourquoi pour chercher la cause. Ces deux noms sont des outils pédagogiques : les documents fournis décrivent la démarche sans les nommer.' },
      { t: 'h', text: 'Le calendrier' },
      { t: 'p', text: 'Un calendrier fiable liste les tâches, leur durée, leur ordre et leurs responsables. Tu le surveilles régulièrement. En cas de report, tu informes sans attendre toutes les personnes concernées, tu expliques la cause, tu donnes la nouvelle date et tu adaptes les tâches qui en dépendent.' },
    ],
    methodes: [
      { nom: 'Documenter un processus', ficheId: 'documenter-processus', resume: 'Déclencheur, étapes, responsables, résultat, diagramme de flux.' },
      { nom: 'Optimisation des processus', ficheId: 'optimisation-processus', resume: 'Analyser, identifier, mettre en œuvre, vérifier.' },
      { nom: 'Enquête de satisfaction', ficheId: 'enquete-satisfaction', resume: 'Construire et critiquer un questionnaire.' },
      { nom: 'PDCA', ficheId: 'pdca', resume: 'La roue de l’amélioration continue.' },
    ],
    exemple:
      'Dans un service de facturation, chaque demande de correction passait par quatre personnes. En dessinant le processus, l’équipe a vu que deux contrôles vérifiaient la même chose. Elle en a supprimé un et autorisé la première personne à corriger directement les erreurs d’adresse. Le délai moyen est passé de six à deux jours, sans hausse du taux d’erreur.',
    situation: 'Un nouveau collègue te demande comment traiter une demande de remboursement. Tu réalises que la procédure n’est écrite nulle part et que chacun la fait à sa façon.',
    questionOrale: 'Vous constatez qu’un processus de votre service est lent et source d’erreurs. Comment procédez-vous pour l’améliorer ?',
    reponse: [
      'Je décris le processus actuel étape par étape avec les personnes qui le réalisent.',
      'Je mesure : délai, nombre de transmissions, taux d’erreur.',
      'Je cherche les causes : attentes, doublons, informations manquantes, contrôles redondants.',
      'Je propose une solution simple, je la fais valider et je la teste sur une période limitée.',
      'Je mesure à nouveau, j’ajuste, puis je documente le nouveau processus et je forme l’équipe.',
    ],
    erreurs: ['Proposer une solution sans avoir analysé l’existant.', 'Optimiser sans mesurer avant et après.', 'Changer un processus sans impliquer ceux qui le font.', 'Oublier de mettre à jour la documentation.'],
    recap: ['Processus = déclencheur → étapes → résultat, avec un responsable par étape.', 'Optimiser : analyser, identifier, mettre en œuvre, vérifier.', 'Mesurer avant et après.', 'Report de délai : informer tôt, expliquer, nouvelle date, adapter la suite.'],
    quiz: quiz('c3', [
      ['Que représente un losange dans un diagramme de flux ?', ['Le début du processus.', 'Une décision avec plusieurs issues.', 'Un document.', 'La fin du processus.'], 1, 'Le losange marque une décision (oui / non) qui oriente la suite.'],
      ['Quelle est la première étape d’une optimisation ?', ['Acheter un nouveau logiciel.', 'Analyser et mesurer le processus existant.', 'Supprimer un poste.', 'Former l’équipe.'], 1, 'On ne peut améliorer que ce que l’on a compris et mesuré.'],
      ['Comment sais-tu qu’une optimisation a réussi ?', ['L’équipe en parle moins.', 'Un indicateur mesuré avant et après montre une amélioration.', 'Le responsable est content.', 'Le processus compte plus d’étapes.'], 1, 'Seule une mesure comparable avant et après prouve l’effet.'],
    ]),
    cas: {
      enonce: 'Processus actuel d’une demande de congé : formulaire papier → signature du chef d’équipe → signature du chef de service → saisie par les RH → courriel de confirmation. Délai moyen : douze jours. Les formulaires se perdent régulièrement.',
      questions: ['Où sont les faiblesses ?', 'Que proposes-tu et comment vérifies-tu ?'],
      corrige: [
        'Faiblesses : support papier (pertes), double validation, ressaisie par les RH, aucune visibilité pour le demandeur.',
        'Proposition : demande numérique, une seule validation pour les congés courts, alimentation directe du système RH, notification automatique.',
        'Vérification : délai moyen, nombre de demandes perdues, retour des utilisateurs après deux mois.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'c4',
    definition:
      'Une activité de marketing et de communication consiste à transmettre le bon message au bon public par le bon canal, pour atteindre un but : informer, faire connaître, convaincre, fidéliser.',
    objectifs: ['Décrire un groupe cible par ses caractéristiques et ses besoins.', 'Planifier une action de communication : but, message, canal, calendrier, budget.', 'Évaluer une action et en tirer des enseignements.'],
    aSavoir: [
      'Les critères de description d’un groupe cible : âge, situation, besoins, habitudes d’information, langue, niveau de connaissance.',
      'Le choix du canal selon le public : courrier, courriel, site internet, réseaux sociaux, affiche, téléphone, événement.',
      'La formule AIDA : attention, intérêt, désir, action.',
      'Les contraintes : identité visuelle, droit d’auteur et droit à l’image, protection des données, budget, délais de validation.',
      'La mesure du résultat : nombre de réponses, clics, inscriptions, questions reçues.',
    ],
    explication: [
      { t: 'p', text: 'Cette compétence nourrit le TP2 (critiquer un support, un plan de communication, un questionnaire) et le TP4 « Développement de contenu » (concevoir une rubrique de site). Dans les deux cas, la première question est : pour qui, et dans quel but ?' },
      { t: 'steps', items: ['Recevoir le mandat et s’informer', 'Analyser le groupe cible', 'Planifier l’action : message, canal, moment, budget', 'Créer le contenu et le publier', 'Clôturer : mesurer et tirer un bilan'] },
      {
        t: 'table',
        head: ['Lettre', 'Objectif', 'Exemple : invitation à une séance d’information'],
        rows: [
          ['A — Attention', 'Faire remarquer le message', 'Titre : « Votre prime 2028 : ce qui change »'],
          ['I — Intérêt', 'Montrer que cela concerne le lecteur', '« Trois changements touchent votre contrat »'],
          ['D — Désir', 'Montrer l’avantage', '« Repartez avec un calcul personnalisé »'],
          ['A — Action', 'Dire quoi faire', '« Inscrivez-vous avant le 12 mars au 021… »'],
        ],
      },
      { t: 'p', text: 'Un message adapté au public parle sa langue : pas de jargon interne, des phrases courtes, l’information essentielle en premier. Pour un public large, vérifie la lisibilité et l’accessibilité (taille des caractères, contraste, texte alternatif des images en ligne).' },
      { t: 'p', text: 'Avant de publier, fais contrôler le contenu selon le principe des quatre yeux et vérifie les droits sur les images. Après, mesure le résultat par rapport au but fixé.' },
    ],
    methodes: [
      { nom: 'Analyse du groupe cible', ficheId: 'groupe-cible', resume: 'Qui, quels besoins, quels canaux, quel langage.' },
      { nom: 'Formule AIDA', ficheId: 'aida', resume: 'Attention, intérêt, désir, action.' },
      { nom: 'Enquête de satisfaction', ficheId: 'enquete-satisfaction', resume: 'Mesurer l’avis des clients.' },
    ],
    exemple:
      'Une commune veut faire connaître son nouveau guichet en ligne aux habitants de plus de 65 ans. Le groupe cible lit peu les réseaux sociaux mais lit le journal communal. L’action retenue : un article illustré dans le journal, un dépliant en gros caractères joint à un courrier, et deux après-midi d’aide à la prise en main à la maison de quartier. Le résultat est mesuré par le nombre de comptes créés dans cette tranche d’âge.',
    situation: 'Ton entreprise envoie une lettre d’information de quatre pages, en langage juridique, à tous ses clients. Presque personne ne réagit et le service clientèle reçoit des appels de personnes qui n’ont « rien compris ».',
    questionOrale: 'Votre entreprise veut informer ses clients d’un changement important. Comment planifiez-vous cette communication ?',
    reponse: [
      'Je clarifie le but : que doivent savoir ou faire les clients après avoir lu ?',
      'J’analyse le groupe cible : qui sont-ils, que savent-ils déjà, comment s’informent-ils ?',
      'Je formule un message simple, l’essentiel en premier, avec un appel à l’action clair.',
      'Je choisis les canaux adaptés, je planifie le moment et je respecte budget, identité visuelle et protection des données.',
      'Je fais relire, je publie, puis je mesure le résultat et j’en tire un bilan.',
    ],
    erreurs: ['Choisir le canal avant de connaître le public.', 'Vouloir tout dire : le message principal se perd.', 'Utiliser une image trouvée en ligne sans vérifier les droits.', 'Ne rien mesurer après l’envoi.'],
    recap: ['Toujours : but → public → message → canal → mesure.', 'AIDA pour construire un message.', 'Langage du public, pas celui de l’entreprise.', 'Contraintes : droits, données, identité visuelle, budget.'],
    quiz: quiz('c4', [
      ['Que signifie le dernier A de la formule AIDA ?', ['Analyse.', 'Action.', 'Attention.', 'Avantage.'], 1, 'Le message se termine par un appel à l’action : ce que le lecteur doit faire.'],
      ['Quel canal convient le mieux pour informer des clients âgés peu connectés ?', ['Une story sur un réseau social.', 'Un courrier clair en gros caractères.', 'Une fenêtre surgissante sur le site.', 'Un message dans une application.'], 1, 'Le canal se choisit selon les habitudes du public.'],
      ['Tu veux illustrer une brochure avec une photo trouvée sur internet. Que dois-tu vérifier ?', ['Sa taille en pixels uniquement.', 'Les droits d’utilisation et, s’il y a des personnes, le droit à l’image.', 'Rien, elle est publique.', 'Sa couleur dominante.'], 1, 'Une image en ligne n’est pas libre de droits par défaut.'],
    ]),
    cas: {
      enonce: 'Projet d’affiche pour une journée portes ouvertes : titre « Informations diverses », long paragraphe sur l’histoire de l’entreprise, date en bas en petits caractères, aucun contact ni inscription, photo d’un collaborateur prise sans lui demander.',
      questions: ['Relève les défauts.', 'Propose une version améliorée en appliquant AIDA.'],
      corrige: [
        'Défauts : titre sans accroche, message noyé, information essentielle (date, lieu) peu visible, aucun appel à l’action, droit à l’image non respecté.',
        'Version AIDA : titre accrocheur (« Venez voir l’envers du décor ») ; trois points d’intérêt ; un avantage (visite guidée, collation) ; date, lieu et inscription bien visibles.',
        'Avant diffusion : accord écrit du collaborateur ou autre image, relecture par une deuxième personne, respect de l’identité visuelle.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'c5',
    definition:
      'Assurer le suivi d’opérations financières, c’est établir et contrôler les documents qui accompagnent l’argent de l’entreprise : budgets et décomptes, factures émises et reçues, paiements, caisse.',
    objectifs: ['Citer les éléments d’une facture conforme et contrôler une facture reçue.', 'Expliquer le suivi des paiements entrants et la procédure de rappel.', 'Établir un petit budget et son décompte, et tenir un livre de caisse.'],
    aSavoir: [
      'Les mentions d’une facture en Suisse : nom et adresse de l’émetteur avec numéro de TVA, destinataire, date de la facture et de la prestation, description et quantité, prix, taux et montant de TVA, total, conditions de paiement, numéro de facture.',
      'Les taux de TVA depuis le 1er janvier 2024 : 8,1 % (normal), 2,6 % (réduit), 3,8 % (hébergement).',
      'Le contrôle d’une facture reçue : concordance avec la commande et la livraison, exactitude des calculs, conditions convenues, visa de la personne compétente.',
      'La procédure de rappel : contrôle du paiement à l’échéance, rappel amical, deuxième rappel avec délai, mise en demeure, puis poursuite.',
      'Le principe des quatre yeux et la séparation des fonctions : celui qui commande ne paie pas seul.',
      'Le livre de caisse : chaque mouvement a un justificatif, le solde calculé correspond à l’argent compté.',
    ],
    explication: [
      { t: 'p', text: 'Au TP2, un document financier fait un excellent support d’analyse d’erreurs : une facture avec un mauvais taux, un décompte qui ne tombe pas juste, un livre de caisse sans justificatifs. Tu as droit à une calculatrice simple : utilise-la.' },
      { t: 'h', text: 'Contrôler une facture reçue' },
      { t: 'steps', items: ['Formel : mentions obligatoires présentes ?', 'Matériel : conforme à la commande et à la livraison ?', 'Arithmétique : quantités × prix, rabais, TVA, total', 'Conditions : délai de paiement, escompte', 'Visa, puis ordre de paiement dans le délai'] },
      {
        t: 'table',
        head: ['Calcul', 'Méthode', 'Exemple'],
        rows: [
          ['TVA à ajouter', 'Montant hors taxe × 8,1 %', '1 000.00 × 0,081 = 81.00 → total 1 081.00'],
          ['TVA comprise dans un total', 'Total ÷ 108,1 × 8,1', '1 081.00 ÷ 108,1 × 8,1 = 81.00'],
          ['Rabais puis escompte', 'On applique d’abord le rabais, puis l’escompte sur le montant restant', '1 000 − 10 % = 900 ; 900 − 2 % = 882'],
          ['Arrondi', 'Montants en espèces arrondis aux 5 centimes', '12.37 → 12.35'],
        ],
      },
      { t: 'h', text: 'Suivre les paiements entrants' },
      { t: 'p', text: 'À l’échéance, on compare les factures ouvertes avec les paiements reçus. Avant de rappeler, on vérifie qu’aucune réclamation ou erreur de notre part n’explique le retard. Le ton monte par étapes : rappel courtois, puis second rappel avec délai précis, puis mise en demeure. Un arrangement de paiement par acomptes vaut souvent mieux qu’une poursuite.' },
      { t: 'h', text: 'Budget, décompte, caisse' },
      { t: 'p', text: 'Un budget liste les dépenses et recettes prévues ; le décompte les compare au réel et explique les écarts. Pour la caisse : pas de mouvement sans justificatif, écritures chronologiques, comptage régulier, toute différence est signalée.' },
    ],
    methodes: [
      { nom: 'Contrôle de facture', ficheId: 'facture-controle', resume: 'Formel, matériel, arithmétique, conditions, visa.' },
      { nom: 'Paiements et rappels', ficheId: 'paiements', resume: 'Suivi des postes ouverts et procédure de rappel.' },
      { nom: 'Budget et décompte', ficheId: 'budget-decompte', resume: 'Prévoir, comparer, expliquer les écarts.' },
    ],
    exemple:
      'Une collaboratrice reçoit une facture de fournisseur de 2 162.00 francs pour vingt licences à 100 francs. Elle contrôle : 20 × 100 = 2 000 ; TVA 8,1 % = 162 ; total exact. Mais la commande portait sur quinze licences. Elle ne paie pas, contacte le fournisseur, demande une note de crédit ou une facture rectifiée, et documente l’échange.',
    situation: 'Un client appelle, furieux d’avoir reçu un deuxième rappel avec des frais alors qu’il affirme avoir payé il y a trois semaines.',
    questionOrale: 'Vous recevez la facture d’un fournisseur. Comment la contrôlez-vous avant paiement ?',
    reponse: [
      'Contrôle formel : émetteur, numéro de TVA, destinataire, date, description, taux de TVA, numéro de facture.',
      'Contrôle matériel : je compare avec la commande et le bulletin de livraison.',
      'Contrôle arithmétique : quantités, prix, rabais, TVA et total, à la calculatrice.',
      'Conditions : délai de paiement et escompte éventuel.',
      'Si tout est juste : visa selon le principe des quatre yeux, puis ordre de paiement dans le délai. Sinon, je clarifie avec le fournisseur avant de payer.',
    ],
    erreurs: ['Ne contrôler que le total.', 'Payer une facture qui ne correspond pas à la commande « pour ne pas avoir d’ennuis ».', 'Envoyer un rappel sans vérifier les paiements et réclamations en cours.', 'Confondre rabais (réduction commerciale) et escompte (réduction pour paiement rapide).'],
    recap: ['Facture reçue : formel, matériel, arithmétique, conditions, visa.', 'TVA 8,1 % · 2,6 % · 3,8 %.', 'Rappel par étapes, après vérification.', 'Quatre yeux et un justificatif pour chaque mouvement.'],
    quiz: quiz('c5', [
      ['Quel est le taux normal de TVA en Suisse depuis 2024 ?', ['7,7 %.', '8,1 %.', '2,6 %.', '10 %.'], 1, 'Depuis le 1er janvier 2024 : 8,1 % (normal), 2,6 % (réduit), 3,8 % (hébergement).'],
      ['Une facture reçue est juste dans ses calculs mais ne correspond pas à la quantité commandée. Que fais-tu ?', ['Tu paies, les calculs sont justes.', 'Tu contactes le fournisseur et demandes une rectification avant de payer.', 'Tu paies la moitié.', 'Tu jettes la facture.'], 1, 'Le contrôle matériel (commande, livraison) passe avant le paiement.'],
      ['Montant de 500 francs hors taxe, TVA de 8,1 %. Quel est le total ?', ['508.10', '540.50', '581.00', '540.00'], 1, '500 × 0,081 = 40.50 ; 500 + 40.50 = 540.50.'],
    ]),
    cas: {
      enonce: 'Facture émise par ton entreprise : 12 heures de conseil à 150.00 = 1 500.00 ; rabais de 10 % = 150.00 ; sous-total 1 650.00 ; TVA 7,7 % = 127.05 ; total 1 777.05. Aucun délai de paiement indiqué.',
      questions: ['Trouve les erreurs.', 'Calcule la facture correcte.'],
      corrige: [
        'Erreurs : 12 × 150 = 1 800 et non 1 500 ; le rabais a été ajouté au lieu d’être déduit ; taux de TVA périmé (8,1 % depuis 2024) ; délai de paiement manquant.',
        'Correct : 1 800.00 − 10 % (180.00) = 1 620.00 ; TVA 8,1 % = 131.22 ; total 1 751.22 (1 751.20 si l’entreprise arrondit ses factures aux 5 centimes).',
        'Suite : annuler la facture, émettre une facture rectifiée avec délai de paiement, informer le client, faire contrôler par une deuxième personne.',
      ],
    },
    sources: SRC,
  },
]
