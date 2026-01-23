import { Theme } from '@/config';

export interface IResult {
  label: string;
  description: string;
  url: string;
  id: string;
  theme: Theme[];
  productstructure: string;
  type?: string[] | string;
  region: string;
  location: string;
  economic: boolean;
  ess: boolean;
  premium?: boolean;
  content?: any;
  updatedAt?: string;
}

