import type { CompId, Level, OralQuestion, TpId } from '@/types'
import { COMP_BY_ID } from './referentiel'
import { Q_AB } from './questions-ab'
import { Q_CDE } from './questions-cde'

/** [compétence, niveau, thème, question, éléments attendus, proposition de réponse, mots-clés, relances, TP imposé ?] */
export type QRow = [CompId, Level, string, string, string[], string, string[], string[], TpId?]

// Questions propres à la discussion de réflexion (TP5). Chacune reste rattachée à une compétence illustrée.
const Q_TP5: QRow[] = [
  ['a1', 2, 'Points forts', 'Parmi les compétences opérationnelles traitées, choisissez-en deux qui vous conviennent le plus et justifiez votre choix.',
    ['Deux compétences nommées', 'Ce qui vous passionne et pourquoi vous vous y estimez fort', 'Une situation concrète annoncée pour chacune'],
    'Je citerais la gestion des relations avec les clients et la coordination des interfaces. Pour la première, par exemple… J’ai agi ainsi… avec ce résultat… (structure STAR).',
    ['compétences', 'situation vécue', 'action', 'résultat', 'preuve'], ['Qu’est-ce qui vous permet de l’affirmer ?', 'Comment un collègue décrirait-il ces points forts ?'], 'tp5'],
  ['a1', 2, 'Point à améliorer', 'Dans quel domaine devez-vous encore progresser, et que faites-vous pour cela ?',
    ['Un point réel et précis', 'Une mesure en cours', 'Un indicateur de progrès'],
    'Je dois progresser dans… Je m’en suis aperçu lorsque… Depuis, j’ai mis en place… et je vérifie mes progrès par…',
    ['point à améliorer', 'prise de conscience', 'mesure', 'progrès'], ['Pourquoi ce point en particulier ?', 'Quel résultat visez-vous dans six mois ?'], 'tp5'],
  ['d2', 3, 'Situation difficile avec un client', 'Décrivez une situation difficile que vous avez vécue avec un client et la manière dont vous l’avez gérée.',
    ['Situation et enjeu', 'Actions personnelles justifiées', 'Résultat et enseignement'],
    'La situation : une personne contestait une décision et s’énervait. Mon rôle : expliquer et préserver la relation. J’ai écouté, reformulé, expliqué la base de la décision et orienté vers une solution. Résultat : … Aujourd’hui, j’annoncerais plus tôt…',
    ['situation', 'écoute', 'explication', 'résultat', 'enseignement'], ['Que feriez-vous différemment ?', 'Et si la personne était devenue agressive ?'], 'tp5'],
  ['a3', 3, 'Décision', 'Racontez une décision professionnelle que vous avez dû prendre seul. Sur quoi vous êtes-vous appuyé ?',
    ['Contexte et options', 'Critères de décision', 'Conséquences et bilan'],
    'J’avais deux options… J’ai choisi… en m’appuyant sur la directive, l’intérêt du client et le délai. Les conséquences ont été… Avec le recul…',
    ['options', 'critères', 'directive', 'conséquences', 'bilan'], ['Quelle était l’autre option, et pourquoi l’avoir écartée ?', 'Qui avez-vous informé ?'], 'tp5'],
  ['a4', 3, 'Erreur', 'Parlez-nous d’une erreur que vous avez commise et de ce que vous en avez tiré.',
    ['Erreur réelle, décrite sans excuse', 'Réaction immédiate', 'Mesure préventive durable'],
    'J’ai un jour… Dès que je m’en suis aperçu, j’ai signalé l’erreur, corrigé et informé la personne concernée. Depuis, j’applique un contrôle supplémentaire : …',
    ['erreur', 'signaler', 'corriger', 'cause', 'prévention'], ['Quelle était la cause profonde ?', 'Comment votre responsable a-t-il réagi ?'], 'tp5'],
  ['b2', 3, 'Coordination', 'Décrivez une situation où vous avez dû coordonner votre travail avec un autre service ou un partenaire externe.',
    ['Acteurs et interface', 'Démarche de coordination', 'Résultat et amélioration'],
    'Je devais obtenir… d’un partenaire dans un délai court. J’ai transmis une demande complète, convenu d’un délai, relancé à l’échéance et tenu le client informé. Résultat… Je proposerais désormais une liste commune des pièces requises.',
    ['interface', 'demande complète', 'délai', 'relance', 'amélioration'], ['Qu’est-ce qui a failli échouer ?', 'Comment le rendre durable ?'], 'tp5'],
  ['c3', 3, 'Amélioration', 'Avez-vous déjà proposé ou mis en œuvre une amélioration dans votre travail ? Décrivez la démarche.',
    ['Constat de départ', 'Proposition et mise en œuvre', 'Effet mesuré'],
    'J’avais constaté que… J’ai proposé… Nous l’avons testé pendant… Le résultat : … Si aucun exemple formel : une check-list ou un modèle créé pour gagner du temps.',
    ['constat', 'proposition', 'test', 'effet', 'mesure'], ['Comment l’avez-vous fait accepter ?', 'Qu’auriez-vous pu mesurer de plus ?'], 'tp5'],
  ['c1', 2, 'Charge de travail', 'Comment avez-vous géré une période de forte charge de travail ?',
    ['Situation concrète', 'Priorisation et communication', 'Résultat et enseignement'],
    'Pendant…, le volume a doublé. J’ai listé, priorisé selon les délais, informé ma responsable de ce qui ne pouvait pas être tenu et proposé des reports. Résultat… J’en retiens…',
    ['priorités', 'informer', 'reports', 'résultat'], ['Qu’avez-vous dû laisser de côté ?', 'Comment avez-vous tenu sur la durée ?'], 'tp5'],
  ['e1', 2, 'Outil numérique', 'Donnez un exemple d’outil numérique que vous maîtrisez et de la manière dont il améliore votre travail.',
    ['Outil et usage précis', 'Bénéfice concret', 'Limite ou précaution'],
    'J’utilise quotidiennement un CRM pour… Il me permet de… Je veille à… (qualité de saisie, protection des données).',
    ['outil', 'usage', 'bénéfice', 'qualité des données', 'protection des données'], ['Comment avez-vous appris à l’utiliser ?', 'Que faites-vous lorsqu’il est en panne ?'], 'tp5'],
  ['b1', 2, 'Équipe', 'Décrivez votre rôle dans une équipe et un moment où la collaboration a été mise à l’épreuve.',
    ['Rôle personnel', 'Difficulté et réaction', 'Enseignement'],
    'Dans mon équipe, j’étais chargé de… Lors de…, la répartition des tâches a créé des tensions. J’en ai parlé directement à…, nous avons convenu de… J’en retiens qu’il faut aborder les problèmes tôt.',
    ['rôle', 'difficulté', 'dialogue', 'accord', 'enseignement'], ['Quelle part de responsabilité aviez-vous ?', 'Que feriez-vous plus tôt ?'], 'tp5'],
  ['b5', 3, 'Transfert', 'Vous avez décrit votre manière de gérer une réclamation au guichet. Comment appliqueriez-vous cette expérience dans une entreprise privée de services ?',
    ['Principes transférables', 'Adaptation au nouveau contexte', 'Limites'],
    'Les principes restent les mêmes : écouter, reformuler, expliquer, proposer une suite. Ce qui change : la marge commerciale — geste commercial possible —, l’enjeu de fidélisation et les canaux. J’adapterais donc…',
    ['principes', 'adaptation', 'contexte', 'fidélisation', 'limites'], ['Qu’est-ce qui ne serait pas transférable ?', 'Quelle compétence devriez-vous développer ?'], 'tp5'],
  ['a5', 3, 'Égalité de traitement', 'Racontez une situation où vous avez dû appliquer une règle qui déplaisait à votre interlocuteur.',
    ['Situation et règle', 'Manière de l’expliquer', 'Issue et réflexion'],
    'Je devais annoncer un refus fondé sur une limite réglementaire. J’ai expliqué la règle simplement, sans la commenter, indiqué les voies possibles et remis une trace écrite. La personne est repartie informée. Je veille désormais à annoncer les conditions dès le premier contact.',
    ['règle', 'expliquer', 'neutralité', 'voies possibles', 'trace écrite'], ['Et si vous aviez trouvé la règle injuste ?', 'Comment gardez-vous votre calme ?'], 'tp5'],
]

const counters: Record<string, number> = {}

const toQuestion = ([comp, niveau, theme, q, attendus, reponse, motsCles, relances, tp]: QRow): OralQuestion => {
  const key = (tp ?? '') + comp
  counters[key] = (counters[key] ?? 0) + 1
  return {
    id: `q-${tp ? 'tp5-' : ''}${comp}-${counters[key]}`,
    comp,
    tp: tp ?? COMP_BY_ID[comp].tp,
    niveau,
    theme,
    q,
    attendus,
    reponse,
    motsCles,
    relances,
  }
}

export const QUESTIONS: OralQuestion[] = [...Q_AB, ...Q_CDE, ...Q_TP5].map(toQuestion)
