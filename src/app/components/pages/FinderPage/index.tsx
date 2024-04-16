'use client';

import { getCategoriesFromSubjects, getCategoryLabel, getSubjetLabel } from '@/app/components/pages/ActionsPage/utils';
import subjects from '@/data/subjects.json';
import { useLocalState } from '@/state';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridCol,
  Group,
  Radio,
  RadioGroup,
  Stack,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const FinderPage = () => {
  const t = useTranslations('finder_page');
  const [categories, setCategories] = useState<{ title: string; code: string }[]>([]);
  const { filters, setFilters } = useLocalState();

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
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <form
        action={async () => {
          setFilters(form.values);
          redirect(`/actions`);
        }}>
        <Grid>
          <GridCol span={{ base: 12, sm: 6 }}>
            <Stack>
              <Card>
                <RadioGroup value={selectedSubjects[0]}>
                  <Stack gap="xs" pt="xs">
                    {subjects.map(subject => (
                      <Radio
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
                </RadioGroup>
              </Card>
              {selectedSubjects?.length ? (
                <Card>
                  <Title order={2}>{t('interested_subjects')}</Title>
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
                <Title order={2}>{t('summary')}</Title>
                <Stack gap="xl" pt="xl">
                  <Stack gap="xs">
                    {selectedSubjects?.length ? <Title order={3}>{t('themes')}</Title> : null}
                    <Group gap="xs">
                      {selectedSubjects?.map(subject => (
                        <Badge key={`tag-${subject}`}>{getSubjetLabel(subject)}</Badge>
                      )) || null}
                    </Group>
                  </Stack>
                  <Stack gap="xs">
                    {selectedCategories?.length ? <Title order={3}>{t('subjects')}</Title> : null}
                    <Group gap="xs">
                      {selectedCategories?.map(category => (
                        <Badge key={`tag-${category}`}>{getCategoryLabel(category)}</Badge>
                      )) || null}
                    </Group>
                  </Stack>
                  <Button size="xl" type="submit" disabled={!selectedCategories?.length}>
                    {t('validate')}
                  </Button>
                </Stack>
              </Card>
            </GridCol>
          ) : null}
        </Grid>
      </form>
    </Stack>
  );
};

export default FinderPage;
