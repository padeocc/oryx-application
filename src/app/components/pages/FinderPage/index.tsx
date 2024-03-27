'use client';

import subjects from '@/data/subjects.json';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridCol,
  Group,
  Loader,
  Stack,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Filters } from '../CatalogPage';
import { getCategoryLabel, getSubjetLabel } from '../CatalogPage/components/Content';

const FinderPage = ({ filters, handleSubmit }: { filters: Filters; handleSubmit: (values: Filters) => void }) => {
  const [categories, setCategories] = useState<{ title: string; code: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: filters
  });

  useEffect(() => {
    setLoading(true);
    const subjectItems = subjects.filter(subject => form.values.subjects?.includes(subject.code));
    setCategories(subjectItems.flatMap(({ categories }) => categories));
    setLoading(false);
  }, [form.values.subjects]);

  const selectedSubjects = form.values.subjects;
  const selectedCategories = form.values.categories;

  return (
    <form
      onSubmit={form.onSubmit(values => {
        return handleSubmit(values);
      })}>
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Stack>
            <Card>
              <CheckboxGroup onChange={subjects => form.setFieldValue('subjects', subjects)} value={selectedSubjects}>
                <Stack gap="xs" pt="xs">
                  {subjects.map(subject => (
                    <Checkbox
                      id={subject.code}
                      key={subject.code}
                      label={subject.title}
                      value={subject.code}
                      name={`subjects[${subject.code}]`}
                      checked={selectedSubjects?.includes(subject.code)}
                    />
                  ))}
                </Stack>
              </CheckboxGroup>
            </Card>
            {loading ? <Loader /> : null}
            {selectedSubjects?.length ? (
              <Card>
                <Title order={2}>Quels sont les sujets qui vous intéressent&nbsp;?</Title>
                <CheckboxGroup
                  onChange={categories => form.setFieldValue('categories', categories)}
                  value={selectedCategories}>
                  <Stack gap="xs" pt="xs">
                    {categories.map(category => (
                      <Checkbox
                        id={category.code}
                        key={category.code}
                        label={category.title}
                        value={category.code}
                        name={`categories[${category.code}]`}
                        checked={selectedCategories?.includes(category.code)}
                      />
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Card>
            ) : null}
          </Stack>
        </GridCol>
        {selectedSubjects?.length || selectedCategories?.length ? (
          <GridCol span={{ base: 12, sm: 6 }}>
            <Card>
              <Title order={2}>Récapitulatif</Title>
              <Stack gap="xl" pt="xl">
                <Stack gap="xs">
                  {selectedSubjects?.length ? <Title order={3}>Thèmes</Title> : null}
                  <Group gap="xs">
                    {selectedSubjects?.map(subject => (
                      <Badge key={`tag-${subject}`}>{getSubjetLabel(subject)}</Badge>
                    )) || null}
                  </Group>
                </Stack>
                <Stack gap="xs">
                  {selectedCategories?.length ? <Title order={3}>Sujets</Title> : null}
                  <Group gap="xs">
                    {selectedCategories?.map(category => (
                      <Badge key={`tag-${category}`}>{getCategoryLabel(category)}</Badge>
                    )) || null}
                  </Group>
                </Stack>
                <Button size="xl" type="submit" disabled={!selectedCategories?.length}>
                  Valider les choix
                </Button>
              </Stack>
            </Card>
          </GridCol>
        ) : null}
      </Grid>
    </form>
  );
};

export default FinderPage;
