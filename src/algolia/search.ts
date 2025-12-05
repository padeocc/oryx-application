'use server';

import { PAGINATION_LIMIT, SEARCH_RESULT_LIFETIME } from '@/config';
import { Filters } from '@/types';
import { algoliasearch, FacetFilters, FacetHits, SearchForFacetValuesProps, SearchResponses } from 'algoliasearch';
import { isArray } from 'lodash';

/**
 * search fetches to our API for better cache handing
 */
export const search = async ({
  query,
  limit = PAGINATION_LIMIT,
  sort = 'updatedAt',
  filters = {},
  page = 1
}: {
  query: string;
  sort?: string;
  limit?: number;
  filters?: Filters|String;
  page: number;
}): Promise<SearchResponses<unknown>> => {
  const searchParams = new URLSearchParams({
    query,
    sort,
    limit: limit.toString(),
    filters: JSON.stringify(filters),
    page: page.toString(),
    search: 'true',
  });

  const baseURL = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
  const url = `${baseURL}/api/search?${searchParams}`;
  const res = await fetch(url, {
    next: {
      revalidate: SEARCH_RESULT_LIFETIME,
      tags: ['search'],
    },
  });

  return res.json()
}

/**
 * algoliaSearch fetches data from algolia without cache
 */
export const algoliaSearch = async ({
  query,
  limit = PAGINATION_LIMIT,
  sort = 'updatedAt',
  filters = {},
  page = 1
}: {
  query: string;
  sort?: string;
  limit?: number;
  filters?: Filters;
  page: number;
}): Promise<SearchResponses<unknown>> => {
  const facetFilters: FacetFilters = Object.keys(filters).reduce((all: any, filterKey: string) => {
    /*@ts-ignore*/
    const value: string | string[] = filters?.[filterKey] || '';
    if (['string', 'boolean'].includes(typeof value)) {
      return [...all, `${filterKey}:${value}`];
    } else {
      if (isArray(value) && value.length) {
        return [...all, value.map(subValue => `${filterKey}:${subValue}`)];
      }
    }

    return all;
  }, []);

  const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');
  const results = await client.search(
    {
      requests: [
        {
          indexName: process?.env?.ALGOLIA_INDEXNAME || '',
          query,
          ignorePlurals: 'true',
          facetFilters,
          page,
          hitsPerPage: limit
        }
      ]
    },
    { cacheable: true }
  );

  return results;
};

export const getFieldDistinctsValues = async ({ name: facetName }: { name: string }): Promise<FacetHits[]> => {
  const params: SearchForFacetValuesProps = {
    indexName: process?.env?.ALGOLIA_INDEXNAME || '',
    facetName,
    searchForFacetValuesRequest: { maxFacetHits: 100 }
  };
  const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');
  return (await client.searchForFacetValues(params))?.facetHits || [];
};
