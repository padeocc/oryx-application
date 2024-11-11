'use server';

import { algoliasearch, FacetHits, SearchForFacetValuesProps } from 'algoliasearch';
import { IResult } from './types';

const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');

export const search = async ({
  query,
  limit = 20,
  sortBy = 'label'
}: {
  query: string;
  sortBy?: string;
  limit?: number;
}) => {
  //console.log({ query, limit, sortBy });
  const { results } = await client.search(
    {
      requests: [
        {
          indexName: 'code',
          query: query,
          ignorePlurals: 'true',
          typoTolerance: 'strict'
        }
      ]
    },
    { cacheable: true }
  );

  /* @ts-ignore */
  return (results?.[0]?.hits || []) as IResult[];
};

export const getFieldDistinctsValues = async ({ name: facetName }: { name: string }): Promise<FacetHits[]> => {
  const params: SearchForFacetValuesProps = {
    indexName: 'code',
    facetName
  };
  return (await client.searchForFacetValues(params))?.facetHits || [];
};
