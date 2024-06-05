import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { getFooterLinks } from './items';

const Footer = async () => {
  const elements = (await getFooterLinks()).map((itemsGroup, itemgroupindex) => (
    <>
      {itemsGroup.map(({ href, name, isExternal }, itemindex) => {
        const others = isExternal ? { target: '_blank' } : {};
        return (
          <Button
            {...others}
            variant="transparent"
            key={`item-footer-${itemgroupindex}-${itemindex}-${name}`}
            component={Link}
            href={href}>
            {name}
          </Button>
        );
      })}
    </>
  ));

  return <Group fz={'sm'}>{elements}</Group>;
};

export default Footer;
