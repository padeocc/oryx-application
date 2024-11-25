import { Theme } from '@/config';

export interface IResult {
  label: string;
  description: string;
  url: string;
  logo?: string;
  id: string;
  theme: Theme;
  tags: string;
  region: string;
  location: string;
}
