import { DefaultMantineColor } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { BowlFood, BuildingApartment, CalendarCheck, CallBell, Scooter, TShirt } from '@phosphor-icons/react/dist/ssr';
import { ActionFilters } from './types';

export const PAGINATION_LIMIT = 48;
export type Theme = 'foods' | 'goods' | 'transports' | 'events' | 'services' | 'accommodations';
export const TAGSPLITTER = '|||';

export const themesIcons: { [key: string]: Icon } = {
  foods: BowlFood,
  accommodations: BuildingApartment,
  goods: TShirt,
  services: CallBell,
  transports: Scooter,
  events: CalendarCheck
};

export const themesColors: { [key: string]: DefaultMantineColor } = {
  transports: 'blue.9',
  foods: 'blue.7',
  goods: 'blue.8',
  events: 'green.7',
  services: 'green.8',
  accommodations: 'green.9'
};

export const themes: Theme[] = ['foods', 'goods', 'transports', 'events', 'services', 'accommodations'];

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

export const getActionFilters = ({ themes = [] }: { themes?: Theme[] }): ActionFilters => {
  let actions = {};
  if (!themes || themes.includes('foods')) {
    actions = {
      ...actions,
      ...{
        organic: 'boolean',
        local: 'boolean',
        season: 'boolean',
        shortcircuit: 'boolean',
        wastereducer: 'boolean',
        foodwastereducer: 'boolean',
        cookmore: 'boolean',
        economic: 'boolean'
      }
    };
  }
  if (!themes || themes.includes('goods')) {
    actions = {
      ...actions,
      ...{
        used: 'boolean',
        rent: 'boolean',
        mutualise: 'boolean',
        repair: 'boolean',
        ecobuilt: 'boolean',
        local: 'boolean',
        organic: 'boolean',
        economic: 'boolean',
        lowtech: 'boolean',
        recycled: 'boolean',
        reused: 'boolean',
        diy: 'boolean',
        wastereducer: 'boolean',
        comparer: 'boolean',
        relocating: 'boolean'
      }
    };
  }
  return actions;
};
