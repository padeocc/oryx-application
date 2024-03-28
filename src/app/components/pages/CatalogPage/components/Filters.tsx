import subjects from '@/data/subjects.json';
import { Button, Grid, GridCol, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Funnel } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';
import { Filters } from '..';
import { getCategoriesFromSubjects } from './Content';

const Filters = ({
  filters,
  loading,
  handleSubmit
}: {
  filters: Filters;
  loading: boolean;
  handleSubmit: (values: Filters) => void;
}) => {
  const [categories, setCategories] = useState<{ title: string; code: string }[]>([]);

  const form = useForm({
    initialValues: filters
  });

  const selectedSubjects = form.values.subjects;

  useEffect(() => {
    form.setValues(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <GridCol span={{ base: 12, sm: 5 }}>
          <MultiSelect
            {...form.getInputProps('subjects')}
            placeholder="Thèmes"
            data={subjects.map(s => ({ value: s.code, label: s.title }))}
            onChange={subjects => {
              const possibleCategories = getCategoriesFromSubjects(subjects);
              setCategories(possibleCategories);
              const categories = form.values.categories.filter(fc => possibleCategories.map(c => c.code).includes(fc));
              form.setValues({ subjects, categories });
            }}
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 5 }}>
          <MultiSelect
            {...form.getInputProps('categories')}
            placeholder="Sujets"
            data={categories.map(c => ({ value: c.code, label: c.title }))}
            onChange={categories => {
              form.setFieldValue('categories', categories);
            }}
            disabled={selectedSubjects?.length === 0}
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 2 }} ta="right">
          <Button type="submit" w="100%" loading={loading} disabled={!form.isDirty() || !categories.length}>
            <Funnel size="20" />
          </Button>
        </GridCol>
      </Grid>
    </form>
  );
};

export default Filters;
