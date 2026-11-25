import type { Lesson } from '@/types'
import { quiz } from './_helpers'

const SRC = ['directive', 'guide-cifc', 'mandats', 'konvink', 'serie0']

export const LESSONS_A: Lesson[] = [
  {
    comp: 'a1',
    definition:
      'Examiner et développer ses compétences, c’est faire régulièrement le point sur ce que l’on sait faire, repérer ce qui manque, puis se fixer des objectifs précis et des mesures pour progresser.',
    objectifs: [
      'Décrire ton rôle et ce que l’entreprise attend de toi.',
      'Réaliser un bilan personnel honnête : points forts, points à améliorer, preuves.',
      'Formuler un objectif SMART et le plan de mesures qui va avec.',
    ],
    aSavoir: [
      'La différence entre auto-évaluation (ton regard) et évaluation externe (le regard d’un responsable ou d’un collègue), et ce que tu fais quand elles divergent.',
      'Les cinq critères SMART et la capacité de transformer un souhait vague en objectif SMART en moins d’une minute.',
      'Le lien objectif → mesures → échéance → contrôle : sans contrôle, un objectif n’est qu’une intention.',
      'Un exemple réel de compétence que tu as développée et la manière dont tu t’y es pris.',
    ],
    explication: [
      { t: 'p', text: 'Le monde du travail change vite : nouveaux outils, nouvelles règles, nouvelles attentes des clients. Une ou un employé de commerce ne peut pas se contenter de ce qu’il a appris une fois. La compétence a1 décrit une boucle que l’on répète tout au long de sa carrière.' },
      { t: 'steps', items: ['Clarifier mon rôle : tâches, responsabilités, attentes', 'Documenter mon travail et y réfléchir', 'Faire un bilan : forces, faiblesses, écarts', 'Fixer des objectifs SMART et des mesures', 'Mettre en œuvre, puis vérifier le résultat'] },
      { t: 'h', text: 'Les quatre dimensions d’une compétence' },
      {
        t: 'table',
        head: ['Dimension (guide CIFC, p. 6)', 'Ce qu’elle recouvre', 'Question à te poser pour ton bilan'],
        rows: [
          ['Professionnelle', 'Maîtriser les situations courantes de façon ciblée et autonome, avec les bons outils, normes et procédures', 'Qu’est-ce que je sais faire seul, et avec quel niveau de qualité ?'],
          ['Méthodologique', 'Planifier son travail, procéder de façon structurée et efficace, penser en processus', 'Comment est-ce que je m’organise et je priorise ?'],
          ['Sociale', 'Aborder les relations et la communication de façon réfléchie et constructive, travailler en équipe', 'Comment est-ce que je collabore et gère les tensions ?'],
          ['Personnelle', 'Analyser ses actions, s’adapter aux changements, gérer le stress, se former', 'Comment est-ce que je réagis au changement et à la critique ?'],
        ],
      },
      { t: 'note', text: 'Ces quatre dimensions sont une bonne trame pour le TP5 : en analysant une situation vécue, montre ce que tu savais faire (professionnel), comment tu t’y es pris (méthodologique), comment tu as communiqué (social) et ce que tu en as appris (personnel).' },
      { t: 'h', text: 'Le bilan personnel' },
      { t: 'p', text: 'Un bon bilan s’appuie sur des faits. « Je suis organisé » ne vaut rien sans exemple ; « je traite quarante dossiers par semaine sans retard depuis six mois » est une preuve. Compare toujours ton auto-évaluation avec un retour externe : entretien annuel, feed-back d’un collègue, réclamations reçues, indicateurs de ton service. Un écart entre les deux regards n’est pas un problème, c’est une information.' },
      { t: 'h', text: 'De l’envie à l’objectif SMART' },
      {
        t: 'table',
        head: ['Critère', 'Question à se poser', 'Exemple'],
        rows: [
          ['Spécifique', 'Qu’est-ce que je veux atteindre exactement ?', 'Rédiger seul les décisions de refus standard'],
          ['Mesurable', 'À quoi verrai-je que c’est atteint ?', 'Dix décisions validées sans correction de fond'],
          ['Ambitieux (attrayant)', 'Est-ce un vrai progrès, qui me motive ?', 'Je gagne en autonomie, mon responsable gagne du temps'],
          ['Réaliste', 'Est-ce possible avec mes moyens ?', 'Modèles existants, une heure de coaching par semaine'],
          ['Temporel', 'Pour quand ?', 'D’ici au 30 juin'],
        ],
      },
      { t: 'note', text: 'Les mandats pratiques fournis traduisent le A par « ambitieux ». D’autres sources disent « atteignable » ou « attrayant ». À l’oral, cite une version et explique-la : c’est l’explication qui compte.' },
      { t: 'p', text: 'Un objectif sans mesure reste théorique. Pour chaque objectif, note deux ou trois mesures concrètes (formation, exercice, observation d’un collègue), la personne qui peut t’aider et la date de contrôle. Après l’échéance, analyse : quelles mesures ont été efficaces, lesquelles non, et pourquoi ?' },
    ],
    methodes: [
      { nom: 'Objectifs SMART', ficheId: 'smart', resume: 'Cinq critères pour rendre un objectif précis et vérifiable.' },
      { nom: 'Bilan de compétences', ficheId: 'bilan-competences', resume: 'Comparer auto-évaluation et évaluation externe, avec des preuves.' },
      { nom: 'Feed-back', ficheId: 'feedback', resume: 'Demander, recevoir et exploiter un retour sans se justifier.' },
    ],
    exemple:
      'Dans un service clientèle d’assurance, une collaboratrice remarque qu’elle transfère presque tous les appels portant sur les décomptes de prestations. Lors de son entretien annuel, sa responsable confirme l’écart. Objectif : « D’ici au 31 mars, je traite moi-même 80 % des questions de décompte sans transfert. » Mesures : deux demi-journées en doublure avec le service des prestations, une fiche personnelle des dix cas types, un point de contrôle mensuel sur le taux de transfert.',
    situation:
      'Ton responsable t’annonce que le service passera dans trois mois à un nouveau logiciel de gestion des dossiers. Tu n’as jamais travaillé avec ce type d’outil. Il te demande comment tu comptes te préparer.',
    questionOrale: 'Comment procédez-vous pour identifier vos besoins de développement et pour progresser concrètement ?',
    reponse: [
      'Je pars de mon rôle : quelles tâches m’attendent et quel niveau est attendu.',
      'Je fais un bilan appuyé sur des faits et je le compare avec un retour externe, par exemple celui de mon responsable.',
      'Je choisis une ou deux priorités et je les formule en objectifs SMART.',
      'Je définis des mesures concrètes, avec une échéance et une personne ressource.',
      'À l’échéance, je vérifie le résultat, j’analyse ce qui a fonctionné et j’ajuste. Exemple vécu à l’appui.',
    ],
    erreurs: [
      'Citer SMART sans savoir expliquer chaque lettre avec un exemple.',
      'Présenter un bilan sans aucune preuve ni retour externe.',
      'Fixer cinq objectifs à la fois : aucun ne sera tenu.',
      'Oublier l’étape de contrôle après l’échéance.',
    ],
    recap: [
      'Boucle : rôle → bilan → objectifs SMART → mesures → contrôle.',
      'Un bilan = des faits + un regard externe.',
      'Un objectif = un résultat vérifiable à une date donnée.',
      'Toujours terminer par : « et voici comment je vérifie que cela a fonctionné ».',
    ],
    quiz: quiz('a1', [
      ['Lequel de ces objectifs est formulé de manière SMART ?', ['Je veux mieux communiquer avec les clients.', 'D’ici au 30 juin, je réponds à 90 % des courriels clients en moins de 24 heures.', 'Je vais essayer d’être plus rapide cette année.', 'Mon équipe doit s’améliorer rapidement.'], 1, 'Il est spécifique (courriels clients), mesurable (90 %, 24 heures) et daté (30 juin).'],
      ['Ton auto-évaluation est meilleure que l’évaluation de ta responsable. Quelle est la réaction la plus professionnelle ?', ['Défendre ton point de vue jusqu’à ce qu’elle change d’avis.', 'Ignorer son évaluation, elle ne voit pas tout ton travail.', 'Demander des exemples concrets, chercher les raisons de l’écart et en tirer une mesure.', 'Baisser ton auto-évaluation sans discuter.'], 2, 'Un écart est une information. On cherche les faits des deux côtés, puis on en tire une mesure.'],
      ['Que manque-t-il à un plan qui contient un objectif SMART et trois mesures ?', ['Un budget détaillé.', 'Un contrôle du résultat à l’échéance.', 'L’accord écrit de toute l’équipe.', 'Une analyse SWOT de l’entreprise.'], 1, 'Sans contrôle après l’échéance, on ne sait pas si les mesures ont été efficaces.'],
    ]),
    cas: {
      enonce: 'Après deux réclamations de clients pour des réponses écrites jugées « sèches », ta responsable te demande de travailler ta communication écrite au cours des trois prochains mois.',
      questions: ['Formule un objectif SMART.', 'Propose trois mesures.', 'Explique comment tu vérifieras le résultat.'],
      corrige: [
        'Objectif possible : « D’ici trois mois, aucune de mes réponses écrites ne fait l’objet d’une réclamation sur le ton, et ma responsable valide un échantillon de dix courriels sans remarque de forme. »',
        'Mesures : relire les deux courriels en cause avec la responsable ; créer des formulations types (accueil, empathie, conclusion) ; faire relire un courriel sensible par semaine par une collègue.',
        'Contrôle : échantillon de dix courriels à l’échéance, nombre de réclamations, feed-back de la responsable ; puis analyse des mesures les plus utiles.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'a2',
    definition:
      'Un réseau professionnel est l’ensemble des personnes, à l’intérieur et à l’extérieur de l’entreprise, avec lesquelles tu échanges des informations, des conseils et des services dans un cadre de travail. Le développer et l’utiliser, c’est savoir qui peut aider, et entretenir ces relations.',
    objectifs: [
      'Distinguer réseau interne, réseau externe et réseaux en ligne.',
      'Expliquer comment tu construis et entretiens un contact professionnel.',
      'Montrer comment un réseau aide à résoudre un problème concret.',
    ],
    aSavoir: [
      'Un réseau repose sur la réciprocité : on donne avant de demander.',
      'Les règles d’un profil professionnel en ligne : informations exactes, à jour, sans donnée confidentielle de l’employeur.',
      'Savoir cartographier son réseau : qui, dans quel service ou quelle organisation, pour quel type de question.',
      'Le respect du secret de fonction et de la protection des données dans tout échange, même informel.',
    ],
    explication: [
      { t: 'p', text: 'Dans un TP1, les problèmes viennent souvent du fait que personne ne sait qui contacter : les demandes restent bloquées, les réponses sont fausses. Un réseau bien tenu est la réponse pratique à cette situation.' },
      {
        t: 'table',
        head: ['Type de réseau', 'Qui', 'À quoi il sert'],
        rows: [
          ['Interne', 'Collègues, autres services, hiérarchie, personnes de référence', 'Obtenir vite une information fiable, débloquer un dossier'],
          ['Externe', 'Clients, fournisseurs, partenaires, autorités, associations professionnelles', 'Coordonner, échanger des bonnes pratiques, connaître les évolutions'],
          ['En ligne', 'Plateformes professionnelles, groupes spécialisés', 'Se rendre visible, suivre son domaine, garder le contact'],
        ],
      },
      { t: 'steps', items: ['S’informer : quels réseaux existent déjà ?', 'S’auto-évaluer : que puis-je apporter, que me manque-t-il ?', 'Construire : prendre contact de manière ciblée', 'Utiliser et entretenir : donner des nouvelles, remercier, rendre service'] },
      { t: 'p', text: 'Entretenir un réseau ne demande pas de grands gestes : transmettre une information utile, remercier après un coup de main, tenir ses promesses, prévenir quand un interlocuteur change. Ce sont les mêmes réflexes qu’avec un client.' },
      { t: 'note', text: 'Limite à connaître : un bon contact ne donne pas le droit de contourner une procédure ni de transmettre des données personnelles « entre nous ».' },
    ],
    methodes: [
      { nom: 'Carte du réseau', ficheId: 'reseau-pro', resume: 'Lister ses contacts par domaine de compétence et repérer les trous.' },
      { nom: 'Parties prenantes et interfaces', ficheId: 'interfaces', resume: 'Savoir qui est concerné par un sujet avant d’agir.' },
    ],
    exemple:
      'Dans une administration communale, un collaborateur du guichet tient une liste à jour des personnes de contact : contrôle des habitants, service social, principales gérances. Lorsqu’une demande sort de son champ, il sait en une minute à qui s’adresser, ce qui évite au citoyen d’être renvoyé de bureau en bureau.',
    situation:
      'Tu rejoins un nouveau service. Les demandes complexes nécessitent souvent l’avis d’un autre département, mais tu ne connais encore personne et tes collègues te disent « débrouille-toi, appelle le service ».',
    questionOrale: 'Comment construisez-vous et utilisez-vous votre réseau professionnel dans votre travail quotidien ?',
    reponse: [
      'Je commence par repérer les réseaux existants : organigramme, listes de contacts, personnes de référence.',
      'Je me présente de façon ciblée aux interlocuteurs clés et je comprends leurs contraintes.',
      'Je note qui contacter pour quel type de question, et je tiens cette liste à jour.',
      'J’entretiens la relation : je remercie, je transmets les informations utiles, je tiens mes délais.',
      'Je respecte toujours la voie de service et la protection des données.',
    ],
    erreurs: ['Réduire le réseau aux réseaux sociaux.', 'Ne contacter les gens que lorsqu’on a besoin d’eux.', 'Publier en ligne des informations internes ou des données de clients.', 'Confondre réseau et passe-droit.'],
    recap: ['Trois réseaux : interne, externe, en ligne.', 'Quatre étapes : s’informer, s’auto-évaluer, construire, entretenir.', 'Réciprocité et fiabilité avant tout.', 'Jamais au détriment des procédures ni des données personnelles.'],
    quiz: quiz('a2', [
      ['Quel comportement entretient le mieux un réseau professionnel ?', ['Envoyer des demandes uniquement en cas d’urgence.', 'Transmettre spontanément une information utile à un contact.', 'Ajouter le plus de contacts possible en ligne.', 'Éviter les autres services pour ne pas déranger.'], 1, 'Un réseau vit de la réciprocité : on apporte quelque chose sans attendre d’en avoir besoin.'],
      ['Que ne dois-tu pas publier sur ton profil professionnel en ligne ?', ['Ton poste actuel.', 'Tes formations.', 'Le nom d’un client et le détail de son dossier.', 'Tes compétences linguistiques.'], 2, 'Les données de clients et les informations internes sont confidentielles.'],
      ['Tu as besoin d’une information d’un autre service et tu ne connais personne. Par quoi commences-tu ?', ['Tu attends que quelqu’un te le propose.', 'Tu consultes l’organigramme ou demandes à ta responsable qui est la personne de référence.', 'Tu écris à toute l’entreprise.', 'Tu réponds au client sans vérifier.'], 1, 'On part des réseaux existants et des personnes de référence officielles.'],
    ]),
    cas: {
      enonce: 'Dans ton équipe, chacun a « ses » contacts dans les autres services, notés nulle part. Quand une personne est absente, les dossiers s’arrêtent.',
      questions: ['Quel est le problème de fond ?', 'Que proposes-tu ?'],
      corrige: [
        'Problème : le réseau est individuel et non documenté ; le savoir part avec la personne absente, les interfaces ne sont pas définies.',
        'Mesures : une liste partagée des personnes de contact par thème, avec suppléant ; une règle de mise à jour ; des présentations croisées entre services.',
        'Contrôle : nombre de dossiers bloqués lors d’absences, retours de l’équipe après un trimestre.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'a3',
    definition:
      'Recevoir et exécuter un mandat, c’est comprendre exactement ce qui est demandé, planifier le travail, le réaliser dans les délais et la qualité convenus, puis vérifier avec le mandant qu’il est satisfait.',
    objectifs: ['Clarifier un mandat flou par des questions ciblées.', 'Planifier et exécuter un mandat en tenant le mandant informé.', 'Recevoir un retour et en tirer une amélioration.'],
    aSavoir: [
      'Les éléments d’un mandat complet : objectif, résultat attendu, délai, moyens, priorité, personne de contact, forme de la restitution.',
      'La reformulation du mandat avant de commencer : c’est la meilleure assurance contre le travail inutile.',
      'Ce que tu fais en cas d’obstacle : informer tôt, proposer une solution, ne jamais laisser le délai passer en silence.',
      'L’attitude face à un retour critique : écouter, questionner, remercier, corriger.',
    ],
    explication: [
      { t: 'p', text: 'Beaucoup d’erreurs au travail ne viennent pas d’une mauvaise exécution, mais d’un mandat mal compris. La compétence a3 décrit le cycle complet d’un mandat, de la réception au bilan.' },
      { t: 'steps', items: ['Recevoir le mandat et le clarifier', 'Planifier la mise en œuvre', 'Traiter et exécuter', 'Accepter les retours', 'Réfléchir au résultat'] },
      {
        t: 'table',
        head: ['Question de clarification', 'Pourquoi elle compte'],
        rows: [
          ['Quel est le but, à quoi servira le résultat ?', 'Permet de faire les bons choix en cours de route'],
          ['Quel résultat précis, sous quelle forme ?', 'Évite de livrer un tableau quand on attendait une note'],
          ['Pour quand, avec quelle priorité ?', 'Permet de planifier et de signaler un conflit de délais'],
          ['Avec quels moyens, quelles sources, quel budget ?', 'Fixe le cadre'],
          ['Qui décide, qui valide, qui dois-je informer ?', 'Clarifie les interfaces'],
        ],
      },
      { t: 'p', text: 'Pendant l’exécution, un point intermédiaire protège tout le monde : tu montres une première version, le mandant corrige la direction si nécessaire. À la fin, tu contrôles toi-même ton travail avant de le remettre, puis tu demandes un retour.' },
      { t: 'note', text: 'Recevoir un retour : écouter sans interrompre, reformuler, poser une question pour comprendre, remercier. Se justifier immédiatement donne l’impression que l’on refuse d’apprendre.' },
    ],
    methodes: [
      { nom: 'Clarification du mandat', ficheId: 'clarifier-mandat', resume: 'Six questions à poser avant de commencer.' },
      { nom: 'Reformulation', ficheId: 'reformulation', resume: 'Redire avec ses mots pour vérifier que l’on a compris.' },
      { nom: 'Feed-back', ficheId: 'feedback', resume: 'Recevoir un retour et le transformer en mesure.' },
    ],
    exemple:
      'Une cheffe de service demande « un récapitulatif des réclamations du trimestre ». La collaboratrice reformule : « Vous souhaitez pour vendredi un tableau par motif de réclamation, avec le nombre et le délai moyen de traitement, pour la séance de direction ? » La cheffe précise qu’elle veut aussi deux propositions d’amélioration. Dix minutes de clarification ont évité un document à refaire.',
    situation: 'Le lundi matin, ton responsable te lance en passant : « Tu peux me préparer quelque chose sur les retards de facturation ? C’est pour la séance. » Puis il part en réunion.',
    questionOrale: 'Vous recevez un mandat peu clair de votre supérieur. Comment procédez-vous ?',
    reponse: [
      'Je ne commence pas tout de suite : je note ce que j’ai compris et ce qui manque.',
      'Je clarifie par des questions : but, résultat attendu et forme, délai, moyens, personne qui valide.',
      'Je reformule le mandat, idéalement par écrit, pour confirmation.',
      'Je planifie avec un point intermédiaire, j’exécute et je signale tôt tout obstacle.',
      'Je contrôle mon travail, je le remets, je demande un retour et j’en tire un enseignement.',
    ],
    erreurs: ['Se lancer sans clarifier, par peur de déranger.', 'Découvrir le jour de l’échéance que le délai ne sera pas tenu.', 'Remettre un travail non relu.', 'Prendre un retour critique comme une attaque personnelle.'],
    recap: ['Cinq étapes : recevoir, planifier, exécuter, accepter les retours, réfléchir.', 'Clarifier : but, résultat, délai, moyens, validation.', 'Reformuler avant de commencer.', 'Informer tôt en cas d’obstacle.'],
    quiz: quiz('a3', [
      ['Quelle est la première chose à faire en recevant un mandat flou ?', ['Commencer vite pour montrer sa motivation.', 'Clarifier le but, le résultat attendu et le délai.', 'Demander à un collègue de le faire.', 'Attendre que le mandant revienne.'], 1, 'La clarification évite de produire un travail inutile.'],
      ['Tu constates à mi-parcours que le délai ne pourra pas être tenu. Que fais-tu ?', ['Tu travailles plus vite sans rien dire.', 'Tu informes immédiatement le mandant et proposes des solutions.', 'Tu livres une version incomplète le jour J sans commentaire.', 'Tu attends la veille pour prévenir.'], 1, 'Informer tôt laisse au mandant la possibilité de décider : repousser, réduire le périmètre, renforcer.'],
      ['Ton responsable critique la présentation de ton rapport. Quelle réaction est la plus professionnelle ?', ['Expliquer pourquoi il a tort.', 'Écouter, demander ce qu’il attend précisément, remercier et corriger.', 'Ne rien dire et refaire à l’identique.', 'Rappeler que le mandat n’était pas clair.'], 1, 'Écouter, questionner, remercier, corriger : c’est la manière de tirer profit d’un retour.'],
    ]),
    cas: {
      enonce: 'On te confie « la mise à jour de la liste des fournisseurs » sans autre précision. Trois semaines plus tard, ta responsable est mécontente : elle attendait aussi la vérification des conditions de paiement.',
      questions: ['Qu’est-ce qui n’a pas fonctionné ?', 'Comment éviter cela la prochaine fois ?'],
      corrige: [
        'Le mandat n’a pas été clarifié : résultat attendu et périmètre n’ont pas été définis, aucun point intermédiaire n’a eu lieu.',
        'Prochaine fois : questions de clarification, reformulation écrite, point intermédiaire après quelques jours, contrôle final avant remise.',
        'Tout de suite : reconnaître l’écart sans chercher de coupable, proposer un délai pour compléter, puis demander un retour.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'a4',
    definition:
      'Agir de manière responsable, c’est connaître son rôle de professionnel, répondre de ses actes et de leurs conséquences pour l’entreprise, les clients et la société, et tenir compte des évolutions sociales dans son travail.',
    objectifs: ['Décrire ton rôle professionnel et les attentes qui y sont liées.', 'Expliquer ce que signifie être fiable et loyal envers l’employeur.', 'Montrer comment une tendance de société influence ton travail.'],
    aSavoir: [
      'Les sources qui définissent ton rôle : contrat, cahier des charges, directives internes, bases légales.',
      'Les devoirs essentiels du travailleur : diligence, fidélité, confidentialité (secret professionnel ou de fonction selon le secteur).',
      'Ce que tu fais lorsque tu commets ou constates une erreur : la signaler, la corriger, en tirer une mesure.',
      'Deux ou trois tendances de société et leur effet concret sur un service administratif : numérisation, durabilité, vieillissement de la population, diversité.',
    ],
    explication: [
      { t: 'p', text: 'Le guide pratique de cette compétence comporte deux volets. Le premier concerne ton rôle de professionnel, le second tes responsabilités de personne privée (budget, impôts, assurances, logement). Pour l’examen pratique, c’est le premier qui te sera le plus utile ; le second peut servir d’exemple lorsque tu conseilles un client.' },
      { t: 'h', text: 'Trouver son rôle' },
      { t: 'list', items: ['Définir son domaine d’activité : tâches quotidiennes et mandats particuliers.', 'Clarifier les attentes : qualité, délais, comportement, autonomie.', 'Connaître ses droits et ses devoirs.', 'Connaître son entreprise : prestations, organisation, valeurs, clients.'] },
      { t: 'h', text: 'Être un professionnel fiable' },
      {
        t: 'table',
        head: ['Principe', 'Concrètement'],
        rows: [
          ['Fiabilité', 'Je tiens mes délais et mes promesses ; sinon je préviens'],
          ['Confidentialité', 'Je ne parle pas des dossiers hors du cadre de travail'],
          ['Égalité de traitement', 'Même règle et même qualité de service pour chaque personne'],
          ['Responsabilité', 'Je signale mes erreurs et je propose une correction'],
          ['Loyauté', 'Je défends les intérêts de mon employeur et respecte ses directives'],
        ],
      },
      { t: 'h', text: 'Intégrer les tendances sociales' },
      { t: 'p', text: 'Une tendance est une évolution durable de la société. Elle change les attentes des clients et la manière de travailler. Exemple : avec la numérisation, les clients veulent tout faire en ligne, mais une partie de la population n’y parvient pas. Un service responsable propose le canal numérique et garde un accès accompagné.' },
    ],
    methodes: [
      { nom: 'Gestion d’une erreur', ficheId: 'assurance-qualite', resume: 'Signaler, corriger, analyser la cause, prévenir.' },
      { nom: 'Protection des données', ficheId: 'protection-donnees', resume: 'Ne traiter et ne transmettre que ce qui est nécessaire.' },
    ],
    exemple:
      'Une collaboratrice d’un office du logement s’aperçoit qu’elle a envoyé une attestation à la mauvaise gérance. Elle informe immédiatement sa responsable, demande à la gérance de détruire le document, envoie le bon et propose d’ajouter une vérification du destinataire dans la check-list d’envoi.',
    situation: 'Un ami te demande de « jeter un œil » dans le système pour savoir où en est le dossier de sa sœur. Tu as techniquement accès à ce dossier.',
    questionOrale: 'Que signifie pour vous agir de manière responsable dans votre fonction ? Donnez un exemple.',
    reponse: [
      'Je connais mon rôle : mes tâches, mes compétences de décision et leurs limites.',
      'Je suis fiable : je tiens mes engagements et je préviens si je ne peux pas.',
      'Je respecte la confidentialité et l’égalité de traitement, même sous pression.',
      'J’assume mes erreurs : je les signale, je les corrige et je propose une mesure préventive.',
      'Je tiens compte des évolutions de la société, par exemple en gardant un accès simple pour les personnes peu à l’aise avec le numérique.',
    ],
    erreurs: ['Répondre par des généralités (« être sérieux ») sans exemple.', 'Oublier la confidentialité et l’égalité de traitement.', 'Présenter une erreur comme la faute de quelqu’un d’autre.', 'Parler de tendances sans lien avec le travail quotidien.'],
    recap: ['Rôle = tâches + attentes + droits et devoirs.', 'Fiabilité, confidentialité, égalité de traitement, responsabilité, loyauté.', 'Erreur : signaler, corriger, prévenir.', 'Tendance de société → conséquence concrète pour mon service.'],
    quiz: quiz('a4', [
      ['Un ami te demande une information sur le dossier d’un proche. Que fais-tu ?', ['Tu regardes, mais tu ne donnes que l’essentiel.', 'Tu refuses et expliques que la personne concernée doit s’adresser elle-même au service.', 'Tu demandes à un collègue de le faire.', 'Tu acceptes si la demande est urgente.'], 1, 'Consulter ou transmettre des données sans nécessité professionnelle viole la confidentialité.'],
      ['Tu découvres une erreur que tu as commise la veille et que personne n’a remarquée. Quelle est la bonne réaction ?', ['Attendre de voir si quelqu’un s’en aperçoit.', 'La corriger discrètement sans rien dire.', 'La signaler, la corriger et proposer une mesure pour l’éviter.', 'En parler seulement si un client se plaint.'], 2, 'Agir de manière responsable, c’est assumer les conséquences de ses actes et empêcher la répétition.'],
      ['Laquelle de ces propositions décrit une tendance de société ?', ['Une panne de l’imprimante.', 'La numérisation croissante des démarches.', 'Les vacances d’un collègue.', 'Un changement de mot de passe.'], 1, 'Une tendance est une évolution durable qui modifie les attentes et les méthodes de travail.'],
    ]),
    cas: {
      enonce: 'Ton service remplace le guichet physique par un formulaire en ligne. Plusieurs personnes âgées se plaignent de ne plus pouvoir déposer leur demande.',
      questions: ['Quelle tendance est en jeu et quel risque crée-t-elle ?', 'Que proposes-tu ?'],
      corrige: [
        'Tendance : numérisation. Risque : exclure une partie des usagers et rompre l’égalité d’accès au service.',
        'Mesures : maintenir un accès accompagné (permanence, téléphone, aide au remplissage), formulaire simple et lisible, information claire sur les alternatives.',
        'Suivi : relever le nombre de demandes par canal et les réclamations, puis adapter.',
      ],
    },
    sources: ['directive', 'guide-cifc', 'konvink', 'serie0'],
  },
  {
    comp: 'a5',
    definition:
      'Intégrer des questions politiques et une approche culturelle dans ses actions, c’est connaître ses propres valeurs, respecter celles des autres, s’informer sur les décisions politiques qui touchent son travail et en tenir compte de façon neutre et professionnelle.',
    objectifs: ['Expliquer comment une décision politique ou légale se répercute sur ton activité.', 'Distinguer opinion personnelle et position professionnelle.', 'Adapter ta communication à des personnes de cultures différentes.'],
    aSavoir: [
      'Le chemin d’une décision politique jusqu’à ton bureau : loi ou votation → ordonnance ou règlement → directive interne → pratique quotidienne.',
      'Le devoir de réserve : au travail, tu appliques la règle en vigueur, que tu l’approuves ou non.',
      'Comment te forger une opinion : plusieurs sources, faits séparés des commentaires, arguments pour et contre.',
      'Les bases d’une communication interculturelle : langage simple, vérification de la compréhension, absence de jugement.',
    ],
    explication: [
      { t: 'p', text: 'Cette compétence a trois volets dans le guide pratique : développer ses valeurs et respecter celles des autres, se faire une opinion politique, participer à la vie politique. À l’examen pratique, on attend surtout que tu saches relier le contexte politique et culturel à une situation de travail.' },
      { t: 'h', text: 'Du politique au quotidien' },
      { t: 'steps', items: ['Une décision est prise (Parlement, votation, autorité)', 'Elle est précisée dans une ordonnance ou un règlement', 'L’entreprise adapte ses directives et ses processus', 'Tu appliques et tu expliques la nouvelle règle aux clients'] },
      { t: 'p', text: 'Exemples parlants en Suisse : une modification de loi dans l’assurance-maladie change les décomptes et suscite des questions au service clientèle ; la nouvelle loi sur la protection des données, en vigueur depuis le 1er septembre 2023, a obligé les entreprises à revoir leurs formulaires et leurs informations aux clients ; un nouveau règlement communal modifie les conditions d’octroi d’une prestation.' },
      { t: 'h', text: 'Valeurs et diversité' },
      {
        t: 'table',
        head: ['Situation', 'Attitude professionnelle'],
        rows: [
          ['Je désapprouve une règle que je dois appliquer', 'Je l’applique et je l’explique de façon neutre ; je fais remonter mes remarques par la voie interne'],
          ['Un client exprime une opinion politique tranchée', 'Je reste sur sa demande, sans débattre'],
          ['La personne maîtrise mal le français', 'Phrases courtes, mots simples, reformulation, support écrit ; interprète si nécessaire'],
          ['Une pratique me surprend', 'Je pose des questions ouvertes plutôt que de juger'],
        ],
      },
    ],
    methodes: [
      { nom: 'Argumenter', ficheId: 'argumenter', resume: 'Affirmation, argument, exemple, conclusion.' },
      { nom: 'Communication professionnelle', ficheId: 'communication-pro', resume: 'Adapter le message à la personne et vérifier la compréhension.' },
    ],
    exemple:
      'Après l’entrée en vigueur d’un nouveau règlement communal, un collaborateur doit annoncer à une habitante qu’elle n’a plus droit à une prestation. Il explique la nouvelle base légale en termes simples, sans commenter la décision politique, indique les voies de recours et l’oriente vers un service de conseil.',
    situation: 'Une cliente, mécontente d’une hausse de prime, te dit : « C’est encore la faute des politiciens, vous êtes d’accord avec moi, non ? »',
    questionOrale: 'Donnez un exemple de décision politique ou légale qui a eu une influence sur votre travail et expliquez comment vous l’avez intégrée.',
    reponse: [
      'Je nomme la décision et ce qu’elle change concrètement pour l’entreprise et les clients.',
      'J’explique comment je me suis informé : communication interne, sources officielles.',
      'Je décris ce que j’ai adapté : documents, explications, processus.',
      'Je précise que je reste neutre face au client, quelle que soit mon opinion.',
      'Je mentionne l’attention portée aux personnes pour qui le changement est difficile à comprendre.',
    ],
    erreurs: ['Donner son opinion politique au client.', 'Ne citer aucun exemple concret de règle ou de loi.', 'Confondre neutralité et froideur : on peut être neutre et empathique.', 'Faire des généralités sur une culture.'],
    recap: ['Décision politique → règlement → directive → pratique.', 'Au travail : neutralité et application de la règle en vigueur.', 'Opinion : plusieurs sources, faits et arguments.', 'Diversité : langage simple, questions ouvertes, pas de jugement.'],
    quiz: quiz('a5', [
      ['Un client te demande ton avis sur une votation qui concerne ton domaine. Que réponds-tu ?', ['Tu donnes ton avis, puisqu’il le demande.', 'Tu expliques de façon neutre ce que la règle actuelle prévoit et ce qui pourrait changer.', 'Tu refuses de parler du sujet.', 'Tu lui dis pour qui voter.'], 1, 'Le rôle professionnel impose la neutralité : on informe sur les faits, on ne prend pas position.'],
      ['Quelle démarche permet le mieux de se forger une opinion fondée ?', ['Lire un seul commentaire sur un réseau social.', 'Comparer plusieurs sources et distinguer les faits des opinions.', 'Reprendre l’avis de ses collègues.', 'Attendre le résultat.'], 1, 'Plusieurs sources et la séparation entre faits et commentaires sont la base d’une opinion fondée.'],
      ['Une personne comprend mal le français. Quelle est la meilleure approche ?', ['Parler plus fort.', 'Remettre uniquement la documentation officielle.', 'Utiliser des phrases courtes, reformuler et vérifier la compréhension.', 'Demander de revenir avec quelqu’un, sans autre explication.'], 2, 'Langage simple, reformulation et vérification de la compréhension respectent la personne et sécurisent l’information.'],
    ]),
    cas: {
      enonce: 'Une nouvelle directive impose de demander un justificatif supplémentaire à tous les demandeurs. Un collègue annonce qu’il ne le demandera pas aux « habitués », car il trouve la règle absurde.',
      questions: ['Quels problèmes cela pose-t-il ?', 'Comment réagis-tu ?'],
      corrige: [
        'Problèmes : inégalité de traitement, non-respect d’une directive, risque juridique pour le service, incohérence entre collaborateurs.',
        'Réaction : en parler directement et factuellement au collègue ; rappeler que la règle s’applique à tous ; proposer de faire remonter ses critiques par la voie hiérarchique.',
        'Si cela continue : informer la ou le responsable, car le risque touche le service.',
      ],
    },
    sources: ['directive', 'guide-cifc', 'konvink', 'serie0'],
  },
]
