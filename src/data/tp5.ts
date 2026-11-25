import type { StarExample } from '@/types'

type Seed = Omit<StarExample, 'id' | 'updatedAt'>

/**
 * Espace TP5 — discussion de réflexion.
 * Les sept savoir-faire reprennent la liste du cahier des charges. Les « situations » proviennent de ta fiche
 * de révision du 6 juin 2026 : elles sont proposées à l'import, à relire et à compléter avec tes propres mots.
 */
export const TP5_GUIDE: {
  etapesOfficielles: { titre: string; texte: string }[]
  savoirFaire: { titre: string; explication: string; phrases: string[]; piege: string }[]
  questionsExperts: string[]
  mesSituations: Seed[]
} = {
  // Directive « Travail pratique », CIFC Suisse, 10.10.2025, point 4.1.6.
  etapesOfficielles: [
    { titre: 'Choisir des domaines et justifier son choix', texte: 'Tu reviens sur les compétences opérationnelles traitées et tu en choisis deux qui te conviennent le plus ou qui t’intéressent particulièrement. Tu expliques ce qui te passionne dans celles-ci et pourquoi tu t’y estimes fort.' },
    { titre: 'Décrire une situation concrète', texte: 'Pour chaque compétence choisie, tu décris une situation concrète de ton travail quotidien dans laquelle tu as relevé un défi avec assurance et compétence.' },
    { titre: 'Analyser la situation', texte: 'Quels défis se sont présentés ? Qu’est-ce qui a contribué à ce que la situation soit gérée avec succès ? Que faudrait-il éventuellement faire différemment la prochaine fois ?' },
    { titre: 'Scénario alternatif', texte: 'Tu expliques comment tu aurais agi si la situation avait évolué différemment ou si elle s’était déroulée dans d’autres conditions.' },
  ],
  savoirFaire: [
    {
      titre: 'Expliquer mes décisions',
      explication: 'Dire ce que tu as décidé, entre quelles options, et selon quels critères.',
      phrases: ['« J’avais deux possibilités : … ou … »', '« J’ai choisi … parce que … »', '« Mon critère principal était … »'],
      piege: 'Présenter la décision comme évidente : les expert-e-s veulent entendre le raisonnement.',
    },
    {
      titre: 'Justifier mes méthodes',
      explication: 'Montrer que ta manière de faire repose sur une méthode, une règle ou une expérience.',
      phrases: ['« J’ai procédé par étapes : d’abord …, ensuite … »', '« Je me suis appuyé sur la directive / la check-list / la base légale. »', '« Cette méthode permet de … »'],
      piege: 'Citer le nom d’une méthode sans montrer comment tu l’as appliquée.',
    },
    {
      titre: 'Identifier mes points forts',
      explication: 'Nommer une force et la prouver par un fait.',
      phrases: ['« Ce qui a bien fonctionné, c’est … »', '« On me confie souvent … parce que … »', '« Le résultat le montre : … »'],
      piege: 'La fausse modestie comme la vantardise : reste sur les faits.',
    },
    {
      titre: 'Reconnaître mes erreurs',
      explication: 'Dire ce qui n’a pas fonctionné sans te dévaloriser ni chercher d’excuse.',
      phrases: ['« Avec le recul, j’aurais dû … »', '« J’ai sous-estimé … »', '« J’ai corrigé en … »'],
      piege: 'Rejeter la faute sur les autres, ou affirmer n’avoir commis aucune erreur.',
    },
    {
      titre: 'Proposer des améliorations',
      explication: 'Transformer un constat en mesure concrète pour la prochaine fois.',
      phrases: ['« La prochaine fois, je … »', '« J’ai mis en place … pour éviter que cela se reproduise. »', '« Je proposerais à l’équipe de … »'],
      piege: 'Des intentions vagues (« faire plus attention ») au lieu d’une mesure précise.',
    },
    {
      titre: 'Analyser les conséquences de mes actions',
      explication: 'Montrer l’effet de ce que tu as fait sur le client, l’équipe et l’entreprise.',
      phrases: ['« Pour le client, cela a signifié … »', '« Pour mes collègues, la conséquence a été … »', '« Si je n’avais rien fait, … »'],
      piege: 'S’arrêter à « le client était content » : cherche aussi les effets internes.',
    },
    {
      titre: 'Transférer vers une nouvelle situation',
      explication: 'Appliquer ce que tu as appris à un contexte différent proposé par les expert-e-s.',
      phrases: ['« Le principe reste le même : … »', '« Ce qui change dans cette situation, c’est … »', '« J’adapterais donc … »'],
      piege: 'Répéter ton histoire au lieu de répondre à la nouvelle situation.',
    },
  ],
  questionsExperts: [
    'Quelles sont les deux compétences opérationnelles que vous avez choisies, et pourquoi ?',
    'Qu’est-ce qui vous passionne dans ce domaine ? Pourquoi vous y estimez-vous fort ?',
    'Décrivez une situation concrète de votre quotidien où vous avez relevé un défi dans ce domaine.',
    'Quels défis se sont présentés ?',
    'Qu’est-ce qui a contribué à ce que la situation soit gérée avec succès ?',
    'Que feriez-vous différemment la prochaine fois ?',
    'Comment auriez-vous agi si la situation avait évolué autrement ?',
    'Et dans d’autres conditions — autre client, autre délai, autre équipe ?',
  ],
  mesSituations: [
    {
      titre: 'Annoncer un refus et traiter une réclamation au guichet',
      comps: ['d1', 'd2', 'a4'],
      situation: 'Au guichet, une demandeuse conteste un refus (limite de revenu dépassée) et s’énerve.',
      tache: '',
      action: 'J’écoute, je reformule, j’explique calmement la condition et la base légale, j’oriente vers les services compétents et je remets une trace écrite.',
      resultat: 'Réponse claire et orientation ; je garde une posture professionnelle.',
      amelioration: 'Annoncer les conditions dès l’accueil.',
      variante: 'En cas d’agressivité : désescalade, appui d’un collègue ou d’un supérieur.',
    },
    {
      titre: 'Analyser un dossier complexe ou incomplet',
      comps: ['b2', 'c2', 'c3', 'c5', 'e2'],
      situation: 'Préinscription atypique ou dossier incomplet à évaluer.',
      tache: '',
      action: 'Contrôle de l’identité et des pièces, évaluation des conditions, calculs nécessaires, demande des compléments, saisie dans les applications métier et suivi dans le tableau de bord.',
      resultat: 'Décision fondée : attestation ou refus motivé.',
      amelioration: 'Utiliser une check-list pour gagner du temps.',
      variante: 'Pièce contradictoire ou nom différent : se référer au registre officiel et exiger un justificatif.',
    },
    {
      titre: 'Coordonner un dossier urgent avec une gérance',
      comps: ['b2', 'd4', 'c3'],
      situation: 'Une gérance demande une autorisation pour un futur locataire ; le dossier est urgent et incomplet.',
      tache: '',
      action: 'Traitement via la boîte dédiée aux partenaires, contrôle de l’éligibilité, mise à jour des applications métier, établissement de la décision, réponse par le bon canal dans le délai.',
      resultat: 'La gérance peut établir le bail à temps.',
      amelioration: 'Communiquer de manière proactive sur les pièces requises.',
      variante: 'Désaccord sur l’éligibilité : s’appuyer sur la base légale et faire remonter si nécessaire.',
    },
  ],
}
