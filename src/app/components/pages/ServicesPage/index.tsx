import { getFieldDistinctsValues, search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { SearchResponses } from 'algoliasearch';
import Form from './components/Form';
import Results from './components/Results';

const ServicesPage = async ({
  parameters: { filters: filtersParam, page: pageParam = '1' }
}: {
  parameters: { filters?: string; page?: string };
}) => {
  const filters: Filters = (filtersParam && JSON.parse(filtersParam)) || {};
  const pageParameter: number = Number(pageParam) || 1;
  const { query = '', ...others } = filters;
  const { results }: SearchResponses<unknown> = await search({ query, filters: others, page: pageParameter - 1 });
  /*@ts-ignore*/
  const { hits, nbHits, page = pageParameter, nbPages } = results[0] || {};

  const distinctValues: DistinctFilters = {
    theme: await getFieldDistinctsValues({ name: 'theme' }),
    region: await getFieldDistinctsValues({ name: 'region' }),
    location: await getFieldDistinctsValues({ name: 'location' })
  };

  return (
    <>
      <Form initialValues={filters} distinctValues={distinctValues} />
      <Results
        filters={filters}
        data={hits as IResult[]}
        total={nbPages}
        activePage={page}
        totalNumberOfResults={nbHits}
      />
    </>
  );
};

export default ServicesPage;
