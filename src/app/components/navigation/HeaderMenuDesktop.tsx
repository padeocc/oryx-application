import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import AuthButton from '../auth/Button';
import { items } from './items';

//ensureSuperTokensInit();

// const getSSRSessionHelper = async () => {
//   'use server';
//   let session: SessionContainer | undefined;
//   let hasToken = false;
//   let hasInvalidClaims = false;
//   let error: Error | undefined = undefined;

//   try {
//     ({ session, hasToken, hasInvalidClaims } = await getSSRSession(cookies().getAll(), headers()));
//   } catch (err: any) {
//     error = err;
//   }
//   return { session, hasToken, hasInvalidClaims, error };
// };

// const data = await getSSRSessionHelper();

const HeaderMenuDesktop = () => {
  const elements = items.map((itemsGroup, itemgroupindex) => (
    <Group key={`group-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal, priority }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            key={`item-${itemgroupindex}-${itemindex}`}
            component={Link}
            href={href}
            {...others}
            color={priority ? 'orange' : 'green'}>
            {name}
          </Button>
        );
      })}
    </Group>
  ));

  elements.push(<AuthButton />);

  return elements;
};

export default HeaderMenuDesktop;
