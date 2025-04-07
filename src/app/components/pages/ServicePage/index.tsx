import { Theme, getActionFilters, themesColors } from '@/config';
import { FetchService, Service } from '@/types';
import {
  Alert,
  Badge,
  Blockquote,
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Image,
  List,
  ListItem,
  Space,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { format } from 'date-fns';
import { isArray } from 'lodash';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getLogoImage } from '../../content/utils';
import NotFound from '../../navigation/NotFound';
import { fr } from 'date-fns/locale'; // Import the locales you need
import ProductBreadcrumbs from '../../common/ProductBreadcrumbs';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr';

type PageParams = {
  code: string
  theme: Theme
  fetchService: FetchService
};

const displayContentElement = (node: any): React.ReactElement | undefined => {
  const { type, children } = node;
  switch (type) {
    case 'heading':
      return (
        <Title
          order={node.level}
          fw={node.level === 1 ? 'bolder' : node.level === 2 ? 'bold' : node.level === 3 ? 'bold' : 'normal'}
          fz={node.level === 1 ? '1.6rem' : node.level === 2 ? '1.4rem' : node.level === 3 ? '1.2rem' : '1rem'}>
          {children.map(displayContentElement)}
        </Title>
      );
    case 'paragraph':
      return (
        <Box>
          <Text>{children.map(displayContentElement)}</Text>
        </Box>
      );
    case 'text':
      let props = {};

      if (node.bold) {
        props = { ...props, fw: 'bold' };
      }

      if (node.strikethrough) {
        props = { ...props, td: 'line-through' };
      }

      if (node.underline) {
        props = { ...props, td: 'underline' };
      }

      if (node.italic) {
        props = { ...props, fs: 'italic' };
      }

      return (
        <Text component="span" {...props}>
          {node.text}
        </Text>
      );
    case 'link':
      return (
        <Link href={`${node.url}`} target="_blank">
          {children.map(displayContentElement)}
        </Link>
      );
    case 'image':
      return <Image style={{ maxWidth: '100%' }} src={node.image.url} alt={node.image.alternativeText || ''} />;
    case 'list':
      const listTag = node.format === 'unordered' ? 'ul' : 'ol';
      return <List c={listTag}>{node.children.map(displayContentElement)}</List>;
    case 'list-item':
      return <ListItem>{node.children.map(displayContentElement)}</ListItem>;
    case 'quote':
      return (
        <>
          <Space h="md" />
          <Blockquote>{children.map(displayContentElement)}</Blockquote>
        </>
      );
    default:
      return <Space h="md" />;
  }
};

const displayUrl = (url: string): string => {
  let newUrl = url.replace(/^(https?:\/\/)/, '');

  if (newUrl.endsWith('/')) {
    newUrl = newUrl.slice(0, -1);
  }

  return newUrl;
};

const ServicePage = async ({ code, theme, fetchService }: PageParams) => {
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
          <Stack p="md">{service?.content?.map(displayContentElement)}</Stack>
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
