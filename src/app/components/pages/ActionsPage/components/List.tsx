'use client';

import FiltersComponent from '@/app/components/pages/ActionsPage/components/Filters';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Category, Filters, Service } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { useLocalState } from '@/state';
import { Alert, Grid, GridCol, Loader, Text } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const List = ({
  fetchServices,
  data: initialData,
  subjects = [],
  categories = []
}: {
  fetchServices: ({ filters }: { filters: Filters }) => Promise<Service[]>;
  data: Service[];
  subjects?: Theme[];
  categories: Category[];
}) => {
  const t = useTranslations('content');
  const [data, setData] = useState<Service[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const { filters, setFilters } = useLocalState();

  const firstFetch = useRef(true);
  /* Only when filters change*/
  useEffect(() => {
    if (!firstFetch.current) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchServices({ filters: { subjects, categories: filters.categories } });
        setData(data);
        setLoading(false);
      };
      fetchData();
    } else {
      firstFetch.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.categories]);

  useEffect(() => {
    setFilters({ ...filters, subjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FiltersComponent
        itemsCount={data.length}
        loading={loading}
        filters={filters}
        handleSubmit={setFilters}
        allCategories={categories}
      />
      <Grid justify="flex-start" align="top" mt="lg">
        {loading ? (
          <GridCol span={{ base: 12 }} ta="center" p="xl">
            <Loader />
          </GridCol>
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 4 }} key={`action-${service.name}-${index}`}>
              <ServiceCard service={service} backgroundColor={'var(--mantine-primary-color-2)'} />
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
