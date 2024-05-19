import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Theme } from '@/config';
import { Button, Card, Flex, Grid, GridCol, Space, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Service, fetchServices } from '../ActionsPage/utils';

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');
  const tTheme = await getTranslations('themes');
  const tCommon = await getTranslations('common');

  const transports = await fetchServices({
    filters: {
      subjects: ['transports'],
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const goods = await fetchServices({
    filters: {
      subjects: ['goods'],
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const foods = await fetchServices({
    filters: {
      subjects: ['foods'],
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const showThemeSection = ({ items, theme }: { items: Service[]; theme: Theme }) => {
    return (
      <Grid>
        <GridCol span={{ base: 12 }}>
          <Title order={3}>{tTheme(theme)}</Title>
        </GridCol>
        {items.map((service, index) => (
          <GridCol span={{ base: 12, sm: 6, md: 4 }} key={`action-${service.name}-${index}`}>
            <ServiceCard service={service} backgroundColor={'var(--mantine-primary-color-2)'} theme={theme} />
          </GridCol>
        ))}
        <GridCol span={{ base: 12 }}>
          <Flex justify={'center'}>
            <Button component={Link} href={`/actions/${theme}`} size="lg">
              {tCommon('see_more_theme')}
            </Button>
          </Flex>
        </GridCol>
      </Grid>
    );
  };

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

      <Stack gap={'lg'}>
        <Title order={2} ta="center" size={'3em'}>
          {t('discover_actions')}
        </Title>
        {showThemeSection({ items: transports, theme: 'transports' })}
        {showThemeSection({ items: goods, theme: 'goods' })}
        {showThemeSection({ items: foods, theme: 'foods' })}
      </Stack>
    </Stack>
  );
};

export default HomePage;
