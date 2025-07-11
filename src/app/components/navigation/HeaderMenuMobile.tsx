import { Container, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getBurgerMenuLinks, getNavigationItems } from './items';

const HeaderMenuMobile = async () => {
  const t = await getTranslations('navigation_items');

  return (
    <Menu shadow="md">
      <MenuTarget>
        <Container pr="xl" style={{ cursor: 'pointer' }}>
          <DotsThreeOutlineVertical size={24} color="var(--mantine-color-dark-outline)" />
        </Container>
      </MenuTarget>
      <MenuDropdown>
        {getNavigationItems({ t }).map((itemsGroup, itemgroupindex) => (
          <div key={`group-mobile-${itemgroupindex}`}>
            {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
              const others = isExternal ? { target: '_blank' } : {};
              return (
                <MenuItem
                  key={`item-mobile-${itemgroupindex}-${itemindex}`}
                  component={Link}
                  href={href}
                  {...others}
                  fz={'lg'}
                  color="gray"
                  style={{ textDecoration: isExternal ? 'underline' : 'none', textDecorationColor: '#eee' }}>
                  {name}
                </MenuItem>
              );
            })}
            {itemgroupindex <= itemsGroup.length ? <MenuDivider /> : null}
          </div>
        ))}

        {(await getBurgerMenuLinks()).map((itemsGroup, itemgroupindex) => (
          <div key={`group-mobile-bottom-${itemgroupindex}`}>
            {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
              const others = isExternal ? { target: '_blank' } : {};
              return (
                <MenuItem
                  key={`item-mobile-${itemgroupindex}-${itemindex}`}
                  component={Link}
                  href={href}
                  {...others}
                  fz={'lg'}
                  color="gray"
                  style={{ textDecoration: isExternal ? 'underline' : 'none', textDecorationColor: '#eee' }}>
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
};

export default HeaderMenuMobile;
