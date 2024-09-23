import { Alert, Button, CSSProperties, Flex, Grid, GridCol, Space, Stack } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { PersonSimpleBike, Phone, Plant, Train } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getNavigationUrl } from '../../ActionsPage/utils';

const linkStyle: CSSProperties = { color: 'black', textDecoration: 'none', overflow: 'auto' };

const Example = ({ link, Icon, text }: { link: string; Icon: Icon; text: string }) => {
  return (
    <GridCol span={{ base: 12, lg: 6 }}>
      <Link style={linkStyle} href={link}>
        <Flex justify={'left'} align={'center'} gap={'sm'} fz={'lg'}>
          <Icon />
          {text}
        </Flex>
      </Link>
    </GridCol>
  );
};

const ExamplesSection = async () => {
  const t = await getTranslations('home_page');

  return (
    <Alert title={t('examples_title')} p="md">
      <Stack>
        <Grid justify="space-between">
          <Example
            link={`/actions/transports?${getNavigationUrl({
              filters: { theme: 'transports', region: '31', start: 0, limit: -1, tags: ['Vélos'] }
            })}`}
            Icon={PersonSimpleBike}
            text={t('example_bike')}
          />
          <Example
            link={`/actions/foods?${getNavigationUrl({
              filters: { theme: 'foods', start: 0, limit: -1, season: true, local: true, organic: true }
            })}`}
            Icon={Plant}
            text={t('example_food')}
          />
          <Example
            link={`/actions/transports?${getNavigationUrl({
              filters: { theme: 'transports', start: 0, limit: -1, tags: ['Train'] }
            })}`}
            Icon={Train}
            text={t('example_train')}
          />
          <Example
            link={`/actions/goods?${getNavigationUrl({
              filters: {
                theme: 'goods',
                start: 0,
                limit: -1,
                tags: ['Electronique', 'Électroménager'],
                location: 'online'
              }
            })}`}
            Icon={Phone}
            text={t('example_phone')}
          />
        </Grid>
        <Space />
        <Button size="sm" component={Link} href={'/finder'}>
          {t('find_others_inspiration')}
        </Button>
      </Stack>
    </Alert>
  );
};

export default ExamplesSection;
