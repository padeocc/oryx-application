import { Theme } from '@/config';
import { merge, uniq } from 'lodash';
import qs from 'qs';

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
  logo?: { data: ImageData };
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
    | 'lowtech'
    | 'recycled'
    | 'reused'
    | 'diy'
    | 'wastereducer'
    | 'comparer'
    | 'relocating']?: 'string' | 'number' | 'boolean';
};

export type Filters = {
  sortBy?: string;
  limit?: number;
  start?: number;
  theme: Theme;
  tags?: string[] | undefined;
  codes?: (string | undefined)[];
  region?: Region;
  location?: string;
  organic?: boolean;
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

type APIFilters = {
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

export const generateAPIUrl = ({ filters }: { filters: Filters }): string => {
  const { sortBy, limit = -1, start = 0, theme, region, location, tags = [], ...actions } = filters;

  const tagsFilters = tags.length ? { $or: tags.map(tag => ({ tags: { $containsi: tag } })) } : {};
  // Does not work https://github.com/Zaydme/strapi-plugin-multi-select/issues/27

  const actionFilters = Object.keys(actions).length
    ? { $or: Object.keys(actions).map(action => ({ [action]: { $eq: true } })) }
    : {};

  return qs.stringify({
    sortBy,
    pagination: {
      start,
      limit
    },
    filters: { region, location, ...merge(tagsFilters, actionFilters) }
  });
};

export const generateUrl = ({ filters: initialFilters }: { filters: Filters }) => {
  const theme = initialFilters.theme as Theme;
  if (!theme) {
    throw 'Theme is missing';
  }
  const actionFields: ActionFilters = getActionFilters(theme);
  const { limit = -1, sortBy = 'name:asc', region, location, tags } = initialFilters;
  const regionFilters = region ? { region } : {};
  const locationFilters = location ? { location } : {};
  const tagsFilters = tags ? { tags } : {};

  const actionFilters = Object.keys(actionFields).reduce((all, filterKey) => {
    // @ts-ignore
    const value = initialFilters?.[filterKey];
    if (value) {
      return { ...all, [filterKey]: value };
    }
    return all;
  }, {});

  const filters = { ...tagsFilters, ...actionFilters, ...regionFilters, ...locationFilters } as Filters;

  const params: RequestParameters = {
    filters,
    pagination: { start: 0, limit },
    sortBy,
    populate: 'logo',
    theme
  };
  return qs.stringify(params);
};

export const fetchServices = async ({ filters }: { filters: Filters }): Promise<FetchServicesResponse> => {
  const baseUrl = process?.env?.STRAPI_API_ENDPOINT || '';
  const theme = filters?.theme;

  if (!theme || !filters) {
    return { meta: { pagination: { limit: -1, start: 0, total: 0 } }, services: [] };
  }

  const fetchUrl = `${baseUrl}/${filters?.theme}?${generateAPIUrl({
    filters
  })}`;

  console.log(fetchUrl);

  const response = await fetch(fetchUrl, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` },
    next: { revalidate: 3600 }
  });
  const solutions = await response.json();
  const services: Service[] = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];

  return { services, meta: solutions.meta };
};

export const getTagsFromServices = (services: Service[]) =>
  uniq(services.flatMap(service => service?.tags || [])).sort((a, b) => (a > b ? 1 : -1));

export const getRegionsfromServices = (services: Service[]) =>
  uniq(services.flatMap(service => (service?.region && [service.region]) || [])).sort((a, b) => (a > b ? 1 : -1));

export const fetchService = async ({ code, theme }: { code: string; theme: Theme }) => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const filtersString = `${qs.stringify({ populate: 'logo', filters: { code: { $eq: code } } })}`;
  const response = await fetch(`${url}/${theme}?${filtersString}`, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` },
    next: { revalidate: 3600 }
  });
  const solution = await response.json();
  const item = solution?.data?.[0];
  return { ...item?.attributes, id: item?.id };
};

export const getActionFilters = (theme: Theme): ActionFilters => {
  switch (theme) {
    case 'transports':
      return {};

    case 'events':
      return {};

      break;
    case 'services':
      return {};

      break;
    case 'foods':
      return {
        organic: 'boolean',
        local: 'boolean',
        season: 'boolean',
        shortcircuit: 'boolean',
        wastereducer: 'boolean',
        foodwastereducer: 'boolean',
        cookmore: 'boolean'
      };

      break;
    case 'goods':
      return {
        used: 'boolean',
        rent: 'boolean',
        mutualise: 'boolean',
        repair: 'boolean',
        ecobuilt: 'boolean',
        local: 'boolean',
        organic: 'boolean',
        lowtech: 'boolean',
        recycled: 'boolean',
        reused: 'boolean',
        diy: 'boolean',
        wastereducer: 'boolean',
        comparer: 'boolean',
        relocating: 'boolean'
      };

    default:
      break;
  }
  return {};
};
