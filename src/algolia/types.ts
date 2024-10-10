import { Theme } from '@/config';

export interface IResults {
  label: string;
  description: string;
  url: string;
  logo?: string;
  id: string;
  theme: Theme;
  objectID?: string;
}
