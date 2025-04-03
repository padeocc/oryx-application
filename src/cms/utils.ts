'use server';

import { search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import { Theme } from '@/config';
import { APIFilters, FetchServicesResponse, Filters, Service } from '@/types';
import { SearchResponses } from 'algoliasearch';
import { merge } from 'lodash';
import qs from 'qs';

const generateAPIUrl = ({ filters }: { filters: Filters }): string => {
  const { sort, limit = -1, start = 0, theme, region, location, tags = [], ...actions } = filters;

  const tagsFilters = tags.length ? { $or: tags.map(tag => ({ tags: { $containsi: tag } })) } : {};
  // Workaround https://github.com/Zaydme/strapi-plugin-multi-select/issues/27

  const actionFilters = Object.keys(actions).length
    ? { $or: Object.keys(actions).map(action => ({ [action]: { $eq: true } })) }
    : {};

  return qs.stringify({
    sort,
    pagination: {
      start,
      limit
    },
    filters: { region, location, ...merge(tagsFilters, actionFilters) },
    populate: 'logo'
  } as APIFilters);
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

  const response = await fetch(fetchUrl, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` },
    next: { tags: ['cms'] }
  });
  const solutions = await response.json();
  const services: Service[] =
    solutions.data?.map((solution: { attributes: Service }) => {
      /*@ts-ignore */
      const logo = solution?.attributes?.logo?.data?.attributes?.url;
      return {
        ...solution.attributes,
        logo: logo ? `${process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT}${logo}` : undefined
        //score: calculateMeanScore(solution?.attributes?.tags)
      };
    }) || [];

  return { services, meta: solutions.meta };
};

export const fetchService = async ({ code, theme }: { code: string; theme: Theme }) => {
  const { results }: SearchResponses<unknown> = await search({
    query: '',
    page: 0,
    limit: 1,
    filters: { id: code }
  });
  /* @ts-ignore */
  const solution = transformServicesFromResults({ results: results[0].hits as IResult[] })[0] as unknown as Service;
  return solution;
};

const generateUniqueCode = (name: string) => {
  const uniqueCode = name.replace(/\s+/g, '').toLowerCase();
  const random = Math.floor(Math.random() * 1001);
  return `${uniqueCode}-${random}`;
};

export const addService = async (data: { [key: string]: any }): Promise<{ errors?: { [key: string]: string } }> => {
  const { theme, tags, url, label: name, region, location, options, email: sender } = data;
  const code = generateUniqueCode(name);

  const body = JSON.stringify({
    data: {
      publishedAt: null,
      code,
      theme,
      form_tags: tags,
      url,
      name,
      region: region.join(','),
      location,
      form_options: options,
      sender
    }
  });

  const cmsUrl = process?.env?.STRAPI_API_ENDPOINT || '';
  const response = await fetch(`${cmsUrl}/${theme?.[0]}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process?.env?.STRAPI_SECRET_POSTER_TOKEN || ''}`
    },
    body
  });

  const solution = await response.json();
  const item = solution?.data;
  return { ...item?.attributes, id: item?.id, theme };
};
