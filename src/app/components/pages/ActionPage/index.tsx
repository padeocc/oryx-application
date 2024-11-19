import { Theme, getActionFilters, themesColors } from '@/config';
import { Service } from '@/types';
import { Alert, Badge, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { isArray } from 'lodash';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLogoImage } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { fetchService } from '../ActionsPage/utils';
import BackItem from './components/BackItem';

const ActionPage = async ({ code, theme }: { code: string; theme: Theme }) => {
  const t = await getTranslations('services');
  const tFilters = await getTranslations('filters_component');
  const tUtils = await getTranslations('utils');
  const service: Service | undefined = await fetchService({ code, theme });

  if (!service) {
    return <NotFound message={`${code} - ${theme}`} />;
  }

  // @ts-ignore
  const fields = Object.keys(getActionFilters(theme)).filter((f: string) => !!service?.[f]);
  const { name, tags = [], description, updatedAt, url, type } = service;
  const color = themesColors[theme];

  let labelRegion = service?.region ? tFilters(`region_${service.region}_label`) : '';
  labelRegion = labelRegion.includes(`region_${service.region}_label`) ? service.region : labelRegion;

  //TODO refacto type on CMS
  const typeLabel = (isArray(type) ? type[0] : type) || 'company';

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
          {type && (
            <Badge
              key={`tag-${theme}-${code}-${type}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {t(`type-${typeLabel}-label`)}
            </Badge>
          )}
          {service.location ? (
            <Badge
              key={`tag-${theme}-${service.name}-${service.location}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {tFilters(`location-${service.location}-label`)}
            </Badge>
          ) : null}

          {labelRegion ? (
            <Badge
              key={`tag-${theme}-${service.name}-${service.region}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {labelRegion}
            </Badge>
          ) : null}

          {tags.map(tag => (
            <Badge key={`tag-${theme}-${service.name}-${tag}`} size="sm" variant="outline" color={'white'} bg={color}>
              {tag}
            </Badge>
          ))}
          {fields.map(field => {
            return (
              <Badge
                key={`tag-${theme}-${service.name}-${field}`}
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
