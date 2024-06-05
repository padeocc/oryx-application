import { Category, Filters, OtherFilters, Region } from '@/app/components/pages/ActionsPage/utils';
import { Theme, themesColors, themesIcons } from '@/config';
import { Chip, Grid, GridCol, Group, Loader, Select, Stack, Text, Title } from '@mantine/core';
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
  otherFilters = {}
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  itemsCount: number;
  allCategories: Category[];
  allRegions: Region[];
  otherFilters: OtherFilters;
}) => {
  const t = useTranslations('filters_component');
  const tTheme = useTranslations('themes');
  const form = useForm({
    initialValues: filters
  });
  const selectedTheme = filters.theme as Theme;
  const regionsOptions = allRegions.map(value => {
    const label = t(`region_${value}_label`) || value;
    return { label: label.includes(`region_${value}_label`) ? value : label, value };
  });

  const locationOptions = [
    { label: t('location-online-label'), value: 'online' },
    { label: t('location-store-label'), value: 'store' }
    // { label: t('location-online-store-label'), value: 'store-and-online' }
  ];

  useEffect(() => {
    form.setValues(filters);
    form.setInitialValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const options = Object.keys(themesIcons).map(theme => {
    const color = themesColors[theme];
    return (
      <Link
        href={`/actions/${theme}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={`select-theme-${theme}`}>
        <Stack align="center" gap={'xs'}>
          {getIconFromTheme(theme as Theme, selectedTheme === theme, color)}
          <Text fz="xs" ta="center" c={selectedTheme === theme ? color : 'lightgray'}>
            {tTheme(theme)}
          </Text>
        </Stack>
      </Link>
    );
  });

  const color = themesColors[selectedTheme];

  const saveCategories = (category: string) => {
    const currentCategories = form.values.categories;
    let values = form.values.categories;
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
    handleSubmit(allValues);
    form.setInitialValues(allValues);
  };

  const saveOtherFilters = (fieldKey: string) => {
    const formOthers = form?.values?.others || {};
    const others: OtherFilters = {
      ...formOthers,
      // @ts-ignore
      [fieldKey]: !formOthers?.[fieldKey]
    };
    const allValues = {
      ...form.values,
      others
    };
    form.setValues(allValues);
    handleSubmit(allValues);
    form.setInitialValues(allValues);
  };

  const saveRegionsFilter = (region: string | null) => {
    const regions: string[] = region ? [region] : [];
    const allValues = {
      ...form.values,
      regions
    };
    form.setValues(allValues);
    handleSubmit(allValues);
    form.setInitialValues(allValues);
  };

  const saveLocationFilter = (location: string | undefined | null) => {
    const allValues = {
      ...form.values,
      location: location || undefined
    };
    form.setValues(allValues);
    handleSubmit(allValues);
    form.setInitialValues(allValues);
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
            {options}
          </Group>
        </GridCol>
        <GridCol span={{ base: 12 }} mih="4em">
          {loading ? (
            <Loader type="dots" color="black" size={'sm'} />
          ) : (
            <Title order={2}>{t('inspirations_found', { count: itemsCount })} </Title>
          )}
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Stack gap={'md'}>
            <Group gap={'xs'}>
              <Title order={5} c="dark">
                {t('subjects-label')}
              </Title>
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
                <Title order={5} c="dark">
                  {t('actions-label')}
                </Title>
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
                          checked={!!form?.values?.others?.[otherFilterKey]}
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
              <Title order={5} c="dark">
                {t('regions-label')}
              </Title>
              <Select
                size="xs"
                placeholder={t('filter-region-label')}
                data={regionsOptions}
                multiple
                onChange={saveRegionsFilter}
                clearable
                onClear={() => saveRegionsFilter(null)}
              />
              <Select
                size="xs"
                placeholder={t('filter-location-label')}
                data={locationOptions}
                multiple
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
