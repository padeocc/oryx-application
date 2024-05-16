import { intersection } from 'lodash';
import uniq from 'lodash/uniq';

export type Category = string;
export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service>;
export type Service = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  description: string;
  url: string;
  tags: string[];
  type: string[];
  code: string;
  zipCode: string;
  country: string;
  logo?: string;
};

export type Filters = { subjects: string[]; categories: string[]; codes?: (string | undefined)[] };

export const fetchServices = async ({ filters }: { filters?: Filters }) => {
  const url = process?.env?.STRAPI_SOLUTIONS_ENDPOINT || '';

  let filtersCatgeoriesString = '';
  // if (filters?.categories?.length) {
  //   // Does not work https://github.com/Zaydme/strapi-plugin-multi-select/issues/27
  //   filtersCatgeoriesString = `${qs.stringify({ filters: { tags: { $in: filters.categories } } })}`;
  // }

  const response = await fetch(`${url}/${filters?.subjects[0]}?${filtersCatgeoriesString}`, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` }
  });

  const solutions = await response.json();
  const services: Service[] = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];

  // Workaround
  if (filters?.categories?.length) {
    return services.filter(service => {
      return intersection(service.tags, filters.categories).length > 0;
    });
  }

  return services;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action?.tags || []));

export const fetchAction = async ({ code }: { code: string }) => {
  // const actions = demoServices as unknown as Service[];
  // return actions.find(a => code === a.code);
  return undefined;
};
