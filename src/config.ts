import {
  Basketball,
  BowlFood,
  Butterfly,
  CalendarDots,
  CallBell,
  CreditCard,
  House,
  Pants,
  Recycle,
  Scooter
} from '@phosphor-icons/react/dist/ssr';

export type Theme =
  | 'eating'
  | 'housing'
  | 'goods'
  | 'services'
  | 'transport'
  | 'eventformationinfluence'
  | 'finance'
  | 'lifestyle'
  | 'pollution'
  | 'biodiversity';

export const themesIcons = {
  transport: Scooter,
  eating: BowlFood,
  housing: House,
  goods: Basketball,
  services: CallBell,
  eventformationinfluence: CalendarDots,
  finance: CreditCard,
  lifestyle: Pants,
  pollution: Recycle,
  biodiversity: Butterfly
};
