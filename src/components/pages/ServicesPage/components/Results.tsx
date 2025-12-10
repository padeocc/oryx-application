import { IResult } from '@/algolia/types';
import { transformServicesFromResults } from '@/algolia/utils';
import ServiceCard from '@/components/ServiceCard';
import { Theme, themesColors } from '@/config';
import { Filters, Service } from '@/types';
import { Alert, Box, Breadcrumbs, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import { cleanFiltersValues } from '@/components/content/utils';
import categoriesData from '@/components/navigation/themes-categories.json';
import Pagination from './Pagination';

interface ResultsProps {
  filters: Filters;
  originalQuery?: string;
  data: IResult[];
  activePage?: number;
  total: number;
  totalNumberOfResults: number;
  isLoading: boolean;
  selectedActionsCount?: number;
  onToggleFilters?: () => void;
}

const SKELETON_COUNT = 12;
const BREADCRUMB_STYLE = { textDecoration: 'underline', color: 'inherit', whiteSpace: 'nowrap' } as const;
const BREADCRUMB_TEXT_STYLE = { display: 'inline' } as const;

const Results = ({
  filters,
  originalQuery,
  data,
  activePage = 1,
  total,
  totalNumberOfResults,
  isLoading
}: ResultsProps) => {
  const t = useTranslations('content');
  const tThemes = useTranslations('themes');

  const getCategoryForSubCategory = (theme: Theme, subCategory: string): string | null => {
    const themeCategories = (categoriesData as Record<string, Record<string, string[]>>)[theme] || {};
    for (const [category, subCategories] of Object.entries(themeCategories)) {
      if (Array.isArray(subCategories) && subCategories.includes(subCategory)) {
        return category;
      }
    }
    return null;
  };

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
    if (originalQuery) return originalQuery;
    if (filters.theme?.length) {
      return filters.theme.map((theme: Theme) => tThemes(theme)).join(', ');
    }
    return '';
  }, [originalQuery, filters.theme, tThemes]);

  const services = useMemo(() => transformServicesFromResults({ results: data }), [data]);

  if (isLoading) {
    return (
      <Stack>
        <Grid justify="flex-start" align="stretch" mt="lg" gutter={{ base: 'md', sm: 'lg' }}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <GridCol span={{ base: 12, sm: 4, md: 3 }} key={`skeleton-${index}`}>
              <ServiceCard
                color="var(--mantine-primary-color-7)"
                asLoader
                backgroundColor="var(--mantine-primary-color-2)"
              />
            </GridCol>
          ))}
        </Grid>
      </Stack>
    );
  }

  if (data.length === 0) {
    return (
      <Grid justify="flex-start" align="stretch" mt="lg">
        <GridCol span={12}>
          <Alert variant="outline" color="orange" title={t('no_results')} icon={<SmileyMeh size={30} />}>
            <Link href="/service/add">{t('contact_us')}</Link>
          </Alert>
        </GridCol>
      </Grid>
    );
  }

  return (
    <Stack>
      <Stack gap="md">
        {breadcrumbItems.length > 0 && (
          <Box style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Breadcrumbs separator=" / ">{breadcrumbItems}</Breadcrumbs>
          </Box>
        )}

        {pageTitle && (
          <Title order={1} size="h1" fw={700} c="dark" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {pageTitle}
          </Title>
        )}

        <Text size="sm" c="gray.6" fw={400}>
          {t('total-results-label', { count: totalNumberOfResults })}
        </Text>

        <Grid justify="flex-start" align="stretch" gutter={{ base: 'md', sm: 'lg' }}>
          {services.map((service: Service, index: number) => (
            <GridCol span={{ base: 12, sm: 4, md: 3 }} key={`service-${service.theme}-${service.name}-${index}`}>
              <ServiceCard
                service={service}
                backgroundColor="var(--mantine-primary-color-2)"
                color={themesColors[service.theme?.[0]]}
                theme={service.theme?.[0]}
              />
            </GridCol>
          ))}
        </Grid>
      </Stack>

      {total > 1 && (
        <Group justify="end">
          <Pagination page={activePage} total={total} filters={filters} />
        </Group>
      )}
    </Stack>
  );
};

export default Results;
