'use client';

import { Theme } from '@/config';
import { Service } from '@/types';
import { Group, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Links = ({ service, theme, hover }: { service: Service; theme: Theme; hover: boolean }) => {
  const tServices = useTranslations('services');

  return (
    <>
      <Group justify="space-between" p="md" fz="sm" visibleFrom="md">
        <Link
          href={`/service/${theme}/${service.code}`}
          style={{ color: 'inherit', textDecoration: 'none', display: hover ? 'inline-block' : 'none' }}>
          {tServices('details-label')}
        </Link>
        <Tooltip label={service.url} color="var(--mantine-color-dark-outline)">
          <Link
            href={service.url}
            target="_blank"
            style={{ color: 'inherit', visibility: hover ? 'visible' : 'hidden' }}>
            {tServices('access-label')}
          </Link>
        </Tooltip>
      </Group>
      <Group justify="space-between" p="md" fz="sm" hiddenFrom="md">
        <Link href={`/service/${theme}/${service.code}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {tServices('details-label')}
        </Link>
        <Tooltip label={service.url} color="var(--mantine-color-dark-outline)">
          <Link href={service.url} target="_blank" style={{ color: 'inherit' }}>
            {tServices('access-label')}
          </Link>
        </Tooltip>
      </Group>
    </>
  );
};

export default Links;
