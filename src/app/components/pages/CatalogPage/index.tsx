import demoServices from '@/app/demo.json';
import { ComboboxData, Stack } from '@mantine/core';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import Content from './components/Content';

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;
export type Service = { tags: string[]; title: string; shortDescription: string; imagePath: string };
export type Filters = { vertical: string; tags: string[] };

const verticalsOptions: ComboboxData = [
  { label: 'Transport', value: 'transport' },
  { label: 'Alimentation', value: 'food', disabled: true },
  { label: 'Immobilier', value: 'realestate', disabled: true }
];

const fetchActions = async ({ filters }: { filters: Filters }) => {
  'use server';
  const actions = demoServices as unknown as Service[];
  if (filters.tags.length) {
    return actions.filter(action => !!intersection(action.tags, filters.tags).length);
  }
  return actions;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));

const CatalogPage = async ({}: {}) => {
  const actions = await fetchActions({
    filters: {
      vertical: 'transport',
      tags: []
    }
  });
  return (
    <Stack>
      <Content
        verticalsOptions={verticalsOptions}
        fetchActions={fetchActions}
        data={actions}
        allTags={getTagsfromActions(actions)}
      />
    </Stack>
  );
};

export default CatalogPage;
