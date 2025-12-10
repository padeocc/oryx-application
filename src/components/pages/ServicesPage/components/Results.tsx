import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import ServiceCard from '@/components/ServiceCard';
import { Theme, themesColors } from '@/config';
import { cleanFiltersValues } from '@/components/content/utils';
import { Filters, Service } from '@/types';
import { Alert, Breadcrumbs, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import Pagination from './Pagination';
import categoriesData from '@/components/navigation/themes-categories.json';

const SKELETON_COUNT = 12;
const BREADCRUMB_STYLE = { textDecoration: 'underline', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' };
const BREADCRUMB_TEXT_STYLE = { textDecoration: 'underline' };

const getCategoryForSubCategory = (theme: Theme, subCategory: string): string | null => {
  const themeCategories = categoriesData[theme] || {};
  
  for (const [category, subCategories] of Object.entries(themeCategories)) {
    if (Array.isArray(subCategories) && subCategories.includes(subCategory)) {
      return category;
    }
  }
  
  return null;
};

const Results = ({
  filters,
  data,
  activePage = 1,
  total,
  totalNumberOfResults,
  isLoading,
  originalQuery
}: {
  filters: Filters;
  data: IResult[];
  total: number;
  activePage: number;
  totalNumberOfResults: number;
  isLoading: boolean;
  originalQuery?: string;
}) => {
  const t = useTranslations('content');
  const tThemes = useTranslations('themes');

  const breadcrumbItems = useMemo(() => {
    if (!filters.theme?.length) return [];

    const currentTheme = filters.theme[0];
    const items = filters.theme.map((theme: Theme, index: number) => (
      <Link
        key={`breadcrumb-theme-${theme}-${index}`}
        href={`/services?filters=${cleanFiltersValues({ theme: filters.theme?.slice(0, index + 1) || [] })}`}
        style={BREADCRUMB_STYLE}
      >
        <Text size="sm" c="gray.7" style={BREADCRUMB_TEXT_STYLE}>
          {tThemes(theme)}
        </Text>
      </Link>
    ));

    if (originalQuery && currentTheme) {
      const parentCategory = getCategoryForSubCategory(currentTheme, originalQuery);

      if (parentCategory) {
        items.push(
          <Link
            key="breadcrumb-category"
            href={`/services?filters=${cleanFiltersValues({ theme: filters.theme || [], query: parentCategory })}`}
            style={BREADCRUMB_STYLE}
          >
            <Text size="sm" c="gray.7" style={BREADCRUMB_TEXT_STYLE}>
              {parentCategory}
            </Text>
          </Link>
        );
        items.push(
          <Link
            key="breadcrumb-subcategory"
            href={`/services?filters=${cleanFiltersValues({ theme: filters.theme || [], query: originalQuery })}`}
            style={BREADCRUMB_STYLE}
          >
            <Text size="sm" c="gray.7" style={BREADCRUMB_TEXT_STYLE}>
              {originalQuery}
            </Text>
          </Link>
        );
      } else {
        items.push(
          <Link
            key="breadcrumb-category"
            href={`/services?filters=${cleanFiltersValues({ theme: filters.theme || [], query: originalQuery })}`}
            style={BREADCRUMB_STYLE}
          >
            <Text size="sm" c="gray.7" style={BREADCRUMB_TEXT_STYLE}>
              {originalQuery}
            </Text>
          </Link>
        );
      }
    }

    return items;
  }, [filters.theme, originalQuery, tThemes]);

  const pageTitle = useMemo(() => {
    if (originalQuery) {
      return originalQuery;
    }
    if (filters.theme?.length) {
      return tThemes(filters.theme[0]);
    }
    return '';
  }, [originalQuery, filters.theme, tThemes]);

  const services = useMemo(() => transformServicesFromResults({ results: data }), [data]);

  if (isLoading) {
    return (
      <Stack>
        <Grid justify="flex-start" align="stretch" mt="lg" gutter={{ base: 'md', sm: 'lg' }}>
          {[...Array(SKELETON_COUNT)].map((_item, index) => (
            <GridCol span={{ base: 12, sm: 4, md: 3 }} key={`skel-${index}`}>
              <ServiceCard
                color={'var(--mantine-primary-color-7)'}
                asLoader
                backgroundColor={'var(--mantine-primary-color-2)'}
              />
            </GridCol>
          ))}
        </Grid>
      </Stack>
    );
  }

  return (
    <Stack>
      {breadcrumbItems.length > 0 && (
        <Breadcrumbs separator=" / " style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {breadcrumbItems}
        </Breadcrumbs>
      )}
      
      {pageTitle && (
        <Title order={1}>
          {pageTitle}
        </Title>
      )}

      {data.length === 0 ? (
        <Grid justify="flex-start" align="stretch" mt="lg">
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
              <Link href={'/service/add'}>{t('contact_us')}</Link>
            </Alert>
          </GridCol>
        </Grid>
      ) : (
        <Stack>
          <Group justify="space-between" visibleFrom="md">
            <Text size="sm" c="gray.6">
              {t(`total-results-label`, { count: totalNumberOfResults })}
            </Text>
            {total > 1 ? <Pagination page={activePage} total={total} filters={filters} /> : null}
          </Group>
          
          <Grid justify="flex-start" align="stretch" mt="lg" gutter={{ base: 'md', sm: 'lg' }}>
            {services.map((service: Service, index: number) => (
              <GridCol
                span={{ base: 12, sm: 4, md: 3 }}
                key={`action-${service.theme}-${service.name}-${index}`}>
                <ServiceCard
                  service={service}
                  backgroundColor={'var(--mantine-primary-color-2)'}
                  color={themesColors[service.theme?.[0]]}
                  theme={service.theme?.[0]}
                />
              </GridCol>
            ))}
          </Grid>
        </Stack>
      )}
      
      {total > 1 ? (
        <Group justify="end">
          <Pagination page={activePage} total={total} filters={filters} />
        </Group>
      ) : null}
    </Stack>
  );
};

export default Results;
