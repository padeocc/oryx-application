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
