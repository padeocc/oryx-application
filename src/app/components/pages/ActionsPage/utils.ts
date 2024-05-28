import { Theme } from '@/config';
import { intersection } from 'lodash';
import uniq from 'lodash/uniq';
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

export type OtherFilters = {
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
  theme: string | undefined;
  categories: string[];
  codes?: (string | undefined)[];
  regions?: Region[];
  others?: OtherFilters;
};

export type FetchServicesResponse = {
  services: Service[];
  meta: { pagination: { start: number; limit: number; total: number } };
};
export const fetchServices = async ({ filters }: { filters?: Filters }): Promise<FetchServicesResponse> => {
  const baseUrl = process?.env?.STRAPI_API_ENDPOINT || '';
  const theme = filters?.theme as Theme;

  if (!theme) {
    return { meta: { pagination: { limit: 0, start: 0, total: 0 } }, services: [] };
  }

  const allOthersFields: OtherFilters = getOtherFilters(theme);
  const limit = filters?.limit || -1;
  const sort = filters?.sortBy || 'name:asc';

  //let filtersCatgeoriesString = '';
  // if (filters?.categories?.length) {
  //   // Does not work https://github.com/Zaydme/strapi-plugin-multi-select/issues/27
  //   filtersCatgeoriesString = `${qs.stringify({ filters: { tags: { $in: filters.categories } } })}`;
  // }

  const others = filters?.others || {};
  const regions = filters?.regions || [];

  const allFilters = Object.keys(allOthersFields).reduce((all, filterKey) => {
    // @ts-ignore
    const value = others?.[filterKey];

    if (value) {
      return { ...all, [filterKey]: { $eq: value } };
    }
    return all;
  }, {});

  const regionsFilters = regions?.[0] ? { region: regions?.[0] } : {};

  const stringifiedQuery = qs.stringify({
    pagination: { start: 0, limit },
    sort,
    populate: 'logo',
    filters: { ...allFilters, ...regionsFilters }
  });

  const fetchUrl = `${baseUrl}/${filters?.theme}?${stringifiedQuery}`;

  const response = await fetch(fetchUrl, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` }
  });

  const solutions = await response.json();
  const services: Service[] = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];

  // Workaround
  if (filters?.categories?.length) {
    const filteredServices = services.filter(service => {
      return intersection(service.tags, filters.categories).length > 0;
    });
    return {
      services: filteredServices,
      meta: {
        pagination: {
          limit: solutions?.meta?.pagination?.limit || 0,
          start: solutions?.meta?.pagination?.start || 0,
          total: filteredServices.length
        }
      }
    };
  }

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
    cache: 'no-cache'
  });
  const solution = await response.json();
  const item = solution?.data?.[0];
  return { ...item?.attributes, id: item?.id };
};

export const getOtherFilters = (theme: Theme): OtherFilters => {
  switch (theme) {
    case 'transports':
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
