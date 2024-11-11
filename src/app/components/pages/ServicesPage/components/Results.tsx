import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Filters } from '@/types';
import { Alert, Grid, GridCol, Text } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

const Results = ({ filters, data }: { filters: Filters; data: IResult[] }) => {
  const t = useTranslations('content');
  return (
    <>
      {data.length === 0 ? (
        <Grid justify="flex-start" align="top" mt="lg">
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Text>{t('contact_us')}</Text>
            </Alert>
          </GridCol>
        </Grid>
      ) : (
        <Grid justify="flex-start" align="top" mt="lg">
          {transformServicesFromResults({ results: data }).map((service, index) => (
            <GridCol span={{ base: 12, xs: 6, md: 4, xl: 3 }} key={`action-${service.name}-${index}`}>
              <ServiceCard
                service={service}
                backgroundColor={'var(--mantine-primary-color-2)'}
                color={'green_oryx'}
                theme="transports"
              />
            </GridCol>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Results;
