import { LandingPage } from '@/types';
import { Stack, Title, Box } from '@mantine/core';
import { displayContentElementFromBlocks, BlockNode } from '../../content/utils-ui';

type PageParams = { page: LandingPage };

const LandingTransportPage = async ({ page }: PageParams) => {
  return (
    <Stack>
      <Stack p="md">
        <Title order={1}>{page?.title}</Title>
        <Stack gap="lg">
          {page?.content?.map((node: BlockNode, index: number) => (
            <Box key={index}>
              {displayContentElementFromBlocks(node, index)}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LandingTransportPage;
