'use client';

import FiltersComponent from '@/app/components/pages/ActionsPage/components/Filters';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import {
  Category,
  Filters,
  Region,
  Service,
  generateUrl,
  getActionFilters
} from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { Alert, Grid, GridCol, Group, Loader, Text } from '@mantine/core';
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
  allTags = [],
  activeTags = [],
  allRegions
}: {
  filters: Filters;
  data: Service[];
  theme: Theme;
  total: number;
  color: string;
  allTags: Category[];
  activeTags: Category[];
  allRegions: Region[];
}) => {
  const t = useTranslations('content');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const actionFilters = getActionFilters(theme);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [filters]);

  return (
    <>
      <FiltersComponent
        theme={theme}
        itemsCount={total}
        loading={isLoading}
        filters={filters}
        handleSubmit={(filters: Filters) => {
          setIsLoading(true);
          router.push(`/actions/${theme}?${generateUrl({ filters })}`);
        }}
        activeTags={activeTags}
        allTags={allTags}
        allRegions={allRegions}
        allActionFilters={actionFilters}
      />
      {isLoading ? (
        <Group justify="center" p="xl" m="xl">
          <Loader size={'xl'} />
        </Group>
      ) : data.length === 0 ? (
        <Grid justify="flex-start" align="top" mt="lg">
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Text>{t('contact_us')}</Text>
            </Alert>
          </GridCol>
        </Grid>
      ) : (
        <Grid justify="flex-start" align="top" mt="lg">
          {data.map((service, index) => (
            <GridCol span={{ base: 12, xs: 6, md: 4, xl: 3 }} key={`action-${service.name}-${index}`}>
              <ServiceCard
                service={service}
                backgroundColor={'var(--mantine-primary-color-2)'}
                theme={theme}
                color={color}
              />
            </GridCol>
          ))}
        </Grid>
      )}
    </>
  );
};

export default List;
