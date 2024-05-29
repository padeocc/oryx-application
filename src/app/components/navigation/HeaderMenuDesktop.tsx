import { Button, Group } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getNavigationItems } from './items';

const HeaderMenuDesktop = async () => {
  const t = await getTranslations('navigation_items');
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

  return elements;
};

export default HeaderMenuDesktop;
