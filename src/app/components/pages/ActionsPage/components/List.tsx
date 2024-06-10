'use client';

import FiltersComponent from '@/app/components/pages/ActionsPage/components/Filters';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import {
  Category,
  FetchServicesResponse,
  Filters,
  Region,
  Service,
  getOtherFilters
} from '@/app/components/pages/ActionsPage/utils';
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
  color,
  regions
}: {
  fetchServices: ({ filters }: { filters: Filters }) => Promise<FetchServicesResponse>;
  data: Service[];
  theme: Theme;
  categories: Category[];
  total: number;
  color: string;
  regions: Region[];
}) => {
  const t = useTranslations('content');
  const [data, setData] = useState<Service[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const { filters, setFilters } = useLocalState();
  const [total, setTotal] = useState<number>(initialTotal);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetchServices({ filters });
      setData(data.services);
      setTotal(data?.meta?.pagination?.total || 0);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.categories, filters.others, filters.regions, filters.location]);

  useEffect(() => {
    const hasthemeSwitched = theme !== filters?.theme;
    if (hasthemeSwitched) {
      setFilters({ theme, categories: [], others: {}, regions: [], location: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.theme]);

  const otherFilters = getOtherFilters(theme);

  return (
    <>
      <FiltersComponent
        itemsCount={total}
        loading={loading}
        filters={filters}
        handleSubmit={setFilters}
        allCategories={categories}
        allRegions={regions}
        otherFilters={otherFilters}
      />
      <Grid justify="flex-start" align="top" mt="lg">
        {loading ? (
          <GridCol span={{ base: 12 }} ta="center" p="xl">
            <Loader />
          </GridCol>
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 4 }} key={`action-${service.name}-${index}`}>
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
