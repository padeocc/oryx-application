import { Button, Container, Group } from '@mantine/core';
import Link from 'next/link';
import AuthButton from '../auth/Button';
import { items } from './items';

const HeaderMenuDesktop = () => {
  const elements = items.map((itemsGroup, itemgroupindex) => (
    <Group key={`group-${itemgroupindex}`} justify="space-between">
      {itemsGroup.map(({ href, name, isExternal, priority }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            p={'xs'}
            variant="transparent"
            key={`item-${itemgroupindex}-${itemindex}`}
            component={Link}
            href={href}
            {...others}
            color={priority ? 'orange' : 'darkblue'}>
            {name}
          </Button>
        );
      })}
    </Group>
  ));

  elements.push(
    <Container>
      <AuthButton />
    </Container>
  );

  return elements;
};

export default HeaderMenuDesktop;
