import { getFieldDistinctsValues, search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters, RequestParameters } from '@/types';
import Form from './components/Form';
import Results from './components/Results';

const ServicesPage = async ({ parameters }: { parameters?: RequestParameters }) => {
  const filters: Filters = parameters?.filters || {};
  const services: IResult[] = await search({ query: filters?.query || '' });

  const distinctValues: DistinctFilters = {
    theme: await getFieldDistinctsValues({ name: 'theme' }),
    region: await getFieldDistinctsValues({ name: 'region' }),
    location: await getFieldDistinctsValues({ name: 'location' })
  };

  return (
    <>
      <Form initialValues={filters} distinctValues={distinctValues} />
      <Results filters={filters} data={services} />
    </>
  );
};

export default ServicesPage;
