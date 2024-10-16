import { search } from '@/algolia/search';
import { Group, Stack } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import QuickSearch from '../ActionsPage/components/Filters/QuickSearch';
import { fetchServices } from '../ActionsPage/utils';
import ExamplesSection from './components/ExamplesSection';
import ThemeSection from './components/ThemeSection';

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');
  const transports = await fetchServices({
    filters: {
      theme: 'transports',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  const goods = await fetchServices({
    filters: {
      theme: 'goods',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  const foods = await fetchServices({
    filters: {
      theme: 'foods',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  const events = await fetchServices({
    filters: {
      theme: 'events',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  const services = await fetchServices({
    filters: {
      theme: 'services',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  const accommodations = await fetchServices({
    filters: {
      theme: 'accommodations',
      tags: [],
      sortBy: 'updatedAt:desc',
      limit: 3
    }
  });

  return (
    <Stack gap={'xl'}>
      <Stack gap={'2.5rem'} pt="2rem">
        <Stack gap="md">
          <ExamplesSection />
          <Group key="header-group-mobile" w="100%" align="center" justify="center">
            <QuickSearch onSearch={search} label={t('search_label')} size="xl" />
          </Group>
        </Stack>
        <ThemeSection items={transports.services} theme={'transports'} />
        <ThemeSection items={foods.services} theme={'foods'} />
        <ThemeSection items={goods.services} theme={'goods'} />
        <ThemeSection items={events.services} theme={'events'} />
        <ThemeSection items={services.services} theme={'services'} />
        <ThemeSection items={accommodations.services} theme={'accommodations'} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
