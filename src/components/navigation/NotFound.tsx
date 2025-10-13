import { Stack } from '@mantine/core';
import { SmileyXEyes } from '@phosphor-icons/react/dist/ssr/SmileyXEyes';

const NotFound = ({ message = '' }: { message?: string }) => {
  return (
    <Stack>
      <SmileyXEyes color="orange" weight="fill" fontSize={'5rem'} alt={`${message}`} />
    </Stack>
  );
};

export default NotFound;
