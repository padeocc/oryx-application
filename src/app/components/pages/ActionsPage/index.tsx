import { Theme, themesColors } from '@/config';
import { Category, Filters, Region, RequestParameters } from '@/types';
import NotFound from '../../navigation/NotFound';
import List from './components/List';
import { fetchServices, getRegionsfromServices, getTagsFromServices } from './utils';

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

  const allTags: Category[] = getTagsFromServices(allServices);
  const allRegions: Region[] = getRegionsfromServices(allServices);
  const color = themesColors[theme];

  //permanentRedirect(`/services/${username}`) // Navigate to the new user profile

  return (
    <List
      data={services}
      theme={theme}
      total={meta?.pagination?.total || 0}
      color={color}
      allRegions={allRegions}
      allTags={allTags}
      filters={filters}
    />
  );
};

export default ActionsPage;
