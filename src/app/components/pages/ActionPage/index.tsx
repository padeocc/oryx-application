import { Theme } from '@/config';
import { Alert, Badge, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { format } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLogoImage } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { Service, fetchService } from '../ActionsPage/utils';

const ActionPage = async ({ code, subject }: { code: string; subject: Theme }) => {
  const t = await getTranslations('services');
  const tUtils = await getTranslations('utils');

  const service: Service | undefined = await fetchService({ code, subject });

  if (!service) {
    return <NotFound message={`${code} - ${subject}`} />;
  }

  const { name, tags = [], description, country, publishedAt, updatedAt, url, type, zipCode } = service;

  return (
    <Stack>
      <Group>
        <Link href={`/actions/${subject}`}>
          <ArrowLeft color="black" />
        </Link>
        <Title order={3} c="orange">
          {name}
        </Title>
      </Group>
      <Stack gap={'lg'} ml={'xl'} mr={'xl'}>
        <Group gap={'xs'}>
          <Badge key={`tag-${type}`} size="sm" variant="outline" color="var(--mantine-color-dark-outline)" bg="white">
            {t(`type-${type?.[0] || 'company'}-label`)}
          </Badge>
          {tags.map(tag => (
            <Badge key={`tag-${tag}`} size="sm" variant="outline" color="var(--mantine-color-dark-outline)" bg="white">
              {tag}
            </Badge>
          ))}
        </Group>
        <Text fz="sm">
          {t('updatedat_label', { date: format(new Date(updatedAt), tUtils('fulldate-format-day')) })}
        </Text>
        <Image src={getLogoImage({ service })} alt={name} w="auto" fit="contain" mah={'20rem'} />
        <Alert>{description}</Alert>
        <Button size="xl" component={Link} href={url} target="_blank">
          {url}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ActionPage;
