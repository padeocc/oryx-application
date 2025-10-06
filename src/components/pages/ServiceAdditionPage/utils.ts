import { Theme } from '@/config';
import data from './data.json';

export const getTagsFromThemes = (themes: Theme[]) => {
  return Object.keys(data)
    .filter(theme => themes.includes(theme as Theme))
    .flatMap(theme => {
      /*@ts-ignore */
      const values = data?.[theme];
      return Object.keys(values);
    })
    .filter(tag => !!tag);
};

export const getOptionsFromThemes = (themes: Theme[], tags: string[]) => {
  return Object.keys(data)
    .filter(theme => themes.includes(theme as Theme))
    .flatMap(theme => {
      return tags.flatMap(tag => {
        /*@ts-ignore */
        return data?.[theme]?.[tag];
      });
    })
    .filter(tag => !!tag);
};
