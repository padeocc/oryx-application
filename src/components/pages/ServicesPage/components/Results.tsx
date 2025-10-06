import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import ServiceCard from '@/components/ServiceCard';
import { themesColors } from '@/config';
import { Filters, Service } from '@/types';
import { Alert, Grid, GridCol, Group, Stack, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Pagination from './Pagination';

const Results = ({
  filters,
  data,
  activePage = 1,
  total,
  totalNumberOfResults,
  isLoading
}: {
  filters: Filters;
  data: IResult[];
  total: number;
  activePage: number;
  totalNumberOfResults: number;
  isLoading: boolean;
}) => {
  const t = useTranslations('content');

  if (isLoading) {
    return (
      <Stack>
        <Grid justify="flex-start" align="top" mt="lg">
          {[...Array(12)].map((_item, index) => (
            <GridCol span={{ base: 12, xs: 6, md: 4, xl: 3 }} key={`skel-${index}`}>
              <ServiceCard
                color={'var(--mantine-primary-color-7)'}
                asLoader
                backgroundColor={'var(--mantine-primary-color-2)'}
              />
            </GridCol>
          ))}
        </Grid>
      </Stack>
    );
  }

  return (
    <Stack>
      {data.length === 0 ? (
        <Grid justify="flex-start" align="top" mt="lg">
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Link href={'/service/add'}>{t('contact_us')}</Link>
            </Alert>
          </GridCol>
        </Grid>
      ) : (
        <Stack>
          <Group justify="space-between">
            <Title order={2}>{t(`total-results-label`, { count: totalNumberOfResults })}</Title>
            {total > 1 ? <Pagination page={activePage} total={total} filters={filters} /> : null}
          </Group>
          <Grid justify="flex-start" align="top" mt="lg">
            {transformServicesFromResults({ results: data }).map((service: Service, index: number) => (
              <GridCol
                span={{ base: 12, xs: 6, md: 4, xl: 3 }}
                key={`action-${service.theme}-${service.name}-${index}`}>
                <ServiceCard
                  service={service}
                  backgroundColor={'var(--mantine-primary-color-2)'}
                  color={themesColors[service.theme?.[0]]}
                  theme={service.theme?.[0]}
                />
              </GridCol>
            ))}
          </Grid>
        </Stack>
      )}
      {total > 1 ? (
        <Group justify="end">
          <Pagination page={activePage} total={total} filters={filters} />
        </Group>
      ) : null}
    </Stack>
  );
};

export default Results;
