import { Button, Container, Group, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getFooterLinks, getNavigationItems } from './items';

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

  const more = (
    <Menu shadow="md">
      <MenuTarget>
        <Container pr="xl" style={{ cursor: 'pointer' }}>
          <DotsThreeOutlineVertical size={24} color="var(--mantine-color-dark-outline)" />
        </Container>
      </MenuTarget>
      <MenuDropdown bg={'var(--mantine-color-dark-outline)'}>
        {(await getFooterLinks()).map((itemsGroup, itemgroupindex) => (
          <div key={`group-more-${itemgroupindex}`}>
            {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
              const others = isExternal ? { target: '_blank' } : {};
              return (
                <MenuItem
                  key={`item-mobile-${itemgroupindex}-${itemindex}`}
                  component={Link}
                  href={href}
                  {...others}
                  fz={'lg'}
                  color="gray">
                  {name}
                </MenuItem>
              );
            })}
            {itemgroupindex < itemsGroup.length ? <MenuDivider /> : null}
          </div>
        ))}
      </MenuDropdown>
    </Menu>
  );

  return (
    <Group>
      {elements} {more}
    </Group>
  );
};

export default HeaderMenuDesktop;
