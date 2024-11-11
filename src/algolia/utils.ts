import { Service } from '@/types';
import { IResult } from './types';

export const transformServicesFromResults = ({ results }: { results: IResult[] }): Service[] => {
  return results.map(result => {
    const service: Service = {
      code: result.id,
      description: result.description,
      name: result.label,
      logo: result.logo,
      tags: result.tags.split(','),
      url: result.url,
      // Rest is empty for now
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      type: [],
      region: '',
      location: '',
      country: ''
    };
    return service;
  });
};
