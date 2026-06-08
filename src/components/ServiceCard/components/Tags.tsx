'use client';

import { Badge, Collapse, Group, Stack } from '@mantine/core';
import React, { useState } from 'react';

const Tags = ({
  tags,
  color,
  basekey,
  firstTag: originalFirstTag
}: {
  tags: string[];
  color: string;
  basekey: string;
  firstTag?: string | React.ReactNode;
}) => {
  const [opened, setOpen] = useState(false);

  let firstTag = originalFirstTag;
  let otherTags = tags;

  if (!firstTag) {
    const [first, ...others] = tags;
    firstTag = first;
    otherTags = others;
  }

  if (typeof firstTag === 'string') {
    firstTag = (
      <Badge
        key={`tag-${basekey}-${firstTag}`}
        variant="outline"
        color={color}
        bg="white"
        size="xs"
        style={{ cursor: 'pointer' }}>
        {firstTag}
      </Badge>
    );
  }

  const othersClosedLabel = (count: number) =>
    count > 1 ? `Voir les ${count} mots-clés` : '';
  const othersOpenedLabel = (count: number) =>
    count > 1 ? 'Cacher' : '';

  return tags?.length > 1 ? (
    <Group
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!opened);
      }}
      w="100%">
      <Stack w="100%">
        <Group justify="space-between">
          {firstTag}
          <Badge color={color} size="xs" style={{ cursor: 'pointer' }}>
            {opened ? othersOpenedLabel(tags.length) : othersClosedLabel(tags.length)}
          </Badge>
        </Group>
        <Collapse in={opened}>
          <Group gap={'sm'}>
            {otherTags?.map(tag => (
              <Badge
                key={`tag-${basekey}-${tag}`}
                size="sm"
                variant="outline"
                color={color}
                bg="white"
                style={{ cursor: 'pointer' }}>
                {tag}
              </Badge>
            ))}
          </Group>
        </Collapse>
      </Stack>
    </Group>
  ) : (
    firstTag
  );
};

export default Tags;
