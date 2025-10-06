'use client';

import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { Stack } from '@mantine/core';
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
  asLoader = false,
  suggestions,
  tags
}: {
  filters: Filters;
  distinctValues: DistinctFilters;
  hits: IResult[];
  pagesCount: number;
  page: number;
  totalNumberOfResults: number;
  asLoader?: boolean;
  suggestions?: string[];
  tags?: string[];
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
        isLoading={asLoader}
        setIsLoading={setIsLoading}
        suggestions={suggestions}
      />
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
