import { Basketball, BowlFood, Scooter } from '@phosphor-icons/react/dist/ssr';

export type Theme = 'eatings' | 'goods' | 'transports';

export const themesIcons = {
  transports: Scooter,
  eatings: BowlFood,
  goods: Basketball
};

export const themes: Theme[] = ['eatings', 'goods', 'transports'];
