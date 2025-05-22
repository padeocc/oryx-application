import { Theme, getActionFilters, imagesMapping } from '@/config';
import { ActionFilters, Filters, Service } from '@/types';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping).find(tag => (service?.tags || []).map(t => t.toLowerCase()).includes(tag));
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;
  const defaultImage = tag ? `/images/default-${tag}-tag-image.svg` : `/images/default-${theme}-image.svg`;

  /*@ts-ignore*/
  const imageFromCMS = service?.logo?.data?.attributes?.url;
  const imageFromSearch = typeof service?.logo === 'string' ? service.logo : null;

  return (
    (imageFromCMS && `${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}${imageFromCMS}`) || imageFromSearch || defaultImage
  );
};

export const cleanFiltersValues = (values: Filters) => {
  const possibleActions: ActionFilters = getActionFilters({ themes: values?.theme || undefined });
  const possibleFields = [...Object.keys(possibleActions), 'region', 'theme', 'location', 'query'];

  const cleanedValues: Filters = Object.keys(values).reduce((all, valueKey) => {
    /* @ts-ignore */
    const value = values?.[valueKey];
    if (!value || !possibleFields.includes(valueKey)) {
      return all;
    }
    return { ...all, [valueKey]: value };
  }, {});

  return encodeURIComponent(JSON.stringify(cleanedValues));
};
