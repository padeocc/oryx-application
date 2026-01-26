'use server';

import { fetchServices } from '@/cms/utils';
import { TAGSPLITTER } from '@/config';
import { algoliasearch, SaveObjectsOptions } from 'algoliasearch';
import { difference } from 'lodash';
import { getEssValue } from './utils';

export const runIndexation = async () => {
  const transports = (
    (
      await fetchServices({
        filters: {
          theme: ['transports'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['transports'] }));

  const goods = (
    (
      await fetchServices({
        filters: {
          theme: ['goods'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['goods'] }));

  const foods = (
    (
      await fetchServices({
        filters: {
          theme: ['foods'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['foods'] }));

  const events = (
    (
      await fetchServices({
        filters: {
          theme: ['events'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['events'] }));

  const services = (
    (
      await fetchServices({
        filters: {
          theme: ['services'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['services'] }));

  const accommodations = (
    (
      await fetchServices({
        filters: {
          theme: ['accommodations'],
          tags: [],
          sort: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: ['accommodations'] }));

  const all: Record<string, unknown>[] = [
    ...accommodations,
    ...services,
    ...events,
    ...foods,
    ...goods,
    ...transports
  ]?.map(service => {
    //const score = calculateMeanScore(service?.tags || []) || 0;

    return {
      description: service.description,
      label: service.name,
      url: service.url,
      id: service.code,
      theme: service.theme,
      productstructure:
        (service?.productstructure || [])
          ?.map(ps => ps.trim())
          ?.filter(ps => !!ps)
          ?.join(TAGSPLITTER) || [],
      objectID: service.code,
      region: service.region,
      type: service.type,
      location: service.location,
      updatedAt: service.updatedAt.toString(),
      economic: service?.economic,
      ess: getEssValue(service),
      premium: !!service?.premium
    };
  });

  const parameters: SaveObjectsOptions = { indexName: process?.env?.ALGOLIA_INDEXNAME || '', objects: all };
  const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_WRITE_AUTH_KEY || '');

  const allAlgoliaObjectIds = (await client.browse({ indexName: process?.env?.ALGOLIA_INDEXNAME || '' }))?.hits?.map(
    item => item.objectID
  );
  const allCMSObjectIds = all?.map(item => item.objectID);

  const delta: string[] = difference(allAlgoliaObjectIds, allCMSObjectIds) as string[];
  client.deleteObjects({ indexName: process?.env?.ALGOLIA_INDEXNAME || '', objectIDs: delta });

  return client.saveObjects(parameters);
};
