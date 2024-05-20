import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import { getFooterLinks } from './items';

const Footer = async () => {
  const elements = (await getFooterLinks()).map((itemsGroup, itemgroupindex) => (
    <Group key={`group-desktop-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            {...others}
            p={'xs'}
            variant="transparent"
            key={`item-footer-${itemgroupindex}-${itemindex}-${name}`}
            component={Link}
            href={href}>
            {name}
          </Button>
        );
      })}
    </Group>
  ));

  return (
    <Flex gap="xs" justify="flex-end" direction="row" wrap="wrap">
      {elements}
    </Flex>
  );
};

export default Footer;
