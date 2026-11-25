import type { Lesson } from '@/types'
import { quiz } from './_helpers'

const SRC = ['directive', 'guide-cifc', 'mandats', 'konvink', 'serie0']

export const LESSONS_D: Lesson[] = [
  {
    comp: 'd1',
    definition:
      'Prendre en compte les besoins, c’est accueillir la personne, comprendre ce qu’elle demande et ce dont elle a réellement besoin, puis traiter la demande ou la transmettre sans que l’information se perde.',
    objectifs: ['Adopter une attitude de service au guichet, au téléphone et par écrit.', 'Clarifier un besoin par l’écoute active et les bonnes questions.', 'Décider de traiter ou de transférer une demande, et le faire proprement.'],
    aSavoir: [
      'La différence entre la demande exprimée (« je veux parler à un responsable ») et le besoin (« je veux que mon problème soit pris au sérieux »).',
      'Les techniques d’écoute active : laisser parler, relancer, reformuler, résumer.',
      'Questions ouvertes pour explorer (« que s’est-il passé ? »), fermées pour vérifier (« c’était bien le 12 mars ? »).',
      'Les règles du contact : se présenter, utiliser le nom de la personne, ton positif, annoncer ce que l’on fait, conclure par la suite donnée.',
      'Le transfert propre : expliquer pourquoi, à qui, transmettre le contexte, donner un délai.',
    ],
    explication: [
      { t: 'p', text: 'Le TP3 est une simulation : on te remet un courriel ou une situation de client, et tu expliques ce que tu fais. La base de toute bonne réponse est d1 : avant de résoudre, comprendre.' },
      { t: 'steps', items: ['Accueillir : saluer, se présenter, se rendre disponible', 'Écouter sans interrompre', 'Questionner pour préciser', 'Reformuler pour valider', 'Traiter ou transférer, annoncer la suite'] },
      {
        t: 'table',
        head: ['Canal', 'Points d’attention'],
        rows: [
          ['Guichet', 'Regard, posture ouverte, discrétion : les autres personnes entendent'],
          ['Téléphone', 'Sourire (il s’entend), nom de l’entreprise et le sien, débit calme, notes, résumé final'],
          ['Courriel', 'Objet précis, salutation, réponse à toutes les questions, prochaine étape, signature complète, réponse dans les 24 heures ou accusé de réception'],
          ['Messagerie instantanée ou formulaire', 'Réponse brève et complète, même niveau de politesse, attention aux données sensibles'],
        ],
      },
      { t: 'h', text: 'Traiter ou transférer ?' },
      { t: 'p', text: 'Tu traites ce qui relève de tes compétences et de tes connaissances. Tu transfères ce qui les dépasse : décision hors de ta compétence, domaine technique d’un autre service. Un transfert réussi évite au client de tout répéter : tu annonces la personne, tu résumes le cas à ton collègue et tu dis au client quand il aura une réponse.' },
      { t: 'note', text: 'Les clients internes (collègues, autres services) et les fournisseurs méritent la même attitude de service que les clients externes.' },
    ],
    methodes: [
      { nom: 'Écoute active', ficheId: 'ecoute-active', resume: 'Laisser parler, relancer, reformuler, résumer.' },
      { nom: 'Analyse des besoins', ficheId: 'analyse-besoins', resume: 'Questions ouvertes puis fermées, de la demande au besoin.' },
      { nom: 'Téléphone professionnel', ficheId: 'telephone-pro', resume: 'Accueil, écoute, résumé, suite donnée.' },
      { nom: 'Courriel professionnel', ficheId: 'courriel-pro', resume: 'Structure et ton d’une réponse écrite.' },
    ],
    exemple:
      'Au guichet d’un office communal, une habitante demande « le formulaire pour l’aide au logement ». Par quelques questions, la collaboratrice comprend qu’elle vient de perdre son emploi et craint de ne plus payer son loyer. Le besoin dépasse le formulaire : elle lui remet la liste des pièces à fournir, lui explique les délais et l’oriente aussi vers le service social.',
    situation: 'Un client appelle et dit seulement : « Votre facture est fausse, comme d’habitude. Passez-moi quelqu’un de compétent. »',
    questionOrale: 'Un client vous contacte avec une demande confuse. Comment procédez-vous pour comprendre son besoin ?',
    reponse: [
      'Je l’accueille, je me présente et je le laisse exposer sa demande sans l’interrompre.',
      'Je pose des questions ouvertes pour comprendre la situation, puis fermées pour vérifier les faits.',
      'Je reformule : « Si je vous comprends bien… », jusqu’à ce qu’il confirme.',
      'Je distingue la demande du besoin réel et j’y réponds, ou je transfère avec le contexte complet.',
      'Je conclus en résumant ce qui a été convenu et la prochaine étape, avec un délai.',
    ],
    erreurs: ['Répondre à la première phrase sans avoir compris le besoin.', 'Enchaîner les questions fermées comme un interrogatoire.', 'Transférer « à froid » : le client doit tout répéter.', 'Terminer sans dire ce qui va se passer ensuite.'],
    recap: ['Accueillir, écouter, questionner, reformuler, traiter ou transférer.', 'Demande ≠ besoin.', 'Ouvertes pour explorer, fermées pour vérifier.', 'Toujours annoncer la suite et le délai.'],
    quiz: quiz('d1', [
      ['Laquelle de ces questions est une question ouverte ?', ['Avez-vous reçu la facture ?', 'Que s’est-il passé exactement depuis votre commande ?', 'Votre numéro de client est bien le 4512 ?', 'Voulez-vous être rappelé ?'], 1, 'Une question ouverte invite à raconter ; elle commence souvent par que, comment, pourquoi.'],
      ['À quoi sert la reformulation ?', ['À gagner du temps.', 'À vérifier que l’on a bien compris et à montrer que l’on écoute.', 'À corriger le client.', 'À éviter de répondre.'], 1, 'Reformuler valide la compréhension et apaise la personne.'],
      ['Tu dois transférer un appel à un autre service. Que fais-tu ?', ['Tu transfères immédiatement sans rien dire.', 'Tu donnes le numéro et tu raccroches.', 'Tu expliques au client pourquoi et à qui, puis tu résumes le cas à ton collègue.', 'Tu demandes au client de rappeler demain.'], 2, 'Un transfert « à chaud » évite au client de tout répéter.'],
    ]),
    cas: {
      enonce: 'Courriel reçu : « Bonjour, j’ai un souci avec mon compte en ligne. Merci de faire le nécessaire. M. Favre ». Aucune autre information.',
      questions: ['Que te manque-t-il pour traiter la demande ?', 'Rédige les grandes lignes de ta réponse.'],
      corrige: [
        'Manque : identification (numéro de client), nature du problème (connexion, affichage, données), depuis quand, message d’erreur, appareil utilisé.',
        'Réponse : remerciement, questions précises et peu nombreuses, proposition d’un appel si c’est plus simple, engagement sur un délai après réception des informations.',
        'Attention : ne pas demander le mot de passe et vérifier l’identité avant de modifier quoi que ce soit.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'd2',
    definition:
      'Un entretien d’information transmet des renseignements exacts et compréhensibles. Un entretien de conseil va plus loin : il aide la personne à choisir la solution qui lui convient. Cette compétence comprend aussi le traitement des objections, des plaintes et des réclamations.',
    objectifs: ['Structurer un entretien d’information ou de conseil.', 'Présenter une solution par ses avantages pour le client.', 'Traiter une réclamation de façon professionnelle, du premier contact au suivi.'],
    aSavoir: [
      'Les phases d’un entretien : préparation, accueil, analyse du besoin, information ou proposition, conclusion, suivi.',
      'Caractéristique, avantage, bénéfice : passer de « ce que c’est » à « ce que cela vous apporte ».',
      'Une objection est une question ou une inquiétude, pas une attaque : on l’accueille, on la clarifie, on y répond, on vérifie.',
      'Les étapes du traitement d’une réclamation : écouter, s’excuser pour le désagrément, clarifier les faits, proposer une solution et un délai, tenir parole, vérifier la satisfaction, corriger la cause.',
      'Tes limites : ce que tu peux décider seul et ce que tu dois faire valider.',
    ],
    explication: [
      { t: 'p', text: 'Le TP3 de la série zéro est une réclamation : un client de longue date, mécontent des délais et d’un intranet défectueux sur mobile, menace de changer de fournisseur, et son courriel attend depuis trois jours. La compétence d2 fournit la colonne vertébrale de la réponse.' },
      { t: 'h', text: 'Traiter une réclamation' },
      { t: 'steps', items: ['Réagir vite et choisir le bon canal', 'Écouter et laisser la personne s’exprimer', 'Reconnaître le désagrément et s’excuser', 'Clarifier les faits et le besoin', 'Proposer une solution avec un délai réaliste', 'Tenir parole et informer', 'Vérifier la satisfaction, corriger la cause en interne'] },
      {
        t: 'table',
        head: ['Ce que dit le client', 'À éviter', 'Formulation professionnelle'],
        rows: [
          ['« J’attends depuis une éternité »', '« Nous avons beaucoup de travail »', '« Vous avez raison, ce délai n’est pas acceptable et je vous prie de nous en excuser »'],
          ['« Rien ne fonctionne »', '« Chez les autres clients, ça marche »', '« Pouvez-vous me décrire ce qui s’affiche sur le téléphone de vos collaborateurs ? »'],
          ['« Je vais changer de fournisseur »', '« C’est votre droit »', '« Je comprends votre réaction. Laissez-moi vous dire ce que je mets en place dès aujourd’hui »'],
          ['« Réglez ça tout de suite »', '« Ce sera réglé demain » (sans le savoir)', '« Je vous rappelle demain avant midi avec un calendrier précis »'],
        ],
      },
      { t: 'note', text: 'S’excuser pour le désagrément n’est pas reconnaître une faute juridique. C’est reconnaître ce que vit le client.' },
      { t: 'h', text: 'Informer et conseiller' },
      { t: 'p', text: 'Pour informer : prépare des informations fiables et à jour, annonce le plan, utilise un langage simple, vérifie la compréhension, remets un support écrit. Pour conseiller : pars du besoin, propose une ou deux solutions adaptées, explique l’avantage pour cette personne, mentionne honnêtement les limites et laisse-la décider.' },
      { t: 'p', text: 'Une réclamation est aussi une information gratuite sur ce qui ne fonctionne pas. Après le traitement, on en documente la cause et on la fait remonter : c’est le lien avec les compétences b2 et c3.' },
    ],
    methodes: [
      { nom: 'Gestion des réclamations', ficheId: 'reclamations', resume: 'Sept étapes, de la première réaction à la correction de la cause.' },
      { nom: 'Entretien de conseil', ficheId: 'entretien-conseil', resume: 'Du besoin à l’avantage client.' },
      { nom: 'Traitement des objections', ficheId: 'objections', resume: 'Accueillir, clarifier, répondre, vérifier.' },
      { nom: 'Écoute active', ficheId: 'ecoute-active', resume: 'Base de tout entretien.' },
    ],
    exemple:
      'Une assurée conteste un décompte de prestations. Le collaborateur l’écoute, reformule, s’excuse pour l’incompréhension et vérifie le dossier : une facture a bien été saisie deux fois. Il annonce la correction, précise que le remboursement arrivera dans dix jours, envoie une confirmation écrite, puis signale l’erreur de saisie à son responsable pour qu’un contrôle soit ajouté.',
    situation: 'Un fournisseur livre pour la troisième fois avec une semaine de retard. Ton responsable te demande de l’appeler.',
    questionOrale: 'Un client mécontent vous écrit qu’il envisage de résilier. Comment réagissez-vous ?',
    reponse: [
      'Je réagis le jour même et je choisis le téléphone : c’est plus personnel et plus rapide pour un client en colère.',
      'Je l’écoute, je reconnais le désagrément et je m’excuse, sans chercher d’excuses.',
      'Je clarifie les faits par des questions précises et je sépare les problèmes s’il y en a plusieurs.',
      'Je propose une solution ou, si je ne l’ai pas encore, une prochaine étape avec un délai que je maîtrise ; je confirme par écrit.',
      'Je coordonne en interne, je tiens le client informé, je vérifie sa satisfaction et je fais remonter la cause pour éviter la répétition.',
    ],
    erreurs: ['Se justifier ou accuser un autre service.', 'Promettre une solution technique ou un délai que l’on ne contrôle pas.', 'Répondre uniquement par un courriel standard.', 'Classer le cas une fois le client calmé, sans traiter la cause.'],
    recap: ['Réclamation : réagir vite, écouter, s’excuser, clarifier, proposer, tenir, vérifier, corriger la cause.', 'Conseil : besoin → solution → avantage pour ce client.', 'Objection = inquiétude à clarifier.', 'Ne promettre que ce que l’on maîtrise.'],
    quiz: quiz('d2', [
      ['Quelle est la première chose à faire face à un client en colère ?', ['Lui expliquer qu’il a tort.', 'L’écouter sans l’interrompre.', 'Lui proposer un rabais.', 'Le transférer à un responsable.'], 1, 'Tant que la personne n’a pas pu s’exprimer, elle n’entend aucune solution.'],
      ['Tu ne connais pas encore la solution à un problème technique. Que promets-tu au client ?', ['Que ce sera réglé demain.', 'Rien, tu attends d’en savoir plus.', 'Un rappel à une date précise avec un état de la situation.', 'Un remboursement complet.'], 2, 'On promet ce que l’on maîtrise : une prochaine étape et un délai.'],
      ['Laquelle de ces phrases présente un avantage pour le client ?', ['Notre portail utilise une technologie récente.', 'Avec le portail, vous voyez vos factures à tout moment, sans attendre nos heures d’ouverture.', 'Le portail a été développé en interne.', 'Le portail a coûté cher.'], 1, 'L’avantage se formule du point de vue du client : ce que cela lui apporte.'],
    ]),
    cas: {
      enonce: 'Une cliente téléphone : elle a commandé il y a trois semaines, a été débitée, n’a rien reçu et a déjà appelé deux fois sans suite. Elle exige d’être remboursée immédiatement.',
      questions: ['Décris ta démarche pendant l’appel.', 'Que fais-tu après l’appel ?'],
      corrige: [
        'Pendant : écoute, excuses pour l’attente et les deux appels sans suite, vérification de la commande, deux options (remboursement ou livraison express selon tes compétences), délai précis, confirmation écrite.',
        'Après : lancer le remboursement ou la livraison, vérifier l’exécution, rappeler la cliente comme promis.',
        'En interne : pourquoi les deux premiers appels n’ont-ils eu aucune suite ? Signaler le défaut de suivi et proposer une mesure.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'd3',
    definition:
      'Un entretien de vente amène un client à choisir une prestation qui répond à son besoin. Un entretien de négociation cherche un accord entre deux parties aux intérêts différents : prix, délai, conditions.',
    objectifs: ['Préparer un entretien de vente ou de négociation.', 'Mener l’entretien en visant un accord acceptable pour les deux parties.', 'Conclure clairement et assurer le suivi.'],
    aSavoir: [
      'La préparation : objectif, informations sur l’interlocuteur, arguments, marge de manœuvre (objectif idéal, minimum acceptable), solution de repli.',
      'La différence entre position (« je veux 10 % de rabais ») et intérêt (« je dois respecter mon budget »).',
      'Le principe gagnant-gagnant et celui de la contrepartie : on ne cède rien sans obtenir quelque chose.',
      'Les signaux de conclusion et la manière de conclure : résumer l’accord et le confirmer par écrit.',
      'Les limites de ta compétence : rabais, délais et dérogations doivent souvent être validés.',
    ],
    explication: [
      { t: 'p', text: 'Au TP3, la négociation apparaît souvent dans les scénarios alternatifs : « Et si le client exige un dédommagement ? », « Et si le fournisseur refuse le délai ? ». Tu dois montrer que tu sais chercher un accord sans brader les intérêts de l’entreprise ni dépasser tes compétences.' },
      { t: 'steps', items: ['Préparer : objectif, marge, arguments, alternative', 'Ouvrir : créer un climat positif, annoncer le but', 'Explorer : besoins et intérêts de l’autre', 'Proposer et argumenter, traiter les objections', 'Conclure : résumer l’accord', 'Suivre : confirmation écrite, exécution, bilan'] },
      {
        t: 'table',
        head: ['Principe', 'Explication', 'Exemple avec un fournisseur en retard'],
        rows: [
          ['Séparer la personne du problème', 'Rester courtois, être ferme sur les faits', '« Nous travaillons bien ensemble, mais trois retards en deux mois nous posent un problème »'],
          ['Chercher les intérêts', 'Demander pourquoi', '« Qu’est-ce qui explique ces retards ? »'],
          ['Imaginer plusieurs options', 'Élargir avant de choisir', 'Commandes anticipées, livraisons partielles, stock tampon'],
          ['Critères objectifs', 'S’appuyer sur le contrat et les chiffres', '« Le contrat prévoit cinq jours ouvrables »'],
          ['Contrepartie', 'Donnant-donnant', '« Si nous commandons deux semaines plus tôt, pouvez-vous garantir la date ? »'],
        ],
      },
      { t: 'note', text: 'Ces principes viennent de la négociation raisonnée, souvent appelée méthode de Harvard. Le guide pratique fourni y fait référence.' },
      { t: 'p', text: 'Dans la vente, on ne récite pas un catalogue : on part du besoin (d1), on propose la solution qui y répond, on montre l’avantage (d2), on traite les objections et on aide le client à décider. Une vente forcée produit une résiliation ou une réclamation plus tard.' },
    ],
    methodes: [
      { nom: 'Négociation raisonnée', ficheId: 'negociation', resume: 'Intérêts plutôt que positions, options, critères objectifs.' },
      { nom: 'Traitement des objections', ficheId: 'objections', resume: 'Accueillir, clarifier, répondre, vérifier.' },
      { nom: 'Entretien de conseil', ficheId: 'entretien-conseil', resume: 'Le socle d’un entretien de vente honnête.' },
    ],
    exemple:
      'Un client demande 15 % de rabais sur un contrat de maintenance. La collaboratrice, qui peut accorder 5 % au maximum, cherche l’intérêt derrière la position : le client doit réduire ses charges annuelles. Elle propose 5 % de rabais contre un engagement de trois ans et le passage à la facturation annuelle, ce qui allège aussi le travail administratif. L’accord est confirmé par écrit le jour même.',
    situation: 'Un fournisseur t’annonce une hausse de prix de 12 % dès le mois prochain. Ton responsable te charge d’un premier entretien.',
    questionOrale: 'Comment préparez-vous et menez-vous un entretien de négociation avec un fournisseur ?',
    reponse: [
      'Je me prépare : objectif idéal, minimum acceptable, arguments chiffrés, alternative si l’on ne s’accorde pas, limites de ma compétence.',
      'J’ouvre sur un ton positif et j’annonce le but de l’entretien.',
      'Je cherche à comprendre ses raisons et ses intérêts par des questions.',
      'Je propose des options et je négocie en donnant-donnant, en m’appuyant sur des critères objectifs.',
      'Je résume l’accord, je le confirme par écrit et je fais valider ce qui dépasse ma compétence. Sans accord, je conviens d’une suite.',
    ],
    erreurs: ['Arriver sans marge de manœuvre définie ni alternative.', 'Céder un avantage sans rien demander en retour.', 'Menacer ou personnaliser le désaccord.', 'Conclure oralement sans confirmation écrite.'],
    recap: ['Préparer : objectif, minimum, arguments, alternative, compétence.', 'Intérêts plutôt que positions.', 'Donnant-donnant, critères objectifs.', 'Résumer et confirmer par écrit.'],
    quiz: quiz('d3', [
      ['Dans une négociation, qu’est-ce qu’un intérêt ?', ['Ce que la personne exige.', 'La raison qui se cache derrière ce qu’elle exige.', 'Le taux appliqué au retard de paiement.', 'Le prix catalogue.'], 1, 'La position est la demande ; l’intérêt est le besoin qui la motive.'],
      ['Un client demande un rabais supérieur à ta compétence. Que fais-tu ?', ['Tu l’accordes pour conclure.', 'Tu refuses sèchement.', 'Tu proposes ce que tu peux accorder et tu annonces que tu fais valider le reste.', 'Tu changes de sujet.'], 2, 'On reste dans ses compétences et on est transparent sur la suite.'],
      ['Que signifie « négocier en donnant-donnant » ?', ['Accorder tout ce qui est demandé.', 'Lier chaque concession à une contrepartie.', 'Ne jamais rien céder.', 'Couper la poire en deux.'], 1, 'Chaque concession appelle une contrepartie, pour un accord équilibré.'],
    ]),
    cas: {
      enonce: 'Un client fidèle a subi une panne de deux jours de votre service. Il exige trois mois d’abonnement gratuits. Ta compétence : un mois de geste commercial.',
      questions: ['Comment mènes-tu l’échange ?', 'Que proposes-tu ?'],
      corrige: [
        'Écouter, reconnaître le préjudice, s’excuser ; demander l’impact concret de la panne (intérêt derrière la demande).',
        'Proposer un mois offert tout de suite, plus une mesure utile (contact prioritaire, contrôle technique) ; annoncer que la demande supplémentaire est transmise à la hiérarchie, avec un délai de réponse.',
        'Confirmer par écrit, faire valider, rappeler comme promis.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'd4',
    definition:
      'Entretenir une relation, c’est faire en sorte qu’un client ou un fournisseur ait envie de continuer à travailler avec l’entreprise : contacts réguliers, promesses tenues, information proactive, écoute des retours.',
    objectifs: ['Expliquer comment se construit la confiance avec un client ou un fournisseur.', 'Citer des mesures concrètes de fidélisation.', 'Demander un retour et l’exploiter.'],
    aSavoir: [
      'Garder un client coûte moins cher que d’en gagner un nouveau : la relation se soigne après la vente et après la réclamation.',
      'Les mesures de suivi : rappel après résolution, information proactive en cas de retard, interlocuteur attitré, bilan périodique, enquête de satisfaction.',
      'La tenue des données clients (CRM) : notes à jour, historique, préférences, dans le respect de la protection des données.',
      'Demander un feed-back : au bon moment, avec des questions précises, et faire savoir ce que l’on en a fait.',
      'Avec les fournisseurs : partenariat, paiement dans les délais, communication ouverte sur les problèmes.',
    ],
    explication: [
      { t: 'p', text: 'Le TP3 de la série zéro demande expressément « la suite que vous donneriez à ce cas après votre réponse ». C’est d4 : beaucoup de candidats s’arrêtent à la réponse au client et perdent les points du suivi.' },
      { t: 'steps', items: ['Tenir ce qui a été promis', 'Informer avant que le client ne demande', 'Vérifier la satisfaction après résolution', 'Documenter dans le dossier client', 'Tirer les enseignements et prévenir'] },
      {
        t: 'table',
        head: ['Moment', 'Geste de relation', 'Effet'],
        rows: [
          ['Après une réclamation', 'Rappel une à deux semaines plus tard : « Tout fonctionne-t-il ? »', 'Montre que le client compte ; regagne la confiance'],
          ['En cas de retard', 'Prévenir avant l’échéance avec une nouvelle date', 'Le client peut s’organiser'],
          ['Client important', 'Interlocuteur attitré, point régulier', 'Moins de malentendus'],
          ['Chaque année', 'Entretien de bilan ou enquête', 'Détecte les insatisfactions silencieuses'],
          ['À chaque contact', 'Note dans le CRM', 'Le prochain collègue connaît l’historique'],
        ],
      },
      { t: 'p', text: 'La plupart des clients mécontents ne réclament pas : ils partent. Demander un retour est donc un acte de fidélisation. Pour qu’il soit utile, pose peu de questions, précises, et réponds aux remarques reçues.' },
      { t: 'note', text: 'Un cadeau ou une invitation à un fournisseur ou d’un fournisseur doit respecter les règles internes : dans une administration publique, la marge est très étroite.' },
    ],
    methodes: [
      { nom: 'Fidélisation et suivi', ficheId: 'fidelisation', resume: 'Tenir, informer, vérifier, documenter, prévenir.' },
      { nom: 'Enquête de satisfaction', ficheId: 'enquete-satisfaction', resume: 'Recueillir et exploiter l’avis des clients.' },
      { nom: 'Feed-back', ficheId: 'feedback', resume: 'Demander un retour précis et dire ce que l’on en fait.' },
    ],
    exemple:
      'Une gérance immobilière, partenaire régulier d’un office communal, se plaint de recevoir les autorisations trop tard. La collaboratrice propose un point mensuel de quinze minutes et une liste commune des pièces à fournir. Trois mois plus tard, les dossiers incomplets ont diminué de moitié et la gérance signale spontanément les cas urgents.',
    situation: 'Tu as résolu la semaine dernière le problème d’un client important. Depuis, aucune nouvelle. Ton responsable te demande ce que tu as prévu.',
    questionOrale: 'Une fois une réclamation résolue, que faites-vous pour préserver la relation avec le client ?',
    reponse: [
      'Je vérifie que tout ce qui a été promis a été exécuté.',
      'Je recontacte le client après quelques jours pour m’assurer que la solution fonctionne.',
      'Je documente le cas dans son dossier pour que mes collègues connaissent l’historique.',
      'Pour un client important, je propose un interlocuteur attitré ou un point régulier.',
      'J’analyse la cause avec mon équipe et je propose une mesure préventive ; je peux en informer le client.',
    ],
    erreurs: ['Considérer le cas comme clos dès que le client ne se plaint plus.', 'Ne rien noter dans le dossier client.', 'Envoyer une enquête sans jamais exploiter les réponses.', 'Oublier que les fournisseurs sont aussi des partenaires à soigner.'],
    recap: ['La relation se joue après la réponse.', 'Tenir, informer, vérifier, documenter, prévenir.', 'Demander un retour et dire ce que l’on en fait.', 'Dossier client à jour, données protégées.'],
    quiz: quiz('d4', [
      ['Pourquoi rappeler un client après la résolution de sa réclamation ?', ['Pour lui vendre autre chose.', 'Pour vérifier que la solution fonctionne et restaurer la confiance.', 'Parce que la loi l’exige.', 'Pour clore la statistique.'], 1, 'Le rappel montre que le client compte et détecte un problème résiduel.'],
      ['Tu sais qu’une livraison aura du retard. Quand informes-tu le client ?', ['Quand il appelle.', 'Le jour prévu de la livraison.', 'Dès que tu le sais, avec une nouvelle date.', 'Jamais, pour ne pas l’inquiéter.'], 2, 'L’information proactive permet au client de s’organiser et préserve la confiance.'],
      ['À quoi sert de noter chaque contact dans le dossier client ?', ['À surveiller les collaborateurs.', 'À permettre à tout collègue de reprendre le dossier sans faire répéter le client.', 'À remplir le serveur.', 'À rien si l’on a une bonne mémoire.'], 1, 'L’historique partagé garantit la continuité du service.'],
    ]),
    cas: {
      enonce: 'Votre plus gros client n’a émis aucune réclamation en deux ans, mais ses commandes baissent de 30 % depuis six mois.',
      questions: ['Que peut signifier cette baisse ?', 'Que proposes-tu ?'],
      corrige: [
        'Hypothèses : insatisfaction silencieuse, concurrent, changement de besoins ou de budget, changement d’interlocuteur.',
        'Démarche : analyser l’historique, puis proposer un entretien de bilan avec des questions ouvertes sur ses besoins actuels et sa satisfaction.',
        'Suite : plan d’action selon ses réponses, interlocuteur attitré, point régulier, suivi des commandes.',
      ],
    },
    sources: SRC,
  },
]
