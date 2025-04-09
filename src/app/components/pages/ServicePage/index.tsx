import { Theme, getActionFilters, themesColors } from '@/config';
import { Service } from '@/types';
import { Alert, Badge, Button, Grid, GridCol, Group, Image, Stack, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { isArray } from 'lodash';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { fetchService } from '../../../../cms/utils';
import { getLogoImage } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { fr } from 'date-fns/locale'; // Import the locales you need
import ProductBreadcrumbs from '../../common/ProductBreadcrumbs';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr';
import { displayContentElementFromBlocks } from '../../content/utils-ui';

const displayUrl = (url: string): string => {
  let newUrl = url.replace(/^(https?:\/\/)/, '');

  if (newUrl.endsWith('/')) {
    newUrl = newUrl.slice(0, -1);
  }

  return newUrl;
};

const ServicePage = async ({ code, theme }: { code: string; theme: Theme }) => {
  const t = await getTranslations('services');
  const tFilters = await getTranslations('filters_component');
  const tUtils = await getTranslations('utils');
  const service: Service | undefined = await fetchService({ code, theme });

  if (!service?.name) {
    return <NotFound message={`${code} - ${theme}`} />;
  }

  //const score = calculateMeanScore(service?.tags);

  // @ts-ignore
  const fields = Object.keys(getActionFilters({ themes: [theme] })).filter((f: string) => !!service?.[f]);
  const { name, tags = [], description, updatedAt, url, type } = service;
  const color = themesColors[theme];

  let labelRegion = service?.region ? tFilters(`region_${service.region}_label`) : '';
  labelRegion = labelRegion.includes(`region_${service.region}_label`) ? service.region : labelRegion;

  //TODO refacto type on CMS
  const typeLabel = (isArray(type) ? type[0] : type) || 'company';

  return (
    <Stack>
      <ProductBreadcrumbs theme={theme} name={name} />
      <Stack gap={'lg'}>
        {updatedAt ? (
          <Text fz="sm">
            {t('updatedat_label', { date: format(new Date(updatedAt), tUtils('fulldate-format-day'), { locale: fr }) })}
          </Text>
        ) : null}
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
          {fields.map(field => (
            <Badge
              key={`tag-${theme}-${service.name}-${field}`}
              size="sm"
              variant="outline"
              color="var(--mantine-color-dark-outline)"
              bg="white">
              {tFilters(`filter-${field}-label`)}
            </Badge>
          ))}
        </Group>
        <Grid>
          <GridCol span={{ base: 12, sm: 7 }}>
            <Image
              src={getLogoImage({ service, theme })}
              alt={name}
              layout="intrinsic"
              objectfit="contain"
              style={{ maxHeight: '20rem' }}
            />
          </GridCol>
          <GridCol span={{ base: 12, sm: 5 }}>
            <Stack>
              <Button size="xl" component={Link} href={url} target="_blank" color={color} leftSection={<LinkIcon />}>
                {displayUrl(url)}
              </Button>
              <Alert>
                <Title order={2} c={color}>
                  {description}
                </Title>
              </Alert>
            </Stack>
          </GridCol>
        </Grid>
        {service.premium ? (
          <Stack p="md">{service?.content?.map(displayContentElementFromBlocks)}</Stack>
        ) : (
          <Group gap={'xs'} style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
            {t('go-premium-label')}
            <Link href={'/contact'}>{t('go-premium-cta-label')}</Link>
          </Group>
        )}
      </Stack>
    </Stack>
  );
};

export default ServicePage;
