import { ProductStructureItem } from './types';

/**
 * Product structure data mapping
 */
export const productStructureData: ProductStructureItem[] = [
  {
    productstructure: '',
    title: 'Transport',
    slug: 'transport',
    meta_title: 'Transport & Mobilité Durable : Solutions Solidaires avec OryxChange',
    meta_description: 'Trouvez les meilleures options de transport écoresponsable. Covoiturage, auto-partage et mobilité douce pour vos trajets quotidiens ou exceptionnels.',
    keywords: '',
    parents: [],
    theme: 'transports'
  },
  {
    productstructure: 'Voyager - Se déplacer',
    slug: 'voyager-se-deplacer',
    title: 'Voyager se déplacer',
    meta_title: 'Voyager et se Déplacer Autrement | Guide de la Mobilité Engagée',
    meta_description: 'Planifiez vos déplacements avec des outils de voyage responsable. Circulez facilement tout en respectant l\'environnement',
    keywords: '',
    parents: ['transport'],
    theme: 'transports'
  },
  {
    productstructure: 'Utiliser le Train -bus',
    slug: 'utiliser-le-train-bus',
    title: 'Utiliser le train ou le bus',
    meta_title: 'Voyager en Train et Bus : Offres, Pass Rail et Solutions de Transport',
    meta_description: 'Optimisez vos trajets en train ou bus. Accédez aux meilleures offres de transport public et solutions de voyage longue distance pour un trajet bas carbone.',
    keywords: '',
    parents: ['transport', 'voyager-se-deplacer'],
    theme: 'transports'
  },
];
