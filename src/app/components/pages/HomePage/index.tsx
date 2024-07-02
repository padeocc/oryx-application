import { Button, Stack } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchServices } from '../ActionsPage/utils';
import ThemeSection from './components/ThemeSection';

const HomePage = async ({}: {}) => {
  const t = await getTranslations('home_page');
  const transports = await fetchServices({
    filters: {
      theme: 'transports',
      tags: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const goods = await fetchServices({
    filters: {
      theme: 'goods',
      tags: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const foods = await fetchServices({
    filters: {
      theme: 'foods',
      tags: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const events = await fetchServices({
    filters: {
      theme: 'events',
      tags: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  const services = await fetchServices({
    filters: {
      theme: 'services',
      tags: [],
      sortBy: 'createdAt:desc',
      limit: 3
    }
  });

  return (
    <Stack gap={'xl'}>
      <Stack gap={'3rem'} pt="2rem">
        <Button size="xl" component={Link} href={'/finder'} hiddenFrom="md">
          {t('find_inspiration')}
        </Button>
        <ThemeSection items={transports.services} theme={'transports'} />
        <ThemeSection items={foods.services} theme={'foods'} />
        <ThemeSection items={goods.services} theme={'goods'} />
        <ThemeSection items={events.services} theme={'events'} />
        <ThemeSection items={services.services} theme={'services'} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
