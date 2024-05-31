import { Stack } from '@mantine/core';
import { fetchServices } from '../ActionsPage/utils';
import ThemeSection from './components/ThemeSection';

const HomePage = async ({}: {}) => {
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
      <Stack gap={'3rem'} pt="2rem">
        <ThemeSection items={transports.services} theme={'transports'} />
        <ThemeSection items={foods.services} theme={'foods'} />
        <ThemeSection items={goods.services} theme={'goods'} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
