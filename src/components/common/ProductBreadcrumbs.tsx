import { Theme, themesColors } from '@/config';
import { Breadcrumbs, Group, Title, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ScoreBanner from './ScoreBanner';
import categoriesData from '@/components/navigation/themes-categories.json';
import { getCategoryFromTags } from '../content/utils';

const ProductBreadcrumbs = ({ 
  theme, 
  name, 
  score,
  tags = []
}: { 
  theme: Theme; 
  name: string; 
  score?: number;
  tags?: string[];
}) => {
  const color = themesColors[theme];
  const t = useTranslations('themes');
  const category = getCategoryFromTags(theme, tags, categoriesData);
  const displayName = category || name;

  return (
    <Breadcrumbs separator={category ? " / " : "->"}>
      <Link href={`/services?filters={"theme":["${theme}"]}`}>
        <Title order={3} c={color}>
          {t(theme)}
        </Title>
      </Link>
      {category ? (
        <Link href={`/services?filters={"theme":["${theme}"],"query":"${category}"}`}>
          <Title order={3} c={color}>
            {category}
          </Title>
        </Link>
      ) : (
        <Title order={1} c={color}>
          <Group>
            {name}
            {score ? <ScoreBanner score={score} /> : null}
          </Group>
        </Title>
      )}
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
