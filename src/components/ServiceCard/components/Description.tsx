'use client';

import { Theme } from '@/config';
import { Service } from '@/types';
import { Popover, PopoverDropdown, PopoverTarget, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const Description = ({ service, theme }: { service: Service; theme: Theme }) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover position="top" withArrow opened={opened} width="60%">
      <PopoverTarget>
        <Text
          onMouseEnter={open}
          onMouseLeave={close}
          fz="sm"
          size="sm"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5',
            maxHeight: 'calc(1.5em * 3)'
          }}>
          {service.description}
        </Text>
      </PopoverTarget>
      <PopoverDropdown style={{ pointerEvents: 'none' }}>
        <Link href={`/service/${theme}/${service.code}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Text fz="sm" size="sm">
            {service.description}
          </Text>
        </Link>
      </PopoverDropdown>
    </Popover>
  );
};

export default Description;
