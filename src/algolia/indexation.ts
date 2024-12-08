'use server';

import { fetchServices } from '@/app/components/pages/ServicesPage/utils';
import { TAGSPLITTER } from '@/config';
import { algoliasearch, SaveObjectsOptions } from 'algoliasearch';
import { difference } from 'lodash';

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
  ].map(service => {
    return {
      description: service.description,
      label: service.name,
      url: service.url,
      logo: service?.logo,
      id: service.code,
      theme: service.theme,
      tags: (service?.tags || [])
        .map(t => t.trim())
        .filter(t => !!t)
        .join(TAGSPLITTER),
      objectID: service.code,
      region: service.region,
      type: service.type,
      location: service.location,
      updatedAt: service.updatedAt.toString(),
      organic: service?.organic,
      economic: service?.economic,
      local: service?.local,
      season: service?.season,
      shortcircuit: service?.shortcircuit,
      wastereducer: service?.wastereducer,
      foodwastereducer: service?.foodwastereducer,
      cookmore: service?.cookmore,
      used: service?.used,
      rent: service?.rent,
      mutualise: service?.mutualise,
      repair: service?.repair,
      ecobuilt: service?.ecobuilt,
      lowtech: service?.lowtech,
      recycled: service?.recycled,
      reused: service?.reused,
      diy: service?.diy,
      comparer: service?.comparer,
      relocating: service?.relocating
    };
  });

  const parameters: SaveObjectsOptions = { indexName: process?.env?.ALGOLIA_INDEXNAME || '', objects: all };
  const client = algoliasearch(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_WRITE_AUTH_KEY || '');

  const allAlgoliaObjectIds = (await client.browse({ indexName: process?.env?.ALGOLIA_INDEXNAME || '' }))?.hits?.map(
    item => item.objectID
  );
  const allCMSObjectIds = all.map(item => item.objectID);

  const delta: string[] = difference(allAlgoliaObjectIds, allCMSObjectIds) as string[];
  client.deleteObjects({ indexName: process?.env?.ALGOLIA_INDEXNAME || '', objectIDs: delta });
  return client.saveObjects(parameters);
};
