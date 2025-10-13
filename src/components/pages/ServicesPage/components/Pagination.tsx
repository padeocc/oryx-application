'use client';

import { cleanFiltersValues } from '@/components/content/utils';
import { Filters } from '@/types';
import { Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';

const PaginationComponent = ({ page, total, filters }: { page: number; total: number; filters: Filters }) => {
  const router = useRouter();
  return (
    <Pagination
      defaultValue={Number(page + 1)}
      value={Number(page + 1)}
      total={total}
      size={'md'}
      onChange={(pageNumber: number) => router.push(`?filters=${cleanFiltersValues(filters)}&page=${pageNumber}`)}
    />
  );
};

export default PaginationComponent;
