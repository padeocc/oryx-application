'use client';

import { Theme, themesColors, themesIcons } from '@/config';
import { Service } from '@/types';
import { Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import ServiceCard from '../../ActionsPage/components/ServiceCard';
import style from './theme-section.module.css';

const ThemeSection = ({ items, theme }: { items: Service[]; theme: Theme }) => {
  const Icon = themesIcons[theme];
  const color = themesColors[theme];
  const tTheme = useTranslations('themes');
  const tCommon = useTranslations('common');
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const moreLinkProps = {
    c: color,
    size: 'md',
    component: Link,
    href: `/actions/${theme}`,
    style: { cursor: 'pointer', color: 'inherit', textDecoration: 'none' }
  };

  return (
    <Stack onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Group gap={'xs'}>
        <Icon size="1.2rem" />
        <Title order={3}>{tTheme(theme)}</Title>
        {mouseOver ? (
          <Text visibleFrom="sm" {...moreLinkProps} className={style['more-text-container']}>
            {tCommon('see_more_theme', { theme: tTheme(theme) })} {'>'}
          </Text>
        ) : null}
        <Text hiddenFrom="sm" {...moreLinkProps}>
          {tCommon('see_more_theme', { theme: tTheme(theme) })} {'>'}
        </Text>
      </Group>
      <Grid justify="stretch" c={color}>
        {items.map((service, index) => (
          <GridCol span={{ base: 12, xs: 6, md: 3 }} key={`action-${service.name}-${index}`}>
            <ServiceCard
              service={service}
              backgroundColor={'var(--mantine-primary-color-2)'}
              theme={theme}
              color={color}
              titleOrder={4}
            />
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
};

export default ThemeSection;
