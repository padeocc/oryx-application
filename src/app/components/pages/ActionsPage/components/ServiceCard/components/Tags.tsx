'use client';

import { Badge, Collapse, Group, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Tags = ({ tags, color }: { tags: string[]; color: string }) => {
  const [opened, setOpen] = useState(false);
  const [firstTag, ...otherTags] = tags;
  const t = useTranslations('services');
  return tags?.length > 1 ? (
    <Group
      style={{ cursor: 'pointer' }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!opened);
      }}
      w="100%">
      <Stack w="100%">
        <Group justify="space-between">
          <Badge key={`tag-${firstTag}`} variant="outline" color={color} bg="white" size="xs">
            {firstTag}
          </Badge>
          <Badge color={color} size="xs">
            {/* {opened ? '-' : '+'} {opened ? null : otherTags.length} {} */}
            {opened
              ? t('tags-others-opened-label', { count: tags.length })
              : t('tags-others-closed-label', { count: tags.length })}
          </Badge>
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
