import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Box, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import ThemeSection from './components/ThemeSection';
import { SearchResponses } from 'algoliasearch';
import { search } from '@/algolia/search';
import { transformServicesFromResults } from '@/algolia/utils';
import { IResult } from '@/algolia/types';
import SearchBar from '../../navigation/SearchBar';
import ThemesBannerWithHover from '../../navigation/ThemesBannerWithHover';

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
    <Stack gap={0}>
      {/* Titre H1 - affiché en premier sur mobile */}
      <Box hiddenFrom="md">
        <Title order={1}>
          <Text fz={{ base: '1.3rem', sm: '2rem' }} c="green_oryx" fw="bold">
            {t('welcome')}
          </Text>
        </Title>
      </Box>

      {/* Barre de recherche mobile */}
      <Box hiddenFrom="md" style={{ backgroundColor: 'var(--mantine-primary-color-1)' }}>
        <SearchBar />
      </Box>

      {/* Filtres thèmes */}
      <ThemesBannerWithHover />

      {/* Titre H1 - affiché sur desktop */}
      <Stack gap="xl" mt="xl">
        <Box visibleFrom="md">
          <Title order={1}>
            <Text fz={{ base: '1.3rem', sm: '2rem' }} c="green_oryx" fw="bold">
              {t('welcome')}
            </Text>
          </Title>
        </Box>
        <Stack gap="xl">
          {themesSections}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;