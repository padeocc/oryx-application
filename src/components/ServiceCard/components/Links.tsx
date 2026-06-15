'use client';

import { Theme } from '@/config';
import { Service } from '@/types';
import { Group, Tooltip } from '@mantine/core';
import Link from 'next/link';

const Links = ({ service, theme, hover }: { service: Service; theme: Theme; hover: boolean }) => {
  return (
    <>
      <Group justify="space-between" p="md" fz="sm" visibleFrom="md">
        <Link
          href={`/service/${theme}/${service.code}`}
          style={{ color: 'inherit', textDecoration: 'none', display: hover ? 'inline-block' : 'none' }}>
          Détails
        </Link>
        <Tooltip label={service.url} color="var(--mantine-color-dark-outline)">
          <Link
            href={service.url}
            onClick={e => e.stopPropagation()}
            target="_blank"
            style={{ color: 'inherit', visibility: hover ? 'visible' : 'hidden' }}>
            Site internet
          </Link>
        </Tooltip>
      </Group>
      <Group justify="space-between" p="md" fz="sm" hiddenFrom="md">
        <Link href={`/service/${theme}/${service.code}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          Détails
        </Link>
        <Tooltip label={service.url} color="var(--mantine-color-dark-outline)">
          <Link href={service.url} target="_blank" style={{ color: 'inherit' }} onClick={e => e.stopPropagation()}>
            Site internet
          </Link>
        </Tooltip>
      </Group>
    </>
  );
};

export default Links;
