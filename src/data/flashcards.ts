import type { CompId, Flashcard, Level } from '@/types'

// [compétence, niveau, recto, verso, exemple]
type Row = [CompId, Level, string, string, string]

const ROWS: Row[] = [
  // a1
  ['a1', 1, 'Que signifient les cinq lettres de SMART ?', 'Spécifique, Mesurable, Ambitieux, Réaliste, Temporel.', '« D’ici au 30 juin, je réponds à 90 % des courriels en 24 heures. »'],
  ['a1', 1, 'Quelle différence entre auto-évaluation et évaluation externe ?', 'L’auto-évaluation est mon propre regard ; l’évaluation externe est celui d’un tiers (responsable, collègue, client). On les compare.', 'Je me juge « organisé » ; ma responsable relève trois délais manqués.'],
  ['a1', 2, 'Que faut-il ajouter à un objectif pour qu’il soit suivi d’effet ?', 'Des mesures concrètes, une échéance, une personne ressource et un contrôle du résultat.', 'Objectif + deux demi-journées en doublure + point de contrôle mensuel.'],
  ['a1', 3, 'Que fais-tu d’un écart entre ton auto-évaluation et celle de ta responsable ?', 'Je demande des exemples, je cherche la cause de l’écart et j’en tire un objectif avec un point de contrôle.', '« Pouvez-vous me donner un exemple récent où mon organisation a posé problème ? »'],
  ['a1', 3, 'Comment la note du travail pratique est-elle calculée, et à partir de combien de points obtient-on 4,0 ?', 'Note = (points × 5 ÷ 45) + 1, arrondie à la demi-note ou à la note entière supérieure. 23 points sur 45 suffisent pour 4,0.', '30 points : 4,33 → 4,5. Source : guide CIFC 2026, p. 31.'],
  // a2
  ['a2', 1, 'Quels sont les trois types de réseaux professionnels ?', 'Interne (collègues, services), externe (clients, fournisseurs, partenaires), en ligne (plateformes professionnelles).', 'La personne de référence du service voisin fait partie du réseau interne.'],
  ['a2', 1, 'Sur quel principe repose un réseau durable ?', 'La réciprocité : on donne (information, aide, remerciement) avant de demander.', 'Transmettre spontanément une information utile à un contact.'],
  ['a2', 2, 'Que ne publies-tu jamais sur un profil professionnel en ligne ?', 'Des informations internes de l’employeur et des données de clients.', 'Pas de détail d’un dossier, même sans nom.'],
  ['a2', 3, 'Quel est le risque d’un réseau purement individuel dans une équipe ?', 'Le savoir part avec la personne absente : dossiers bloqués. Solution : liste partagée des contacts, avec suppléants.', 'Liste « qui contacter pour quoi », mise à jour chaque trimestre.'],
  // a3
  ['a3', 1, 'Quelles sont les cinq étapes d’un mandat ?', 'Recevoir, planifier, exécuter, accepter les retours, réfléchir au résultat.', ''],
  ['a3', 1, 'Quelles questions poses-tu pour clarifier un mandat ?', 'But, résultat attendu et forme, délai et priorité, moyens, personne qui valide.', '« Pour quand, sous quelle forme, et qui valide ? »'],
  ['a3', 2, 'Que fais-tu si tu ne pourras pas tenir un délai ?', 'J’informe tôt le mandant, j’explique la cause et je propose des options ; c’est lui qui décide.', 'Reporter, réduire le périmètre ou obtenir du renfort.'],
  ['a3', 2, 'Comment recevoir un feed-back critique ?', 'Écouter sans se justifier, questionner pour comprendre, remercier, corriger et en tirer une mesure.', '« Merci. Pouvez-vous me montrer un passage qui pose problème ? »'],
  ['a3', 3, 'Comment se déroule l’examen pratique selon le guide CIFC ?', '15 minutes de préparation (notes réutilisables), puis 50 minutes sans pause : cinq tâches de 10 minutes, 9 points et 20 % chacune, devant au moins deux expert-e-s. Moyens auxiliaires : de quoi prendre des notes et une calculatrice.', 'TP1 et TP2 : mini case. TP3 et TP4 : simulation pratique. TP5 : entretien de réflexion.'],
  ['a3', 3, 'Quelles sont les quatre étapes officielles du TP5 ?', '1. Choisir deux compétences opérationnelles et justifier son choix. 2. Décrire une situation concrète pour chacune. 3. Analyser : défis, facteurs de réussite, ce que l’on ferait autrement. 4. Scénario alternatif.', 'Source : directive « Travail pratique », point 4.1.6.'],
  ['a1', 3, 'Comment les expert-e-s attribuent-ils les points d’un critère ?', '3 : réponse exhaustive, prestation solide. 2 : divergences mineures (en partie lacunaire, peu justifié). 1 : divergences majeures (souvent lacunaire, non justifié, parfois faux). 0 : inutilisable.', 'Trois critères par tâche, donc 9 points. Une réponse juste mais non justifiée plafonne à 2, voire 1.'],
  // a4
  ['a4', 1, 'Qu’est-ce qui définit ton rôle professionnel ?', 'Le contrat, le cahier des charges, les directives internes et les bases légales.', ''],
  ['a4', 2, 'Que fais-tu lorsque tu découvres une erreur que tu as commise ?', 'Je la signale, je la corrige, j’informe la personne concernée et je propose une mesure préventive.', 'Attestation envoyée au mauvais destinataire → signalement, rappel du document, contrôle ajouté.'],
  ['a4', 2, 'Que signifie l’égalité de traitement ?', 'Appliquer la même règle et offrir la même qualité de service à chaque personne, sans faveur.', 'Un dossier incomplet est refusé, même à une connaissance.'],
  ['a4', 3, 'Cite deux tendances de société et leur effet sur un service administratif.', 'Numérisation : démarches en ligne, mais accès accompagné à maintenir. Vieillissement : besoin de langage simple et de canaux traditionnels.', 'Guichet en ligne + permanence d’aide.'],
  // a5
  ['a5', 1, 'Pourquoi rester neutre politiquement face aux clients ?', 'Je représente mon employeur : la neutralité garantit l’égalité de traitement et la confiance.', '« Je peux vous expliquer ce que prévoit la règle actuelle. »'],
  ['a5', 2, 'Par quel chemin une décision politique arrive-t-elle à ton poste ?', 'Loi ou votation → ordonnance ou règlement → directive interne → pratique quotidienne.', 'Révision de la loi sur la protection des données → nouveaux formulaires.'],
  ['a5', 2, 'Comment communiquer avec une personne qui maîtrise mal le français ?', 'Phrases courtes, mots simples, vérification de la compréhension, support écrit, interprète si nécessaire.', '« Pouvez-vous me dire ce que vous allez apporter ? »'],
  ['a5', 3, 'Tu désapprouves une règle que tu dois appliquer. Que fais-tu ?', 'Je l’applique et je l’explique de façon neutre ; j’exprime mes réserves en interne, avec des exemples.', ''],
  // b1
  ['b1', 1, 'De quoi une équipe a-t-elle besoin pour fonctionner ?', 'Un but commun, des rôles clairs, des règles, une information partagée, du feed-back.', ''],
  ['b1', 2, 'Quelle est la structure d’un message en « je » ?', 'Fait, effet, besoin, demande — sans jugement sur la personne.', '« Quand le dossier n’est pas transmis, je ne peux pas répondre au client. Peux-tu laisser une note ? »'],
  ['b1', 2, 'Quelles sont les étapes pour traiter un conflit entre collègues ?', 'En parler tôt et en privé, décrire les faits, écouter, chercher une solution, fixer un accord et un suivi ; hiérarchie si nécessaire.', ''],
  ['b1', 3, 'Une boîte partagée est traitée « par qui a le temps ». Quelle est la cause et quelle est la mesure ?', 'Cause : responsabilité non attribuée. Mesure : attribution nominative, suppléance, note de transmission, indicateur.', 'Série zéro, TP1.'],
  // b2
  ['b2', 1, 'Qu’est-ce qu’une interface ?', 'Le point où un travail ou une information passe d’un acteur à un autre.', 'Service clientèle → service technique.'],
  ['b2', 2, 'Que contient une transmission complète ?', 'Contexte, état d’avancement, attente précise, délai, canal convenu, pièces utiles.', ''],
  ['b2', 2, 'Qui sont les parties prenantes d’une entreprise ?', 'Toutes les personnes et organisations concernées : clients, collaborateurs, fournisseurs, propriétaires, autorités, public.', ''],
  ['b2', 3, 'Un autre service répond toujours en retard. Quelle mesure durable ?', 'Un accord entre services : délai de réponse convenu et interlocuteur désigné, avec l’appui des responsables.', '« Réponse en deux jours ouvrables ; un interlocuteur par semaine. »'],
  ['b2', 3, 'Pourquoi restes-tu responsable d’une demande que tu as transmise ?', 'Parce que le client s’est adressé à moi : j’assure le suivi jusqu’à la clôture (relance, information, vérification).', ''],
  // b3
  ['b3', 1, 'Quelles sont les quatre parties d’un argument ?', 'Affirmation, justification, exemple, conclusion.', '« Je propose… car… par exemple… donc… »'],
  ['b3', 1, 'Qu’est-ce que l’inflation ?', 'Une hausse générale des prix, qui réduit le pouvoir d’achat.', 'Plus de demandes d’arrangement de paiement.'],
  ['b3', 2, 'Quelle chaîne de raisonnement relie l’économie à ton service ?', 'Évolution → effet sur l’entreprise (coûts, demande, clients) → conséquence pour mon service.', 'Hausse des primes → mécontentement → pics d’appels.'],
  ['b3', 3, 'Que dois-tu toujours mentionner quand tu proposes une mesure ?', 'Son coût, son bénéfice et le coût de l’inaction.', 'Renfort temporaire : coût chiffré, face aux clients perdus.'],
  // b4
  ['b4', 1, 'Quelles sont les caractéristiques d’un projet ?', 'Unique, limité dans le temps, avec un objectif, un budget et une équipe.', 'Introduire un logiciel.'],
  ['b4', 1, 'Qu’est-ce qu’un jalon ?', 'Un point de contrôle daté où un résultat intermédiaire doit être atteint.', '« Formation terminée le 15. »'],
  ['b4', 2, 'Que doit comporter chaque tâche d’un plan de projet ?', 'Quoi, qui (responsable) et pour quand (échéance).', ''],
  ['b4', 3, 'Que fais-tu en cas de retard dans un projet ?', 'J’évalue l’effet, j’informe tôt la direction du projet avec des options, puis j’adapte le plan et je communique.', ''],
  // b5
  ['b5', 1, 'Pourquoi le changement suscite-t-il de la résistance ?', 'Peur de ne pas savoir faire, perte d’habitudes, manque d’information et de participation.', ''],
  ['b5', 2, 'Quels sont les cinq leviers pour accompagner un changement ?', 'Expliquer le pourquoi, informer tôt et impliquer, former et tester, soutenir au démarrage, faire un bilan.', ''],
  ['b5', 2, 'Pourquoi un système parallèle (ancien fichier) pose-t-il problème ?', 'Les données existent en double et divergent ; le nouvel outil perd sa fiabilité.', ''],
  ['b5', 3, 'Comment répondre à « l’ancien système marchait très bien » ?', 'Reconnaître ce qui fonctionnait, rappeler le problème que le nouveau résout, montrer le bénéfice concret, impliquer la personne.', ''],
  // c1
  ['c1', 1, 'Quelle différence entre urgent et important ?', 'Urgent : le délai est proche. Important : les conséquences sont fortes.', ''],
  ['c1', 1, 'Quelle part de ta journée planifies-tu ?', 'Environ 60 % ; le reste sert de réserve pour les imprévus.', ''],
  ['c1', 2, 'Deux responsables te donnent chacun une urgence pour la même heure. Que fais-tu ?', 'Je ne tranche pas seul : je les informe du conflit avec les durées estimées et je demande un arbitrage.', ''],
  ['c1', 2, 'Quels sont les quatre temps de l’organisation d’un événement ?', 'Mandat, planification, réalisation, suivi (remerciements, décompte, bilan).', ''],
  // c2
  ['c2', 1, 'Que contient l’en-tête d’un procès-verbal ?', 'Titre de la séance, date, heure, lieu, présents, excusés, auteur.', ''],
  ['c2', 1, 'Que doit préciser chaque tâche d’un procès-verbal ?', 'Qui, quoi, pour quand.', '« M. Dubois planifie la formation — délai : 15 avril. »'],
  ['c2', 2, 'Quels sont les six angles de contrôle d’un document ?', 'But et destinataire, exhaustivité, exactitude, logique, forme, données personnelles et suite.', ''],
  ['c2', 2, 'Combien de temps conserve-t-on les pièces comptables en Suisse ?', 'Dix ans.', ''],
  ['c2', 3, 'Quelle erreur de protection des données trouve-t-on souvent dans un procès-verbal ?', 'La mention de données sensibles sur une personne nommée (santé, situation personnelle).', '« M. X est en arrêt pour dépression » → « Organisation des suppléances ».'],
  // c3
  ['c3', 1, 'Qu’est-ce qu’un processus ?', 'Une suite d’étapes répétées qui transforme une demande (déclencheur) en résultat.', 'Traitement d’une réclamation.'],
  ['c3', 2, 'Quels sont les quatre temps de l’optimisation d’un processus ?', 'Analyser l’existant, identifier le potentiel, mettre en œuvre une solution, vérifier le résultat.', ''],
  ['c3', 2, 'Cite quatre sources de gaspillage dans un processus.', 'Attentes, doublons, ressaisies, contrôles redondants (et aussi : allers-retours, erreurs à corriger).', ''],
  ['c3', 3, 'Cite cinq défauts fréquents d’un questionnaire de satisfaction.', 'Trop long, nominatif sans raison, questions doubles, négations ou formulations orientées, échelles incohérentes ou déséquilibrées.', 'Série zéro, TP2.'],
  ['c3', 3, 'Que fais-tu en cas de report d’un délai dans un calendrier ?', 'J’évalue l’effet, j’informe tôt en donnant la cause et la nouvelle date, j’adapte les tâches dépendantes.', ''],
  // c4
  ['c4', 1, 'Que signifie AIDA ?', 'Attention, Intérêt, Désir, Action.', ''],
  ['c4', 1, 'Par quels critères décrit-on un groupe cible ?', 'Âge, situation, besoins, connaissances préalables, habitudes d’information, langue.', ''],
  ['c4', 2, 'Dans quel ordre planifie-t-on une communication ?', 'But → public → message → canal → mesure du résultat.', ''],
  ['c4', 3, 'Quelles contraintes respecter pour un support de communication ?', 'Droit d’auteur, droit à l’image, protection des données, identité visuelle, validation, budget.', ''],
  // c5
  ['c5', 1, 'Quels sont les taux de TVA en Suisse depuis 2024 ?', '8,1 % (normal), 2,6 % (réduit), 3,8 % (hébergement).', ''],
  ['c5', 1, 'Quelle différence entre rabais et escompte ?', 'Rabais : réduction commerciale. Escompte : réduction pour paiement rapide. On calcule d’abord le rabais.', '1 000 − 10 % = 900 ; 900 − 2 % = 882.'],
  ['c5', 2, 'Quels sont les cinq contrôles d’une facture reçue ?', 'Formel, matériel (commande et livraison), arithmétique, conditions, visa.', ''],
  ['c5', 2, 'Comment calcule-t-on la TVA comprise dans un total à 8,1 % ?', 'Total ÷ 108,1 × 8,1.', '1 081.00 ÷ 108,1 × 8,1 = 81.00.'],
  ['c5', 3, 'Que vérifies-tu avant d’envoyer un rappel de paiement ?', 'Les paiements récents, les réclamations en cours et l’exactitude de l’adresse.', ''],
  ['c5', 3, 'Qu’est-ce que le principe des quatre yeux ?', 'Une opération sensible est contrôlée par une deuxième personne ; celui qui commande ne paie pas seul.', ''],
  // d1
  ['d1', 1, 'À quoi sert une question ouverte ? Une question fermée ?', 'Ouverte : explorer la situation. Fermée : vérifier un fait.', '« Que s’est-il passé ? » / « C’était bien le 12 mars ? »'],
  ['d1', 1, 'Quelles sont les cinq étapes de la prise en charge d’une demande ?', 'Accueillir, écouter, questionner, reformuler, traiter ou transférer en annonçant la suite.', ''],
  ['d1', 2, 'Quelle différence entre demande et besoin ?', 'La demande est ce que la personne exprime ; le besoin est ce qu’elle cherche réellement à obtenir.', '« Le formulaire » cache la crainte de ne plus payer son loyer.'],
  ['d1', 2, 'Comment réussir un transfert d’appel ?', 'Expliquer au client pourquoi et à qui, résumer le cas au collègue, donner un délai.', ''],
  // d2
  ['d2', 1, 'Quelles sont les sept étapes du traitement d’une réclamation ?', 'Réagir vite, écouter, s’excuser, clarifier, proposer une solution avec un délai, tenir parole, vérifier la satisfaction et corriger la cause.', ''],
  ['d2', 1, 'Pourquoi s’excuser même si l’entreprise n’a pas commis de faute ?', 'On s’excuse pour le désagrément vécu, pas pour une faute : cela apaise et ouvre le dialogue.', '« Je suis désolé que vous ayez dû attendre. »'],
  ['d2', 2, 'Que promets-tu quand tu ne connais pas encore la solution ?', 'Une prochaine étape et un délai que je maîtrise.', '« Je vous rappelle demain avant midi avec un calendrier. »'],
  ['d2', 2, 'Quelle différence entre caractéristique et avantage ?', 'Caractéristique : ce que c’est. Avantage : ce que cela apporte au client.', '« Portail 24 h/24 » → « vous consultez vos factures quand vous voulez ».'],
  ['d2', 3, 'Quel canal choisir pour répondre à un client très mécontent, et pourquoi ?', 'Le téléphone : plus rapide, plus personnel, permet de clarifier. On confirme ensuite par écrit.', ''],
  ['d2', 3, 'Comment traite-t-on une objection ?', 'Accueillir, clarifier par une question, répondre avec un argument ou une alternative, vérifier.', ''],
  // d3
  ['d3', 1, 'Que prépares-tu avant une négociation ?', 'Objectif idéal, minimum acceptable, arguments chiffrés, alternative, limites de ta compétence.', ''],
  ['d3', 2, 'Quelle différence entre position et intérêt ?', 'La position est ce que la personne exige ; l’intérêt est la raison de cette exigence.', '« 15 % de rabais » / « respecter mon budget ».'],
  ['d3', 2, 'Que signifie négocier en donnant-donnant ?', 'Lier chaque concession à une contrepartie.', '5 % de rabais contre un engagement de trois ans.'],
  ['d3', 3, 'Quels sont les principes de la négociation raisonnée ?', 'Séparer la personne du problème, se concentrer sur les intérêts, imaginer des options, s’appuyer sur des critères objectifs.', ''],
  // d4
  ['d4', 1, 'Pourquoi fidéliser un client existant ?', 'Cela coûte moins cher que d’en gagner un nouveau, et un client satisfait recommande l’entreprise.', ''],
  ['d4', 2, 'Quelles sont les cinq actions de suivi après une réclamation ?', 'Tenir ce qui a été promis, informer de manière proactive, vérifier la satisfaction, documenter, prévenir la répétition.', ''],
  ['d4', 2, 'Pourquoi noter chaque contact dans le dossier client ?', 'Pour la continuité : un collègue peut reprendre le dossier sans faire répéter le client.', ''],
  ['d4', 3, 'Que signifie une baisse des commandes sans réclamation ?', 'Peut-être une insatisfaction silencieuse : prendre contact, proposer un entretien de bilan.', ''],
  // e1
  ['e1', 1, 'À quoi servent un CRM, un ERP, un CMS ?', 'CRM : relation et historique client. ERP : gestion intégrée (commandes, stocks, facturation). CMS : publication de contenus web.', ''],
  ['e1', 1, 'Quels sont les trois objectifs de la sécurité des données ?', 'Confidentialité, intégrité, disponibilité.', ''],
  ['e1', 2, 'Quels indices trahissent un courriel d’hameçonnage ?', 'Expéditeur inhabituel, ton pressant, lien suspect, demande d’identifiants.', ''],
  ['e1', 2, 'Quels sont les principes de la protection des données ?', 'Finalité, proportionnalité, exactitude, sécurité, transparence.', ''],
  ['e1', 3, 'Cite quatre catégories de données sensibles.', 'Santé, opinions ou activités religieuses et politiques, mesures d’aide sociale, poursuites ou sanctions pénales (et aussi : sphère intime, origine, données génétiques et biométriques).', ''],
  ['e1', 3, 'Quelles sont les cinq étapes pour préparer une équipe à un nouvel outil ?', 'Clarifier, informer, former sur des cas réels, tester, démarrer avec un soutien puis faire un bilan.', 'Série zéro, TP4 « Infrastructure technologique ».'],
  // e2
  ['e2', 1, 'Quels sont les cinq critères de fiabilité d’une source ?', 'Auteur, actualité, intention, preuves, recoupement.', ''],
  ['e2', 2, 'Où chercher le texte d’une loi fédérale ?', 'Sur le site de la Confédération (admin.ch, recueil systématique).', ''],
  ['e2', 2, 'Que contient la restitution d’une recherche ?', 'La réponse à la question, les sources avec la date de consultation, les limites.', ''],
  ['e2', 3, 'Peux-tu t’appuyer sur un outil d’intelligence artificielle pour une recherche ?', 'Comme point de départ seulement : tout vérifier auprès d’une source fiable et n’y saisir aucune donnée confidentielle.', ''],
  // e3
  ['e3', 1, 'Comment calcule-t-on une variation en pour cent ?', '(Nouveau − ancien) ÷ ancien × 100.', 'De 400 à 500 : + 25 %.'],
  ['e3', 1, 'Quel graphique pour quel usage ?', 'Barres : comparer. Courbe : évolution. Secteurs : répartition simple. Tableau : détail.', ''],
  ['e3', 2, 'Quelle différence entre moyenne et médiane ?', 'Moyenne : somme ÷ nombre. Médiane : valeur centrale, insensible aux valeurs extrêmes.', '2, 3, 3, 4, 18 → moyenne 6, médiane 3.'],
  ['e3', 2, 'Pourquoi comparer des taux plutôt que des nombres ?', 'Parce qu’un nombre ne dit rien sans son total : 30 réclamations sur 1 000 valent mieux que 20 sur 500.', '3 % contre 4 %.'],
  ['e3', 3, 'Que vérifies-tu dans des données avant de les analyser ?', 'Doublons, valeurs manquantes, formats, valeurs aberrantes — en travaillant sur une copie.', ''],
  ['e3', 3, 'Que doit comporter tout graphique ?', 'Un titre qui porte le message, des axes nommés, les unités, la source.', ''],
  // e4
  ['e4', 1, 'Quelles sont les quatre questions de départ d’un contenu ?', 'Objectif, groupe cible, information, canal.', ''],
  ['e4', 2, 'Que contient une page « projet de référence » ?', 'Secteur du client, besoin, solution, résultat, citation (avec accord), contact.', 'Série zéro, TP4 « Développement de contenu ».'],
  ['e4', 2, 'Que contrôles-tu avant de publier un contenu ?', 'Exactitude, langue, droits et autorisations, identité visuelle, accessibilité et mobile, relecture par une deuxième personne.', ''],
  ['e4', 3, 'Quelles contraintes citer pour une publication sur le site ?', 'Accord des clients cités, confidentialité, droit d’auteur et droit à l’image, protection des données, identité visuelle, rôles de validation et de mise à jour.', ''],
  ['e4', 3, 'Quels sont les avantages d’un modèle (gabarit) ?', 'Cohérence visuelle, gain de temps, moins d’erreurs et d’oublis.', ''],
]

const n: Record<string, number> = {}
export const FLASHCARDS: Flashcard[] = ROWS.map(([comp, niveau, recto, verso, exemple]) => {
  n[comp] = (n[comp] ?? 0) + 1
  return { id: `fc-${comp}-${n[comp]}`, comp, niveau, recto, verso, exemple }
})
