import { TAGSPLITTER } from '@/config';
import { FetchService, Service } from '@/types';
import { IResult } from './types';
import { algoliasearch } from 'algoliasearch';

const scoreIndexes: Record<string, number> = {
  'remplacer les protéines animales': 8,
  'remplacer les produits laitiers': 7,
  'réduire ses déchets': 9,
  'privilégier le circuit court': 6,
  'consommer de saison': 7,
  'réduire ses déchets organiques': 9,
  'diversifier sa consommation de protéines (insectes, simili, algues)': 8,
  'consommer bio': 6,
  'construire décarboné': 9,
  "produire de l'énergie renouvelable": 9,
  'rénover son logement': 8,
  'installer des panneaux voltaïques / chauffe-eau solaire': 8,
  'acheter une pompe à chaleur': 7,
  'économiser la chaleur': 7,
  "économiser l'électricité": 7,
  'se chauffer au bois ou granulés': 7,
  'eco-concevoir (biens)': 9,
  'réduire les déchets (biens)': 9,
  réparer: 8,
  relocaliser: 8,
  réutiliser: 8,
  "acheter vendre d'occasion ou reconditonné": 7,
  'acheter eco-construits/biosourcé': 8,
  mutualiser: 8,
  louer: 7,
  'faire soi-même (diy)': 7,
  marcher: 10,
  télétravailler: 9,
  'se déplacer à vélo': 9,
  'utiliser le train-bus': 9,
  'utiliser les transports publics': 8,
  'espace de co-working': 8,
  'co-voiturer': 8,
  autopartager: 8,
  'se déplacer en voiture hydrogène': 7,
  'se déplacer en voiture électrique': 7,
  'se déplacer en voiture hybride': 6,
  'se déplacer en voiture gpl': 5,
  'utiliser le bateau - cargo - voile ferry': 6,
  'se déplacer en moto': 4,
  'se déplacer en voiture essence': 3,
  'se déplacer en voiture diesel': 2,
  'se déplacer en bateau de croisière': 1,
  'se déplacer en avion': 1,
  'voiture sans permis essence': 4
};

export const calculateMeanScore = (keywords: string[]): number => {
  const validScores = (keywords || [])?.map(keyword => scoreIndexes[keyword]).filter(value => value !== undefined);
  return validScores.length > 0 ? validScores.reduce((sum, val) => sum + val, 0) / validScores.length : 0;
};

const ESS_TYPES = ['association', 'school', 'public_service', 'cooservice perative', 'scop', 'scic', 'sasesus'];

export const isEssService = (productstructure: string[] = [], type: string[] = []): boolean => {
  const allTypes = [...productstructure, ...type].map(t => t?.toLowerCase()?.trim()).filter(Boolean);
  return ESS_TYPES.some(essType => allTypes.includes(essType.toLowerCase()));
};

export const getEssValue = (service: { ess?: boolean; productstructure?: string[]; type?: string[] }): boolean => {
  if (service?.ess !== undefined) {
    return !!service.ess;
  }
  return !!isEssService(service?.productstructure || [], service?.type || []);
};

export const transformServicesFromResults = ({ results }: { results: IResult[] }): Service[] => {
  return results.map(result => {
    const productstructure = result?.productstructure?.split?.(TAGSPLITTER) || [];
    const typeArray = Array.isArray(result?.type) ? result.type : (result?.type ? [result.type] : []);
    const isEss = result?.ess !== undefined ? result.ess : isEssService(productstructure, typeArray);
    
    const service: Service = {
      code: result.id,
      description: result.description,
      name: result.label,
      logo: result.logo,
      productstructure,
      tags: result?.tags?.split?.(TAGSPLITTER),
      url: result.url,
      region: result.region,
      location: result.location,
      theme: result.theme,
      organic: result?.organic,
      economic: result?.economic,
      ess: isEss,
      local: result?.local,
      season: result?.season,
      shortcircuit: result?.shortcircuit,
      wastereducer: result?.wastereducer,
      foodwastereducer: result?.foodwastereducer,
      cookmore: result?.cookmore,
      used: result?.used,
      rent: result?.rent,
      mutualise: result?.mutualise,
      repair: result?.repair,
      ecobuilt: result?.ecobuilt,
      lowtech: result?.lowtech,
      recycled: result?.recycled,
      reused: result?.reused,
      diy: result?.diy,
      comparer: result?.comparer,
      relocating: result?.relocating,
      // Rest is empty for now
      createdAt: new Date(),
      updatedAt: result?.updatedAt ? new Date(result.updatedAt) : new Date(),
      publishedAt: new Date(),
      type: typeArray,
      country: '',
      premium: result?.premium,
      score: result?.score || 0
    };
    return service;
  });
};

export const fetchService: FetchService = async ({ code }) => {
  const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');

  const solution = await client.getObject({
    indexName: process?.env?.ALGOLIA_INDEXNAME || '',
    objectID: code
  });

  return transformServicesFromResults({ results: [solution as unknown as IResult] })[0];
}
