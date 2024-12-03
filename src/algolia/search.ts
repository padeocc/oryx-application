'use server';

import { PAGINATION_LIMIT } from '@/config';
import { Filters } from '@/types';
import { algoliasearch, FacetFilters, FacetHits, SearchForFacetValuesProps, SearchResponses } from 'algoliasearch';
import { isArray } from 'lodash';

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
