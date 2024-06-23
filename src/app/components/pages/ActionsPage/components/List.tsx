'use client';

import FiltersComponent from '@/app/components/pages/ActionsPage/components/Filters';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import {
  Category,
  Filters,
  Region,
  Service,
  generateUrl,
  getOtherFilters
} from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { Alert, Grid, GridCol, Loader, Text } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const List = ({
  filters,
  data,
  theme,
  total,
  color,
  allCategories = [],
  activeCategories = [],
  allRegions
}: {
  filters: Filters;
  data: Service[];
  theme: Theme;
  total: number;
  color: string;
  allCategories: Category[];
  activeCategories: Category[];
  allRegions: Region[];
}) => {
  const t = useTranslations('content');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otherFilters = getOtherFilters(theme);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [filters]);

  return (
    <>
      <FiltersComponent
        itemsCount={total}
        loading={isLoading}
        filters={filters}
        handleSubmit={(filters: Filters) => {
          setIsLoading(true);
          router.push(`/actions/${theme}?${generateUrl({ filters })}`);
        }}
        allCategories={allCategories}
        activeCategories={activeCategories}
        allRegions={allRegions}
        otherFilters={otherFilters}
        theme={theme}
      />
      <Grid justify="flex-start" align="top" mt="lg">
        {isLoading ? (
          <Loader />
        ) : data.length === 0 ? (
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Text>{t('contact_us')}</Text>
            </Alert>
          </GridCol>
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 4 }} key={`action-${service.name}-${index}`}>
              <ServiceCard
                service={service}
                backgroundColor={'var(--mantine-primary-color-2)'}
                theme={theme}
                color={color}
              />
            </GridCol>
          ))
        )}
      </Grid>
    </>
  );
};

export default List;
