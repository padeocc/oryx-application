'use client';

import { useLocalState } from '@/state';
import { Loader, Switch, Table, TableTd, TableTr } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Filters, Service } from '../../ActionsPage/utils';

const List = ({ fetchActions }: { fetchActions: ({ filters }: { filters: Filters }) => Promise<Service[]> }) => {
  const t = useTranslations('user_actions');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Service[]>([]);
  const { user } = useLocalState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const codes = user?.services?.map(s => s.code) || [];
      const data = await fetchActions({
        filters: {
          subjects: [],
          categories: [],
          codes
        }
      });
      setData(data);
      setIsLoading(false);
    };
    user && fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      {data.map((service, index) => (
        <TableTr key={`action-${service.name}-${index}`}>
          <TableTd>{service.name}</TableTd>
          <TableTd>
            <Switch label={t('display_label')} />
          </TableTd>
        </TableTr>
      ))}
    </Table>
  );
};

export default List;
