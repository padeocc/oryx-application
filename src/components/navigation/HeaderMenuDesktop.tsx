import { Button, Container, Group, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getBurgerMenuLinks, getNavigationItems } from './items';
import SearchBar from './SearchBar';
import UserAvatar from '../auth/userAvatar';

const HeaderMenuDesktop = async () => {
  const t = await getTranslations('navigation_items');
  const t_auth = await getTranslations('auth_button');
  const elements = getNavigationItems({ t }).map((itemsGroup, itemgroupindex) => (
    <Group key={`group-desktop-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal, priority }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            {...others}
            p={'xs'}
            variant={priority ? 'filled' : 'transparent'}
            key={`item-desktop-${itemgroupindex}-${itemindex}-${name}`}
            component={Link}
            href={href}
            color={priority ? 'green_oryx' : 'var(--mantine-color-dark-outline)'}>
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
      <MenuDropdown>
        {(await getBurgerMenuLinks()).map((itemsGroup, itemgroupindex) => (
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
                  color="gray"
                  style={{ textDecoration: isExternal ? 'underline' : 'none', textDecorationColor: '#eee' }}>
                  {name}
                </MenuItem>
              );
            })}
          <MenuItem
            component={UserAvatar}
            fz={'lg'}
            color="white"
            translations={{signin: t_auth('login.connect'),signout: t_auth('login.disconnect')}}
          >
          </MenuItem>
          </div>
        ))}
      </MenuDropdown>
    </Menu>
  );

  return (
    <Group gap={'lg'} align="center" justify="flex-end">
      <SearchBar />
      {elements} {more}
    </Group>
  );
};

export default HeaderMenuDesktop;
