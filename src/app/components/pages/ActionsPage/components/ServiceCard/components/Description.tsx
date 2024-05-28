'use client';

import { Popover, PopoverDropdown, PopoverTarget, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Service } from '../../../utils';

const Description = ({ service }: { service: Service }) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
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
        <Text fz="sm" size="sm">
          {service.description}
        </Text>
      </PopoverDropdown>
    </Popover>
  );
};

export default Description;
