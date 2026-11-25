import type { EtapesMap } from '@/types'

/**
 * Étapes opérationnelles relevées dans les guides pratiques Konvink fournis (captures d'écran lues par OCR).
 * Elles structurent chaque compétence selon le plan de formation.
 */
export const ETAPES: EtapesMap = {
  a1: [{ etapes: ['Prendre conscience de mon rôle', 'Documenter mon travail et y réfléchir en continu', 'Réaliser un bilan personnel', 'Définir des objectifs et des mesures SMART', 'Faire avancer sa propre évolution professionnelle'] }],
  a2: [{ etapes: ['S’informer sur les réseaux professionnels au sein de l’entreprise', 'Effectuer une auto-évaluation', 'Construire un réseau professionnel', 'Utiliser et entretenir un réseau professionnel'] }],
  a3: [{ etapes: ['Recevoir le mandat', 'Planifier la mise en œuvre', 'Traiter et exécuter le mandat', 'Accepter les retours', 'Réfléchir au résultat'] }],
  a4: [
    { groupe: 'Agir en tant que professionnel', etapes: ['Trouver son rôle en tant que professionnel', 'Intégrer les tendances sociales dans le travail quotidien'] },
    { groupe: 'Assumer de nouvelles responsabilités en tant que personne privée', etapes: ['Gérer ses finances personnelles', 'Faire sa déclaration d’impôts', 'Choisir la bonne couverture d’assurance', 'Postuler pour un logement'] },
  ],
  a5: [
    { groupe: 'Développer des valeurs et des attitudes personnelles', etapes: ['Connaître ses propres valeurs et attitudes', 'Gérer les valeurs et les attitudes des autres'] },
    { groupe: 'Se faire une opinion politique et la représenter', etapes: ['S’informer sur des thèmes politiques', 'Adopter une position politique', 'Reconsidérer une position politique'] },
    { groupe: 'Participer à un processus politique', etapes: ['Connaître ses propres droits et devoirs', 'Se renseigner sur les formes de participation politique', 'Participer activement à la vie politique'] },
  ],
  b1: [{ etapes: ['S’intégrer dans de nouvelles équipes', 'Poursuivre les objectifs et respecter des règles', 'Collaborer activement dans l’équipe', 'Surmonter des situations difficiles dans l’équipe', 'Réfléchir sur la collaboration'] }],
  b2: [{ etapes: ['S’informer sur les groupes d’intérêt et les interfaces au sein de l’entreprise', 'Agir professionnellement au niveau des interfaces', 'Analyser les processus et les interfaces de l’entreprise', 'Proposer des mesures d’amélioration'] }],
  b3: [
    { groupe: 'Interpréter les développements économiques', etapes: ['Acquérir des informations', 'En déduire les influences sur l’entreprise'] },
    { groupe: 'Participer aux discussions', etapes: ['Se faire une propre opinion', 'Intervenir et argumenter de manière convaincante', 'Revoir la discussion'] },
  ],
  b4: [{ etapes: ['S’informer sur le projet', 'Planifier des tâches de gestion de projet', 'Établir des calendriers et des budgets pour les projets', 'Communiquer dans les projets', 'Assurer le suivi des environnements de travail numériques', 'Suivre l’avancement du projet et réagir aux changements', 'Évaluer les projets'] }],
  b5: [{ etapes: ['Aborder les processus de changement', 'Contribuer aux changements', 'Apporter des idées et des mesures d’amélioration'] }],
  c1: [
    { groupe: 'Planifier et coordonner des tâches et des ressources', etapes: ['S’informer sur des directives pertinentes', 'Planifier les tâches et les ressources', 'Prioriser les échéances et les tâches', 'Vérifier la planification et la gestion du temps', 'Se pencher sur des ressources personnelles'] },
    { groupe: 'Planifier des événements et soutenir la réalisation', etapes: ['Accepter le mandat d’organiser un événement', 'Planifier des événements', 'Soutenir la réalisation des événements', 'Assurer le suivi des événements'] },
  ],
  c2: [{ etapes: ['Recevoir des mandats d’activités de soutien', 'Établir des documents de soutien', 'Tenir un agenda', 'Rédiger un procès-verbal', 'Archiver les documents et organiser le classement', 'Donner des renseignements sur les documents', 'Réfléchir à la méthode de travail et l’améliorer'] }],
  c3: [
    { groupe: 'Documenter un processus', etapes: ['Recevoir un mandat', 'Planifier la mise en œuvre', 'S’imprégner mentalement du processus', 'Récupérer et mettre de l’ordre dans des informations détaillées', 'Représenter graphiquement le processus', 'Décrire le processus', 'Clôturer une documentation', 'Instruire les personnes'] },
    { groupe: 'Optimiser un processus', etapes: ['Analyser le processus existant', 'Identifier le potentiel d’optimisation', 'En dériver des solutions et les mettre en œuvre', 'Vérifier la réussite de l’optimisation'] },
    { groupe: 'Gérer un calendrier', etapes: ['Obtenir des informations', 'Établir le calendrier', 'Surveiller le calendrier', 'Gérer et communiquer les reports de délai', 'Réfléchir au calendrier'] },
  ],
  c4: [{ etapes: ['Recevoir un mandat et obtenir des informations', 'Effectuer l’analyse du groupe cible', 'Planifier une action de communication', 'Créer le contenu de la communication et le publier', 'Clôturer l’action de communication'] }],
  c5: [
    { groupe: 'Budget et décompte', etapes: ['Recevoir un mandat de travail', 'Lister les positions et calculer le résultat final', 'Informer le supérieur hiérarchique'] },
    { groupe: 'Factures et paiements', etapes: ['Établir une facture', 'Envoyer et transmettre une facture', 'Contrôler une facture', 'Établir un ordre de paiement ou contrôler les règlements entrants', 'Remettre les documents pour la comptabilisation'] },
    { groupe: 'Livre de caisse', etapes: ['Établir un justificatif', 'Effectuer et vérifier une entrée', 'Établir un décompte mensuel'] },
  ],
  d1: [{ etapes: ['Adopter une attitude centrée sur les prestations de service', 'Établir le contact', 'Répondre à la demande', 'En déduire les besoins', 'Traiter les demandes et garantir le flux d’information'] }],
  d2: [
    { groupe: 'Entretien d’information', etapes: ['Acquérir des informations', 'Transmettre des informations', 'Clôturer l’entretien d’information', 'Évaluer l’entretien d’information et en dériver des mesures à prendre'] },
    { groupe: 'Entretien de conseil', etapes: ['Créer les bases pour l’entretien de conseil', 'Mener l’entretien de conseil', 'Clôturer l’entretien de conseil', 'Suivi de l’entretien de conseil'] },
  ],
  d3: [
    { groupe: 'Entretien de vente', etapes: ['Créer les bases pour l’entretien de vente', 'Mener un entretien de vente', 'Conclure l’entretien de vente', 'Assurer le suivi de l’entretien de vente'] },
    { groupe: 'Entretien de négociation', etapes: ['Créer les bases pour l’entretien de négociation', 'Mener un entretien de négociation', 'Conclure l’entretien de négociation', 'Assurer le suivi de l’entretien de négociation'] },
  ],
  d4: [
    { groupe: 'Instaurer des relations', etapes: ['S’informer comment les relations peuvent être développées dans un contexte professionnel', 'Structurer des relations dans un contexte professionnel', 'Évaluer et optimiser son propre développement des relations'] },
    { groupe: 'Entretenir des relations', etapes: ['S’informer sur l’entretien des relations dans le contexte professionnel', 'Développer activement l’entretien de relations', 'En dériver des mesures et les optimiser'] },
  ],
  e1: [
    { groupe: 'Logiciels et bases de données', etapes: ['Utiliser des logiciels soi-même', 'Soutenir les autres utilisateurs dans leur utilisation', 'Résoudre des problèmes techniques'] },
    { groupe: 'Données', etapes: ['Maintenir les bases de données et le CMS à jour', 'Identifier les risques en matière de sécurité des données', 'Prendre des mesures'] },
  ],
  e2: [{ etapes: ['Consigner le mandat par écrit', 'Déterminer les sources d’information', 'Effectuer la recherche', 'Évaluer les résultats de la recherche', 'Noter et documenter les résultats', 'Préparer les résultats', 'Analyser et optimiser sa propre procédure'] }],
  e3: [{ etapes: ['Créer des bases', 'Effectuer des analyses et des évaluations', 'Interpréter les résultats', 'Préparer les résultats'] }],
  e4: [{ etapes: ['Organiser la préparation', 'Préparer et présenter des contenus', 'Élaborer des modèles pour les formats de média', 'Vérifier la qualité des articles des médias de l’entreprise'] }],
}
