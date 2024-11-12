'use client';

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
      size={'xl'}
      onChange={(pageNumber: number) => {
        return router.push(`?filters=${JSON.stringify(filters)}&page=${pageNumber}`);
      }}
    />
  );
};

export default PaginationComponent;
