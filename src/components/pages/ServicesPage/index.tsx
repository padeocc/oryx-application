import { getFieldDistinctsValues, search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { Stack } from '@mantine/core';
import { SearchResponses } from 'algoliasearch';
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
      if (typeof value === 'boolean') {
        return { ...all, [key]: value };
      }
      if (Array.isArray(value)) {
        return { ...all, [key]: value };
      }
      if (value) {
        return { ...all, [key]: value };
      }
      return { ...all, [key]: null };
    }, {})
  };
  
  const originalQuery = cleanedFilters.query || '';
  cleanedFilters.query = '';

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
          originalQuery={originalQuery}
          distinctValues={distinctValues}
          hits={hits}
          pagesCount={nbPages}
          page={page}
          totalNumberOfResults={nbHits}
        />
      </Stack>
    </Stack>
  );
};

export default ServicesPage;
