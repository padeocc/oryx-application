import { Theme, getActionFilters, themesColors } from '@/config';
import { FetchService, FetchServiceContent, Service } from '@/types';
import {
  Alert,
  Badge,
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { format } from 'date-fns';
import { isArray } from 'lodash';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLogoImage, sortAlphabetically } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { fr } from 'date-fns/locale';
import ProductBreadcrumbs from '../../common/ProductBreadcrumbs';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr';
import { ContentAccordion } from '../../content/ContentAccordion';
import { fetchService } from '@/algolia/utils';
import ProductLandingPageBanner from '@/components/common/ProductLandingPageBanner';

type PageParams = {
  code: string
  theme: Theme
  fetchService: FetchService
  fetchServiceContent: FetchServiceContent
};

const getRegionTranslationKey = (rawRegion: string | null | undefined): string => {
  if (!rawRegion) return '';
  const regionClean = rawRegion.replace(/^Région\s*:\s*/i, '').trim();
  return `region_${regionClean}_label`;
};

const displayUrl = (url: string): string => {
  let newUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
  if (newUrl.endsWith('/')) {
    newUrl = newUrl.slice(0, -1);
  }
  return newUrl;
};

const ServicePage = async ({ code, theme, fetchService, fetchServiceContent }: PageParams) => {
  const t = await getTranslations('services');
  const tFilters = await getTranslations('filters_component');
  const tUtils = await getTranslations('utils');
  const service: Service | undefined = await fetchService({ code, theme });

  if (!service?.name) {
    return <NotFound message={`${code} - ${theme}`} />;
  }

  let premiumContent: Array<any> = [];
  let premiumContentError = false;

  await fetchServiceContent({code, theme})
    .then(res => {
      premiumContent = res
    })
    .catch(() => premiumContentError = true);

  // @ts-ignore
  const fields = Object.keys(getActionFilters({ themes: [theme] })).filter((f: string) => !!service?.[f]);
  const { name, tags = [], description, updatedAt, url, type } = service;
  const color = themesColors[theme];

  const regionKey = getRegionTranslationKey(service?.region);
  let labelRegion = regionKey ? tFilters(regionKey) : '';
  if (!labelRegion || labelRegion === regionKey) {
    labelRegion = service?.region ?? '';
  }

  //TODO refacto type on CMS
  const typeLabel = (isArray(type) ? type[0] : type) || 'company';

  const sortedFields = [...fields].sort((a, b) => 
    sortAlphabetically(tFilters(`filter-${a}-label`), tFilters(`filter-${b}-label`))
  );

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
          {sortedFields.map(field => (
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
                <Stack gap={4} align="start">
                  {name}
                  <Text fz="xs">{displayUrl(url)}</Text>
                </Stack>
              </Button>
              <Alert>
                <Title order={2} c={color}>
                  {description}
                </Title>
              </Alert>
            </Stack>
          </GridCol>
        </Grid>
        {premiumContentError ? (
          <Alert variant="light" color="blue">
            {t('error-fetch-premium')}
          </Alert>
        ) : null}
        {service.premium && Array.isArray(premiumContent) && premiumContent.length > 0 ? (
            <>
              <ContentAccordion content={premiumContent} />
              <Group gap={'xs'} style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                {t('report-offer-label')}
                <Link href={`/contact?report=${code}`}>{t('report-offer-cta-label')}</Link>
              </Group>
            </>
        ) : (
          <Group gap={'xs'} style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
            {t('go-premium-label')}
            <Link href={'/contact'}>{t('go-premium-cta-label')}</Link>
          </Group>
        )}
        <ProductLandingPageBanner theme={theme} />
      </Stack>
    </Stack>
  );
};

export async function generateReportMessage(code: string) {
  const service = await fetchService({ code, theme: 'default' as Theme });
  const name = service?.name || code;

  const t = await getTranslations('servicePage');
  return t('reportMessage', { name });
}

export default ServicePage;
