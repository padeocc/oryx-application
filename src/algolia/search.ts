'use server';

import { algoliasearch } from 'algoliasearch';
import { IResults } from './types';

const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_SEARCH_AUTH_KEY || '');

export const search = async ({ query }: { query: string }) => {
  const { results } = await client.search(
    {
      requests: [
        {
          indexName: 'code',
          query
        }
      ]
    },
    { cacheable: true }
  );

  /* @ts-ignore */
  return (results?.[0]?.hits || []) as IResults[];
};
