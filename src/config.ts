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
  transports: 'blue.7',
  foods: 'blue.7',
  goods: 'blue.7',
  events: 'blue.7',
  services: 'blue.7',
  accommodations: 'blue.7'
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
  let actions: ActionFilters = { economic: 'boolean' };
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
        cookmore: 'boolean'
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

export const REGIONS = [
  '01',
  '02',
  '2A',
  '2B',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '971',
  '972',
  '973',
  '974',
  '976'
];

export const LOCATIONS = ['online', 'store', 'store-and-online'];
