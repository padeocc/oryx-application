'use client';

import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { Divider, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import Form from './Form';
import Results from './Results';

const Content = ({
  filters,
  distinctValues,
  hits,
  pagesCount,
  page,
  totalNumberOfResults,
  asLoader = false
}: {
  filters: Filters;
  distinctValues: DistinctFilters;
  hits: IResult[];
  pagesCount: number;
  page: number;
  totalNumberOfResults: number;
  asLoader?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, [filters]);

  return (
    <Stack gap="xl">
      <Form
        initialValues={filters}
        distinctValues={distinctValues}
        isLoading={isLoading || asLoader}
        setIsLoading={setIsLoading}
      />
      <Divider />
      <Results
        filters={filters}
        data={hits as IResult[]}
        total={pagesCount}
        activePage={page}
        totalNumberOfResults={totalNumberOfResults}
        isLoading={isLoading || asLoader}
      />
    </Stack>
  );
};

export default Content;
