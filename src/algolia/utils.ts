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
      organic: result?.organic,
      economic: result?.economic,
      local: result?.local,
      season: result?.season,
      shortcircuit: result?.shortcircuit,
      wastereducer: result?.wastereducer,
      foodwastereducer: result?.foodwastereducer,
      cookmore: result?.cookmore,
      used: result?.used,
      rent: result?.rent,
      mutualise: result?.mutualise,
      repair: result?.repair,
      ecobuilt: result?.ecobuilt,
      lowtech: result?.lowtech,
      recycled: result?.recycled,
      reused: result?.reused,
      diy: result?.diy,
      comparer: result?.comparer,
      relocating: result?.relocating,
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
