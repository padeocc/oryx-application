import { Theme } from '@/config';
import { intersection } from 'lodash';
import uniq from 'lodash/uniq';
import qs from 'qs';

export type Category = string;
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
  zipCode: string;
  country: string;
  logo?: { data: ImageData };
};

export type Filters = {
  sortBy?: string;
  limit?: number;
  subjects: string[];
  categories: string[];
  codes?: (string | undefined)[];
};

export const fetchServices = async ({ filters }: { filters?: Filters }) => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';

  //let filtersCatgeoriesString = '';
  // if (filters?.categories?.length) {
  //   // Does not work https://github.com/Zaydme/strapi-plugin-multi-select/issues/27
  //   filtersCatgeoriesString = `${qs.stringify({ filters: { tags: { $in: filters.categories } } })}`;
  // }

  const limit = filters?.limit || -1;
  const sort = filters?.sortBy || 'name';
  console.log(
    `${url}/${filters?.subjects[0]}?pagination[start]=0&pagination[limit]=${limit}&sort[0]=${sort}&populate=logo`
  );
  const response = await fetch(
    `${url}/${filters?.subjects[0]}?pagination[start]=0&pagination[limit]=${limit}&sort[0]=${sort}&populate=logo`,
    {
      headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` }
    }
  );

  const solutions = await response.json();
  const services: Service[] = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];

  // Workaround
  if (filters?.categories?.length) {
    return services.filter(service => {
      return intersection(service.tags, filters.categories).length > 0;
    });
  }

  return services;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action?.tags || []));

export const fetchService = async ({ code, subject }: { code: string; subject: Theme }) => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const filtersString = `${qs.stringify({ populate: 'logo', filters: { code: { $eq: code } } })}`;
  const response = await fetch(`${url}/${subject}?${filtersString}`, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` }
  });
  const solution = await response.json();
  return solution?.data?.[0]?.attributes;
};
