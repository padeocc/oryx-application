import { Badge, MantineGradient, MantineSize } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

const Example = ({
  link,
  Icon,
  text,
  gradient = { from: 'green_oryx.8', to: 'green_oryx.4', deg: 90 },
  fz = 'sm'
}: {
  link: string;
  Icon?: Icon;
  text: string;
  gradient?: MantineGradient;
  fz?: MantineSize;
}) => {
  return (
    <Link href={link}>
      <Badge
        radius={'lg'}
        variant="gradient"
        gradient={gradient}
        styles={{
          root: {
            textTransform: 'none',
            cursor: 'pointer'
          }
        }}
        fz={fz}
        p="sm"
        h="auto"
        leftSection={Icon ? <Icon weight="fill" fontSize={'1.4rem'} /> : null}>
        {text}
      </Badge>
    </Link>
  );
};

export default Example;
