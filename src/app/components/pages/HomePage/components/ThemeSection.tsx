'use client';

import { Theme, themesColors, themesIcons } from '@/config';
import { Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import ServiceCard from '../../ActionsPage/components/ServiceCard';
import { Service } from '../../ActionsPage/utils';
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
      <Grid grow justify="stretch" c={color}>
        {items.map((service, index) => (
          <GridCol span={{ base: 12, sm: 6, md: 3 }} key={`action-${service.name}-${index}`}>
            <ServiceCard
              service={service}
              backgroundColor={'var(--mantine-primary-color-2)'}
              theme={theme}
              color={color}
            />
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
};

export default ThemeSection;
