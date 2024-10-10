'use server';

import { algoliasearch } from 'algoliasearch';
import { IResults } from './types';

export const search = async ({ query }: { query: string }) => {
  const client = algoliasearch(
    process?.env?.NEXT_PUBLIC_ALGOLIA_KEY || '',
    process?.env?.NEXT_PUBLIC_ALGOLIA_READ_AUTH_KEY || ''
  );
  const { results } = await client.search({
    requests: [
      {
        indexName: 'code',
        query
      }
    ]
  });

  /* @ts-ignore */
  return (results?.[0]?.hits || []) as IResults[];
};
