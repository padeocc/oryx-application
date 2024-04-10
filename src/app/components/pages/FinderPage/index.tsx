'use client';

import { Filters } from '@/components/pages/CatalogPage';
import subjects from '@/data/subjects.json';
import { getCategoriesFromSubjects, getCategoryLabel, getSubjetLabel } from '@/pages/CatalogPage/utils';
import { Badge, Button, Card, Checkbox, CheckboxGroup, Grid, GridCol, Group, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

const FinderPage = ({ filters, handleSubmit }: { filters: Filters; handleSubmit: (values: Filters) => void }) => {
  const [categories, setCategories] = useState<{ title: string; code: string }[]>([]);
  const form = useForm({
    initialValues: filters
  });

  const selectedSubjects = form.values.subjects;
  const selectedCategories = form.values.categories;

  useEffect(() => {
    const newCategories = getCategoriesFromSubjects(selectedSubjects);
    setCategories(newCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={form.onSubmit(values => {
        return handleSubmit(values);
      })}>
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Stack>
            <Card>
              <CheckboxGroup value={selectedSubjects}>
                <Stack gap="xs" pt="xs">
                  {subjects.map(subject => (
                    <Checkbox
                      id={subject.code}
                      key={subject.code}
                      label={subject.title}
                      value={subject.code}
                      checked={selectedSubjects?.includes(subject.code)}
                      onChange={subject => {
                        const possibleCategories = getCategoriesFromSubjects([subject.target.value]);
                        setCategories(possibleCategories);
                        const categories = form.values.categories.filter(fc =>
                          possibleCategories.map(c => c.code).includes(fc)
                        );
                        form.setValues({ subjects: [subject.target.value], categories });
                      }}
                    />
                  ))}
                </Stack>
              </CheckboxGroup>
            </Card>
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
