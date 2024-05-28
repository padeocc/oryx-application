import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchServices } from '../ActionsPage/utils';
import ThemeSection from './components/ThemeSection';

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

      <Stack gap={'4rem'} pt="2rem">
        <ThemeSection items={transports.services} theme={'transports'} />
        <ThemeSection items={goods.services} theme={'goods'} />
        <ThemeSection items={foods.services} theme={'foods'} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
