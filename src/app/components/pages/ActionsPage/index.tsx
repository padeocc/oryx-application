import { Theme, themesColors } from '@/config';
import NotFound from '../../navigation/NotFound';
import List from './components/List';
import { Category, Filters, Region, fetchServices, getRegionsfromServices, getTagsFromServices } from './utils';

const ActionsPage = async ({ theme }: { theme: Theme }) => {
  const { services, meta } = await fetchServices({
    filters: {
      categories: [],
      theme
    }
  });
  const categories: Category[] = getTagsFromServices(services);
  const regions: Region[] = getRegionsfromServices(services);

  if (!theme) {
    return <NotFound />;
  }

  const color = themesColors[theme];
  return (
    <List
      fetchServices={async ({ filters }: { filters: Filters }) => {
        'use server';
        return fetchServices({ filters });
      }}
      data={services}
      theme={theme}
      categories={categories}
      total={meta.pagination.total}
      color={color}
      regions={regions}
    />
  );
};

export default ActionsPage;
