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
import { Alert, Grid, GridCol, Text } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const List = ({
  filters,
  data,
  theme,
  categories = [],
  total,
  color,
  regions
}: {
  filters: Filters;
  data: Service[];
  theme: Theme;
  categories: Category[];
  total: number;
  color: string;
  regions: Region[];
}) => {
  const t = useTranslations('content');
  const otherFilters = getOtherFilters(theme);
  const router = useRouter();

  return (
    <>
      <FiltersComponent
        itemsCount={total}
        loading={false}
        filters={filters}
        handleSubmit={(filters: Filters) => {
          router.push(`/actions/${theme}?${generateUrl({ filters, theme })}`);
        }}
        allCategories={categories}
        allRegions={regions}
        otherFilters={otherFilters}
        theme={theme}
      />
      <Grid justify="flex-start" align="top" mt="lg">
        {data.map((service, index) => (
          <GridCol span={{ base: 12, sm: 4 }} key={`action-${service.name}-${index}`}>
            <ServiceCard
              service={service}
              backgroundColor={'var(--mantine-primary-color-2)'}
              theme={theme}
              color={color}
            />
          </GridCol>
        ))}
        {data.length === 0 ? (
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
