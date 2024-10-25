'use server';

import { fetchServices } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { SaveObjectsOptions, searchClient } from 'algoliasearch';

const client = searchClient(process?.env?.ALGOLIA_KEY || '', process?.env?.ALGOLIA_WRITE_AUTH_KEY || '');

export const runIndexation = async () => {
  const transports = (
    (
      await fetchServices({
        filters: {
          theme: 'transports',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'transports' }));

  const goods = (
    (
      await fetchServices({
        filters: {
          theme: 'goods',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'goods' }));

  const foods = (
    (
      await fetchServices({
        filters: {
          theme: 'foods',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'foods' }));

  const events = (
    (
      await fetchServices({
        filters: {
          theme: 'events',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'events' }));

  const services = (
    (
      await fetchServices({
        filters: {
          theme: 'services',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'services' }));

  const accommodations = (
    (
      await fetchServices({
        filters: {
          theme: 'accommodations',
          tags: [],
          sortBy: 'updatedAt:desc'
        }
      })
    )?.services || []
  )?.map(service => ({ ...service, theme: 'accommodations' }));

  const all: Record<string, unknown>[] = [
    ...accommodations,
    ...services,
    ...events,
    ...foods,
    ...goods,
    ...transports
  ].map(service => {
    const logo = service.logo?.data?.attributes?.url;
    return {
      description: service.description,
      label: service.name,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/action/${service.theme}/${service.code}`,
      logo: logo ? `${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}${logo}` : undefined,
      id: service.code,
      theme: service.theme as Theme,
      tags: (service?.tags || []).join(', '),
      objectID: service.code
    };
  });

  const parameters: SaveObjectsOptions = { indexName: 'code', objects: all };

  return client.saveObjects(parameters);
};
