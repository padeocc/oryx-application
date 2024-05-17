import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Button, Card, Grid, GridCol, Space, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchServices } from '../ActionsPage/utils';

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');

  const actions = await fetchServices({
    filters: {
      subjects: ['transports'],
      categories: [],
      sortBy: 'createdAt',
      limit: 10
    }
  });

  return (
    <Stack gap={'xl'} align="center">
      <Grid justify="center" w="100%" align="center">
        <GridCol span={{ base: 0, md: 1 }} ta="center" visibleFrom="md"></GridCol>
        <GridCol span={{ base: 12, md: 10 }}>
          <Card c="var(--mantine-color-dark-outline)" bg={'var(--mantine-primary-color-2)'}>
            <Stack gap={'lg'}>
              <Title order={1}>
                <Text fz={'inherit'}>{t('welcome')}</Text>
              </Title>
              <Text>{t('guide')}</Text>
              <Text>{t('save_actions')}</Text>
              <Button color="var(--mantine-color-dark-outline)" w="100%" component={Link} href="/finder">
                {t('find_inspiration')}
              </Button>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{ base: 0, md: 1 }} ta="center" visibleFrom="md"></GridCol>
      </Grid>
      <Space />
      <Grid justify="center" w="100%">
        <GridCol span={{ base: 12 }}>
          <Stack gap={'lg'}>
            <Title order={2} ta="center" size={'3em'}>
              {t('discover_actions')}
            </Title>
            <Grid>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[0]}
                    theme={'transports'}
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[2]}
                    theme={'transports'}
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[4]}
                    theme={'transports'}
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack>
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[1]}
                    theme={'transports'}
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[3]}
                    theme={'transports'}
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'var(--mantine-primary-color-2)'}
                    service={actions[5]}
                    theme={'transports'}
                  />
                </Stack>
              </GridCol>
            </Grid>
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  );
};

export default HomePage;
