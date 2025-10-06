import Example from '@/components/common/Example';
import { Button, Group, Space, Stack, Text, Title } from '@mantine/core';
import { Carrot, CurrencyEur, PersonSimpleBike, Train, WashingMachine } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const ExamplesSection = async () => {
  const t = await getTranslations('home_page');
  return (
    <Stack p={{ base: 'xs', md: 'md' }} bg={'green_oryx.2'}>
      <Title order={2}>
        <Text fz={{ base: '1.2rem', sm: '2rem' }} c="green_oryx" fw="bold">
          {t('examples_title')}
        </Text>
      </Title>
      <Group justify="flex-start">
        <Example
          link={`/services?filters={"theme":["transports"], "region":"31", "query": "vélo"}`}
          Icon={PersonSimpleBike}
          text={t('example_bike')}
        />
        <Example
          link={`/services?filters={"theme":["foods"], "season": true, "local": true, "organic":true}`}
          Icon={Carrot}
          text={t('example_food')}
        />
        <Example
          link={`/services?filters={"theme":["transports"], "query":"train"}`}
          Icon={Train}
          text={t('example_train')}
        />
        <Example
          link={`/services?filters={"theme":["goods"], "query":"Electronique Électroménager", "location": "online"}`}
          Icon={WashingMachine}
          text={t('example_phone')}
        />
        <Example
          link={`/services?filters={"economic": true}`}
          Icon={CurrencyEur}
          text={t('example_economic')}
          gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
          fz="md"
        />
      </Group>
      <Space />
      <Group key="header-group-mobile" w="100%" align="center" justify="right">
        <Button component={Link} href="/services" size="xl" visibleFrom="xs">
          {t('search_label')}
        </Button>
        <Button component={Link} href="/services" size="sm" hiddenFrom="xs">
          {t('search_label')}
        </Button>
      </Group>
    </Stack>
  );
};

export default ExamplesSection;
