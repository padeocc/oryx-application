'use client';

import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { Divider, Stack } from '@mantine/core';
import { useState } from 'react';
import Form from './Form';
import Results from './Results';

const Content = async ({
  filters,
  distinctValues,
  hits,
  pagesCount,
  page,
  totalNumberOfResults
}: {
  filters: Filters;
  distinctValues: DistinctFilters;
  hits: IResult[];
  pagesCount: number;
  page: number;
  totalNumberOfResults: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Stack gap="xl">
      <Form initialValues={filters} distinctValues={distinctValues} setIsLoading={setIsLoading} isLoading={isLoading} />
      <Divider />
      <Results
        filters={filters}
        data={hits as IResult[]}
        total={pagesCount}
        activePage={page}
        totalNumberOfResults={totalNumberOfResults}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default Content;
