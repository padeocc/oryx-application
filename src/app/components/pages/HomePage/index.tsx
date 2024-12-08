import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Stack, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import ThemesBanner from '../../common/ThemesBanner';
import { fetchServices } from '../ServicesPage/utils';
import ExamplesSection from './components/ExamplesSection';
import ThemeSection from './components/ThemeSection';

const fetchThemeServices = async ({ theme }: { theme: Theme }): Promise<Service[]> => {
  return (
    await fetchServices({
      filters: {
        theme: [theme],
        tags: [],
        sort: 'updatedAt:desc',
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
    <Stack gap={'xl'} pt="xl">
      <ExamplesSection />
      <Text fz={{ base: '1.2rem', sm: '2rem' }} c="green_oryx" fw="bold">
        {t('explore_themes_label')}
      </Text>
      <ThemesBanner />
      {themesSections}
    </Stack>
  );
};

export default HomePage;
