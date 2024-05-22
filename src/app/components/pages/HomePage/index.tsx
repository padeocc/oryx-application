import ServiceCard from '@/app/components/pages/ActionsPage/components/ServiceCard';
import { Theme, themesColors, themesIcons } from '@/config';
import { Button, Card, Container, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Service, fetchServices } from '../ActionsPage/utils';

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');
  const tTheme = await getTranslations('themes');
  const tCommon = await getTranslations('common');

  const transports = await fetchServices({
    filters: {
      theme: 'transports',
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const goods = await fetchServices({
    filters: {
      theme: 'goods',
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const foods = await fetchServices({
    filters: {
      theme: 'foods',
      categories: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const showThemeSection = ({ items, theme }: { items: Service[]; theme: Theme }) => {
    const Icon = themesIcons[theme];
    const color = themesColors[theme];
    return (
      <Grid grow justify="stretch" c={color}>
        {items.map((service, index) => (
          <GridCol span={{ base: 12, sm: 6, md: 3 }} key={`action-${service.name}-${index}`}>
            <ServiceCard
              service={service}
              backgroundColor={'var(--mantine-primary-color-2)'}
              theme={theme}
              color={color}
            />
          </GridCol>
        ))}
        <GridCol span={{ base: 12, sm: 6, md: 1 }} style={{ alignSelf: 'center' }}>
          <Link
            href={`/actions/${theme}`}
            color="green"
            style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
            <Stack align="center" ta="center">
              <Icon size={'4rem'} />
              <Container> {tCommon('see_more_theme', { theme: tTheme(theme) })}</Container>
            </Stack>
          </Link>
        </GridCol>
      </Grid>
    );
  };

  return (
    <Stack gap={'xl'}>
      <Card c="var(--mantine-color-dark-outline)" bg={'var(--mantine-primary-color-2)'}>
        <Stack gap={'lg'}>
          <Title order={1}>
            <Text fz={'inherit'}>{t('welcome')}</Text>
          </Title>
          <Text>{t('guide')}</Text>
          <Group justify="center">
            <Button component={Link} href="/finder" size="xl">
              {t('find_inspiration')}
            </Button>
          </Group>
        </Stack>
      </Card>

      <Stack gap={'lg'}>
        {showThemeSection({ items: transports.services, theme: 'transports' })}
        {showThemeSection({ items: goods.services, theme: 'goods' })}
        {showThemeSection({ items: foods.services, theme: 'foods' })}
      </Stack>
    </Stack>
  );
};

export default HomePage;
