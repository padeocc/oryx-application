import { Theme, themesColors } from '@/config';
import NotFound from '../../navigation/NotFound';
import List from './components/List';
import {
  Category,
  Filters,
  Region,
  RequestParameters,
  fetchServices,
  getRegionsfromServices,
  getTagsFromServices
} from './utils';

const ActionsPage = async ({ theme, parameters }: { theme: Theme; parameters?: RequestParameters }) => {
  if (!theme) {
    return <NotFound />;
  }
  const filters: Filters = {
    ...(parameters?.filters || {}),
    theme
  };

  const { services, meta } = await fetchServices({
    filters
  });
  const { services: allServices } = await fetchServices({
    filters: { theme }
  });

  const activeCategories: Category[] = getTagsFromServices(services);
  const allCategories: Category[] = getTagsFromServices(allServices);
  const allRegions: Region[] = getRegionsfromServices(services);

  const color = themesColors[theme];

  return (
    <List
      data={services}
      theme={theme}
      total={meta?.pagination?.total || 0}
      color={color}
      allRegions={allRegions}
      allCategories={allCategories}
      activeCategories={activeCategories}
      filters={filters}
    />
  );
};

export default ActionsPage;
