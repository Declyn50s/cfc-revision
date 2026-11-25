import type { Lesson } from '@/types'
import { quiz } from './_helpers'

const SRC = ['directive', 'guide-cifc', 'mandats', 'konvink', 'serie0']

export const LESSONS_E: Lesson[] = [
  {
    comp: 'e1',
    definition:
      'Utiliser des applications commerciales, c’est travailler efficacement avec les logiciels de l’entreprise (bureautique, CRM, ERP, gestion de contenu, tickets), aider les autres à les utiliser, résoudre les problèmes courants et protéger les données.',
    objectifs: ['Choisir l’outil adapté à une tâche et expliquer pourquoi.', 'Décrire une démarche pour résoudre un problème technique.', 'Identifier les risques pour la sécurité des données et les mesures de protection.'],
    aSavoir: [
      'Les familles d’outils : bureautique, messagerie et collaboration, CRM (relation client), ERP (gestion intégrée), CMS (contenu web), gestion électronique des documents, système de tickets.',
      'Une donnée saisie une seule fois, au bon endroit, par la bonne personne : c’est la base de la qualité des données.',
      'La démarche de dépannage : décrire le problème, vérifier les causes simples, chercher dans l’aide, puis faire remonter avec des informations précises.',
      'Sécurité des données : confidentialité, intégrité, disponibilité. Risques : hameçonnage, mots de passe faibles, appareils non verrouillés, envoi au mauvais destinataire, supports non chiffrés.',
      'Protection des données (LPD révisée, en vigueur depuis le 1er septembre 2023) : finalité, proportionnalité, exactitude, sécurité ; données sensibles (santé, religion, opinions, aide sociale, poursuites).',
    ],
    explication: [
      { t: 'p', text: 'Le TP4 « Infrastructure technologique » de la série zéro demande de préparer une équipe à l’arrivée d’un système de tickets. Tu n’as pas à connaître un logiciel précis : tu dois montrer que tu comprends à quoi sert l’outil, comment on amène une équipe à l’utiliser et quels risques il faut maîtriser.' },
      {
        t: 'table',
        head: ['Outil', 'À quoi il sert', 'Exemple d’usage'],
        rows: [
          ['CRM', 'Centraliser les contacts et l’historique client', 'Voir toutes les demandes d’un client avant de le rappeler'],
          ['ERP', 'Relier commandes, stocks, facturation, comptabilité', 'Une commande génère la facture sans ressaisie'],
          ['Système de tickets', 'Enregistrer, prioriser, attribuer et suivre chaque demande', 'Aucune demande sans responsable ni statut'],
          ['CMS', 'Publier et mettre à jour un site sans programmer', 'Ajouter un projet de référence sur le site'],
          ['GED', 'Classer et retrouver les documents, gérer les versions', 'Retrouver un contrat signé en dix secondes'],
        ],
      },
      { t: 'h', text: 'Résoudre un problème technique' },
      { t: 'steps', items: ['Décrire précisément : quoi, depuis quand, quel message', 'Vérifier le simple : connexion, redémarrage, droits', 'Chercher : aide en ligne, base de connaissances, collègue', 'Faire remonter au support avec les détails', 'Documenter la solution pour la prochaine fois'] },
      { t: 'h', text: 'Sécurité et protection des données' },
      {
        t: 'table',
        head: ['Risque', 'Mesure'],
        rows: [
          ['Courriel d’hameçonnage', 'Vérifier l’expéditeur et le lien, ne jamais saisir son mot de passe, signaler au service informatique'],
          ['Mot de passe faible ou réutilisé', 'Mot de passe long et unique, gestionnaire de mots de passe, double authentification'],
          ['Écran visible, poste ouvert', 'Verrouiller en quittant sa place, filtre de confidentialité au guichet'],
          ['Mauvais destinataire', 'Relire l’adresse, chiffrer les pièces sensibles, principe des quatre yeux pour les envois de masse'],
          ['Perte de données', 'Sauvegardes régulières, enregistrement sur le serveur plutôt qu’en local'],
          ['Accès trop larges', 'Droits selon le rôle, retrait des accès lors d’un départ'],
        ],
      },
      { t: 'note', text: 'En cas d’incident (envoi erroné, appareil perdu, clic sur un lien suspect) : le signaler immédiatement selon la procédure interne. Cacher l’incident aggrave toujours la situation.' },
    ],
    methodes: [
      { nom: 'Sécurité des données', ficheId: 'securite-donnees', resume: 'Risques courants et mesures de protection.' },
      { nom: 'Protection des données', ficheId: 'protection-donnees', resume: 'Principes de la LPD appliqués au quotidien.' },
      { nom: 'Résolution d’un problème technique', ficheId: 'probleme-technique', resume: 'Décrire, vérifier, chercher, faire remonter, documenter.' },
      { nom: 'Introduction d’un outil numérique', ficheId: 'introduction-outil', resume: 'Préparer les utilisateurs en cinq temps.' },
    ],
    exemple:
      'Dans un service clientèle, une collaboratrice reçoit un courriel « du service informatique » lui demandant de confirmer son mot de passe sous 24 heures. L’adresse d’expédition est inhabituelle et le ton pressant. Elle ne clique pas, transmet le message au vrai service informatique par le canal prévu et prévient ses collègues. Le service bloque l’expéditeur le jour même.',
    situation: 'Un collègue t’appelle : « Le CRM ne marche plus, je ne peux plus rien faire ! » Il a trois clients en attente.',
    questionOrale: 'Quels risques voyez-vous pour la sécurité des données dans votre travail quotidien, et comment les réduisez-vous ?',
    reponse: [
      'Je cite les risques concrets de mon poste : hameçonnage, mot de passe, écran visible, mauvais destinataire, perte d’appareil.',
      'J’associe une mesure à chaque risque : vérification, mot de passe unique et double authentification, verrouillage, relecture, sauvegarde.',
      'J’applique les principes de protection des données : je ne consulte et ne transmets que le nécessaire.',
      'En cas d’incident, je le signale immédiatement selon la procédure.',
      'Je sensibilise mes collègues lorsque je repère une pratique risquée.',
    ],
    erreurs: ['Parler de l’outil sans parler des données et des personnes.', 'Confondre sécurité des données (technique) et protection des données (droit des personnes).', 'Dire « j’appelle l’informatique » sans avoir décrit ni vérifié quoi que ce soit.', 'Minimiser un incident au lieu de le signaler.'],
    recap: ['Bon outil pour la bonne tâche ; une saisie, un endroit.', 'Dépannage : décrire, vérifier, chercher, faire remonter, documenter.', 'Sécurité : confidentialité, intégrité, disponibilité.', 'LPD : finalité, proportionnalité, exactitude, sécurité. Incident = signalement immédiat.'],
    quiz: quiz('e1', [
      ['À quoi sert principalement un système de tickets ?', ['À envoyer des factures.', 'À enregistrer, attribuer et suivre chaque demande jusqu’à sa clôture.', 'À stocker des photos.', 'À gérer les salaires.'], 1, 'Chaque demande reçoit un numéro, un responsable, une priorité et un statut.'],
      ['Tu reçois un courriel pressant te demandant ton mot de passe. Que fais-tu ?', ['Tu réponds vite pour éviter le blocage.', 'Tu ne cliques pas et tu le signales au service informatique.', 'Tu le transfères à tous tes collègues.', 'Tu changes ton mot de passe via le lien du courriel.'], 1, 'C’est le schéma type de l’hameçonnage : urgence et demande d’identifiants.'],
      ['Laquelle de ces données est une donnée sensible au sens de la loi sur la protection des données ?', ['Le numéro de téléphone professionnel.', 'Le diagnostic médical d’une personne.', 'Le nom de l’entreprise.', 'La date d’une séance.'], 1, 'Les données sur la santé font partie des données sensibles, qui exigent une protection renforcée.'],
    ]),
    cas: {
      enonce: 'Tu t’aperçois que tu viens d’envoyer à un client un fichier contenant les coordonnées et les montants facturés de quarante autres clients.',
      questions: ['Que fais-tu dans l’heure ?', 'Quelles mesures préventives proposes-tu ?'],
      corrige: [
        'Immédiatement : informer ta ou ton responsable et la personne chargée de la protection des données ; tenter de rappeler le message ; demander au destinataire de supprimer le fichier et de le confirmer ; documenter l’incident.',
        'L’entreprise évalue ensuite s’il faut annoncer l’incident à l’autorité de protection des données et informer les personnes concernées.',
        'Prévention : contrôle des pièces jointes avant envoi, partage par lien sécurisé plutôt que par fichier, fichiers séparés par client, principe des quatre yeux pour les envois sensibles.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'e2',
    definition:
      'Rechercher et évaluer des informations, c’est trouver, pour un mandat précis, des renseignements fiables, vérifier leur qualité, les documenter avec leurs sources et les présenter de manière utilisable.',
    objectifs: ['Formuler un mandat de recherche et choisir des sources adaptées.', 'Évaluer la fiabilité d’une information avec des critères clairs.', 'Documenter et restituer les résultats en citant les sources.'],
    aSavoir: [
      'Un mandat de recherche précis : question, but, niveau de détail, délai, forme du résultat.',
      'Les types de sources : internes (intranet, directives, CRM, collègues experts) et externes (sites officiels, offices statistiques, registre du commerce, presse, associations professionnelles).',
      'Les critères de fiabilité : auteur, date, but du site, preuves et sources citées, recoupement avec une deuxième source.',
      'Le respect du droit d’auteur et la citation des sources ; la prudence avec les résultats d’une intelligence artificielle, qui doivent être vérifiés.',
      'La restitution : réponse à la question d’abord, sources ensuite, limites signalées.',
    ],
    explication: [
      { t: 'p', text: 'Au TP4, on peut te demander d’évaluer la fiabilité d’une information ou d’expliquer d’où viendraient les contenus d’une publication. Montre une méthode, pas une intuition.' },
      { t: 'steps', items: ['Consigner le mandat par écrit', 'Déterminer les sources', 'Effectuer la recherche (mots-clés, filtres)', 'Évaluer les résultats', 'Noter et documenter avec les sources', 'Préparer les résultats pour le destinataire', 'Analyser sa démarche'] },
      {
        t: 'table',
        head: ['Critère', 'Question', 'Signal d’alerte'],
        rows: [
          ['Auteur', 'Qui publie ? Est-il compétent et identifiable ?', 'Aucun auteur, aucune mention légale'],
          ['Actualité', 'De quand date l’information ?', 'Pas de date, chiffres anciens'],
          ['Intention', 'Informer, vendre, convaincre ?', 'Site commercial présenté comme un comparatif neutre'],
          ['Preuves', 'Des sources sont-elles citées ?', 'Affirmations sans référence'],
          ['Recoupement', 'Une deuxième source indépendante dit-elle la même chose ?', 'Information introuvable ailleurs'],
        ],
      },
      { t: 'p', text: 'Pour une information juridique ou administrative en Suisse, la source de référence est l’autorité compétente : admin.ch et les sites des offices fédéraux, les sites cantonaux et communaux, le recueil systématique du droit. Un blog ou un forum peut mettre sur une piste, jamais conclure.' },
      { t: 'note', text: 'Les informations internes ne sont pas toutes diffusables. Avant de reprendre un document interne dans une réponse à un client ou sur le site, vérifie son niveau de confidentialité.' },
    ],
    methodes: [
      { nom: 'Recherche d’information et fiabilité des sources', ficheId: 'recherche-info', resume: 'Mandat, sources, critères de fiabilité, documentation.' },
      { nom: 'Clarification du mandat', ficheId: 'clarifier-mandat', resume: 'La question précise avant la recherche.' },
    ],
    exemple:
      'Une responsable demande : « Quel est le délai légal de conservation des dossiers de candidature refusés ? » Le collaborateur note la question, consulte d’abord les directives internes, puis le site du Préposé fédéral à la protection des données, recoupe avec une fiche d’une association professionnelle, et remet une note d’une demi-page : réponse, sources datées, et une réserve sur un point à faire confirmer par le service juridique.',
    situation: 'Un collègue t’envoie le lien d’un blog affirmant qu’une nouvelle loi oblige les entreprises à répondre à toute réclamation en 48 heures. Il veut l’annoncer aux clients sur le site.',
    questionOrale: 'Comment vérifiez-vous qu’une information trouvée en ligne est fiable avant de l’utiliser dans votre travail ?',
    reponse: [
      'Je regarde qui publie : auteur identifiable, compétent, mentions légales.',
      'Je vérifie la date et l’intention du site : informer ou vendre.',
      'Je cherche les preuves : sources citées, texte officiel.',
      'Je recoupe avec une deuxième source indépendante, idéalement officielle.',
      'Je documente la source et la date de consultation, et je signale ce qui reste incertain.',
    ],
    erreurs: ['Se fier au premier résultat du moteur de recherche.', 'Reprendre une information sans noter sa source.', 'Confondre un site commercial avec une source officielle.', 'Copier un texte ou une image sans vérifier les droits.'],
    recap: ['Mandat précis → sources adaptées → recherche → évaluation → documentation → restitution.', 'Fiabilité : auteur, date, intention, preuves, recoupement.', 'Source officielle pour le juridique.', 'Toujours citer la source et signaler les limites.'],
    quiz: quiz('e2', [
      ['Quel critère renseigne le mieux sur la fiabilité d’une page web ?', ['Son design moderne.', 'Un auteur identifiable et des sources citées.', 'Sa position dans les résultats de recherche.', 'Le nombre d’images.'], 1, 'Un auteur compétent et des sources vérifiables sont les meilleurs indices.'],
      ['Où cherches-tu en priorité le texte d’une loi fédérale suisse ?', ['Sur un forum.', 'Sur le site de la Confédération (admin.ch).', 'Sur un réseau social.', 'Dans une publicité.'], 1, 'La source officielle fait foi pour les textes légaux.'],
      ['Que fais-tu d’une information trouvée sur un seul site inconnu ?', ['Tu la reprends telle quelle.', 'Tu la recoupes avec une source indépendante avant de l’utiliser.', 'Tu la diffuses avec la mention « à vérifier ».', 'Tu l’ignores définitivement.'], 1, 'Le recoupement est la règle de base ; à défaut, on n’utilise pas l’information.'],
    ]),
    cas: {
      enonce: 'Pour préparer une séance, ta responsable veut connaître « le taux de satisfaction moyen des clients dans notre branche ». Tu trouves trois chiffres : 92 % sur le site d’un concurrent, 78 % dans une étude d’association professionnelle datée de 2025, 60 % sur un forum.',
      questions: ['Quelle source retiens-tu et pourquoi ?', 'Comment présentes-tu le résultat ?'],
      corrige: [
        'Retenir l’étude de l’association : auteur identifié, méthode décrite, date récente. Le concurrent a un intérêt commercial, le forum n’a ni auteur ni méthode.',
        'Présentation : le chiffre, la source, l’année, la taille de l’échantillon si elle est connue, et la limite (une seule étude).',
        'Proposer en complément de mesurer la satisfaction de vos propres clients.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'e3',
    definition:
      'Évaluer et préparer des données, c’est transformer des chiffres bruts en information utile : les contrôler, les calculer, les interpréter et les présenter clairement à la personne qui doit décider.',
    objectifs: ['Clarifier un mandat d’analyse et préparer des données propres.', 'Calculer et interpréter des indicateurs simples.', 'Choisir une représentation adaptée et formuler un message clair.'],
    aSavoir: [
      'Avant tout calcul : la question à laquelle il faut répondre, le destinataire, la période.',
      'Le nettoyage des données : doublons, valeurs manquantes, formats différents, valeurs aberrantes ; toujours travailler sur une copie.',
      'Les indicateurs de base : total, moyenne, médiane, pourcentage, variation en pour cent, minimum et maximum.',
      'Quantitatif (ce qui se compte) et qualitatif (ce qui se dit : commentaires, entretiens).',
      'Le choix du graphique : barres pour comparer, courbe pour une évolution, secteurs pour une répartition simple, tableau pour le détail.',
      'L’interprétation prudente : un écart n’est pas une cause ; un petit échantillon ne prouve rien.',
    ],
    explication: [
      { t: 'p', text: 'Un tableau de chiffres peut apparaître en annexe d’un TP2 ou d’un TP4. Les expert-e-s n’attendent pas des formules de tableur : ils veulent voir que tu lis les chiffres correctement, que tu repères ce qui est frappant et que tu en tires une conclusion prudente et utile.' },
      { t: 'steps', items: ['Créer les bases : question, données, nettoyage', 'Analyser : calculer les indicateurs', 'Interpréter : que disent les chiffres, que ne disent-ils pas ?', 'Préparer : graphique, message, recommandation'] },
      {
        t: 'table',
        head: ['Indicateur', 'Calcul', 'Exemple'],
        rows: [
          ['Pourcentage', 'Partie ÷ total × 100', '45 réclamations sur 600 demandes = 7,5 %'],
          ['Variation', '(Nouveau − ancien) ÷ ancien × 100', 'De 600 à 690 demandes = + 15 %'],
          ['Moyenne', 'Somme ÷ nombre de valeurs', 'Délais 2, 3, 3, 4, 18 jours → 6 jours'],
          ['Médiane', 'Valeur du milieu une fois les valeurs classées', '2, 3, 3, 4, 18 → 3 jours'],
        ],
      },
      { t: 'note', text: 'Dans l’exemple, la moyenne (6 jours) est tirée vers le haut par un seul cas extrême ; la médiane (3 jours) décrit mieux le cas typique. Savoir expliquer cette différence fait très bonne impression.' },
      { t: 'h', text: 'Présenter un résultat' },
      { t: 'p', text: 'Commence par le message : « Le délai de réponse a doublé en mars. » Montre ensuite le graphique qui le prouve, avec un titre, des axes nommés, l’unité et la source. Termine par une interprétation prudente et une proposition. Un graphique sans message oblige le lecteur à faire ton travail.' },
      { t: 'p', text: 'Pour les données qualitatives, regroupe les commentaires par thème et compte-les : « 14 commentaires sur 30 mentionnent le délai ». Tu passes ainsi d’impressions à une information exploitable.' },
    ],
    methodes: [
      { nom: 'Analyse de données', ficheId: 'analyse-donnees', resume: 'Question, nettoyage, indicateurs, interprétation.' },
      { nom: 'Visualisation des données', ficheId: 'visualisation-donnees', resume: 'Choisir le bon graphique et formuler le message.' },
      { nom: 'Enquête de satisfaction', ficheId: 'enquete-satisfaction', resume: 'Produire des données exploitables.' },
    ],
    exemple:
      'Une collaboratrice analyse les 480 demandes reçues par son service en un trimestre. Après suppression de douze doublons, elle constate que 38 % concernent le changement d’adresse et que leur délai médian est de cinq jours, contre deux pour les autres. Elle présente un graphique en barres par motif et propose un formulaire en ligne pour les changements d’adresse.',
    situation: 'Ton responsable te transmet un tableau des réclamations par mois et te dit : « Regarde s’il y a quelque chose à en tirer pour la séance de jeudi. »',
    questionOrale: 'On vous remet un tableau de chiffres à analyser pour votre responsable. Comment procédez-vous ?',
    reponse: [
      'Je clarifie la question : que veut-il savoir, pour quelle décision ?',
      'Je contrôle les données : période, doublons, valeurs manquantes ou aberrantes.',
      'Je calcule les indicateurs utiles : totaux, pourcentages, variations, moyenne ou médiane.',
      'J’interprète avec prudence : ce qui est frappant, les causes possibles, ce que les chiffres ne permettent pas d’affirmer.',
      'Je présente un message clair, un graphique adapté et une recommandation.',
    ],
    erreurs: ['Calculer sans avoir compris la question.', 'Présenter une moyenne faussée par une valeur extrême.', 'Affirmer une cause à partir d’une simple coïncidence.', 'Montrer un graphique sans titre, sans unité et sans message.'],
    recap: ['Question → données propres → indicateurs → interprétation → message.', 'Pourcentage, variation, moyenne, médiane.', 'Barres : comparer ; courbe : évolution ; secteurs : répartition.', 'Prudence : écart ≠ cause, petit échantillon ≠ preuve.'],
    quiz: quiz('e3', [
      ['Les demandes passent de 400 à 500 par mois. Quelle est la variation ?', ['+ 20 %.', '+ 25 %.', '+ 100 %.', '+ 80 %.'], 1, '(500 − 400) ÷ 400 × 100 = 25 %.'],
      ['Quel graphique montre le mieux une évolution mois par mois ?', ['Un graphique en secteurs.', 'Une courbe.', 'Un organigramme.', 'Un tableau sans total.'], 1, 'La courbe met en évidence la tendance dans le temps.'],
      ['Pourquoi la médiane est-elle parfois préférable à la moyenne ?', ['Elle est plus facile à calculer.', 'Elle n’est pas faussée par quelques valeurs extrêmes.', 'Elle est toujours plus élevée.', 'Elle est exigée par la loi.'], 1, 'Une valeur extrême tire la moyenne mais ne déplace pas la médiane.'],
    ]),
    cas: {
      enonce: 'Réclamations reçues : janvier 20 (sur 500 commandes), février 24 (sur 600), mars 45 (sur 600). Ton responsable conclut : « Les réclamations ont plus que doublé depuis janvier, l’équipe travaille mal. »',
      questions: ['Calcule les taux de réclamation.', 'Que penses-tu de sa conclusion ?'],
      corrige: [
        'Taux : janvier 4 %, février 4 %, mars 7,5 %.',
        'La hausse entre janvier et février n’est qu’apparente : le taux est stable, les commandes ont augmenté. La vraie rupture a lieu en mars.',
        'La cause n’est pas démontrée : il faut analyser les motifs de mars (produit, fournisseur, changement de processus, absence) avant de conclure sur l’équipe.',
      ],
    },
    sources: SRC,
  },
  {
    comp: 'e4',
    definition:
      'Préparer des contenus multimédias, c’est créer ou mettre en forme des textes, images, présentations, vidéos ou pages web adaptés à un but, à un public et à un canal, puis en contrôler la qualité avant diffusion.',
    objectifs: ['Planifier un contenu : but, public, message, format, canal.', 'Structurer un contenu ou un modèle réutilisable.', 'Contrôler la qualité d’un contenu avant publication.'],
    aSavoir: [
      'Les quatre questions de départ selon le guide pratique : objectif, groupe cible, information, canal médiatique.',
      'Le choix du format : texte, image, infographie, présentation, vidéo, page web, selon le message et le public.',
      'L’intérêt d’un modèle (gabarit) : cohérence visuelle, gain de temps, moins d’erreurs.',
      'Les contraintes : identité visuelle, droit d’auteur et droit à l’image, protection des données, confidentialité des informations clients, accessibilité.',
      'Le contrôle de qualité : exactitude, exhaustivité, langue, lisibilité, liens et affichage sur mobile, validation par une deuxième personne, mise à jour planifiée.',
    ],
    explication: [
      { t: 'p', text: 'C’est le cœur du TP4 « Développement de contenu » : dans la série zéro, il s’agit de concevoir la rubrique « projets de référence » d’un site (organisation, structure, contenus) et de nommer les contraintes à respecter. Ta fiche 2026 indique que c’est probablement ton domaine spécifique.' },
      { t: 'steps', items: ['Clarifier : but, public, message, canal, délai', 'Rassembler des informations fiables et autorisées', 'Structurer et rédiger avec le bon modèle', 'Contrôler la qualité et faire valider', 'Publier, vérifier le rendu, tenir à jour'] },
      {
        t: 'table',
        head: ['Élément d’une page « projet de référence »', 'Pourquoi'],
        rows: [
          ['Titre clair et secteur du client', 'Le visiteur se reconnaît'],
          ['Situation de départ et besoin', 'Montre la compréhension du problème'],
          ['Solution apportée', 'Montre ce que l’entreprise sait faire'],
          ['Résultat, si possible chiffré', 'Preuve de l’utilité'],
          ['Citation du client, logo, image', 'Crédibilité — avec accord écrit'],
          ['Contact ou appel à l’action', 'Transforme l’intérêt en demande'],
        ],
      },
      { t: 'h', text: 'Les contraintes à citer' },
      { t: 'list', items: ['Accord écrit du client pour être cité, pour son logo et pour toute image.', 'Aucune donnée confidentielle ni personnelle sans nécessité.', 'Droits sur les photos et illustrations.', 'Identité visuelle et modèle de l’entreprise.', 'Affichage correct sur mobile, textes lisibles, texte alternatif pour les images.', 'Répartition des rôles : qui rédige, qui valide, qui met en ligne, qui met à jour.'] },
      { t: 'p', text: 'Pense à l’organisation de la rubrique : un filtre par secteur ou par type de prestation, une présentation identique pour chaque projet, une règle de mise à jour (par exemple une révision annuelle, retrait des projets de plus de cinq ans).' },
    ],
    methodes: [
      { nom: 'Qualité d’un contenu multimédia', ficheId: 'contenu-multimedia', resume: 'Liste de contrôle avant publication.' },
      { nom: 'Publier un contenu sur le web', ficheId: 'publication-web', resume: 'Clarifier, rassembler, rédiger, contrôler, publier.' },
      { nom: 'Analyse du groupe cible', ficheId: 'groupe-cible', resume: 'Adapter contenu et format au public.' },
    ],
    exemple:
      'Un office communal publie chaque semaine la liste des logements disponibles. La collaboratrice utilise le gabarit de la commune, vérifie chaque annonce auprès de la gérance (adresse, nombre de pièces, loyer, conditions), s’assure qu’aucune donnée personnelle n’apparaît, fait relire, publie, contrôle l’affichage sur téléphone, puis retire les annonces périmées.',
    situation: 'Une collègue a préparé une présentation pour des clients : vingt-cinq diapositives couvertes de texte, trois polices différentes, des photos tirées d’un moteur de recherche et un tableau interne avec des noms de clients.',
    questionOrale: 'Vous devez créer un contenu pour le site internet de votre entreprise. Quelles étapes suivez-vous et à quelles contraintes faites-vous attention ?',
    reponse: [
      'Je clarifie le but, le public, le message principal, le canal et le délai.',
      'Je rassemble des informations exactes et j’obtiens les autorisations nécessaires.',
      'Je structure le contenu avec le modèle de l’entreprise, dans un langage adapté au public.',
      'Je contrôle la qualité et les contraintes : exactitude, droits, données, identité visuelle, affichage mobile ; je fais valider.',
      'Je publie, je vérifie le rendu et je planifie la mise à jour.',
    ],
    erreurs: ['Commencer par la mise en forme avant de connaître le but et le public.', 'Publier le nom d’un client ou une photo sans accord.', 'Ne pas contrôler l’affichage sur mobile.', 'Oublier qui met à jour le contenu ensuite.'],
    recap: ['Objectif, groupe cible, information, canal.', 'Modèle = cohérence et gain de temps.', 'Contraintes : accords, droits, données, identité visuelle, accessibilité.', 'Contrôle par une deuxième personne, puis mise à jour planifiée.'],
    quiz: quiz('e4', [
      ['Par quoi commence la préparation d’un contenu ?', ['Le choix des couleurs.', 'La définition du but et du public.', 'La recherche d’images.', 'La mise en ligne.'], 1, 'Sans but ni public définis, on ne peut choisir ni le message ni le format.'],
      ['Que faut-il pour citer un client comme référence sur le site ?', ['Rien, c’est une information publique.', 'Son accord écrit.', 'L’accord de ton collègue.', 'Une facture payée.'], 1, 'Le nom, le logo et le témoignage d’un client ne se publient qu’avec son accord.'],
      ['Quel est l’avantage principal d’un modèle de document ?', ['Il rend le document plus long.', 'Il assure une présentation cohérente et fait gagner du temps.', 'Il remplace la relecture.', 'Il supprime le besoin de sources.'], 1, 'Un gabarit garantit la cohérence visuelle et évite de repartir de zéro.'],
    ]),
    cas: {
      enonce: 'Ta responsable te demande de préparer la page « Notre équipe » du nouveau site : photo, prénom, nom, fonction, numéro direct et « quelques mots personnels » pour chacun des douze collaborateurs.',
      questions: ['Quelles contraintes dois-tu respecter ?', 'Comment organises-tu le travail ?'],
      corrige: [
        'Contraintes : accord de chaque personne pour la photo et les informations publiées ; ne publier que le nécessaire ; photos de style homogène ; identité visuelle ; accessibilité.',
        'Organisation : gabarit identique pour tous, formulaire de collecte, délai, relecture par chaque personne concernée, validation par la responsable.',
        'Suivi : règle de mise à jour lors des arrivées et des départs, responsable désigné.',
      ],
    },
    sources: SRC,
  },
]
