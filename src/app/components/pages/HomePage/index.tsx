import { search } from '@/algolia/search';
import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Group, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import QuickSearch from '../../common/QuickSearch';
import ThemesBanner from '../../common/ThemesBanner';
import { fetchServices } from '../ActionsPage/utils';
import ExamplesSection from './components/ExamplesSection';
import ThemeSection from './components/ThemeSection';

const fetchThemeServices = async ({ theme }: { theme: Theme }): Promise<Service[]> => {
  return (
    await fetchServices({
      filters: {
        theme,
        tags: [],
        sortBy: 'updatedAt:desc',
        limit: 4
      }
    })
  ).services;
};

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');
  const themesSections = await Promise.all(
    Object.keys(themesIcons).map(async theme => {
      const services = await fetchThemeServices({ theme: theme as Theme });
      return <ThemeSection items={services} theme={theme as Theme} key={`theme-${theme}`} />;
    })
  );
  return (
    <Stack gap={'xl'}>
      <Stack gap={'2.5rem'} pt="2rem">
        <Stack gap="md">
          <ExamplesSection />
          <Group key="header-group-mobile" w="100%" align="center" justify="center">
            <QuickSearch onSearch={search} label={t('search_label')} size="xl" />
          </Group>
        </Stack>
        <Stack gap="sm">
          <Title order={3}>{t('explore_themes_label')}</Title>
          <ThemesBanner coloredByDefault />
        </Stack>
        {themesSections}
      </Stack>
    </Stack>
  );
};

export default HomePage;
