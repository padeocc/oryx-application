import { FacetHits } from 'algoliasearch';
import { Theme } from './config';

export type Category = string;
export type Region = string;
export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service>;

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageFormats = {
  thumbnail: ImageFormat;
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export type Service = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  description: string;
  url: string;
  tags: string[];
  type: string[];
  code: string;
  region: Region;
  location: string;
  country: string;
  theme: Theme;
  logo?: { data: ImageData } | string;
  organic?: boolean;
  economic?: boolean;
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
};

export type ActionFilters = {
  [key in
    | 'organic'
    | 'local'
    | 'season'
    | 'shortcircuit'
    | 'wastereducer'
    | 'foodwastereducer'
    | 'cookmore'
    | 'used'
    | 'rent'
    | 'mutualise'
    | 'repair'
    | 'ecobuilt'
    | 'local'
    | 'organic'
    | 'economic'
    | 'lowtech'
    | 'recycled'
    | 'reused'
    | 'diy'
    | 'wastereducer'
    | 'comparer'
    | 'relocating']?: 'string' | 'number' | 'boolean';
};

export type Filters = {
  query?: string;
  sortBy?: string;
  limit?: number;
  start?: number;
  theme?: Theme | '';
  tags?: string[] | undefined;
  codes?: (string | undefined)[];
  region?: Region;
  location?: string;
  organic?: boolean;
  economic?: boolean;
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
};

export type DistinctFilters = {
  [key in 'theme' | 'region' | 'location']: FacetHits[];
};

export type APIFilters = {
  sortBy?: string;
  pagination: { start?: number; limit?: number };
  filters: any;
  populate?: string | string[];
};

export type FetchServicesResponse = {
  services: Service[];
  meta: { pagination: { start: number; limit: number; total: number } };
};

export type RequestParameters = {
  pagination: {
    start: number;
    limit: number;
  };
  sortBy: string;
  populate: string;
  filters: Filters;
  theme: Theme;
};
