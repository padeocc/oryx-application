import { Theme } from '@/config';
import { Service } from '../pages/ActionsPage/utils';

const imagesMapping = {
  'mode, bijoux, lunettes': 'fashion',
  mode: 'fashion',
  'maison, arts de la table, jardin': 'gardening',
  'loisirs, sport et culture': 'sports',
  'loisirs, sport et culture, jeux jouets': 'sports',
  informatique: 'repaircomputer',
  'réduire la consommation d’origine animale': 'lesswaste',
  covoiturer: 'carsharing',
  'acheter une voiture bas carbone': 'cars',
  'acheter une voiture': 'cars',
  vélos: 'bikes'
};

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping).find(t => {
    return service.tags.map(t => t.toLowerCase()).includes(t);
  });
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;

  const defaultImage = tag ? `/images/default-${tag}-tag-image.png` : `/images/default-${theme}-image.png`;
  const logoUrl = service?.logo?.data?.attributes?.url
    ? `${process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT || ''}${service.logo.data.attributes.url}`
    : defaultImage;
  return logoUrl;
};
