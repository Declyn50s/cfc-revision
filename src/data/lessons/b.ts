import type { Lesson } from '@/types'
import { quiz } from './_helpers'

const SRC = ['directive', 'guide-cifc', 'mandats', 'konvink', 'serie0']

export const LESSONS_B: Lesson[] = [
  {
    comp: 'b1',
    definition:
      'Collaborer en équipe, c’est poursuivre un but commun avec des rôles et des règles clairs, partager l’information, s’entraider et traiter les désaccords avant qu’ils ne deviennent des conflits.',
    objectifs: ['Expliquer ce qui fait fonctionner une équipe : but, rôles, règles, information.', 'Décrire ta contribution active au travail d’équipe.', 'Présenter une démarche pour désamorcer un conflit entre collègues.'],
    aSavoir: [
      'Les causes classiques de dysfonctionnement : responsabilités non attribuées, information qui ne circule pas, règles implicites, surcharge mal répartie.',
      'Les outils de coordination d’une équipe : séance courte régulière, tableau de répartition, règles de suppléance, boîte partagée avec attribution.',
      'Le message en « je » : décrire un fait, son effet, son besoin, puis faire une demande.',
      'Les étapes d’une résolution de conflit et le moment où l’on fait appel à la hiérarchie.',
    ],
    explication: [
      { t: 'p', text: 'Le TP1 de la série zéro repose exactement sur cette compétence : une boîte de réception partagée traitée « par la personne qui a le temps », des collaborateurs à temps partiel, aucune transmission. Ce n’est pas un problème de personnes, c’est un problème d’organisation d’équipe.' },
      {
        t: 'table',
        head: ['Ce qu’il faut à une équipe', 'Si cela manque', 'Mesure type'],
        rows: [
          ['Un but commun', 'Chacun optimise son coin', 'Objectif d’équipe chiffré (ex. délai de réponse)'],
          ['Des rôles clairs', 'Personne ne se sent responsable', 'Attribution nominative de chaque demande, suppléant désigné'],
          ['Des règles', 'Malentendus, tensions', 'Charte courte : délais, transmission, absences'],
          ['Une information partagée', 'Doublons, oublis', 'Outil commun, point quotidien de dix minutes'],
          ['Du feed-back', 'Les problèmes s’accumulent', 'Bilan mensuel de la collaboration'],
        ],
      },
      { t: 'h', text: 'Gérer une situation difficile' },
      { t: 'steps', items: ['Aborder le sujet tôt et en privé', 'Décrire les faits, sans juger la personne', 'Écouter le point de vue de l’autre', 'Chercher ensemble une solution', 'Convenir d’un accord concret et faire le point plus tard'] },
      { t: 'p', text: 'Si le dialogue direct échoue, ou si la situation touche la qualité du service ou la santé d’une personne, tu en parles à ta ou ton responsable. Ce n’est pas de la délation : c’est le chemin prévu.' },
      { t: 'note', text: 'Message en « je » : « Quand les demandes ne sont pas transmises avant ton jour de congé (fait), des clients attendent trois jours (effet). J’ai besoin de savoir ce qui est en cours (besoin). Peux-tu laisser une note dans le dossier partagé ? (demande) »' },
    ],
    methodes: [
      { nom: 'Gestion des conflits', ficheId: 'conflits', resume: 'Cinq étapes, du constat à l’accord vérifié.' },
      { nom: 'Communication professionnelle', ficheId: 'communication-pro', resume: 'Message en « je », faits avant jugements.' },
      { nom: 'Feed-back', ficheId: 'feedback', resume: 'Donner et recevoir un retour utile.' },
    ],
    exemple:
      'Dans un service de facturation de quatre personnes, deux travaillent à temps partiel. Les questions des clients restaient sans réponse les jours d’absence. L’équipe a introduit trois règles : chaque demande reçoit un responsable nommé, une note de transmission est obligatoire la veille d’une absence, et un point de dix minutes a lieu chaque matin. Le délai moyen de réponse est passé de quatre jours à un jour et demi.',
    situation: 'Une collègue se plaint à toi qu’un autre collègue « ne fait jamais sa part » des tâches communes. La tension monte, et les deux ne se parlent presque plus.',
    questionOrale: 'Dans votre équipe, certaines demandes ne sont traitées par personne. Comment analysez-vous la situation et que proposez-vous ?',
    reponse: [
      'J’analyse sans accuser : les responsabilités ne sont pas attribuées et la transmission n’est pas organisée.',
      'Je distingue les causes : rôles, règles, information, charge de travail, outils.',
      'Je propose des mesures concrètes : attribution nominative, suppléance, note de transmission, point quotidien.',
      'J’implique l’équipe et la hiérarchie, car une règle imposée par un collègue ne tient pas.',
      'Je fixe un indicateur, par exemple le délai de réponse, et un bilan après un mois.',
    ],
    erreurs: ['Désigner un coupable au lieu d’analyser l’organisation.', 'Proposer « mieux communiquer » sans dire comment.', 'Oublier les personnes à temps partiel et les absences.', 'Régler un conflit par courriel ou devant toute l’équipe.'],
    recap: ['Équipe = but + rôles + règles + information + feed-back.', 'Chaque demande a un responsable nommé et un suppléant.', 'Conflit : tôt, en privé, faits, écoute, accord, suivi.', 'Toute mesure a un indicateur et une date de bilan.'],
    quiz: quiz('b1', [
      ['Une boîte courriel partagée est traitée « par qui a le temps ». Quel est le problème principal ?', ['Les collaborateurs manquent de motivation.', 'La responsabilité de chaque demande n’est pas attribuée.', 'Il y a trop de courriels.', 'Le logiciel est trop ancien.'], 1, 'Quand tout le monde est responsable, personne ne l’est : il faut une attribution nominative.'],
      ['Laquelle de ces phrases est un message en « je » ?', ['Tu ne transmets jamais rien.', 'On ne peut pas compter sur toi.', 'Quand le dossier n’est pas transmis, je ne peux pas répondre au client ; peux-tu laisser une note ?', 'Tout le monde pense que tu exagères.'], 2, 'Fait, effet, demande, sans jugement sur la personne.'],
      ['Tu as un désaccord avec un collègue sur la répartition des tâches. Par quoi commences-tu ?', ['Tu en parles à toute l’équipe en séance.', 'Tu écris à la direction.', 'Tu lui en parles directement et en privé, en partant des faits.', 'Tu attends que cela passe.'], 2, 'Le dialogue direct, tôt et en privé, est la première étape ; la hiérarchie vient ensuite si nécessaire.'],
    ]),
    cas: {
      enonce: 'Dans ton équipe de cinq personnes, les appels ne sont plus pris après 16 heures : chacun pense qu’un autre s’en charge. Deux clients se sont plaints.',
      questions: ['Quelles sont les causes ?', 'Quelles mesures proposes-tu, et comment les fais-tu accepter ?'],
      corrige: [
        'Causes : pas de planning de permanence, règle implicite, horaires différents non coordonnés, aucun indicateur.',
        'Mesures : planning de permanence téléphonique avec suppléant, déviation des appels, règle sur les rappels, point hebdomadaire.',
        'Acceptation : présenter les faits (réclamations) en séance, construire le planning avec l’équipe, validation par la responsable, bilan après un mois.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'b2',
    definition:
      'Une interface est le point de passage où un travail, une information ou une responsabilité passe d’une personne ou d’un service à un autre. Coordonner les interfaces, c’est faire en sorte que rien ne se perde à ce passage.',
    objectifs: ['Repérer les interfaces et les parties prenantes d’un processus.', 'Expliquer ce qu’est une transmission d’information complète.', 'Analyser une interface défaillante et proposer des améliorations.'],
    aSavoir: [
      'Les parties prenantes (groupes d’intérêt) internes et externes d’une entreprise et leurs attentes.',
      'Ce qui rend une transmission fiable : qui, quoi, pour quand, état d’avancement, prochaine étape, canal convenu.',
      'Les problèmes typiques aux interfaces : attentes non dites, priorités différentes, outils différents, absence d’accusé de réception.',
      'L’attitude de service envers les clients internes : un collègue d’un autre service est aussi un client.',
    ],
    explication: [
      { t: 'p', text: 'Dans presque tous les mini cases du TP1, la difficulté se situe entre deux services : le support attend le développement, les ventes promettent ce que la production ne peut pas tenir, la comptabilité reçoit des données incomplètes. Savoir nommer l’interface et ce qui s’y perd est la clé de l’analyse.' },
      { t: 'steps', items: ['Identifier les acteurs et leurs attentes', 'Décrire ce qui passe d’un acteur à l’autre', 'Repérer où cela se bloque et pourquoi', 'Proposer une règle, un outil ou un interlocuteur', 'Vérifier l’effet et ajuster'] },
      {
        t: 'table',
        head: ['Symptôme', 'Cause probable à l’interface', 'Amélioration'],
        rows: [
          ['Le client doit répéter son problème', 'Transmission sans historique', 'Dossier ou ticket unique, note de transmission standard'],
          ['L’autre service ne répond pas', 'Priorités différentes, pas d’engagement', 'Délais convenus entre services, personne de contact désignée'],
          ['Informations contradictoires', 'Plusieurs sources, pas de référence', 'Base de connaissances commune, responsable du contenu'],
          ['Demandes perdues', 'Canal informel (oral, post-it)', 'Canal unique avec accusé de réception'],
        ],
      },
      { t: 'p', text: 'Une convention de service interne, même simple, change beaucoup de choses : « le développement répond aux demandes du support en deux jours ouvrables et désigne un interlocuteur par semaine ». Elle rend l’attente explicite et mesurable.' },
      { t: 'note', text: 'Toute transmission contient des données. Ne transmets que ce dont le destinataire a besoin pour sa tâche, par un canal sécurisé.' },
    ],
    methodes: [
      { nom: 'Analyse des interfaces', ficheId: 'interfaces', resume: 'Qui transmet quoi à qui, quand et comment.' },
      { nom: 'Optimisation des processus', ficheId: 'optimisation-processus', resume: 'Analyser l’existant, trouver le potentiel, tester, vérifier.' },
      { nom: 'Méthode des 5 pourquoi', ficheId: 'cinq-pourquoi', resume: 'Remonter du symptôme à la cause.' },
    ],
    exemple:
      'Dans une caisse-maladie, le service clientèle transmettait les contestations de factures au service des prestations par courriel libre. Un dossier sur cinq revenait pour complément. Les deux services ont créé un formulaire de transmission (numéro d’assuré, facture concernée, motif, pièces jointes, délai promis au client) et convenu d’un délai de réponse de trois jours. Les retours pour complément ont presque disparu.',
    situation: 'Tu promets à un client une réponse « d’ici demain », mais elle dépend d’un autre service qui met habituellement une semaine à répondre.',
    questionOrale: 'Comment vous assurez-vous qu’une demande que vous transmettez à un autre service soit traitée correctement et dans les délais ?',
    reponse: [
      'Je vérifie d’abord que je ne peux pas la traiter moi-même et j’identifie le bon interlocuteur.',
      'Je transmets de façon complète : contexte, ce qui a déjà été fait, ce que j’attends, pour quand.',
      'J’utilise le canal convenu et je demande un accusé de réception.',
      'J’informe le client de la transmission et du délai réaliste, et je note une date de relance.',
      'Je relance à l’échéance, je clos avec le client, et si le problème se répète je propose une règle entre les services.',
    ],
    erreurs: ['Transmettre et considérer que ce n’est plus son affaire.', 'Promettre au client un délai qui dépend d’un autre service.', 'Transmettre sans contexte : l’autre doit tout redemander.', 'Critiquer l’autre service devant le client.'],
    recap: ['Interface = passage de relais.', 'Transmission complète : contexte, attente, délai, canal, accusé de réception.', 'Je reste responsable du suivi jusqu’à la clôture.', 'Problème répété = règle entre services, pas rappel individuel.'],
    quiz: quiz('b2', [
      ['Qu’est-ce qu’une interface dans une entreprise ?', ['Un logiciel de gestion.', 'Le point où un travail ou une information passe d’un acteur à un autre.', 'Le bureau d’accueil.', 'Un organigramme.'], 1, 'L’interface est le passage de relais entre personnes, services ou organisations.'],
      ['Quel élément manque le plus souvent dans une mauvaise transmission ?', ['La formule de politesse.', 'Le contexte et l’attente précise avec un délai.', 'Le logo de l’entreprise.', 'La signature manuscrite.'], 1, 'Sans contexte ni attente claire, le destinataire doit tout redemander.'],
      ['Un autre service ne respecte régulièrement pas les délais. Quelle est la mesure la plus durable ?', ['Relancer chaque fois plus fort.', 'Se plaindre auprès des clients.', 'Convenir de délais et d’un interlocuteur entre les services, avec l’appui des responsables.', 'Faire le travail à leur place.'], 2, 'Un accord explicite entre services traite la cause, pas seulement le cas du jour.'],
    ]),
    cas: {
      enonce: 'Le service des ventes promet aux clients une livraison en cinq jours. Le service logistique annonce en interne dix jours. Les réclamations augmentent.',
      questions: ['Où est l’interface défaillante ?', 'Que proposes-tu ?'],
      corrige: [
        'Interface ventes–logistique : l’information sur les délais réels ne circule pas, les deux services ont des objectifs différents (vendre, livrer).',
        'Mesures : délai de référence publié et mis à jour par la logistique, validation des délais spéciaux avant promesse, point hebdomadaire entre les deux services.',
        'Contrôle : part des commandes livrées dans le délai promis, nombre de réclamations.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'b3',
    definition:
      'Participer aux discussions économiques, c’est comprendre les évolutions économiques qui touchent son entreprise, se forger une opinion fondée et l’exprimer avec des arguments.',
    objectifs: ['Relier une évolution économique à ses effets sur une entreprise.', 'Construire un argument : affirmation, justification, exemple.', 'Participer à une discussion en respectant les autres points de vue.'],
    aSavoir: [
      'Quelques notions de base et leur effet concret : inflation, taux d’intérêt, cours de change, conjoncture, pénurie de personnel qualifié, numérisation.',
      'La chaîne de raisonnement : évolution → effet sur les coûts, la demande ou les clients → conséquence pour mon service.',
      'La différence entre un fait, une opinion et un argument.',
      'Les règles d’une discussion professionnelle : écouter, reformuler, répondre à l’argument et non à la personne.',
    ],
    explication: [
      { t: 'p', text: 'On ne te demandera pas un cours d’économie. On peut en revanche te demander, dans les questions complémentaires, pourquoi une mesure coûte de l’argent, ce qu’elle rapporte, ou comment une évolution extérieure pèse sur l’entreprise du cas.' },
      {
        t: 'table',
        head: ['Évolution', 'Effet possible sur l’entreprise', 'Conséquence pour un service administratif'],
        rows: [
          ['Hausse des prix (inflation)', 'Coûts plus élevés, clients plus sensibles aux prix', 'Plus de demandes d’arrangement de paiement, plus de réclamations'],
          ['Hausse des primes ou des taxes', 'Mécontentement, changements de prestataire', 'Pics d’appels, besoin d’explications claires'],
          ['Pénurie de personnel qualifié', 'Postes vacants, surcharge', 'Priorisation, automatisation, formation interne'],
          ['Numérisation', 'Nouveaux canaux, nouvelles attentes', 'Portail client, traitement plus rapide, nouvelles compétences'],
          ['Durabilité', 'Exigences des clients et de la loi', 'Moins de papier, critères d’achat, rapports'],
        ],
      },
      { t: 'h', text: 'Argumenter' },
      { t: 'steps', items: ['Affirmation : ce que je pense', 'Argument : pourquoi, sur quel fait', 'Exemple : un cas concret ou un chiffre', 'Conclusion : ce que je propose'] },
      { t: 'p', text: 'Dans une discussion, montre que tu as entendu l’autre avant de répondre : « Si je comprends bien, vous craignez que… ». Reconnaître la part de vrai d’une objection rend ta propre position plus crédible.' },
    ],
    methodes: [
      { nom: 'Argumenter', ficheId: 'argumenter', resume: 'Affirmation, argument, exemple, conclusion.' },
      { nom: 'Analyse SWOT', ficheId: 'swot', resume: 'Forces, faiblesses, opportunités, menaces.' },
    ],
    exemple:
      'En séance, une équipe discute de l’ouverture d’un portail client. Une collaboratrice argumente : « Je suis favorable (affirmation), car 40 % de nos appels concernent des questions simples que les clients pourraient résoudre seuls (argument). Chez un concurrent, le portail a réduit ces appels d’un tiers (exemple). Je propose de commencer par les trois demandes les plus fréquentes (conclusion). »',
    situation: 'Ta direction envisage de fermer le guichet un jour par semaine pour réduire les coûts. On te demande ton avis en séance d’équipe.',
    questionOrale: 'Quelle évolution économique actuelle influence votre secteur, et quelles en sont les conséquences pour votre travail ?',
    reponse: [
      'Je nomme une évolution précise et je dis d’où vient mon information.',
      'J’explique son effet sur l’entreprise : coûts, demande, attentes des clients.',
      'Je décris la conséquence concrète pour mon service.',
      'Je donne mon avis argumenté sur la manière d’y répondre.',
      'Je reconnais une limite ou un point de vue différent.',
    ],
    erreurs: ['Réciter une définition sans lien avec l’entreprise.', 'Présenter une opinion comme un fait.', 'Oublier le coût d’une mesure que l’on propose.', 'Couper la parole ou attaquer la personne.'],
    recap: ['Évolution → effet sur l’entreprise → conséquence pour mon service.', 'Argument = affirmation + justification + exemple + conclusion.', 'Toute mesure a un coût et un bénéfice.', 'Écouter et reformuler avant de répondre.'],
    quiz: quiz('b3', [
      ['Laquelle de ces phrases est un argument complet ?', ['Je trouve cette idée mauvaise.', 'Tout le monde sait que cela ne marche pas.', 'Je propose un rappel par SMS, car 30 % des retards de paiement sont des oublis ; cela réduirait les frais de rappel.', 'Il faudrait faire quelque chose.'], 2, 'Elle contient une proposition, une justification chiffrée et un bénéfice.'],
      ['Les prix augmentent fortement. Quel effet est le plus probable pour un service de facturation ?', ['Moins de questions des clients.', 'Davantage de demandes d’arrangement de paiement.', 'Aucun effet.', 'Moins de factures à émettre.'], 1, 'Quand le budget des ménages se resserre, les difficultés de paiement augmentent.'],
      ['Un collègue conteste ton idée en séance. Quelle réaction est la plus constructive ?', ['Répéter ton idée plus fort.', 'Reformuler son objection, reconnaître ce qui est juste, puis répondre sur le fond.', 'Abandonner ton idée.', 'Lui rappeler ses propres erreurs.'], 1, 'On répond à l’argument, pas à la personne, après avoir montré qu’on l’a compris.'],
    ]),
    cas: {
      enonce: 'Ton entreprise veut remplacer la facture papier par la facture électronique pour tous les clients dès le mois prochain.',
      questions: ['Donne deux arguments pour et deux arguments contre.', 'Quelle position défends-tu ?'],
      corrige: [
        'Pour : économies d’impression et de port, traitement plus rapide, durabilité.',
        'Contre : clients non équipés ou peu à l’aise, risque d’impayés et de réclamations, délai trop court.',
        'Position défendable : oui, mais par étapes, avec la facture électronique par défaut, le papier sur demande, une information préalable et un bilan après trois mois.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'b4',
    definition:
      'Un projet est une tâche unique, limitée dans le temps, avec un objectif, un budget et une équipe. Traiter un projet partiel, c’est planifier ses tâches, tenir le calendrier, informer et signaler les écarts.',
    objectifs: ['Citer les éléments d’un mandat de projet.', 'Planifier des tâches : lots de travail, responsables, délais, jalons.', 'Expliquer comment tu suis l’avancement et réagis à un écart.'],
    aSavoir: [
      'Le triangle du projet : objectif (qualité), délai, coût. Toucher à l’un a un effet sur les deux autres.',
      'Les phases d’un projet : lancement, planification, réalisation, clôture et évaluation.',
      'Les outils simples : liste des tâches avec responsable et échéance, jalons, calendrier (diagramme de Gantt), budget, procès-verbaux de séance.',
      'La règle d’or en cas d’écart : informer tôt la direction du projet, avec une proposition.',
    ],
    explication: [
      { t: 'p', text: 'À l’examen, un projet apparaît sous la forme : « vous êtes chargé d’introduire…, d’organiser…, de coordonner… ». C’est le cas du TP4 « Infrastructure technologique » de la série zéro : introduire un système de tickets en quatre semaines. Même si la tâche relève du domaine E, la structure de ta réponse est celle d’un petit projet.' },
      { t: 'steps', items: ['S’informer : but, mandant, cadre, parties prenantes', 'Planifier : tâches, responsables, délais, jalons', 'Chiffrer : temps et budget', 'Communiquer : qui doit savoir quoi, quand', 'Suivre l’avancement et réagir aux écarts', 'Clôturer et évaluer'] },
      {
        t: 'table',
        head: ['Élément', 'Question', 'Exemple (introduction d’un outil)'],
        rows: [
          ['Objectif', 'Qu’est-ce qui doit être atteint ?', 'Toute l’équipe saisit 100 % des demandes dans l’outil dès le 1er du mois'],
          ['Lots de travail', 'Quelles tâches ?', 'Information, formation, documentation, phase test, mise en service'],
          ['Jalons', 'Quels points de contrôle ?', 'Formation terminée, test validé, démarrage'],
          ['Ressources', 'Qui, combien de temps, quel budget ?', 'Deux demi-journées par personne, salle, support écrit'],
          ['Risques', 'Qu’est-ce qui peut mal tourner ?', 'Absences, résistance, données non reprises'],
          ['Communication', 'Qui est informé, comment ?', 'Séance de lancement, point hebdomadaire, courriel de suivi'],
        ],
      },
      { t: 'p', text: 'L’évaluation finale compare le résultat à l’objectif : atteint ou non, dans le délai et le budget ? Elle se termine par les enseignements pour le prochain projet. C’est aussi une excellente matière pour le TP5.' },
    ],
    methodes: [
      { nom: 'Gestion de projet', ficheId: 'gestion-projet', resume: 'Objectif, tâches, jalons, ressources, risques, communication.' },
      { nom: 'Objectifs SMART', ficheId: 'smart', resume: 'Pour formuler l’objectif du projet.' },
      { nom: 'PDCA', ficheId: 'pdca', resume: 'Planifier, réaliser, vérifier, ajuster.' },
    ],
    exemple:
      'Une assistante est chargée d’organiser le déménagement de son service dans de nouveaux bureaux. Elle établit une liste de tâches (inventaire, cartons, informatique, téléphonie, information des clients), attribue chaque tâche, fixe trois jalons et tient un tableau de suivi. Deux semaines avant la date, le prestataire informatique annonce un retard : elle en informe aussitôt le chef de projet et propose de maintenir deux postes dans l’ancien bâtiment pendant trois jours.',
    situation: 'Tu coordonnes la préparation d’une journée portes ouvertes. À trois semaines de la date, tu constates que les invitations ne sont pas parties et que personne ne s’en sentait responsable.',
    questionOrale: 'On vous confie la coordination d’un petit projet. Comment le planifiez-vous et comment suivez-vous son avancement ?',
    reponse: [
      'Je clarifie le mandat : objectif, délai, budget, mandant, personnes concernées.',
      'Je découpe en tâches, j’attribue un responsable et une échéance à chacune, je fixe des jalons.',
      'J’estime les ressources et j’identifie les risques principaux.',
      'Je définis la communication : séance de lancement, points réguliers, procès-verbaux.',
      'Je suis l’avancement dans un tableau ; en cas d’écart, j’informe tôt avec une proposition. À la fin, j’évalue et je note les enseignements.',
    ],
    erreurs: ['Commencer par les détails sans objectif clair.', 'Des tâches sans responsable ni échéance.', 'Cacher un retard en espérant le rattraper.', 'Oublier la clôture et l’évaluation.'],
    recap: ['Projet = unique, limité, objectif + délai + coût.', 'Tâche = quoi + qui + pour quand.', 'Jalons pour contrôler, communication planifiée.', 'Écart : informer tôt avec une proposition.'],
    quiz: quiz('b4', [
      ['Qu’est-ce qui distingue un projet d’une tâche courante ?', ['Il est plus important.', 'Il est unique, limité dans le temps et a un objectif défini.', 'Il est toujours informatique.', 'Il est toujours dirigé par la direction.'], 1, 'Unicité, limite de temps et objectif défini sont les caractéristiques d’un projet.'],
      ['Qu’est-ce qu’un jalon ?', ['Un membre de l’équipe de projet.', 'Un point de contrôle où un résultat intermédiaire doit être atteint.', 'Le budget total.', 'Un document de clôture.'], 1, 'Le jalon permet de vérifier l’avancement à une date donnée.'],
      ['Tu constates un retard d’une semaine sur une tâche du projet. Que fais-tu ?', ['Tu attends la prochaine séance mensuelle.', 'Tu informes rapidement la direction du projet et proposes des solutions.', 'Tu modifies la date de fin sans rien dire.', 'Tu demandes à l’équipe de faire des heures supplémentaires.'], 1, 'La direction du projet doit pouvoir décider à temps ; c’est à elle de trancher.'],
    ]),
    cas: {
      enonce: 'Tu dois organiser en six semaines une séance d’information pour 80 clients sur une nouvelle prestation.',
      questions: ['Quelles sont tes tâches principales et tes jalons ?', 'Quels risques prévois-tu ?'],
      corrige: [
        'Tâches : clarifier objectif et budget, réserver la salle, établir la liste des invités, invitations et inscriptions, intervenants et contenu, technique, accueil, suivi après l’événement.',
        'Jalons : salle et date confirmées (semaine 1), invitations envoyées (semaine 2), programme validé (semaine 4), répétition technique (semaine 6).',
        'Risques : faible participation (relance), absence d’un intervenant (suppléant), panne technique (test et solution de secours).',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'b5',
    definition:
      'Un processus de changement est le passage organisé d’une manière de travailler à une autre : nouvel outil, nouvelle organisation, nouvelle règle. Y participer, c’est comprendre le changement, y contribuer de façon constructive et aider les autres à le traverser.',
    objectifs: ['Expliquer pourquoi un changement suscite des résistances.', 'Décrire ta contribution positive à un changement.', 'Proposer des mesures d’accompagnement pour une équipe.'],
    aSavoir: [
      'Les réactions habituelles face au changement : inquiétude, résistance, puis essai et adoption. Elles sont normales.',
      'Les causes de résistance : peur de ne pas savoir faire, perte d’habitudes, manque d’information, sentiment de ne pas avoir été consulté.',
      'Les leviers d’accompagnement : expliquer le pourquoi, informer tôt, former, impliquer, tester, soutenir après le démarrage.',
      'Ton rôle : t’informer, essayer, faire remonter les problèmes avec des propositions, soutenir les collègues.',
    ],
    explication: [
      { t: 'p', text: 'Dans la série zéro, le TP4 « Infrastructure technologique » demande de préparer une équipe à l’introduction d’un système de tickets. La technique compte peu : les points se gagnent sur l’accompagnement des personnes. C’est la compétence b5 appliquée.' },
      { t: 'steps', items: ['Comprendre : quoi, pourquoi, pour quand, pour qui', 'Informer tôt et expliquer le bénéfice', 'Former et laisser tester sans risque', 'Démarrer avec un soutien de proximité', 'Recueillir les retours et ajuster'] },
      {
        t: 'table',
        head: ['Réaction d’un collègue', 'Ce qu’elle exprime', 'Réponse adaptée'],
        rows: [
          ['« L’ancien système marchait très bien »', 'Attachement aux habitudes', 'Reconnaître ce qui fonctionnait, montrer ce que le nouveau résout'],
          ['« Je n’y arriverai jamais »', 'Peur de l’échec', 'Formation pratique, binôme, aide-mémoire, droit à l’erreur'],
          ['« On ne nous a rien demandé »', 'Manque de participation', 'Recueillir les besoins, intégrer une personne de l’équipe aux tests'],
          ['« Encore plus de travail »', 'Crainte de surcharge', 'Montrer le gain de temps attendu, alléger pendant la phase de démarrage'],
        ],
      },
      { t: 'p', text: 'Après le démarrage, le changement n’est pas terminé. Prévois une personne de référence, un canal pour les questions, un bilan après deux à quatre semaines, et mesure si l’objectif est atteint.' },
    ],
    methodes: [
      { nom: 'Accompagnement du changement', ficheId: 'changement', resume: 'Expliquer, former, impliquer, soutenir, ajuster.' },
      { nom: 'Introduction d’un outil numérique', ficheId: 'introduction-outil', resume: 'Plan de préparation des utilisateurs en cinq temps.' },
      { nom: 'PDCA', ficheId: 'pdca', resume: 'Planifier, réaliser, vérifier, ajuster.' },
    ],
    exemple:
      'Un service passe du classement papier à la gestion électronique des documents. La personne chargée de l’accompagnement organise une séance d’information sur les raisons du changement, une formation pratique par groupes de trois, un aide-mémoire d’une page, puis une permanence quotidienne de quinze minutes pendant les deux premières semaines. Après un mois, un questionnaire court sert à corriger les règles de nommage.',
    situation: 'Ton entreprise introduit un nouveau logiciel dans un mois. Deux collègues expérimentés répètent qu’ils continueront « comme avant » et tiennent un fichier parallèle.',
    questionOrale: 'Votre service introduit un nouvel outil. Comment contribuez-vous à ce que le changement réussisse ?',
    reponse: [
      'Je m’informe sur le but et le calendrier et j’explique le bénéfice concret pour l’équipe.',
      'Je prends les inquiétudes au sérieux : elles sont normales et signalent souvent un vrai besoin.',
      'Je propose formation pratique, phase de test et aide-mémoire.',
      'Je reste disponible après le démarrage et je fais remonter les difficultés avec des propositions.',
      'Je mesure le résultat avec un indicateur et je propose un bilan.',
    ],
    erreurs: ['Traiter la résistance comme de la mauvaise volonté.', 'Parler uniquement de l’outil, pas des personnes.', 'Tout miser sur une formation unique avant le démarrage.', 'Tolérer durablement un système parallèle.'],
    recap: ['Résistance = réaction normale, souvent un besoin non entendu.', 'Expliquer le pourquoi, informer tôt, former, impliquer, soutenir.', 'Tester avant de démarrer.', 'Bilan et ajustement après le démarrage.'],
    quiz: quiz('b5', [
      ['Quelle est la cause la plus fréquente de résistance à un changement ?', ['La paresse.', 'Le manque d’information et la peur de ne pas savoir faire.', 'L’âge des collaborateurs.', 'Le prix de l’outil.'], 1, 'Sans explication du pourquoi ni assurance de pouvoir y arriver, l’inquiétude domine.'],
      ['Quelle mesure aide le plus après le démarrage d’un nouvel outil ?', ['Interdire les questions pour gagner du temps.', 'Une personne de référence disponible et un bilan après quelques semaines.', 'Un rappel écrit de la direction.', 'Aucune : la formation suffit.'], 1, 'Les vraies questions apparaissent à l’usage ; il faut un soutien de proximité et un ajustement.'],
      ['Un collègue tient un fichier parallèle à côté du nouvel outil. Pourquoi est-ce un problème ?', ['Cela ne pose aucun problème.', 'Les données existent en double, divergent et l’outil perd sa fiabilité.', 'Le fichier prend trop de place.', 'Cela ralentit son ordinateur.'], 1, 'Deux sources de données donnent des informations contradictoires et annulent le bénéfice du changement.'],
    ]),
    cas: {
      enonce: 'La direction annonce par courriel, sans explication, que le télétravail passe de trois à un jour par semaine dès le mois prochain. L’ambiance se dégrade fortement.',
      questions: ['Qu’est-ce qui explique la réaction de l’équipe ?', 'Qu’aurait-il fallu faire, et que peut-on encore faire ?'],
      corrige: [
        'Causes : aucune explication du pourquoi, annonce tardive, pas de consultation, perte concrète pour les personnes.',
        'Il aurait fallu : expliquer les raisons, annoncer tôt, recueillir les contraintes, prévoir une transition.',
        'Encore possible : séance d’échange, clarification des raisons, période de transition, traitement des cas particuliers, bilan après trois mois.',
      ],
    },
    sources: SRC,
  },
]
