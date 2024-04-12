import { Alert, Badge, Grid, GridCol, Group, Image, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Bookmark from '../ActionsPage/components/Bookmark';
import { Service, fetchAction, getCategoryLabel } from '../ActionsPage/utils';

const ActionPage = async ({ code }: { code: string }) => {
  const t = await getTranslations('action_page');
  const action: Service | undefined = await fetchAction({ code });

  if (!action) {
    return <Alert c="orange">Not found</Alert>;
  }

  return (
    <Stack>
      <Link href="/actions">
        <ArrowLeft color="black" />
      </Link>
      <Grid>
        {action.logo ? (
          <GridCol span={{ base: 12 }} pt={'sm'}>
            <Image src={action?.logo || `/images/default-service-image.jpg`} alt={action.title} height={100} />
          </GridCol>
        ) : null}
        <GridCol span={{ base: 10 }} ta={'right'} pt={'sm'}>
          <Group gap={'xs'}>
            {action.tags.map(tag => (
              <Badge
                key={`tag-${tag}`}
                size="sm"
                variant="outline"
                color="var(--mantine-color-dark-outline)"
                bg="white">
                {getCategoryLabel(tag)}
              </Badge>
            ))}
          </Group>
        </GridCol>
        <GridCol span={{ base: 2 }} ta={'right'} pt={'sm'}>
          <Bookmark serviceCode={action.code} />
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Title order={3} c="orange">
            {action.title}
          </Title>
        </GridCol>
      </Grid>

      <Text fz="sm" size="sm">
        {action.shortDescription}
      </Text>
    </Stack>
  );
};

export default ActionPage;
