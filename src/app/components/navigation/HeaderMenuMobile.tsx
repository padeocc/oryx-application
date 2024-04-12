'use client';

import AuthButton from '@/components/auth/Button';
import { Container, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getNavigationItems } from './items';

const HeaderMenuMobile = () => {
  const t = useTranslations('navigation_items');
  return (
    <Menu shadow="md">
      <MenuTarget>
        <Container pr="xl" style={{ cursor: 'pointer' }}>
          <DotsThreeOutlineVertical size={24} color="var(--mantine-color-dark-outline)" />
        </Container>
      </MenuTarget>
      <MenuDropdown bg={'var(--mantine-color-dark-outline)'}>
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
                  color="gray">
                  {name}
                </MenuItem>
              );
            })}
            {itemgroupindex < itemsGroup.length ? <MenuDivider /> : null}
          </div>
        ))}
        <MenuItem fz={'lg'} color="gray">
          <AuthButton type={'link'} />
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default HeaderMenuMobile;
