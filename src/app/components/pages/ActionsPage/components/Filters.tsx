import { Category, Filters } from '@/app/components/pages/ActionsPage/utils';
import { Theme, themesIcons } from '@/config';
import { Chip, Grid, GridCol, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PottedPlant } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

const getIconFromTheme = (theme: Theme, selected: boolean = false) => {
  const Icon = themesIcons?.[theme] || PottedPlant;
  return (
    <Icon
      size={30}
      color={selected ? 'var(--mantine-primary-color-8)' : 'lightgray'}
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
  allCategories
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  itemsCount: number;
  allCategories: Category[];
}) => {
  const t = useTranslations('filters_component');
  const tTheme = useTranslations('themes');
  const form = useForm({
    initialValues: filters
  });
  const selectedSubjects = (filters.subjects.length && filters.subjects) || [];

  useEffect(() => {
    form.setValues(filters);
    form.setInitialValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const options = Object.keys(themesIcons).map(item => (
    <Link href={`/actions/${item}`} style={{ color: 'inherit', textDecoration: 'none' }} key={`select-theme-${item}`}>
      <Stack align="center" gap={'xs'}>
        {getIconFromTheme(item as Theme, selectedSubjects.includes(item as Theme) || selectedSubjects.length === 0)}
        <Text
          fz="xs"
          ta="center"
          c={
            selectedSubjects.includes(item as Theme) || selectedSubjects.length === 0
              ? 'var(--mantine-primary-color-8)'
              : 'lightgray'
          }>
          {tTheme(item)}
        </Text>
      </Stack>
    </Link>
  ));

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmit(values);
        form.setInitialValues(values);
      })}>
      <Grid gutter={'xl'}>
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
        {allCategories.length > 0 ? (
          <GridCol span={{ base: 12 }}>
            <Group gap={'xs'}>
              {allCategories.map((category, index) => (
                <Chip
                  key={`cat-${index}`}
                  checked={form.values?.categories?.includes(category)}
                  onClick={() => {
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
                  }}>
                  {category}
                </Chip>
              ))}
            </Group>
          </GridCol>
        ) : null}
      </Grid>
    </form>
  );
};

export default FiltersComponent;
