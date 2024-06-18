import { Theme, themesColors } from '@/config';
import NotFound from '../../navigation/NotFound';
import List from './components/List';
import {
  Category,
  Filters,
  Region,
  UrlParameters,
  fetchServices,
  getRegionsfromServices,
  getTagsFromServices
} from './utils';

const ActionsPage = async ({ theme, parameters }: { theme: Theme; parameters?: UrlParameters }) => {
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
  const allCategories: Category[] = getTagsFromServices(services);
  const allRegions: Region[] = getRegionsfromServices(services);
  const color = themesColors[theme];

  return (
    <List
      data={services}
      theme={theme}
      allCategories={allCategories}
      total={meta?.pagination?.total || 0}
      color={color}
      allRegions={allRegions}
      filters={filters}
    />
  );
};

export default ActionsPage;
