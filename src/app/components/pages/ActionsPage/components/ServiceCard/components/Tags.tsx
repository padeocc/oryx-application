'use client';

import { Badge, Collapse, Group, Stack } from '@mantine/core';
import { Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

const Tags = ({ tags, color }: { tags: string[]; color: string }) => {
  const [opened, setOpen] = useState(false);
  const [firstTag, ...otherTags] = tags;
  const Icon = opened ? Minus : Plus;
  return tags?.length > 1 ? (
    <Group
      style={{ cursor: 'pointer' }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!opened);
      }}>
      <Stack>
        <Group>
          <Badge key={`tag-${firstTag}`} size="sm" variant="outline" color={color} bg="white">
            {firstTag}
          </Badge>
          <Icon style={{ backgroundColor: 'white', color, border: `1px solid ${color}` }} fontSize={'1rem'} />
        </Group>
        <Collapse in={opened}>
          <Group gap={'sm'}>
            {otherTags?.map(tag => (
              <Badge key={`tag-${tag}`} size="sm" variant="outline" color={color} bg="white">
                {tag}
              </Badge>
            ))}
          </Group>
        </Collapse>
      </Stack>
    </Group>
  ) : (
    <Badge key={`tag-${firstTag}`} size="sm" variant="outline" color={color} bg="white">
      {firstTag}
    </Badge>
  );
};

export default Tags;
