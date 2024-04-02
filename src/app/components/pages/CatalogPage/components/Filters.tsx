import { Theme } from '@/app/[locale]/actions/[theme]/page';
import { Button, Grid, GridCol, MultiSelect, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  Basketball,
  BowlFood,
  Butterfly,
  CalendarDots,
  CallBell,
  CreditCard,
  Funnel,
  House,
  Pants,
  PottedPlant,
  Recycle,
  Scooter
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect } from 'react';
import { Filters } from '..';
import { getCategoriesFromSubjects, getSubjetLabel } from './Content';

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
      color={selected ? 'orange' : 'gray'}
      style={{ cursor: 'pointer' }}
      weight={selected ? 'fill' : 'regular'}
    />
  );
};

const Filters = ({
  filters,
  loading,
  handleSubmit,
  themes
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
  themes: Theme[];
}) => {
  const form = useForm({
    initialValues: filters
  });

  const selectedSubjects = (filters.subjects.length && filters.subjects) || [];
  const categories = getCategoriesFromSubjects(selectedSubjects);

  useEffect(() => {
    form.setValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const options = Object.keys(themesIcons).map(item => (
    <GridCol key={`select-theme-${item}`} span={{ base: 3, sm: 2, lg: 'auto' }}>
      <Link href={`/fr/actions/${item}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Stack align="center">
          {getIconFromTheme(item as Theme, selectedSubjects.includes(item as Theme) || selectedSubjects.length === 0)}
          <Text fz="xs" ta="center">
            {getSubjetLabel(item)}
          </Text>
        </Stack>
      </Link>
    </GridCol>
  ));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid justify="flex-end">
        <GridCol span={{ base: 12 }}>
          <Grid justify="flex-end">{options}</Grid>
        </GridCol>

        <GridCol span={{ base: 12, sm: 10 }}>
          <MultiSelect
            {...form.getInputProps('categories')}
            placeholder="Sujets"
            data={categories.map(c => ({ value: c.code, label: c.title }))}
            onChange={categories => {
              form.setFieldValue('categories', categories);
            }}
            disabled={selectedSubjects?.length === 0 || selectedSubjects?.length === 0}
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 2 }} ta="right">
          <Button
            type="submit"
            w="100%"
            loading={loading}
            disabled={!form.isDirty() || !categories.length || selectedSubjects?.length === 0}>
            <Funnel size="20" />
          </Button>
        </GridCol>
      </Grid>
    </form>
  );
};

export default Filters;