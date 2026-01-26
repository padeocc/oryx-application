import { Theme, getActionFilters, imagesMapping } from '@/config';
import { ActionFilters, Filters, Service } from '@/types';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping)?.find(tag =>
    (service?.productstructure || [])?.map?.(t => t.toLowerCase()).includes(tag)
  );
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;
  const folderByTheme: Record<Theme, string> = {
    foods: 'foods',
    goods: 'goods',
    services: 'services',
    events: 'events',
    accommodations: 'accommodations',
    transports: 'transports',
  };

  const folder = folderByTheme[theme] || 'default';
  const defaultImage = tag
    ? `/images/${folder}/default-${tag}-tag-image.svg`
    : `/images/${folder}/default-${theme}-image.svg`;

  return defaultImage;
};

export const sortAlphabetically = (a: string, b: string): number => 
  a.localeCompare(b, 'fr', { sensitivity: 'base' });

export const getCategoryFromTags = (theme: Theme, tags: string[], categoriesData: any): string | null => {
  const themeCategories = categoriesData[theme] || {};
  const categoryKeys = Object.keys(themeCategories);
  
  for (const tag of tags || []) {
    const matchingCategory = categoryKeys.find(category => {
      const tagLower = tag.toLowerCase();
      const categoryLower = category.toLowerCase();
      return categoryLower === tagLower || 
             tagLower.includes(categoryLower) ||
             categoryLower.includes(tagLower);
    });
    if (matchingCategory) {
      return matchingCategory;
    }
  }
  
  return null;
};

export const cleanFiltersValues = (values: Filters) => {
  const possibleActions: ActionFilters = getActionFilters({ themes: values?.theme || undefined });
  const allActionFilters = Object.keys(getActionFilters({}));
  const possibleFields = [...new Set([...Object.keys(possibleActions), ...allActionFilters, 'region', 'theme', 'location', 'query'])];

  const cleanedValues: Filters = Object.keys(values).reduce((all, valueKey) => {
    /* @ts-ignore */
    const value = values?.[valueKey];
    /* @ts-ignore */
    const isBooleanFilter = allActionFilters.includes(valueKey);

    if (isBooleanFilter) {
      return { ...all, [valueKey]: value };
    }
    
    if (!value || !possibleFields.includes(valueKey)) {
      return all;
    }
    return { ...all, [valueKey]: value };
  }, {});

  return encodeURIComponent(JSON.stringify(cleanedValues));
};
