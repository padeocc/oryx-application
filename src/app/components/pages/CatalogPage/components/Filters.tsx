import { Theme } from '@/app/[locale]/actions/[theme]/page';
import { Chip, Grid, GridCol, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  Basketball,
  BowlFood,
  Butterfly,
  CalendarDots,
  CallBell,
  CreditCard,
  House,
  Pants,
  PottedPlant,
  Recycle,
  Scooter
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect } from 'react';
import { Filters } from '..';
import { getCategoriesFromSubjects, getSubjetLabel } from '../utils';

const themesIcons = {
  transport: Scooter,
  eating: BowlFood,
  housing: House,
  goods: Basketball,
  services: CallBell,
  eventformationinfluence: CalendarDots,
  finance: CreditCard,
  lifestyle: Pants,
  pollution: Recycle,
  biodiversity: Butterfly
};

const getIconFromTheme = (theme: Theme, selected: boolean = false) => {
  const Icon = themesIcons?.[theme] || PottedPlant;
  return (
    <Icon
      size={30}
      color={selected ? 'gray' : 'lightgray'}
      style={{ cursor: 'pointer' }}
      weight={selected ? 'fill' : 'regular'}
    />
  );
};

const FiltersComponent = ({
  filters,
  loading,
  handleSubmit,
  itemsCount
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  itemsCount: number;
}) => {
  const form = useForm({
    initialValues: filters
  });
  const selectedSubjects = (filters.subjects.length && filters.subjects) || [];
  const categories = getCategoriesFromSubjects(selectedSubjects);

  useEffect(() => {
    form.setValues(filters);
    form.setInitialValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const options = Object.keys(themesIcons).map(item => (
    <GridCol key={`select-theme-${item}`} span={{ base: 2, md: 'auto' }}>
      <Link href={`/fr/actions/${item}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Stack align="center">
          {getIconFromTheme(item as Theme, selectedSubjects.includes(item as Theme) || selectedSubjects.length === 0)}
          <Text
            fz="xs"
            ta="center"
            c={selectedSubjects.includes(item as Theme) || selectedSubjects.length === 0 ? '#808080' : 'lightgray'}>
            {getSubjetLabel(item)}
          </Text>
        </Stack>
      </Link>
    </GridCol>
  ));

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmit(values);
        form.setInitialValues(values);
      })}>
      <Grid gutter={'xl'}>
        <GridCol span={{ base: 12 }}>
          <Grid justify="flex-start">{options}</Grid>
        </GridCol>
        <GridCol span={{ base: 12 }}>
          <Grid justify="flex-start">
            <Title order={2}>{loading ? <Loader size={'xs'} /> : `${itemsCount} inspirations trouvées`}</Title>
          </Grid>
        </GridCol>
        {categories.length > 0 ? (
          <GridCol span={{ base: 12 }}>
            <Group gap={'xs'}>
              {categories.map((category, index) => (
                <Chip
                  key={`cat-${index}`}
                  checked={form.values.categories.includes(category.code)}
                  onClick={() => {
                    const currentCategories = form.values.categories;
                    let values = form.values.categories;
                    if (currentCategories.includes(category.code)) {
                      values = values.filter(c => c !== category.code);
                    } else {
                      values = [...values, category.code];
                    }
                    const allValues = {
                      ...form.values,
                      categories: values
                    };
                    form.setValues(allValues);
                    handleSubmit(allValues);
                    form.setInitialValues(allValues);
                  }}>
                  {category.title}
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
