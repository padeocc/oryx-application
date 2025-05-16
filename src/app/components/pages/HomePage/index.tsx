import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Group, Stack, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import ThemesBanner from '../../common/ThemesBanner';
import ExamplesSection from './components/ExamplesSection';
import ThemeSection from './components/ThemeSection';
import { SearchResponses } from 'algoliasearch';
import { search } from '@/algolia/search';
import { transformServicesFromResults } from '@/algolia/utils';
import { IResult } from '@/algolia/types';
import SearchBar from '../../navigation/SearchBar';

const fetchThemeServices = async ({ theme }: { theme: Theme }): Promise<Service[]> => {
  const { results }: SearchResponses<unknown> = await search({
    query: '',
    page: 0,
    limit: 4,
    filters: { theme: [theme] }
  });
  /* @ts-ignore */
  return transformServicesFromResults({ results: results[0].hits as IResult[] });
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
      <Group hiddenFrom="md" grow>
        <SearchBar />
      </Group>
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
