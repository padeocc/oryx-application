import { BowlFood, House, Scooter } from '@phosphor-icons/react/dist/ssr';

export type Theme =
  | 'eatings'
  | 'housings'
  // | 'goods'
  // | 'services'
  | 'transports';
// | 'events'
// | 'finances'
// | 'lifestyles'
// | 'pollutions'
// | 'biodiversities';

export const themesIcons = {
  transports: Scooter,
  eatings: BowlFood,
  housings: House
  // goods: Basketball,
  // services: CallBell,
  // events: CalendarDots,
  // finances: CreditCard,
  // lifestyles: Pants,
  // pollutions: Recycle,
  // biodiversities: Butterfly
};

export const themes: Theme[] = ['eatings', 'housings', 'transports'];
