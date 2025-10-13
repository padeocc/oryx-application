import { Alert, Group, Stack, Text } from '@mantine/core';
import { Tree } from '@phosphor-icons/react/dist/ssr';

const ScoreBanner = ({ score }: { score: number }) => {
  return (
    <Alert
      variant="light"
      bg={score >= 7 ? 'green' : score >= 4 ? 'orange' : 'red'}
      m="0"
      style={{ borderRadius: '0.5rem' }}
      p="0.4rem">
      <Stack align="center" gap="0" p="0" m="0">
        <Group justify="space-between" gap={'xs'} color={'white'}>
          <Tree fontSize={'1.3rem'} color="white" />
          <Text fw={'bolder'} c="white">
            {score}
          </Text>
        </Group>
      </Stack>
    </Alert>
  );
};

export default ScoreBanner;
