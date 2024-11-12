'use server';

import { PAGINATION_LIMIT } from '@/config';
import { Filters } from '@/types';
import { algoliasearch, FacetFilters, FacetHits, SearchForFacetValuesProps, SearchResponses } from 'algoliasearch';

const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');

export const search = async ({
  query,
  limit = PAGINATION_LIMIT,
  sortBy = 'label',
  filters = {},
  page = 1
}: {
  query: string;
  sortBy?: string;
  limit?: number;
  filters?: Filters;
  page: number;
}): Promise<SearchResponses<unknown>> => {
  const facetFilters: FacetFilters = Object.keys(filters).map((filterKey: string) => {
    /*@ts-ignore*/
    const value: string = filters?.[filterKey] || '';
    return [`${filterKey}:${value}`];
  });

  const results = await client.search(
    {
      requests: [
        {
          indexName: 'code',
          query,
          ignorePlurals: 'true',
          typoTolerance: 'strict',
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
    indexName: 'code',
    facetName
  };
  return (await client.searchForFacetValues(params))?.facetHits || [];
};
