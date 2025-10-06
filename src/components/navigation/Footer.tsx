import Link from 'next/link';
import { getFooterLinks } from './items';
import { Group, Stack } from '@mantine/core';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';

const Footer = async () => {
  const items = (await getFooterLinks()).map((itemsGroup, itemgroupindex) => (
    <Stack key={`footer-group-${itemgroupindex}`} align="left">
      {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Link
            key={`item-mobile-${itemgroupindex}-${itemindex}`}
            href={href}
            {...others}
            style={{
              textDecoration: 'none',
              color: 'var(--mantine-primary-color-9)'
            }}>
            <Group gap={'xs'}>
              {name}
              {isExternal ? <ArrowSquareOut /> : null}
            </Group>
          </Link>
        );
      })}
    </Stack>
  ));

  return (
    <Group justify="space-around" gap="sm" grow align="top">
      {items}
    </Group>
  );
};

export default Footer;
