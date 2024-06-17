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
  const categories: Category[] = getTagsFromServices(services);
  const regions: Region[] = getRegionsfromServices(services);
  const color = themesColors[theme];

  return (
    <List
      data={services}
      theme={theme}
      categories={categories}
      total={meta.pagination.total}
      color={color}
      regions={regions}
      filters={filters}
    />
  );
};

export default ActionsPage;
