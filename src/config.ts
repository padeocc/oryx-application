import { DefaultMantineColor } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { BowlFood, CalendarCheck, CallBell, Scooter, TShirt } from '@phosphor-icons/react/dist/ssr';
import { ActionFilters } from './types';

export type Theme = 'foods' | 'goods' | 'transports' | 'events' | 'services';

export const themesIcons: { [key: string]: Icon } = {
  transports: Scooter,
  foods: BowlFood,
  goods: TShirt,
  events: CalendarCheck,
  services: CallBell
};

export const themesColors: { [key: string]: DefaultMantineColor } = {
  transports: 'indigo',
  foods: 'orange',
  goods: 'pink',
  events: 'blue',
  services: 'grape'
};

export const themes: Theme[] = ['foods', 'goods', 'transports', 'events', 'services'];

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

export const getActionFilters = (theme: Theme): ActionFilters => {
  switch (theme) {
    case 'transports':
      return {};

    case 'events':
      return {};

      break;
    case 'services':
      return {};

      break;
    case 'foods':
      return {
        organic: 'boolean',
        local: 'boolean',
        season: 'boolean',
        shortcircuit: 'boolean',
        wastereducer: 'boolean',
        foodwastereducer: 'boolean',
        cookmore: 'boolean'
      };

      break;
    case 'goods':
      return {
        used: 'boolean',
        rent: 'boolean',
        mutualise: 'boolean',
        repair: 'boolean',
        ecobuilt: 'boolean',
        local: 'boolean',
        organic: 'boolean',
        lowtech: 'boolean',
        recycled: 'boolean',
        reused: 'boolean',
        diy: 'boolean',
        wastereducer: 'boolean',
        comparer: 'boolean',
        relocating: 'boolean'
      };

    default:
      break;
  }
  return {};
};
