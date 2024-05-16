import { Theme } from '@/config';
import uniq from 'lodash/uniq';
import List from './components/List';
import { Category, Filters, fetchServices } from './utils';

const ActionsPage = async ({ themes }: { themes?: Theme[] }) => {
  const subjects = themes ? themes : [];
  const services = await fetchServices({
    filters: {
      categories: [],
      subjects
    }
  });
  const categories: Category[] = uniq(services.flatMap(service => service.tags));

  return (
    <List
      fetchServices={async ({ filters }: { filters: Filters }) => {
        'use server';
        return fetchServices({ filters });
      }}
      data={services}
      subjects={subjects}
      categories={categories}
    />
  );
};

export default ActionsPage;
