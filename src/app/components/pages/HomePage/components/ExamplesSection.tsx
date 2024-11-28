import { Alert, Badge, Button, Group, MantineGradient, MantineSize, Space, Stack, Text, Title } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import { CurrencyEur, PersonSimpleBike, Plant, Train, WashingMachine } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const Example = ({
  link,
  Icon,
  text,
  gradient = { from: 'green_oryx.8', to: 'green_oryx.4', deg: 90 },
  fz = 'sm'
}: {
  link: string;
  Icon: Icon;
  text: string;
  gradient?: MantineGradient;
  fz?: MantineSize;
}) => {
  return (
    <Link href={link}>
      <Badge
        variant="gradient"
        gradient={gradient}
        styles={{
          root: {
            textTransform: 'none',
            cursor: 'pointer'
          }
        }}
        fz={fz}
        p="sm"
        h="auto"
        leftSection={<Icon weight="fill" fontSize={'1.6rem'} />}>
        {text}
      </Badge>
    </Link>
  );
};

const ExamplesSection = async () => {
  const t = await getTranslations('home_page');
  return (
    <Alert p="md">
      <Stack>
        <Title order={2}>
          <Text fz="2rem" c="green_oryx" fw="bold">
            {t('examples_title')}
          </Text>
        </Title>
        <Group justify="flex-start">
          <Example
            link={`/services?filters={"theme":"transports", "region":"31", "query": "vélo"}`}
            Icon={PersonSimpleBike}
            text={t('example_bike')}
          />
          <Example
            link={`/services?filters={"theme":"foods", "season": true, "local": true, "organic":true}`}
            Icon={Plant}
            text={t('example_food')}
          />
          <Example
            link={`/services?filters={"theme":"transports", "query":"train"}`}
            Icon={Train}
            text={t('example_train')}
          />
          <Example
            link={`/services?filters={"theme":"goods", "query":"Electronique Électroménager", "location": "online"}`}
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
          <Button component={Link} href="/services" size="xl">
            {t('search_label')}
          </Button>
        </Group>
      </Stack>
    </Alert>
  );
};

export default ExamplesSection;
