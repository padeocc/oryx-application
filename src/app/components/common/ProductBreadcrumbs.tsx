import { Theme, themesColors } from '@/config';
import { Breadcrumbs, Group, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ScoreBanner from './ScoreBanner';

const ProductBreadcrumbs = ({ theme, name, score }: { theme: Theme; name: string; score?: number }) => {
  const color = themesColors[theme];
  const t = useTranslations('themes');

  return (
    <Breadcrumbs separator="->">
      <Link href={`/services?filters={"theme":["${theme}"]}`}>
        <Title order={3} c={color}>
          {t(theme)}
        </Title>
      </Link>
      <Title order={1} c={color}>
        <Group>
          {name}
          {score ? <ScoreBanner score={score} /> : null}
        </Group>
      </Title>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
