import { DefaultMantineColor } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { BowlFood, CalendarCheck, Scooter, TShirt } from '@phosphor-icons/react/dist/ssr';

export type Theme = 'foods' | 'goods' | 'transports' | 'events';

export const themesIcons: { [key: string]: Icon } = {
  transports: Scooter,
  foods: BowlFood,
  goods: TShirt,
  events: CalendarCheck
};

export const themesColors: { [key: string]: DefaultMantineColor } = {
  transports: 'indigo',
  foods: 'orange',
  goods: 'pink',
  events: 'blue'
};

export const themes: Theme[] = ['foods', 'goods', 'transports', 'events'];

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
