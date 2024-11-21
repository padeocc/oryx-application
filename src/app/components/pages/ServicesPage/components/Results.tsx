import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import ServiceCard from '@/app/components/ServiceCard';
import { themesColors } from '@/config';
import { Filters } from '@/types';
import { Alert, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import Pagination from './Pagination';

const Results = ({
  filters,
  data,
  activePage = 1,
  total,
  totalNumberOfResults
}: {
  filters: Filters;
  data: IResult[];
  total: number;
  activePage: number;
  totalNumberOfResults: number;
}) => {
  const t = useTranslations('content');

  return (
    <Stack pt="xl">
      {data.length === 0 ? (
        <Grid justify="flex-start" align="top" mt="lg">
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Text>{t('contact_us')}</Text>
            </Alert>
          </GridCol>
        </Grid>
      ) : (
        <Stack>
          <Title order={2}>{t(`total-results-label`, { count: totalNumberOfResults })}</Title>
          <Grid justify="flex-start" align="top" mt="lg">
            {transformServicesFromResults({ results: data }).map((service, index) => (
              <GridCol
                span={{ base: 12, xs: 6, md: 4, xl: 3 }}
                key={`action-${service.theme}-${service.name}-${index}`}>
                <ServiceCard
                  service={service}
                  backgroundColor={'var(--mantine-primary-color-2)'}
                  color={themesColors[service.theme]}
                  theme={service.theme}
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
