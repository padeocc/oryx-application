import demoServices from '@/app/demo.json';
import { ComboboxData, Stack } from '@mantine/core';
import Content from './components/Content';

export type Service = { tags: string[]; title: string; shortDescription: string; imagePath: string };
export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;

const verticalsOptions: ComboboxData = [
  { label: 'Transport', value: 'transport' },
  { label: 'Alimentation', value: 'food', disabled: true },
  { label: 'Immobilier', value: 'realestate', disabled: true }
];

const fetchActions = async ({ vertical }: { vertical: string }) => {
  'use server';
  const data = demoServices as unknown as Service[];
  return data;
};

const CatalogPage = async ({}: {}) => {
  const data = await fetchActions({ vertical: 'transport' });
  return (
    <Stack>
      <Content verticalsOptions={verticalsOptions} fetchActions={fetchActions} data={data} />
    </Stack>
  );
};

export default CatalogPage;
