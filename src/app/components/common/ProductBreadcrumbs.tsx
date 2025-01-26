import { Theme, themesColors } from '@/config';
import { Breadcrumbs, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ProductBreadcrumbs = ({ theme, name }: { theme: Theme; name: string }) => {
  const color = themesColors[theme];
  const t = useTranslations('themes');

  return (
    <Breadcrumbs separator="->">
      <Link href={`/services?filters={"theme":["${theme}"]}`}>
        <Title order={3} c={color}>
          {t(theme)}
        </Title>
      </Link>
      <Title order={2} c={color}>
        {name}
      </Title>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
