import { Theme, themesColors, themesIcons } from '@/config';
import { ActionFilters, Category, Filters, Region } from '@/types';
import {
  Alert,
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  Loader,
  MultiSelectProps,
  Select,
  SelectProps,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PottedPlant } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import ChipSelect from './ChipSelect';
import styles from './filters.module.css';

const getIconFromTheme = (theme: Theme, selected: boolean = false) => {
  const Icon = themesIcons?.[theme] || PottedPlant;
  return <Icon size={30} style={{ cursor: 'pointer' }} weight={selected ? 'fill' : 'regular'} />;
};

const FiltersComponent = ({
  filters,
  loading,
  handleSubmit,
  itemsCount,
  allTags,
  activeTags,
  allRegions,
  allActionFilters = {},
  theme
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  itemsCount: number;
  allTags: Category[];
  activeTags: Category[];
  allRegions: Region[];
  allActionFilters: ActionFilters;
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

  useEffect(() => {
    form.setValues(filters);
    form.setInitialValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const themesOptions = Object.keys(themesIcons).map(parsedTheme => {
    const color = themesColors[parsedTheme];
    const actualColor = theme === parsedTheme ? color : 'dark';

    return (
      <Link
        href={`/actions/${parsedTheme}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={`select-theme-${parsedTheme}`}>
        <Stack align="center" gap={'xs'}>
          <Container c={actualColor}>{getIconFromTheme(parsedTheme as Theme, theme === parsedTheme)}</Container>
          <Text fz="xs" ta="center" c={actualColor} visibleFrom="sm">
            {tTheme(parsedTheme)}
          </Text>
        </Stack>
      </Link>
    );
  });

  const saveTags = (tags: string[]) => {
    const allValues = {
      ...form.values,
      tags
    };
    form.setValues(allValues);
    form.setInitialValues(allValues);
    handleSubmit(allValues);
  };

  const saveActionsFilters = (actions: string[] = []) => {
    const allActions: { [x: string]: boolean } = Object.keys(allActionFilters).reduce(
      (all: { [key: string]: boolean }, action: string) => {
        const found = actions.includes(action);
        return { ...all, [action]: found };
      },
      {}
    );
    const allValues = {
      ...form.values,
      ...allActions
    };
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

  const selectsStyleProps: MultiSelectProps = {
    size: 'lg',
    radius: 0,
    clearable: true,
    variant: 'filled',
    classNames: { input: styles.filterSelect },
    styles: { pill: { display: 'none' } },
    comboboxProps: { position: 'bottom', withinPortal: false, zIndex: 1000 }
  };

  const values = form?.getValues();
  const selectedTags = values?.['tags'];
  const selectedActions = Object.keys(allActionFilters).filter(action => {
    //@ts-ignore
    return !!values?.[action];
  });

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmit(values);
        form.setInitialValues(values);
      })}>
      <Grid gutter={'sm'}>
        <GridCol span={{ base: 12 }}>
          <Alert>
            <SimpleGrid cols={{ base: 10 }}>{themesOptions}</SimpleGrid>
          </Alert>
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
          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing={'sm'}>
            <ChipSelect
              all={allTags.map(item => ({ label: item, value: item }))}
              selected={selectedTags}
              save={saveTags}
              placeholder={t('subjects-label', { count: selectedTags?.length || 0 })}
              className={styles.filterSelect}
            />
            <ChipSelect
              all={Object.keys(allActionFilters).map(action => ({ label: t(`filter-${action}-label`), value: action }))}
              selected={selectedActions}
              save={saveActionsFilters}
              placeholder={t('actions-label', { count: selectedActions?.length || 0 })}
              className={styles.filterSelect}
            />
            <ChipSelect
              all={regionsOptions}
              selected={values.region ? [values.region] : []}
              save={regions => {
                saveRegionFilter(regions[0]);
              }}
              placeholder={t('filter-region-label')}
              className={styles.filterSelect}
              single
            />
            <Select
              {...(selectsStyleProps as SelectProps)}
              size="lg"
              radius={0}
              clearable
              variant="filled"
              placeholder={t('filter-location-label')}
              data={locationOptions}
              onChange={saveLocationFilter}
              onClear={() => saveLocationFilter(undefined)}
              styles={{ input: { cursor: 'pointer' } }}
            />
          </SimpleGrid>
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Group justify="flex-end">
            <Button
              variant="subtle"
              size="sm"
              component={Link}
              href={`/actions/${theme}`}
              onClick={() => {
                const actions: { [x: string]: boolean } = Object.keys(allActionFilters).reduce(
                  (all: { [key: string]: boolean }, action: string) => ({ ...all, [action]: false }),
                  {}
                );
                const emptyValues: Filters = {
                  ...actions,
                  theme,
                  tags: [],
                  region: '',
                  location: ''
                };
                form.setValues(emptyValues);
                form.setInitialValues(emptyValues);
              }}>
              {t('reset-action-label')}
            </Button>
          </Group>
        </GridCol>
      </Grid>
    </form>
  );
};

export default FiltersComponent;
