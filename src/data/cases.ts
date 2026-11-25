import type { Block, CaseStudy, CompId, TpId } from '@/types'
import { TP_BY_ID } from './referentiel'

interface Row {
  id: string
  titre: string
  tp: TpId
  comps: CompId[]
  secteur: string
  entreprise: string
  contexte: string
  situation: string
  annexe?: { titre: string; contenu: Block[] }
  questions: string[]
  attendu: string[]
  correction: string
  variantes: string[]
}

const CONSIGNES: Record<string, string[]> = {
  mini: ['3 minutes : analyse la situation et prends des notes.', '4 minutes : présente tes résultats à voix haute, comme devant les expert-e-s.', '3 minutes : réponds aux variantes proposées après la correction.'],
  simu: ['3 minutes : réfléchis à ta démarche et note-la dans l’ordre.', '4 minutes : décris ta démarche à voix haute et justifie chaque étape.', '3 minutes : réponds aux variantes proposées après la correction.'],
}

// Entreprises fictives réutilisées dans plusieurs cas, pour garder des contextes cohérents.
const E = {
  lumen: 'Lumen Énergie SA, à Yverdon-les-Bains, distribue l’électricité et le gaz à 42 000 clients privés et professionnels. 140 personnes y travaillent, dont 12 au service clientèle.',
  helvia: 'Helvia Santé est une caisse-maladie romande de taille moyenne (180 000 assurés) avec un centre de service clientèle de 35 personnes à Lausanne.',
  morat: 'L’administration communale de Rivaz-le-Lac (18 000 habitants) compte 95 collaborateurs. Le guichet de l’office de la population et du logement emploie 6 personnes.',
  fidac: 'Fidac Services Sàrl est une société de services administratifs et comptables de 22 personnes qui gère la facturation de PME et d’associations.',
  nova: 'Nova Bureau SA vend et installe du mobilier et du matériel de bureau en Suisse romande. 60 personnes, dont un service commercial interne de 8 personnes.',
  alpra: 'Alpra Formation est un institut de formation continue de 40 personnes ; son service des ressources humaines compte 3 collaborateurs.',
}

const ROWS: Row[] = [
  // ───────────── TP1 ─────────────
  {
    id: 'tp1-boite-partagee', titre: 'La boîte courriel que personne ne relève', tp: 'tp1', comps: ['b1', 'b2'], secteur: 'Service clientèle', entreprise: E.lumen,
    contexte: 'Tu travailles au service clientèle. L’adresse contact@lumen-energie.example est relevée par « la personne disponible ». Trois collègues sur douze travaillent à temps partiel.',
    situation: 'Depuis deux mois, des clients se plaignent de ne recevoir aucune réponse ou de recevoir deux réponses contradictoires. Certains courriels sont ouverts, marqués comme lus, puis oubliés. Le service technique, à qui les questions de raccordement sont transmises oralement, dit n’avoir « rien reçu ». Ta responsable te demande une analyse et des propositions.',
    questions: ['Pour quelles raisons les demandes ne sont-elles pas traitées correctement ?', 'Quelles mesures proposes-tu pour améliorer durablement la situation ?'],
    attendu: ['Aucune attribution : un courriel lu n’a pas de responsable.', 'Pas de règle de transmission pour les temps partiels et les absences.', 'Doublons : deux personnes répondent au même client sans se voir.', 'Interface orale avec le service technique : aucune trace, aucun délai.', 'Mesures : attribution nominative et statut, note de transmission, canal écrit et délai convenu avec le service technique, réponses types validées, indicateur de délai et bilan.'],
    correction: 'Le problème est organisationnel et non individuel : il manque des rôles, des règles et un canal fiable à l’interface. Une bonne réponse couvre les quatre causes, propose des mesures concrètes attribuées à quelqu’un et prévoit la mesure du résultat.',
    variantes: ['La direction refuse tout nouvel outil : que peux-tu faire avec la messagerie actuelle ?', 'Un collègue estime que ces règles sont « de la bureaucratie » : que réponds-tu ?', 'Le volume de courriels double en hiver : qu’adaptes-tu ?'],
  },
  {
    id: 'tp1-integration', titre: 'Une nouvelle collègue livrée à elle-même', tp: 'tp1', comps: ['b1', 'a3', 'a2'], secteur: 'Assurance-maladie', entreprise: E.helvia,
    contexte: 'Tu es collaborateur expérimenté au service clientèle. Une nouvelle collègue, Inès, a commencé il y a trois semaines.',
    situation: 'Inès n’a reçu ni programme d’introduction ni personne de référence. Elle pose ses questions à qui veut bien répondre et obtient des réponses différentes. Elle a donné deux renseignements erronés à des assurés cette semaine. Certains collègues soupirent qu’elle « dérange tout le temps ». Ta responsable te demande ce qu’il faudrait changer.',
    questions: ['Quels problèmes identifies-tu ?', 'Que proposes-tu à court terme et pour les prochaines arrivées ?'],
    attendu: ['Pas de plan d’introduction ni d’objectifs par étape.', 'Pas de personne de référence : réponses contradictoires.', 'Aucune source d’information unique.', 'Risque pour la qualité (renseignements erronés) et pour le climat d’équipe.', 'Mesures : marraine désignée, plan sur six semaines, base de connaissances, points hebdomadaires, contrôle des premières réponses, correction auprès des deux assurés.'],
    correction: 'L’erreur vient du dispositif d’accueil, pas de la nouvelle collègue. La réponse attendue traite l’urgence (corriger les deux renseignements, désigner une référente) et le durable (processus d’intégration documenté).',
    variantes: ['Personne ne veut être référent par manque de temps : que proposes-tu ?', 'Inès te dit qu’elle pense à démissionner : que fais-tu ?'],
  },
  {
    id: 'tp1-changement-horaires', titre: 'Des horaires d’ouverture élargis', tp: 'tp1', comps: ['b5', 'b1', 'a4'], secteur: 'Administration communale', entreprise: E.morat,
    contexte: 'Tu travailles au guichet. La Municipalité a décidé d’ouvrir le guichet le jeudi jusqu’à 19 h dès le mois prochain.',
    situation: 'La décision a été communiquée par une note de service de trois lignes. Rien n’est dit sur la répartition des soirées, la compensation ni la sécurité en fin de journée. Deux collègues ont des contraintes de garde d’enfants. Les discussions de couloir se multiplient et personne ne s’est inscrit sur le planning provisoire.',
    questions: ['Pourquoi ce changement est-il mal accueilli ?', 'Que proposes-tu à ta responsable pour qu’il réussisse ?'],
    attendu: ['Annonce sans explication du pourquoi ni du bénéfice pour les habitants.', 'Questions pratiques sans réponse : tournus, compensation, sécurité.', 'Aucune participation de l’équipe.', 'Contraintes personnelles ignorées.', 'Mesures : séance d’information, tournus construit avec l’équipe, règles de compensation et de sécurité clarifiées, phase pilote de trois mois avec mesure de la fréquentation et bilan.'],
    correction: 'La résistance est une réaction normale à un changement non expliqué. La décision n’est pas remise en cause ; c’est sa mise en œuvre qu’il faut organiser avec l’équipe, puis évaluer.',
    variantes: ['Après trois mois, presque personne ne vient le jeudi soir : que proposes-tu ?', 'Un collègue refuse catégoriquement de faire les soirées : comment réagis-tu ?'],
  },
  {
    id: 'tp1-projet-demenagement', titre: 'Un déménagement mal parti', tp: 'tp1', comps: ['b4', 'b2'], secteur: 'Support administratif', entreprise: E.fidac,
    contexte: 'Fidac déménage dans six semaines. Tu es chargé de coordonner les tâches administratives du projet, sous la direction de l’associé gérant.',
    situation: 'Une liste de tâches existe, mais sans responsables ni dates. Le prestataire informatique n’a pas été informé de la date. Les clients n’ont pas encore été avertis du changement d’adresse. Deux collaborateurs ont posé des vacances la semaine du déménagement.',
    questions: ['Quels sont les risques pour le projet ?', 'Comment t’organises-tu dans les six semaines ?'],
    attendu: ['Tâches sans responsable ni échéance, aucun jalon.', 'Parties prenantes non informées : prestataire, clients, poste, banque.', 'Ressources non vérifiées (absences).', 'Mesures : plan avec tâches, responsables et dates ; jalons hebdomadaires ; plan de communication ; solution pour la continuité du service ; point régulier avec l’associé gérant.'],
    correction: 'La réponse doit reprendre la logique d’un petit projet : objectif, tâches attribuées, jalons, communication, risques. Signaler tôt les écarts à la direction du projet fait partie des attendus.',
    variantes: ['Le prestataire informatique annonce qu’il ne sera prêt que trois jours après le déménagement : que fais-tu ?', 'L’associé gérant veut avancer la date d’une semaine : comment réagis-tu ?'],
  },
  {
    id: 'tp1-objectifs-equipe', titre: 'Des entretiens annuels sans suite', tp: 'tp1', comps: ['a1', 'a3'], secteur: 'Ressources humaines', entreprise: E.alpra,
    contexte: 'Tu travailles aux ressources humaines. La direction constate que les objectifs fixés lors des entretiens annuels ne sont presque jamais atteints.',
    situation: 'En relisant vingt formulaires, tu trouves des objectifs comme « s’améliorer en informatique », « être plus proactif » ou « mieux gérer son temps ». Aucune mesure ni échéance n’est mentionnée, et personne ne reprend le formulaire avant l’entretien suivant.',
    questions: ['Pourquoi ces objectifs ne sont-ils pas atteints ?', 'Que proposes-tu pour améliorer le dispositif ?'],
    attendu: ['Objectifs non SMART : ni précis, ni mesurables, ni datés.', 'Aucune mesure ni ressource associée.', 'Aucun suivi entre deux entretiens.', 'Mesures : formulaire avec rubriques SMART et plan de mesures, exemple rédigé, courte formation des responsables, point intermédiaire semestriel, bilan des mesures.'],
    correction: 'Sans critère vérifiable ni suivi, un objectif reste une intention. On attend un exemple de reformulation SMART et un dispositif de suivi.',
    variantes: ['Reformule « être plus proactif » en objectif SMART pour un collaborateur du secrétariat.', 'Un responsable juge ce formulaire trop lourd : que proposes-tu ?'],
  },
  {
    id: 'tp1-interface-ventes', titre: 'Des promesses de livraison intenables', tp: 'tp1', comps: ['b2', 'b3'], secteur: 'Service commercial', entreprise: E.nova,
    contexte: 'Tu travailles au service commercial interne, entre les vendeurs externes et la logistique.',
    situation: 'Les vendeurs promettent une livraison « sous dix jours ». La logistique annonce en interne trois à quatre semaines pour le mobilier sur mesure. Les clients t’appellent, furieux. Les vendeurs reprochent à la logistique sa lenteur ; la logistique reproche aux vendeurs de promettre n’importe quoi.',
    questions: ['Où se situe le problème ?', 'Quelles mesures proposes-tu, et quels en seraient les effets économiques ?'],
    attendu: ['Interface ventes–logistique sans information partagée sur les délais réels.', 'Objectifs différents : chiffre d’affaires contre faisabilité.', 'Le service interne absorbe les réclamations.', 'Mesures : délais de référence par gamme, tenus à jour par la logistique ; validation préalable des délais spéciaux ; point hebdomadaire ; information proactive des clients.', 'Effet économique : moins de réclamations, de gestes commerciaux et de clients perdus.'],
    correction: 'On attend une analyse qui ne désigne pas de coupable et qui relie la mesure à un bénéfice économique chiffrable, même approximativement.',
    variantes: ['Les vendeurs craignent de perdre des ventes en annonçant quatre semaines : que réponds-tu ?', 'Que dis-tu aujourd’hui au client qui attend depuis trois semaines ?'],
  },
  {
    id: 'tp1-egalite-traitement', titre: 'Des « arrangements » au guichet', tp: 'tp1', comps: ['a4', 'a5', 'b1'], secteur: 'Administration communale', entreprise: E.morat,
    contexte: 'Tu travailles au guichet de l’office de la population et du logement.',
    situation: 'Tu remarques qu’un collègue accepte des dossiers incomplets de la part de personnes qu’il connaît, alors que les autres habitants doivent revenir avec toutes les pièces. Un habitant s’en est aperçu et a fait une remarque à voix haute dans la salle d’attente. Ta responsable n’est pas au courant.',
    questions: ['Quels sont les enjeux de la situation ?', 'Comment agis-tu ?'],
    attendu: ['Inégalité de traitement et non-respect de la directive.', 'Risque d’image et de recours contre la commune.', 'Tension dans l’équipe.', 'Démarche : en parler d’abord directement au collègue, sur des faits ; rappeler la règle ; informer la responsable si cela continue ou vu l’incident public ; proposer une liste des pièces et une règle écrite sur les exceptions.'],
    correction: 'La réponse doit combiner loyauté envers le collègue (dialogue direct) et responsabilité envers le service public (égalité de traitement). Taire la situation n’est pas une option.',
    variantes: ['Le collègue te répond que « tout le monde le fait » : que fais-tu ?', 'Dans quel cas une exception serait-elle acceptable, et qui en décide ?'],
  },
  {
    id: 'tp1-teletravail', titre: 'Une équipe hybride qui se perd de vue', tp: 'tp1', comps: ['b1', 'c1', 'b2'], secteur: 'Service de facturation', entreprise: E.fidac,
    contexte: 'L’équipe de facturation (5 personnes) travaille deux à trois jours par semaine à domicile.',
    situation: 'Les jours de présence ne sont pas coordonnés. Les questions urgentes restent sans réponse parce que personne ne sait qui est joignable. Deux factures ont été émises en double par deux collègues travaillant le même jour à distance. Les séances d’équipe ont été abandonnées « faute de temps ».',
    questions: ['Quels dysfonctionnements identifies-tu ?', 'Quelles règles de collaboration proposes-tu ?'],
    attendu: ['Présences non planifiées, disponibilité inconnue.', 'Travail non attribué : doublons.', 'Plus d’échange régulier.', 'Mesures : planning partagé des présences, statut de disponibilité, attribution des lots de factures, point court quotidien en ligne, jour de présence commun, contrôle des doublons.'],
    correction: 'Le télétravail n’est pas la cause : c’est l’absence de règles de coordination. Les mesures doivent être simples, décidées en équipe et vérifiables.',
    variantes: ['La direction envisage de supprimer le télétravail : quel est ton avis argumenté ?', 'Comment corriges-tu les deux factures émises en double ?'],
  },

  // ───────────── TP2 ─────────────
  {
    id: 'tp2-questionnaire', titre: 'Un questionnaire de satisfaction à revoir', tp: 'tp2', comps: ['c3', 'c4'], secteur: 'Service clientèle', entreprise: E.lumen,
    contexte: 'Le service clientèle veut mesurer la satisfaction après chaque contact téléphonique. Une collègue a préparé un projet de questionnaire en ligne.',
    situation: 'Elle te demande ton avis avant l’envoi à 3 000 clients.',
    annexe: { titre: 'Projet de questionnaire', contenu: [
      { t: 'p', text: '« Merci de consacrer 15 minutes à ce questionnaire. Nom, prénom et numéro de client (obligatoires) : ________ »' },
      { t: 'list', items: [
        '1. Notre collaborateur a-t-il été aimable et compétent ?  ○ Oui  ○ Non',
        '2. Ne trouvez-vous pas que notre temps d’attente est acceptable ?  ○ Oui  ○ Non',
        '3. Comment jugez-vous notre service ?  ○ Excellent  ○ Très bon  ○ Bon',
        '4. Quel est votre revenu annuel ?  ________',
        '5. Recommanderiez-vous Lumen Énergie ?  ○ 1  ○ 2  ○ 3  ○ 4  ○ 5',
      ] },
    ] },
    questions: ['Dans quelle mesure ce questionnaire permet-il de mesurer la satisfaction ?', 'Que corriges-tu, et comment ?'],
    attendu: ['Durée annoncée dissuasive pour cinq questions.', 'Identification obligatoire : frein à la sincérité, question de protection des données.', 'Question 1 double (aimable et compétent).', 'Question 2 négative et orientée.', 'Question 3 : échelle déséquilibrée, aucune réponse négative possible.', 'Question 4 sans rapport avec l’objectif.', 'Question 5 : échelle non légendée et différente des autres ; aucune question ouverte ; rien sur la résolution de la demande.'],
    correction: 'Un bon questionnaire est court, anonyme ou transparent sur l’usage des données, avec une idée par question, des formulations neutres et une échelle unique et équilibrée. Il manque surtout la question clé : la demande a-t-elle été résolue ?',
    variantes: ['Ta collègue tient à connaître l’identité des répondants pour les rappeler : que proposes-tu ?', 'Le taux de réponse n’atteint que 4 % : que fais-tu ?'],
  },
  {
    id: 'tp2-pv', titre: 'Un procès-verbal inutilisable', tp: 'tp2', comps: ['c2'], secteur: 'Support administratif', entreprise: E.alpra,
    contexte: 'Tu assistes la directrice. Un stagiaire a rédigé le procès-verbal de la séance de coordination des formateurs.',
    situation: 'La directrice te demande de le relire avant diffusion aux quinze participants.',
    annexe: { titre: 'Procès-verbal (extrait)', contenu: [
      { t: 'p', text: 'Séance de coordination. Présents : presque tout le monde.' },
      { t: 'list', items: [
        '1. Salles : on a beaucoup discuté du problème des salles. Plusieurs personnes pensent qu’il faudrait changer quelque chose.',
        '2. Nouveau logiciel d’inscription : il sera introduit prochainement. Quelqu’un devra former les formateurs.',
        '3. Budget : le budget matériel de 12 000 francs est réparti ainsi : 5 000 pour l’informatique, 4 500 pour les supports, 3 500 pour le mobilier.',
        '4. Divers : M. Perret est encore en arrêt pour sa dépression, il faudra le remplacer.',
        'Prochaine séance : à définir.',
      ] },
    ] },
    questions: ['Quelles incohérences et lacunes relèves-tu ?', 'Comment le corriges-tu ?'],
    attendu: ['En-tête incomplet : date, lieu, liste nominative, excusés, auteur.', 'Point 1 : aucune décision.', 'Point 2 : pas de date ni de responsable.', 'Point 3 : 5 000 + 4 500 + 3 500 = 13 000, et non 12 000.', 'Point 4 : donnée de santé sur une personne nommée.', 'Prochaine séance non fixée ; aucun tableau des tâches.'],
    correction: 'Le document ne remplit pas son but : permettre le suivi des décisions. On attend le constat, la conséquence et une reformulation précise pour au moins deux points, ainsi que le repérage de l’erreur de calcul et du problème de protection des données.',
    variantes: ['Le stagiaire est vexé par tes remarques : comment lui fais-tu ce retour ?', 'Le procès-verbal a déjà été envoyé avec le point 4 : que fais-tu ?'],
  },
  {
    id: 'tp2-facture', titre: 'Une facture à contrôler avant envoi', tp: 'tp2', comps: ['c5'], secteur: 'Service de facturation', entreprise: E.fidac,
    contexte: 'Tu contrôles les factures préparées par un collègue avant leur envoi (principe des quatre yeux).',
    situation: 'Voici la facture destinée à l’association Les Amis du Lac.',
    annexe: { titre: 'Facture n° — (projet)', contenu: [
      { t: 'p', text: 'Fidac Services Sàrl, rue du Port 4, 1400 Yverdon-les-Bains — Destinataire : Les Amis du Lac — Date : 3 mars 2027' },
      { t: 'table', head: ['Désignation', 'Quantité', 'Prix unitaire', 'Montant'], rows: [
        ['Tenue de la comptabilité, février', '14 h', '120.00', '1 680.00'],
        ['Établissement des salaires', '6 fiches', '25.00', '125.00'],
        ['Sous-total', '', '', '1 805.00'],
        ['Rabais association 5 %', '', '', '+ 90.25'],
        ['TVA 7,7 %', '', '', '145.95'],
        ['Total', '', '', '2 041.20'],
      ] },
      { t: 'p', text: 'Payable à réception.' },
    ] },
    questions: ['Quelles erreurs et lacunes trouves-tu ?', 'Quel est le montant correct ?'],
    attendu: ['Numéro de facture et numéro de TVA de l’émetteur manquants.', '6 × 25 = 150 et non 125 : sous-total 1 830.00.', 'Le rabais doit être déduit, non ajouté : 1 830 − 91.50 = 1 738.50.', 'Taux de TVA périmé : 8,1 % depuis 2024, soit 140.82.', 'Total correct : 1 879.32 (1 879.30 arrondi aux 5 centimes).', '« Payable à réception » : délai imprécis, préférer « 30 jours net ».'],
    correction: 'Le contrôle se fait dans l’ordre : formel, arithmétique, conditions. Un calcul présenté pas à pas, à la calculatrice, vaut mieux qu’un total annoncé sans justification.',
    variantes: ['La facture est déjà partie : comment la corriges-tu ?', 'Le client paie le montant erroné : que fais-tu ?'],
  },
  {
    id: 'tp2-planning', titre: 'Le planning de la journée d’accueil', tp: 'tp2', comps: ['c1'], secteur: 'Ressources humaines', entreprise: E.alpra,
    contexte: 'Les ressources humaines organisent une journée d’accueil pour huit nouveaux collaborateurs. Une collègue a préparé le programme.',
    situation: 'Elle te demande de le vérifier avant l’envoi des invitations.',
    annexe: { titre: 'Programme de la journée d’accueil — lundi 29 mars 2027', contenu: [
      { t: 'table', head: ['Heure', 'Activité', 'Lieu', 'Responsable'], rows: [
        ['08 h 00 – 08 h 30', 'Accueil et café', 'Salle A', 'RH'],
        ['08 h 30 – 12 h 30', 'Présentation de l’entreprise et de tous les services', 'Salle A', 'Direction'],
        ['12 h 00 – 13 h 00', 'Repas', 'Restaurant', '—'],
        ['13 h 00 – 13 h 30', 'Remise du matériel informatique et formation aux six logiciels', 'Salle B', 'Informatique'],
        ['13 h 30 – 17 h 30', 'Sécurité, protection des données, règlement du personnel', 'Salle A', '—'],
        ['17 h 00', 'Fin de la journée', '', ''],
      ] },
      { t: 'p', text: 'Remarque : la salle A est réservée de 8 h à 12 h.' },
    ] },
    questions: ['Quelles incohérences repères-tu ?', 'Que proposes-tu ?'],
    attendu: ['Le lundi 29 mars 2027 est le lundi de Pâques : date à vérifier dans le calendrier des jours fériés.', 'Chevauchements : 12 h – 12 h 30, et fin à 17 h pour un bloc qui se termine à 17 h 30.', 'Quatre heures de présentation sans pause.', 'Trente minutes pour le matériel et six logiciels : irréaliste.', 'Salle A réservée seulement jusqu’à midi.', 'Responsables manquants pour deux points ; repas non réservé.'],
    correction: 'On attend un contrôle systématique : dates, durées, chevauchements, ressources, responsables, puis une proposition de programme allégé avec pauses, étalé si nécessaire sur deux demi-journées.',
    variantes: ['La direction veut tout garder sur une seule journée : que proposes-tu ?', 'Deux nouveaux collaborateurs travaillent à 50 % le matin seulement : qu’adaptes-tu ?'],
  },
  {
    id: 'tp2-processus-remboursement', titre: 'Un processus de remboursement trop long', tp: 'tp2', comps: ['c3', 'b2'], secteur: 'Assurance-maladie', entreprise: E.helvia,
    contexte: 'Tu participes à un groupe de travail sur le remboursement des frais médicaux envoyés par courrier.',
    situation: 'Le délai moyen de remboursement atteint 23 jours ; l’objectif est de 10.',
    annexe: { titre: 'Description du processus actuel', contenu: [
      { t: 'steps', items: ['Réception du courrier, tri (2 jours)', 'Numérisation par un prestataire externe (4 jours)', 'Contrôle formel par l’équipe A (3 jours)', 'Contrôle formel et matériel par l’équipe B (5 jours)', 'Demande de complément par courrier postal si nécessaire (7 jours)', 'Saisie manuelle du paiement (2 jours)'] },
      { t: 'p', text: 'Un dossier sur quatre nécessite un complément. Aucun accusé de réception n’est envoyé à l’assuré.' },
    ] },
    questions: ['Où se trouvent les pertes de temps et les incohérences ?', 'Quelles améliorations proposes-tu, et comment en vérifies-tu l’effet ?'],
    attendu: ['Double contrôle formel (équipes A et B).', 'Numérisation externe lente.', 'Compléments demandés par courrier postal : sept jours.', 'Saisie manuelle du paiement.', 'Aucune information à l’assuré : appels au service clientèle.', 'Mesures : un seul contrôle, dépôt par application ou portail, compléments par courriel ou téléphone, liste claire des pièces, accusé de réception automatique ; indicateurs : délai, taux de compléments.'],
    correction: 'La démarche attendue suit les quatre temps : analyser, identifier, mettre en œuvre, vérifier. Citer un indicateur mesuré avant et après est indispensable.',
    variantes: ['L’équipe A craint pour ses postes : comment abordes-tu le sujet ?', 'Beaucoup d’assurés âgés n’utilisent pas d’application : que prévois-tu ?'],
  },
  {
    id: 'tp2-invitation', titre: 'Une invitation qui n’invite pas', tp: 'tp2', comps: ['c4'], secteur: 'Service commercial', entreprise: E.nova,
    contexte: 'Nova Bureau organise une journée de présentation de sa nouvelle gamme ergonomique pour ses clients professionnels.',
    situation: 'Le projet d’invitation par courriel t’est soumis.',
    annexe: { titre: 'Projet de courriel', contenu: [
      { t: 'p', text: 'Objet : Information' },
      { t: 'p', text: '« Madame, Monsieur, Fondée en 1987, notre entreprise n’a cessé d’innover. Après avoir développé successivement nos gammes Classic, Office et Pro, nous avons le plaisir de vous annoncer le lancement de la gamme ErgoLine, fruit de trois ans de recherche et développement menés par notre département technique en collaboration avec plusieurs partenaires. À cette occasion, un événement aura lieu prochainement dans nos locaux. Nous espérons vous y voir nombreux. Meilleures salutations. »' },
      { t: 'p', text: 'Pièce jointe : photo d’un client assis à son bureau (prise lors d’une installation).' },
    ] },
    questions: ['Pourquoi cette invitation risque-t-elle d’échouer ?', 'Propose une version améliorée dans ses grandes lignes.'],
    attendu: ['Objet sans accroche.', 'Aucune information pratique : date, heure, lieu, programme, inscription.', 'Texte centré sur l’entreprise, pas sur l’avantage pour le client.', 'Pas d’appel à l’action ni de contact.', 'Photo d’un client sans accord : droit à l’image.', 'Version AIDA : objet accrocheur, bénéfice (essai, conseil d’un ergonome), date et lieu visibles, inscription en un clic avant une date.'],
    correction: 'Le message doit partir du lecteur. La structure AIDA et la vérification des droits sur l’image sont les deux points centraux.',
    variantes: ['Seules 6 personnes sur 400 se sont inscrites : que fais-tu ?', 'Le client photographié donne son accord oralement : cela suffit-il ?'],
  },
  {
    id: 'tp2-budget-evenement', titre: 'Le décompte du repas de fin d’année', tp: 'tp2', comps: ['c5', 'c1'], secteur: 'Support administratif', entreprise: E.fidac,
    contexte: 'Tu as organisé le repas de fin d’année pour 22 personnes avec un budget validé de 2 200 francs.',
    situation: 'Un collègue a établi le décompte et te le remet pour contrôle avant transmission à l’associé gérant.',
    annexe: { titre: 'Décompte', contenu: [
      { t: 'table', head: ['Poste', 'Budget', 'Réel', 'Justificatif'], rows: [
        ['Menu (22 × 65.00)', '1 430.00', '1 495.00', 'Facture du restaurant'],
        ['Boissons', '400.00', '612.50', 'Facture du restaurant'],
        ['Animation', '250.00', '250.00', '—'],
        ['Cadeaux', '120.00', '180.00', 'Ticket de caisse'],
        ['Total', '2 200.00', '2 437.50', ''],
      ] },
      { t: 'p', text: 'Commentaire : « Léger dépassement, rien de particulier. »' },
    ] },
    questions: ['Que constates-tu en contrôlant ce décompte ?', 'Comment le présentes-tu à l’associé gérant ?'],
    attendu: ['Total réel faux : 1 495 + 612.50 + 250 + 180 = 2 537.50.', 'Dépassement de 337.50, soit environ 15 % : ce n’est pas « léger ».', 'Menu : 1 495 correspond à 23 couverts, à clarifier.', 'Boissons : + 53 %, cause principale.', 'Animation sans justificatif.', 'Présentation : écarts expliqués poste par poste, justificatifs joints, enseignements (forfait boissons, réserve, validation des dépassements).'],
    correction: 'Un décompte se recalcule toujours. On attend la correction du total, l’explication des écarts et une attitude transparente envers le mandant.',
    variantes: ['L’animateur a été payé en espèces sans reçu : que fais-tu ?', 'À quel moment aurais-tu dû signaler le dépassement ?'],
  },
  {
    id: 'tp2-archivage', titre: 'Un serveur de fichiers en désordre', tp: 'tp2', comps: ['c2', 'e1'], secteur: 'Administration communale', entreprise: E.morat,
    contexte: 'L’office migre ses dossiers vers une gestion électronique des documents. Tu examines l’arborescence actuelle.',
    situation: 'Voici un extrait du dossier partagé du service.',
    annexe: { titre: 'Extrait de l’arborescence', contenu: [
      { t: 'list', items: [
        'Dossier « Divers » : 1 240 fichiers',
        'Dossier « Sophie perso boulot »',
        '« lettre.docx », « lettre2.docx », « lettre_finale.docx », « lettre_finale_VRAI.docx »',
        '« Liste demandeurs avec revenus 2019.xlsx » — accessible à tout le personnel communal',
        'Dossier « 2012 – candidatures refusées »',
        '« PV séance.pdf » (sans date)',
      ] },
    ] },
    questions: ['Quels problèmes identifies-tu ?', 'Quelles règles proposes-tu pour le nouveau système ?'],
    attendu: ['Aucun plan de classement : « Divers », dossiers personnels.', 'Nommage sans date ni version.', 'Droits d’accès trop larges sur des données financières personnelles.', 'Conservation excessive : candidatures refusées de 2012.', 'Documents non datés.', 'Règles : plan de classement par domaine, convention de nommage, droits par rôle, durées de conservation et destruction, nettoyage avant migration.'],
    correction: 'La réponse relie classement et protection des données : accès limités, durée de conservation proportionnée, destruction sécurisée. Migrer sans trier reproduirait le désordre.',
    variantes: ['Une collègue refuse de trier ses dossiers avant la migration : que proposes-tu ?', 'Qui décide des durées de conservation ?'],
  },
  {
    id: 'tp2-rappels', titre: 'Une vague de rappels contestés', tp: 'tp2', comps: ['c5', 'c3', 'd2'], secteur: 'Entreprise de distribution d’énergie', entreprise: E.lumen,
    contexte: 'Le service de facturation a envoyé 1 800 rappels la semaine dernière. Le service clientèle est submergé d’appels.',
    situation: 'Ta responsable te remet la procédure de rappel en vigueur et un relevé des appels.',
    annexe: { titre: 'Procédure et relevé', contenu: [
      { t: 'steps', items: ['Jour 30 : échéance de la facture', 'Jour 31 : rappel automatique avec 20 francs de frais', 'Jour 40 : second rappel, 40 francs de frais', 'Jour 45 : annonce de coupure'] },
      { t: 'table', head: ['Motif de l’appel', 'Nombre'], rows: [['Paiement effectué avant le rappel', '210'], ['Facture jamais reçue (changement d’adresse)', '95'], ['Réclamation en cours sur la facture', '60'], ['Demande d’arrangement de paiement', '140'], ['Autres', '45']] },
    ] },
    questions: ['Quelles incohérences vois-tu dans la procédure ?', 'Que proposes-tu ?'],
    attendu: ['Rappel dès le lendemain de l’échéance : les paiements en cours ne sont pas encore comptabilisés.', 'Frais dès le premier rappel : disproportionné.', 'Aucune vérification des réclamations ouvertes ni des retours de courrier.', 'Aucune étape d’arrangement avant l’annonce de coupure.', '550 appels, dont 365 évitables (210 + 95 + 60), soit deux tiers.', 'Mesures : délai de tolérance, premier rappel sans frais, blocage du rappel si réclamation ouverte, contrôle des adresses, offre d’arrangement.'],
    correction: 'On attend le lien entre le processus et ses effets sur les clients, avec un chiffre tiré du relevé. Les mesures doivent rester compatibles avec l’intérêt financier de l’entreprise.',
    variantes: ['La direction financière refuse de renoncer aux frais du premier rappel : que réponds-tu ?', 'Que faites-vous pour les 210 clients rappelés à tort ?'],
  },

  // ───────────── TP3 ─────────────
  {
    id: 'tp3-client-menace', titre: 'Un client de longue date à bout de patience', tp: 'tp3', comps: ['d2', 'd4', 'd1'], secteur: 'Entreprise de distribution d’énergie', entreprise: E.lumen,
    contexte: 'En relevant la boîte du service clientèle, tu trouves ce courriel vieux de quatre jours.',
    situation: '« Madame, Monsieur, Je suis client depuis quinze ans pour mon garage. Depuis l’installation du nouveau compteur le mois dernier, mes factures ont doublé sans raison. J’ai appelé deux fois : on m’a promis un rappel, jamais venu. Si personne ne me donne d’explication cette semaine, je change de fournisseur dès que possible. — Jean-Marc Berset, Garage Berset SA »',
    questions: ['Comment réponds-tu à ce client ?', 'Quelle suite donnes-tu au cas après ta réponse ?'],
    attendu: ['Réagir le jour même, par téléphone, puis confirmer par écrit.', 'Excuses pour l’attente et les deux rappels non tenus, sans justification.', 'Clarifier : relevés, dates, usage ; ne pas promettre de résultat.', 'Engagement maîtrisé : contrôle du compteur et de la facturation demandé au service technique, rappel à une date précise.', 'Geste pratique : suspension des rappels de paiement pendant la vérification.', 'Suite : coordination et relance interne, information proactive, correction ou explication, contrôle après la facture suivante, note au dossier, analyse des rappels non tenus.'],
    correction: 'Deux problèmes se superposent : le fond (facture doublée) et la relation (promesses non tenues). La réponse traite les deux et se termine par la prévention.',
    variantes: ['Le contrôle montre que la facture est exacte, la consommation a réellement doublé : comment l’annonces-tu ?', 'Il exige un dédommagement pour le temps perdu : que fais-tu ?', 'Il ne décroche pas : que fais-tu ?'],
  },
  {
    id: 'tp3-refus-prestation', titre: 'Annoncer un refus au guichet', tp: 'tp3', comps: ['d2', 'd1', 'a5'], secteur: 'Administration communale', entreprise: E.morat,
    contexte: 'Tu es au guichet de l’office du logement.',
    situation: 'Mme Keller vient chercher la réponse à sa demande d’attestation pour un logement subventionné. Après contrôle, son revenu dépasse la limite réglementaire de quelques centaines de francs. Elle est accompagnée de ses deux enfants et dit avoir déjà visité un appartement.',
    questions: ['Comment mènes-tu cet entretien ?', 'Que fais-tu après l’entretien ?'],
    attendu: ['Cadre : discrétion, ton calme, aller à l’essentiel.', 'Annoncer la décision clairement, puis la raison : la règle et le chiffre.', 'Écouter la réaction, reconnaître la déception, rester neutre sur la règle.', 'Montrer ce qui reste possible : voies de recours, autres aides, services de conseil, réexamen si la situation change.', 'Remettre une décision écrite.', 'Après : documenter, vérifier que l’information sur les limites de revenu est donnée dès le dépôt.'],
    correction: 'Un refus bien annoncé est clair, respectueux et orienté vers la suite. L’égalité de traitement interdit toute « exception » au guichet.',
    variantes: ['Elle se met à pleurer, puis hausse le ton : que fais-tu ?', 'Elle te demande d’« arrondir » le revenu : que réponds-tu ?', 'Elle revient un mois plus tard avec un revenu modifié : que fais-tu ?'],
  },
  {
    id: 'tp3-fournisseur-retard', titre: 'Un fournisseur qui livre en retard', tp: 'tp3', comps: ['d3', 'd4'], secteur: 'Service commercial', entreprise: E.nova,
    contexte: 'Tu gères les commandes auprès de Tissus Leman SA, fournisseur des revêtements de sièges.',
    situation: 'Pour la troisième fois en deux mois, la livraison arrive avec dix jours de retard, sans avertissement. Trois commandes de clients sont bloquées. Le contrat prévoit une livraison sous quinze jours ouvrables. Ta responsable te demande d’appeler le fournisseur.',
    questions: ['Comment prépares-tu et mènes-tu cet appel ?', 'Quelle suite donnes-tu ?'],
    attendu: ['Préparation : faits datés, contrat, conséquences chiffrées, objectif, limites de compétence.', 'Ton courtois et ferme ; séparer la personne du problème.', 'Demander les causes avant d’exiger.', 'Chercher des options : livraison partielle immédiate, préavis de retard, commandes anticipées.', 'Convenir d’un accord précis, le confirmer par écrit.', 'Suite : informer les trois clients, suivre les prochaines livraisons, bilan avec la responsable, alternative si répétition.'],
    correction: 'On attend une négociation raisonnée : faits, intérêts, options, critères objectifs (le contrat). La relation avec un fournisseur important se préserve tout en restant exigeante.',
    variantes: ['Le fournisseur explique qu’il manque de matière première pour deux mois : que proposes-tu ?', 'Il te répond que vous payez toujours en retard : que fais-tu ?'],
  },
  {
    id: 'tp3-conseil-franchise', titre: 'Un entretien de conseil sur la franchise', tp: 'tp3', comps: ['d2', 'd1'], secteur: 'Assurance-maladie', entreprise: E.helvia,
    contexte: 'Tu travailles au service clientèle. Les assurés peuvent modifier leur franchise pour l’année suivante.',
    situation: 'M. Rossi, 34 ans, appelle : « Mon collègue m’a dit de prendre la franchise la plus haute pour payer moins. Vous pouvez me la changer ? »',
    questions: ['Comment mènes-tu cet entretien ?', 'À quoi fais-tu attention ?'],
    attendu: ['Vérifier l’identité avant de parler du contrat.', 'Explorer le besoin par des questions ouvertes, sans demander de détails médicaux inutiles.', 'Expliquer simplement le principe : prime plus basse contre participation plus élevée en cas de frais.', 'Présenter deux options avec leur effet pour lui ; rester neutre, la décision lui appartient.', 'Vérifier la compréhension, rappeler le délai, confirmer par écrit.', 'Documenter l’entretien.'],
    correction: 'C’est un entretien de conseil : on part du besoin, on explique les avantages et les limites, on laisse décider. La protection des données de santé impose de ne demander que le nécessaire.',
    variantes: ['Il te demande : « Vous, vous prendriez laquelle ? »', 'Il veut aussi modifier le contrat de son épouse : que fais-tu ?'],
  },
  {
    id: 'tp3-rappel-injustifie', titre: 'Un rappel reçu à tort', tp: 'tp3', comps: ['d2', 'c5'], secteur: 'Service de facturation', entreprise: E.fidac,
    contexte: 'Tu réponds aux questions des clients finaux pour le compte d’une association cliente de Fidac.',
    situation: 'Mme Favre téléphone, très en colère : elle a reçu un second rappel avec 30 francs de frais pour une cotisation de 180 francs qu’elle affirme avoir payée il y a un mois. Elle menace de quitter l’association et d’en parler autour d’elle.',
    questions: ['Décris ta démarche pendant l’appel.', 'Que fais-tu ensuite ?'],
    attendu: ['Écouter, reconnaître le désagrément, s’excuser.', 'Vérifier pendant l’appel : date, montant, référence utilisée.', 'Ne pas conclure trop vite ; demander une preuve de paiement si rien n’apparaît.', 'Si le paiement est retrouvé (mauvaise référence) : attribuer, annuler rappel et frais, confirmer par écrit.', 'Ensuite : informer l’association, rechercher d’autres paiements non attribués, proposer un contrôle avant chaque envoi de rappels.'],
    correction: 'La réponse combine relation (excuses, calme) et rigueur comptable (vérifier avant d’affirmer). Elle se termine par la cause : pourquoi le paiement n’a-t-il pas été attribué ?',
    variantes: ['Aucune trace du paiement, et elle n’a pas de justificatif : que fais-tu ?', 'Elle exige des excuses écrites du président de l’association : que proposes-tu ?'],
  },
  {
    id: 'tp3-demande-renseignement', titre: 'Une demande écrite incomplète', tp: 'tp3', comps: ['d1', 'd2'], secteur: 'Service clientèle', entreprise: E.helvia,
    contexte: 'Tu traites les demandes arrivées par le formulaire de contact.',
    situation: '« Bonjour, j’ai reçu un décompte auquel je ne comprends rien, et en plus je dois payer 412 francs. Merci de m’expliquer ou de corriger. Salutations, L. Martin ». Le formulaire ne contient ni numéro d’assuré ni date de naissance ; quatre assurés portent ce nom.',
    questions: ['Comment réponds-tu ?', 'Comment organises-tu la suite ?'],
    attendu: ['Ne donner aucune information personnelle tant que l’assuré n’est pas identifié.', 'Répondre rapidement : remerciement, compréhension, demande ciblée des éléments manquants.', 'Proposer un appel ou un rendez-vous pour expliquer le décompte.', 'Une fois identifié : explication en langage simple, vérification de l’exactitude, résumé écrit.', 'Proposer un arrangement de paiement si nécessaire.', 'Remonter : champ obligatoire à ajouter au formulaire, lisibilité des décomptes.'],
    correction: 'Bonne attitude de service et protection des données vont ensemble : on répond vite, mais on vérifie l’identité avant tout détail.',
    variantes: ['Il répond agacé : « Vous avez toutes mes données, cherchez ! »', 'Après vérification, le décompte contient bien une erreur : que fais-tu ?'],
  },
  {
    id: 'tp3-negociation-rabais', titre: 'Une demande de rabais insistante', tp: 'tp3', comps: ['d3', 'd2'], secteur: 'Service commercial', entreprise: E.nova,
    contexte: 'Tu prépares une offre de 48 000 francs pour l’aménagement des bureaux d’une fiduciaire. Ta compétence de rabais est de 5 %.',
    situation: 'La cliente t’appelle : « Votre concurrent me fait 12 % de moins. Alignez-vous, ou je signe chez lui demain. »',
    questions: ['Comment mènes-tu cet entretien ?', 'Que fais-tu après ?'],
    attendu: ['Rester calme, remercier pour la franchise, ne pas céder dans l’instant.', 'Explorer : l’offre concurrente est-elle comparable (produits, garantie, montage, délais) ?', 'Chercher l’intérêt : budget, délai, service.', 'Mettre en avant les avantages propres ; proposer 5 % contre une contrepartie (acompte, date de livraison souple).', 'Annoncer que tout rabais supplémentaire doit être validé, avec un délai de réponse précis.', 'Après : dossier pour la responsable, réponse dans le délai, confirmation écrite.'],
    correction: 'On attend la distinction entre position et intérêt, le respect de la compétence et le principe de contrepartie.',
    variantes: ['Ta responsable refuse d’aller au-delà de 5 % : comment l’annonces-tu ?', 'La cliente signe finalement chez le concurrent : que fais-tu ?'],
  },

  // ───────────── TP4 ─────────────
  {
    id: 'tp4-page-faq', titre: 'Créer une page « Questions fréquentes »', tp: 'tp4', comps: ['e4', 'e2', 'c4'], secteur: 'Entreprise de distribution d’énergie', entreprise: E.lumen,
    contexte: 'Domaine spécifique « Développement de contenu ». 40 % des appels au service clientèle portent sur les mêmes dix questions.',
    situation: 'La direction décide de créer une page « Questions fréquentes » sur le site. Tu es responsable du contenu ; l’agence web s’occupe de la technique.',
    questions: ['Comment conçois-tu cette page (organisation, structure, contenus) ?', 'Quelles contraintes prends-tu en compte ?'],
    attendu: ['But et public : clients privés, langage simple.', 'Sources : statistiques d’appels, collègues, réponses validées.', 'Structure : rubriques par thème, recherche, question formulée comme le client la pose, réponse courte, lien vers le formulaire.', 'Contraintes : exactitude (tarifs, bases légales), validation par les services concernés, identité visuelle, accessibilité, mobile, aucune donnée personnelle.', 'Rôles : qui rédige, valide, publie, met à jour ; révision périodique.', 'Mesure : baisse des appels sur ces thèmes, consultations de la page.'],
    correction: 'La démarche suit : clarifier, rassembler, structurer, contrôler, publier et tenir à jour. La répartition des rôles et la mise à jour font la différence.',
    variantes: ['Un tarif change : comment t’assures-tu que la page soit corrigée à temps ?', 'L’agence propose un agent conversationnel à la place : qu’en penses-tu ?'],
  },
  {
    id: 'tp4-tableau-donnees', titre: 'Analyser le tableau des demandes', tp: 'tp4', comps: ['e3'], secteur: 'Service clientèle', entreprise: E.helvia,
    contexte: 'Ta responsable prépare la séance de direction et te remet le tableau trimestriel des demandes.',
    situation: 'Elle te demande : « Que faut-il en retenir, et que recommandes-tu ? »',
    annexe: { titre: 'Demandes reçues au 1er trimestre', contenu: [
      { t: 'table', head: ['Canal', 'Janvier', 'Février', 'Mars', 'Délai moyen de réponse (mars)'], rows: [
        ['Téléphone', '4 200', '3 900', '4 000', '4 min d’attente'],
        ['Courriel', '1 500', '1 800', '2 400', '6 jours'],
        ['Portail client', '600', '700', '800', '1 jour'],
        ['Courrier', '300', '250', '200', '9 jours'],
        ['Total', '6 600', '6 650', '7 400', ''],
      ] },
    ] },
    questions: ['Quels constats tires-tu de ces chiffres ?', 'Que recommandes-tu, et comment le présentes-tu ?'],
    attendu: ['Total en hausse de 12 % entre janvier et mars (6 600 → 7 400).', 'Courriel : + 60 % (1 500 → 2 400), avec le délai le plus préoccupant.', 'Téléphone stable ; courrier en baisse d’un tiers ; portail en hausse d’un tiers, canal le plus rapide.', 'Prudence : un trimestre seulement, aucun motif de demande, délais connus pour mars uniquement.', 'Recommandations : renforcer le traitement des courriels, analyser leurs motifs, orienter vers le portail.', 'Présentation : message d’abord, courbe par canal, recommandation.'],
    correction: 'On attend des calculs justes, la mise en évidence du point saillant (courriels) et une interprétation prudente qui distingue constat et cause.',
    variantes: ['La direction en conclut qu’il faut fermer le canal courriel : qu’en penses-tu ?', 'Quelles données supplémentaires demanderais-tu ?'],
  },
  {
    id: 'tp4-ged', titre: 'Introduire la gestion électronique des documents', tp: 'tp4', comps: ['e1', 'b5', 'c2'], secteur: 'Administration communale', entreprise: E.morat,
    contexte: 'Domaine spécifique « Infrastructure technologique ». L’office passe dans trois semaines du classement papier à une gestion électronique des documents.',
    situation: 'Tu es chargé de coordonner l’introduction dans ton équipe de six personnes, dont deux à temps partiel et une collègue proche de la retraite, très réticente.',
    questions: ['Comment prépares-tu l’équipe dans les trois semaines ?', 'À quoi fais-tu particulièrement attention ?'],
    attendu: ['Clarifier objectif, date, rôles et règles avec la responsable et l’informatique.', 'Informer : pourquoi, calendrier, ce qui change.', 'Règles communes : plan de classement, nommage, droits d’accès.', 'Formation pratique sur de vrais dossiers, en petits groupes, à des horaires compatibles avec les temps partiels ; aide-mémoire.', 'Phase de test ; personne de référence et permanence au démarrage.', 'Attention : protection des données, sort du papier, accompagnement individuel de la collègue réticente, bilan après un mois.'],
    correction: 'Les points se gagnent sur les personnes et les règles, pas sur la technique. Une réponse chronologique, semaine par semaine, est la plus convaincante.',
    variantes: ['La collègue réticente continue d’imprimer et de classer sur papier : que fais-tu ?', 'L’outil est indisponible le jour du démarrage : quelle solution de repli ?'],
  },
  {
    id: 'tp4-fiabilite', titre: 'Vérifier une information avant publication', tp: 'tp4', comps: ['e2', 'e4'], secteur: 'Ressources humaines', entreprise: E.alpra,
    contexte: 'Tu gères la rubrique « Actualités » de l’intranet.',
    situation: 'Un formateur te transmet un texte à publier : « Bonne nouvelle : dès le 1er janvier, toutes les formations continues sont remboursées à 100 % par l’État pour les plus de 40 ans ! » Sa source : une publication vue sur un réseau social, sans lien.',
    questions: ['Comment procèdes-tu avant de publier ?', 'Que réponds-tu au formateur ?'],
    attendu: ['Ne pas publier en l’état.', 'Évaluer la source : auteur inconnu, pas de date, pas de référence.', 'Rechercher auprès de sources officielles : autorités fédérales et cantonales compétentes.', 'Recouper, noter les sources et la date de consultation.', 'Si l’information est fausse ou partielle : rédiger une version exacte et nuancée, ou renoncer.', 'Répondre au formateur de façon constructive ; rappeler la règle : pas de publication sans source vérifiable.'],
    correction: 'On attend l’application explicite des critères de fiabilité et la conscience de la responsabilité de l’entreprise pour ce qu’elle publie.',
    variantes: ['Le formateur a déjà annoncé la nouvelle à ses participants : que fais-tu ?', 'Tu trouves une aide réelle, mais limitée à certains cantons : comment rédiges-tu ?'],
  },
  {
    id: 'tp4-presentation', titre: 'Une présentation pour la direction', tp: 'tp4', comps: ['e4', 'e3'], secteur: 'Service de facturation', entreprise: E.fidac,
    contexte: 'Domaine spécifique « Développement de contenu ». Tu dois présenter en dix minutes à la direction les résultats de l’enquête de satisfaction des clients.',
    situation: 'Une collègue a préparé un projet : 28 diapositives, les 40 réponses libres copiées telles quelles avec le nom des clients, des graphiques en trois dimensions sans titre, quatre polices de caractères.',
    questions: ['Quels problèmes vois-tu ?', 'Comment structures-tu la présentation finale ?'],
    attendu: ['Trop de diapositives pour dix minutes ; pas de message.', 'Noms de clients et réponses brutes : confidentialité.', 'Graphiques illisibles : pas de titre, d’unité ni de source.', 'Modèle de l’entreprise non respecté.', 'Structure : message clé, trois résultats avec un graphique chacun, commentaires regroupés par thème et anonymisés, recommandations, annexe détaillée.', 'Contrôle : chiffres vérifiés, relecture, test de l’affichage.'],
    correction: 'Une présentation répond à une question pour un public précis. On attend la réduction au message essentiel et le traitement correct des données des clients.',
    variantes: ['La direction demande qui a écrit le commentaire le plus négatif : que réponds-tu ?', 'Le vidéoprojecteur tombe en panne : que fais-tu ?'],
  },
  {
    id: 'tp4-teletravail-securite', titre: 'Sécuriser le travail à domicile', tp: 'tp4', comps: ['e1'], secteur: 'Assurance-maladie', entreprise: E.helvia,
    contexte: 'Domaine spécifique « Infrastructure technologique ». Le service clientèle passe à deux jours de télétravail par semaine.',
    situation: 'Ta responsable te demande de préparer, avec le service informatique, les règles et l’information pour l’équipe. Les collaborateurs traitent des données de santé.',
    questions: ['Quels risques identifies-tu ?', 'Quelles règles et quelles mesures d’accompagnement proposes-tu ?'],
    attendu: ['Risques : écran visible par des tiers, réseau domestique, appareils privés, documents papier, conversations entendues, perte ou vol.', 'Règles : matériel de l’entreprise uniquement, connexion sécurisée, double authentification, verrouillage, pas d’impression, pas de stockage local, appels dans une pièce fermée.', 'Procédure d’incident : signalement immédiat.', 'Accompagnement : information, formation courte, aide-mémoire, engagement signé, personne de contact.', 'Contrôle : bilan après trois mois.'],
    correction: 'Les données de santé sont des données sensibles : la réponse doit montrer un niveau d’exigence élevé, tout en restant praticable pour l’équipe.',
    variantes: ['Un collaborateur n’a pas de pièce fermée chez lui : que proposes-tu ?', 'Une collègue t’avoue avoir imprimé un dossier chez elle : que fais-tu ?'],
  },
]

export const CASES: CaseStudy[] = ROWS.map((r) => {
  const tp = TP_BY_ID[r.tp]
  return {
    id: r.id,
    titre: r.titre,
    tp: r.tp,
    comps: r.comps,
    secteur: r.secteur,
    entreprise: r.entreprise,
    contexte: r.contexte,
    situation: r.situation,
    annexes: r.annexe ? [r.annexe] : [],
    consignes: CONSIGNES[r.tp === 'tp1' || r.tp === 'tp2' ? 'mini' : 'simu'],
    questions: r.questions,
    minutes: 10,
    attendu: r.attendu,
    correction: r.correction,
    bareme: tp.criteres,
    variantes: r.variantes,
  }
})
