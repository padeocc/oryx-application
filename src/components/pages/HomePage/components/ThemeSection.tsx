'use client';

import { landingPagesUrl, Theme, themesColors, themesIcons } from '@/config';
import { Service } from '@/types';
import { Anchor, Box, Button, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import ServiceCard from '../../../ServiceCard';
import style from './theme-section.module.css';
import messages from '../../../../../i18n/messages/fr.json';

const themesLabels = messages.themes as Record<string, string>;
const commonLabels = messages.common;

const ThemeSection = ({ items, theme }: { items: Service[]; theme: Theme }) => {
  const Icon = themesIcons[theme];
  const color = themesColors[theme];
  const themeLabel = themesLabels[theme] || theme;
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const moreLinkProps = {
    c: color,
    size: 'lg',
    component: Link,
    href: `/services?filters={"theme":["${theme}"]}`,
    style: { cursor: 'pointer', color: 'inherit', textDecoration: 'none' }
  };

  return (
    <Stack onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Group w="100%" grow preventGrowOverflow={false}>
        <Group gap={'xs'}>
          <Title order={2}>
            <Group justify="center" align="center" c={color} gap={'xs'}>
              <Icon size="1.4rem" />
              <Text fz={'xl'} c={'inherit'} fw="bold">{themeLabel}</Text>
            </Group>
          </Title>
          {mouseOver ? (
            <Text visibleFrom="sm" {...moreLinkProps} className={style['more-text-container']}>
              {commonLabels.see_more_theme} {'>'}
            </Text>
          ) : null}
          <Text hiddenFrom="sm" {...moreLinkProps}>
            {commonLabels.see_more_theme} {'>'}
          </Text>
        </Group>
        <Group justify="end" align="right">
          {landingPagesUrl.get(theme) ? (
            <Anchor c="white" href={landingPagesUrl.get(theme)}>
              <Button variant="filled">{commonLabels.read_more}</Button>
            </Anchor>
          ) : null}
        </Group>
      </Group>
      <Box
        hiddenFrom="sm"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, calc(70% - 6px))',
          gap: '12px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="mobile-scroll"
      >
        {items.map((service, index) => (
          <ServiceCard key={`action-${service.theme}-${service.name}-${index}`} service={service} backgroundColor={'var(--mantine-primary-color-2)'} theme={theme} color={color} titleOrder={4} />
        ))}
      </Box>
      <Grid visibleFrom="sm" justify="stretch" align="stretch" c={color} gutter="lg">
        {items.map((service, index) => (
          <GridCol span={{ sm: 6, md: 4, xl: 3 }} key={`action-desktop-${service.theme}-${service.name}-${index}`}>
            <ServiceCard service={service} backgroundColor={'var(--mantine-primary-color-2)'} theme={theme} color={color} titleOrder={4} />
          </GridCol>
        ))}
      </Grid>
      <style jsx global>{`
        .mobile-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </Stack>
  );
};

export default ThemeSection;
