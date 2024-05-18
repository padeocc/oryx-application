import { Basketball, BowlFood, Scooter } from '@phosphor-icons/react/dist/ssr';

export type Theme = 'foods' | 'goods' | 'transports';

export const themesIcons = {
  transports: Scooter,
  foods: BowlFood,
  goods: Basketball
};

export const themes: Theme[] = ['foods', 'goods', 'transports'];
