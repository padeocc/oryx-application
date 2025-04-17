import { LandingPage } from '@/types';
import { Stack, Title } from '@mantine/core';
import { displayContentElementFromBlocks } from '../../content/utils-ui';

type PageParams = { page: LandingPage };

const LandingTransportPage = async ({ page }: PageParams) => {
  return (
    <Stack>
      <Stack p="md">
        <Title order={1}>{page?.title}</Title>
        <Stack gap="lg">{page?.content?.map(displayContentElementFromBlocks)}</Stack>
      </Stack>
    </Stack>
  );
};

export default LandingTransportPage;
