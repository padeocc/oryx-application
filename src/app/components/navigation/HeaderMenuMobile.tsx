import AuthButton from '@/components/auth/Button';
import { items } from '@/components/navigation/items';
import { Container, Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const HeaderMenuMobile = () => {
  return (
    <Menu shadow="md">
      <MenuTarget>
        <Container pr="xl" style={{ cursor: 'pointer' }}>
          <DotsThreeOutlineVertical size={24} color="var(--mantine-color-dark-outline)" />
        </Container>
      </MenuTarget>
      <MenuDropdown bg={'var(--mantine-color-dark-outline)'}>
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
          <AuthButton type={'link'} />
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default HeaderMenuMobile;
