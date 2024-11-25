import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Button, Group, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
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
            <Button component={Link} href="/services" size="xl">
              {t('search_label')}
            </Button>
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
