import { Theme } from '@/config';
import NotFound from '../../navigation/NotFound';
import List from './components/List';
import { Category, Filters, fetchServices, getTagsfromServices } from './utils';

const ActionsPage = async ({ theme }: { theme: Theme }) => {
  const services = await fetchServices({
    filters: {
      categories: [],
      theme
    }
  });
  const categories: Category[] = getTagsfromServices(services);

  if (!theme) {
    return <NotFound />;
  }

  return (
    <List
      fetchServices={async ({ filters }: { filters: Filters }) => {
        'use server';
        return fetchServices({ filters });
      }}
      data={services}
      theme={theme}
      categories={categories}
    />
  );
};

export default ActionsPage;
