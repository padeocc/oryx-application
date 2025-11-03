import { getFieldDistinctsValues, search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { TAGSPLITTER } from '@/config';
import { DistinctFilters, Filters } from '@/types';
import { Stack } from '@mantine/core';
import { SearchResponses } from 'algoliasearch';
import { countBy } from 'lodash';
import Content from './components/Content';
import ThemesBannerWithHover from '../../navigation/ThemesBannerWithHover';

const ServicesPage = async ({
  parameters: { filters: filtersParam, page: pageParam = '1' }
}: {
  parameters: { filters?: string; page?: string };
}) => {
  const filters: Filters = (filtersParam && JSON.parse(filtersParam)) || {};
  const pageParameter: number = Number(pageParam) || 1;
  const { query = '', ...others } = filters;

  const { results }: SearchResponses<unknown> = await search({
    query,
    filters: others,
    page: pageParameter - 1
  });
  /*@ts-ignore*/
  const { hits: hitsResults, nbHits, page = pageParameter, nbPages } = results[0] || {};
  const hits = hitsResults as IResult[];

  const distinctValues: DistinctFilters = {
    region: await getFieldDistinctsValues({ name: 'region' }),
    location: await getFieldDistinctsValues({ name: 'location' })
  };

  let suggestions: string[] = [];

  if (filters.theme?.length) {
    const { results: allServices }: SearchResponses<unknown> = await search({
      query: '',
      page: 0,
      limit: 1000,
      filters: { theme: filters.theme }
    });

    /*@ts-ignore*/
    const allTags = allServices[0]?.hits?.flatMap(
      (suggestion: IResult) => suggestion?.tags?.split?.(TAGSPLITTER) || []
    );
    const tagCounts = countBy(allTags);
    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    suggestions = topTags.map(({ tag, count }) => `${tag}`);
  }

  const defaultValues: Filters = {
    region: null,
    location: null,
    theme: [],
    query: '',
    organic: false,
    economic: false,
    local: false,
    season: false,
    shortcircuit: false,
    wastereducer: false,
    foodwastereducer: false,
    cookmore: false,
    used: false,
    rent: false,
    mutualise: false,
    repair: false,
    ecobuilt: false,
    lowtech: false,
    recycled: false,
    reused: false,
    diy: false,
    comparer: false,
    relocating: false
  };

  const cleanedFilters = {
    ...defaultValues,
    ...Object.keys(filters).reduce((all: {}, key: string) => {
      /*@ts-ignore*/
      const value = filters?.[key];
      if (value) {
        return { ...all, [key]: value };
      }
      return { ...all, [key]: null };
    }, {})
  };

  return (
    <Stack gap={0}>
      <ThemesBannerWithHover 
        selectedThemes={cleanedFilters.theme || []}
        isEconomicSelected={cleanedFilters.economic || false}
        showSelectionState={true}
        disableHover={false}
        currentFilters={cleanedFilters}
      />
      
      <Stack gap="xl">
        <Content
          filters={cleanedFilters}
          distinctValues={distinctValues}
          hits={hits}
          pagesCount={nbPages}
          page={page}
          totalNumberOfResults={nbHits}
          suggestions={suggestions}
        />
      </Stack>
    </Stack>
  );
};

export default ServicesPage;
