'use client';

import { useLocalState } from '@/state';
import { Tooltip } from '@mantine/core';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Bookmark = ({ serviceCode }: { serviceCode: string }) => {
  const t = useTranslations('bookmark');
  const { user, toggleUserService } = useLocalState();
  const [isActive, setIsActive] = useState<boolean>(!!(user?.services || []).find(s => s.code === serviceCode));

  return user ? (
    <Tooltip label={t('tooltip_label')} color="var(--mantine-color-dark-outline)">
      <BookmarkSimple
        style={{ cursor: 'pointer' }}
        size={'16px'}
        color={isActive ? 'orange' : 'var(--mantine-color-dark-outline)'}
        weight={isActive ? 'fill' : 'regular'}
        onClick={() => {
          toggleUserService({ code: serviceCode });
          setIsActive(!isActive);
        }}
      />
    </Tooltip>
  ) : null;
};

export default Bookmark;
