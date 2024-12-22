import { Theme } from '@/config';

export interface IResult {
  organic: any;
  label: string;
  description: string;
  url: string;
  logo?: string;
  id: string;
  theme: Theme[];
  tags: string;
  region: string;
  location: string;
  economic: boolean;
  local?: boolean;
  season?: boolean;
  shortcircuit?: boolean;
  wastereducer?: boolean;
  foodwastereducer?: boolean;
  cookmore?: boolean;
  used?: boolean;
  rent?: boolean;
  mutualise?: boolean;
  repair?: boolean;
  ecobuilt?: boolean;
  lowtech?: boolean;
  recycled?: boolean;
  reused?: boolean;
  diy?: boolean;
  comparer?: boolean;
  relocating?: boolean;
  premium?: boolean;
  content?: any;
}
