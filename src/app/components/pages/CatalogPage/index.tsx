import demoServices from '@/data/actions.json';
import { Stack } from '@mantine/core';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import Content from './components/Content';

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;
export type Service = { tags: string[]; title: string; shortDescription: string; logo?: string };
export type Filters = { subjects: string[]; categories: string[] };

const fetchActions = async ({ filters }: { filters: Filters }) => {
  'use server';
  const actions = demoServices as unknown as Service[];
  if (filters.categories.length) {
    return actions.filter(action => !!intersection(action.tags, filters.categories).length);
  }
  return actions;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));

const CatalogPage = async ({}: {}) => {
  const actions = await fetchActions({
    filters: {
      categories: [],
      subjects: []
    }
  });
  return (
    <Stack>
      <Content fetchActions={fetchActions} data={actions} />
    </Stack>
  );
};

export default CatalogPage;
