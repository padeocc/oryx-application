import { Theme, themesIcons } from '@/config';
import { Service } from '@/types';
import { Box, Stack, Text, Title } from '@mantine/core';
import ThemeSection from './components/ThemeSection';
import { SearchResponses } from 'algoliasearch';
import { search } from '@/algolia/search';
import { transformServicesFromResults } from '@/algolia/utils';
import { IResult } from '@/algolia/types';
import SearchBar from '../../navigation/SearchBar';
import Partners from '@/components/partners';
import ThemesBannerWithHover from '../../navigation/ThemesBannerWithHover';
import { sortAlphabetically } from '@/components/content/utils';
import messages from '../../../../i18n/messages/fr.json';

const themesLabels = messages.themes as Record<string, string>;
const homePage = messages.home_page;

const fetchThemeServices = async ({ theme }: { theme: Theme }): Promise<Service[]> => {
  const { results }: SearchResponses<unknown> = await search({ query: '', page: 0, limit: 4, filters: { theme: [theme] } });
  /* @ts-ignore */
  return transformServicesFromResults({ results: results[0].hits as IResult[] });
};

const HomePage = async () => {
  const themesSections = await Promise.all(
    Object.keys(themesIcons)
      .sort((a, b) => sortAlphabetically(themesLabels[a], themesLabels[b]))
      .map(async theme => {
        const services = await fetchThemeServices({ theme: theme as Theme });
        return <ThemeSection items={services} theme={theme as Theme} key={`theme-${theme}`} />;
      })
  );

  return (
    <Stack gap={0}>
      <Box hiddenFrom="md">
        <Title order={1}>
          <Text fz={{ base: '1.3rem', sm: '2rem' }} c="green_oryx" fw="bold">
            {homePage.welcome}
          </Text>
        </Title>
      </Box>
      <Box hiddenFrom="md" style={{ backgroundColor: 'var(--mantine-primary-color-1)' }}>
        <SearchBar />
      </Box>
      <ThemesBannerWithHover />
      <Stack gap="xl" mt="xl">
        <Box visibleFrom="md">
          <Title order={1}>
            <Text fz={{ base: '1.3rem', sm: '2rem' }} c="green_oryx" fw="bold">
              {homePage.welcome}
            </Text>
          </Title>
        </Box>
        <Stack gap="xl">
          {themesSections}
        </Stack>
      </Stack>
      <Partners />
    </Stack>
  );
};

export default HomePage;
