'use client';

import FiltersComponent from '@/app/components/pages/ActionsPage/components/Filters';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Category, FetchServicesResponse, Filters, Service } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { useLocalState } from '@/state';
import { Alert, Grid, GridCol, Loader, Text } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const List = ({
  fetchServices,
  data: initialData,
  theme,
  categories = [],
  total: initialTotal,
  color
}: {
  fetchServices: ({ filters }: { filters: Filters }) => Promise<FetchServicesResponse>;
  data: Service[];
  theme: Theme;
  categories: Category[];
  total: number;
  color: string;
}) => {
  const t = useTranslations('content');
  const [data, setData] = useState<Service[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const { filters, setFilters } = useLocalState();
  const [total, setTotal] = useState<number>(initialTotal);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetchServices({ filters: { theme, categories: filters.categories } });
      setData(data.services);
      setTotal(data.meta.pagination.total);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.categories]);

  useEffect(() => {
    const hasthemeSwitched = theme !== filters?.theme;
    if (hasthemeSwitched) {
      setFilters({ theme, categories: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.theme]);

  return (
    <>
      <FiltersComponent
        itemsCount={total}
        loading={loading}
        filters={filters}
        handleSubmit={setFilters}
        allCategories={categories}
      />
      <Grid justify="flex-start" align="top" mt="lg" grow>
        {loading ? (
          <GridCol span={{ base: 12 }} ta="center" p="xl">
            <Loader />
          </GridCol>
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 3 }} key={`action-${service.name}-${index}`}>
              <ServiceCard
                service={service}
                backgroundColor={'var(--mantine-primary-color-2)'}
                theme={filters.theme as Theme}
                color={color}
              />
            </GridCol>
          ))
        )}
        {!loading && data.length === 0 ? (
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Text>{t('contact_us')}</Text>
            </Alert>
          </GridCol>
        ) : null}
      </Grid>
    </>
  );
};

export default List;
