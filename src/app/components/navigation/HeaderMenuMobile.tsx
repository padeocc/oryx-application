import { Container, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import AuthButton from '../auth/Button';
import { items } from './items';

const HeaderMenuMobile = () => {
  return (
    <Menu shadow="md">
      <MenuTarget>
        <Container pr="xl" style={{ cursor: 'pointer' }}>
          <DotsThreeOutlineVertical size={24} color="white" />
        </Container>
      </MenuTarget>
      <MenuDropdown bg={'green'}>
        {items.map((itemsGroup, itemgroupindex) => (
          <>
            {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
              const others = isExternal ? { target: '_blank' } : {};
              return (
                <MenuItem
                  key={`item-${itemgroupindex}-${itemindex}`}
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
          </>
        ))}
        <MenuItem fz={'lg'} color="gray">
          <AuthButton />
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default HeaderMenuMobile;
