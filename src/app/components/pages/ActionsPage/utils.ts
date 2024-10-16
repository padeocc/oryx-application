import { Theme, getActionFilters } from '@/config';
import { APIFilters, ActionFilters, FetchServicesResponse, Filters, RequestParameters, Service } from '@/types';
import { merge, uniq } from 'lodash';
import qs from 'qs';

const generateAPIUrl = ({ filters }: { filters: Filters }): string => {
  const { sortBy, limit = -1, start = 0, theme, region, location, tags = [], ...actions } = filters;

  const tagsFilters = tags.length ? { $or: tags.map(tag => ({ tags: { $containsi: tag } })) } : {};
  // Workaround https://github.com/Zaydme/strapi-plugin-multi-select/issues/27

  const actionFilters = Object.keys(actions).length
    ? { $or: Object.keys(actions).map(action => ({ [action]: { $eq: true } })) }
    : {};

  return qs.stringify({
    sortBy,
    pagination: {
      start,
      limit
    },
    filters: { region, location, ...merge(tagsFilters, actionFilters) },
    populate: 'logo'
  } as APIFilters);
};

export const getNavigationUrl = ({ filters: initialFilters }: { filters: Filters }) => {
  const theme = initialFilters.theme as Theme;
  if (!theme) {
    throw 'Theme is missing';
  }
  const actionFields: ActionFilters = getActionFilters(theme);
  const { limit = -1, sortBy = 'name:asc', region, location, tags } = initialFilters;
  const regionFilters = region ? { region } : {};
  const locationFilters = location ? { location } : {};
  const tagsFilters = tags ? { tags } : {};

  const actionFilters = Object.keys(actionFields).reduce((all, filterKey) => {
    // @ts-ignore
    const value = initialFilters?.[filterKey];
    if (value) {
      return { ...all, [filterKey]: value };
    }
    return all;
  }, {});

  const filters = { ...tagsFilters, ...actionFilters, ...regionFilters, ...locationFilters } as Filters;

  const params: RequestParameters = {
    filters,
    pagination: { start: 0, limit },
    sortBy,
    populate: 'logo',
    theme
  };
  return qs.stringify(params);
};

export const fetchServices = async ({ filters }: { filters: Filters }): Promise<FetchServicesResponse> => {
  const baseUrl = process?.env?.STRAPI_API_ENDPOINT || '';
  const theme = filters?.theme;

  if (!theme || !filters) {
    return { meta: { pagination: { limit: -1, start: 0, total: 0 } }, services: [] };
  }

  const fetchUrl = `${baseUrl}/${filters?.theme}?${generateAPIUrl({
    filters
  })}`;

  const response = await fetch(fetchUrl, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` },
    next: { tags: ['cms'] }
  });
  const solutions = await response.json();
  const services: Service[] = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];

  return { services, meta: solutions.meta };
};

export const getTagsFromServices = (services: Service[]) =>
  uniq(services.flatMap(service => service?.tags || [])).sort((a, b) => (a > b ? 1 : -1));

export const getRegionsfromServices = (services: Service[]) =>
  uniq(services.flatMap(service => (service?.region && [service.region]) || [])).sort((a, b) => (a > b ? 1 : -1));

export const fetchService = async ({ code, theme }: { code: string; theme: Theme }) => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const filtersString = `${qs.stringify({ populate: 'logo', filters: { code: { $eq: code } } })}`;
  const response = await fetch(`${url}/${theme}?${filtersString}`, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` },
    next: { tags: ['cms'] }
  });
  const solution = await response.json();
  const item = solution?.data?.[0];
  return { ...item?.attributes, id: item?.id };
};
