import { Theme } from '@/app/[locale]/actions/[theme]/page';
import demoServices from '@/data/actions.json';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import Content from './components/Content';

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;
export type Service = { tags: string[]; title: string; shortDescription: string; logo?: string; verticals: string[] };
export type Filters = { subjects: string[]; categories: string[] };

const fetchActions = async ({ filters }: { filters: Filters }) => {
  'use server';
  const actions = demoServices as unknown as Service[];
  if (filters.categories.length) {
    return actions.filter(action => !!intersection(action.tags, filters.categories).length);
  } else {
    if (filters.subjects.length) {
      return actions.filter(action => !!intersection(action.verticals, filters.subjects).length);
    }
  }
  return actions;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));

const CatalogPage = async ({ themes }: { themes?: Theme[] }) => {
  const actions = await fetchActions({
    filters: {
      categories: [],
      subjects: themes ? themes : []
    }
  });
  return <Content fetchActions={fetchActions} data={actions} themes={themes} />;
};

export default CatalogPage;
