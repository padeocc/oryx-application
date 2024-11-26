import { TAGSPLITTER } from '@/config';
import { Service } from '@/types';
import { IResult } from './types';

export const transformServicesFromResults = ({ results }: { results: IResult[] }): Service[] => {
  return results.map(result => {
    const service: Service = {
      code: result.id,
      description: result.description,
      name: result.label,
      logo: result.logo,
      tags: result.tags.split(TAGSPLITTER),
      url: result.url,
      region: result.region,
      location: result.location,
      theme: result.theme,
      economic: result.economic,
      // Rest is empty for now
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      type: [],
      country: ''
    };
    return service;
  });
};
