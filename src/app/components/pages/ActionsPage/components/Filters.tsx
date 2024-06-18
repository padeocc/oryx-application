import { Category, Filters, OtherFilters, Region } from '@/app/components/pages/ActionsPage/utils';
import { Theme, themesColors, themesIcons } from '@/config';
import { Chip, Grid, GridCol, Group, Loader, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PottedPlant } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

const getIconFromTheme = (theme: Theme, selected: boolean = false, color: string) => {
  const Icon = themesIcons?.[theme] || PottedPlant;
  return (
    <Icon
      size={30}
      color={selected ? color : 'lightgray'}
      style={{ cursor: 'pointer' }}
      weight={selected ? 'fill' : 'regular'}
    />
  );
};

const FiltersComponent = ({
  filters,
  loading,
  handleSubmit,
  itemsCount,
  allCategories,
  allRegions,
  otherFilters = {},
  theme
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  itemsCount: number;
  allCategories: Category[];
  allRegions: Region[];
  otherFilters: OtherFilters;
  theme: Theme;
}) => {
  const t = useTranslations('filters_component');
  const tTheme = useTranslations('themes');
  const form = useForm({
    initialValues: filters
  });
  const regionsOptions = allRegions.map(value => {
    const label = t(`region_${value}_label`) || value;
    return { label: label.includes(`region_${value}_label`) ? value : label, value };
  });
  const locationOptions = [
    { label: t('location-online-label'), value: 'online' },
    { label: t('location-store-label'), value: 'store' }
    // { label: t('location-online-store-label'), value: 'store-and-online' }
  ];
  const color = themesColors[theme];

  useEffect(() => {
    form.setValues(filters);
    form.setInitialValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const themesOptions = Object.keys(themesIcons).map(parsedTheme => {
    const color = themesColors[parsedTheme];
    return (
      <Link
        href={`/actions/${parsedTheme}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={`select-theme-${parsedTheme}`}>
        <Stack align="center" gap={'xs'}>
          {getIconFromTheme(parsedTheme as Theme, theme === parsedTheme, color)}
          <Text fz="xs" ta="center" c={theme === parsedTheme ? color : 'lightgray'}>
            {tTheme(parsedTheme)}
          </Text>
        </Stack>
      </Link>
    );
  });

  const saveCategories = (category: string) => {
    const currentCategories = form.values.categories;
    let values = form?.values?.categories || [];
    if (currentCategories?.includes(category)) {
      values = values.filter(c => c !== category);
    } else {
      values = [...values, category];
    }
    const allValues = {
      ...form.values,
      categories: values
    };
    form.setValues(allValues);
    form.setInitialValues(allValues);
    handleSubmit(allValues);
  };

  const saveOtherFilters = (fieldKey: string) => {
    console.log(form.getValues(), form?.[fieldKey]?.['$eq']);

    // @ts-ignore
    const currentValue = !!form?.[fieldKey];
    const allValues = {
      ...form.values,
      // @ts-ignore
      [fieldKey]: !currentValue
    };
    console.log(fieldKey, !currentValue);
    form.setValues(allValues);
    form.setInitialValues(allValues);
    handleSubmit(allValues);
  };

  const saveRegionFilter = (region: string | undefined) => {
    const allValues = {
      ...form.values,
      region
    };
    form.setValues(allValues);
    form.setInitialValues(allValues);
    handleSubmit(allValues);
  };

  const saveLocationFilter = (location: string | undefined | null) => {
    const allValues = {
      ...form.values,
      location: location || undefined
    };
    form.setValues(allValues);
    form.setInitialValues(allValues);
    handleSubmit(allValues);
  };

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmit(values);
        form.setInitialValues(values);
      })}>
      <Grid gutter={'sm'}>
        <GridCol span={{ base: 12 }}>
          <Group justify="flex-start" pl="md" pt="md" pb="md" gap={'xl'}>
            {themesOptions}
          </Group>
        </GridCol>
        <GridCol span={{ base: 12 }} mih="4em">
          {loading ? (
            <Loader type="dots" color="black" size={'sm'} />
          ) : (
            <Text fz="xl" fw={'bold'}>
              {t('inspirations_found', { count: itemsCount })}{' '}
            </Text>
          )}
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Stack gap={'md'}>
            <Group gap={'xs'}>
              <Text fz="md" fw={'bold'} c="dark">
                {t('subjects-label')}
              </Text>
              {allCategories.length > 0 ? (
                <>
                  {allCategories.map((category, index) => (
                    <Chip
                      size={'xs'}
                      key={`cat-${index}`}
                      checked={form.values?.categories?.includes(category)}
                      color={color}
                      onClick={() => {
                        return saveCategories(category);
                      }}>
                      {category}
                    </Chip>
                  ))}
                </>
              ) : null}
            </Group>
            {Object.keys(otherFilters)?.length ? (
              <Group gap={'xs'}>
                <Text fz="md" fw={'bold'} c="dark">
                  {t('actions-label')}
                </Text>
                <>
                  {Object.keys(otherFilters).map(otherFilterKey => {
                    // @ts-ignore
                    const type = otherFilters[otherFilterKey] as 'boolean' | 'string';
                    if (type === 'boolean') {
                      return (
                        <Chip
                          size={'xs'}
                          key={`filter-${otherFilterKey}`}
                          // @ts-ignore
                          checked={!!form?.values?.[otherFilterKey]}
                          onClick={() => {
                            return saveOtherFilters(otherFilterKey);
                          }}>
                          {t(`filter-${otherFilterKey}-label`)}
                        </Chip>
                      );
                    }
                    return null;
                  })}
                </>
              </Group>
            ) : null}
            <Group gap={'xs'}>
              <Text fz="md" fw={'bold'} c="dark">
                {t('regions-label')}
              </Text>
              <Select
                size="xs"
                placeholder={t('filter-region-label')}
                data={regionsOptions}
                multiple
                defaultValue={filters?.region || ''}
                onChange={v => {
                  return saveRegionFilter(v || undefined);
                }}
                clearable
                onClear={() => saveRegionFilter(undefined)}
              />
              <Select
                size="xs"
                placeholder={t('filter-location-label')}
                data={locationOptions}
                multiple
                defaultValue={filters?.location || ''}
                onChange={saveLocationFilter}
                clearable
                onClear={() => saveLocationFilter(undefined)}
              />
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </form>
  );
};

export default FiltersComponent;
