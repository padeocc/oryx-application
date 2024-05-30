import { DefaultMantineColor } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { Basketball, BowlFood, Scooter } from '@phosphor-icons/react/dist/ssr';

export type Theme = 'foods' | 'goods' | 'transports';

export const themesIcons: { [key: string]: Icon } = {
  transports: Scooter,
  foods: BowlFood,
  goods: Basketball
};

export const themesColors: { [key: string]: DefaultMantineColor } = {
  transports: 'indigo',
  foods: 'orange',
  goods: 'pink'
};

export const themes: Theme[] = ['foods', 'goods', 'transports'];

export const imagesMapping: { [key: string]: string } = {
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
