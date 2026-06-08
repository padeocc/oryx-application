import { Theme, themesColors } from '@/config';
import { Breadcrumbs, Group, Title } from '@mantine/core';
import Link from 'next/link';
import ScoreBanner from './ScoreBanner';
import categoriesData from '@/components/navigation/themes-categories.json';
import { getCategoryFromTags } from '../content/utils';
import messages from '../../../i18n/messages/fr.json';

const themesLabels = messages.themes as Record<string, string>;

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
  const category = getCategoryFromTags(theme, tags, categoriesData);

  return (
    <Breadcrumbs separator={category ? ' / ' : '->'}>
      <Link href={`/services?filters={"theme":["${theme}"]}`}>
        <Title order={3} c={color}>
          {themesLabels[theme] || theme}
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
