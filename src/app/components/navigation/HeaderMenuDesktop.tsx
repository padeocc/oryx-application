'use client';

import AuthButton from '@/components/auth/Button';
import { Button, Container, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getNavigationItems } from './items';

const HeaderMenuDesktop = () => {
  const t = useTranslations('navigation_items');
  const elements = getNavigationItems({ t }).map((itemsGroup, itemgroupindex) => (
    <Group key={`group-desktop-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal, priority }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            {...others}
            p={'xs'}
            variant="transparent"
            key={`item-desktop-${itemgroupindex}-${itemindex}-${name}`}
            component={Link}
            href={href}
            color={priority ? 'orange' : 'var(--mantine-color-dark-outline)'}>
            {name}
          </Button>
        );
      })}
    </Group>
  ));

  elements.push(
    <Container>
      <AuthButton />
    </Container>
  );

  return elements;
};

export default HeaderMenuDesktop;
