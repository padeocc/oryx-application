import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { items } from './items';

const HeaderMenuDesktop = () =>
  items.map((itemsGroup, itemgroupindex) => (
    <Group key={`group-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button key={`item-${itemgroupindex}-${itemindex}`} component={Link} href={href} {...others}>
            {name}
          </Button>
        );
      })}
    </Group>
  ));

export default HeaderMenuDesktop;
