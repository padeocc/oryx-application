import { Theme, themesColors } from '@/config';
import { Service } from '@/types';
import { Alert, Badge, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLogoImage } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { fetchService, getActionFilters } from '../ActionsPage/utils';
import BackItem from './components/BackItem';

const ActionPage = async ({ code, theme }: { code: string; theme: Theme }) => {
  const t = await getTranslations('services');
  const tFilters = await getTranslations('filters_component');
  const tUtils = await getTranslations('utils');
  const service: Service | undefined = await fetchService({ code, theme });

  if (!service) {
    return <NotFound message={`${code} - ${theme}`} />;
  }

  //@ts-ignore
  const fields = Object.keys(getActionFilters(theme)).filter(f => !!service[f]);
  const { name, tags = [], description, updatedAt, url, type } = service;
  const color = themesColors[theme];

  let labelRegion = service?.region ? tFilters(`region_${service.region}_label`) : '';
  labelRegion = labelRegion.includes(`region_${service.region}_label`) ? service.region : labelRegion;

  return (
    <Stack>
      <Group>
        <BackItem theme={theme} />
        <Title order={3} c={color}>
          {name}
        </Title>
      </Group>
      <Stack gap={'lg'} ml={'xl'} mr={'xl'}>
        <Group gap={'xs'}>
          <Badge key={`tag-${type}`} size="sm" variant="outline" color="var(--mantine-color-dark-outline)" bg="white">
            {t(`type-${type?.[0] || 'company'}-label`)}
          </Badge>
          {service.location ? (
            <Badge
              key={`tag-${service.location}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {tFilters(`location-${service.location}-label`)}
            </Badge>
          ) : null}

          {labelRegion ? (
            <Badge
              key={`tag-${service.location}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {labelRegion}
            </Badge>
          ) : null}

          {tags.map(tag => (
            <Badge key={`tag-${tag}`} size="sm" variant="outline" color={'white'} bg={color}>
              {tag}
            </Badge>
          ))}
          {fields.map(field => {
            return (
              <Badge
                key={`tag-${field}`}
                size="sm"
                variant="outline"
                color="var(--mantine-color-dark-outline)"
                bg="white">
                {tFilters(`filter-${field}-label`)}
              </Badge>
            );
          })}
        </Group>
        <Text fz="sm">
          {t('updatedat_label', { date: format(new Date(updatedAt), tUtils('fulldate-format-day')) })}
        </Text>
        <Image src={getLogoImage({ service, theme })} alt={name} w="auto" fit="contain" mah={'20rem'} />
        <Alert>{description}</Alert>
        <Button size="xl" component={Link} href={url} target="_blank" color={color}>
          {url}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ActionPage;
