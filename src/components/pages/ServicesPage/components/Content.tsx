'use client';

import { IResult } from '@/algolia/types';
import { DistinctFilters, Filters } from '@/types';
import { Stack } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import Form from './Form';
import Results from './Results';
import { getActionFilters } from '@/config';

const Content = ({
  filters,
  originalQuery,
  distinctValues,
  hits,
  pagesCount,
  page,
  totalNumberOfResults,
  asLoader = false
}: {
  filters: Filters;
  originalQuery?: string;
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

  const actions = getActionFilters({ themes: filters?.theme || undefined });
  const selectedActions = Object.keys(actions).filter((actionKey: string) => {
    /*@ts-ignore*/
    const value = filters?.[actionKey];
    return value === true;
  });

  const formToggleRef = useRef<{ toggle: () => void } | null>(null);

  return (
    <Stack gap="xl">
      <Form
        ref={formToggleRef}
        initialValues={filters}
        distinctValues={distinctValues}
        isLoading={asLoader}
        setIsLoading={setIsLoading}
      />
      <Results
        filters={filters}
        originalQuery={originalQuery}
        data={hits as IResult[]}
        total={pagesCount}
        activePage={page}
        totalNumberOfResults={totalNumberOfResults}
        isLoading={isLoading || asLoader}
        selectedActionsCount={selectedActions.filter(action => action !== 'economic').length}
        onToggleFilters={() => formToggleRef.current?.toggle()}
      />
    </Stack>
  );
};

export default Content;
