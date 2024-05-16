'use client';

import { Filters, Service, getCategoryLabel } from '@/app/components/pages/ActionsPage/utils';
import { themes } from '@/config';
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
import { uniq } from 'lodash';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const FinderPage = ({ fetchActions }: { fetchActions: ({ filters }: { filters: Filters }) => Promise<Service[]> }) => {
  const t = useTranslations('finder_page');
  const tTheme = useTranslations('themes');
  const [categories, setCategories] = useState<string[]>([]);
  const { filters, setFilters } = useLocalState();

  const form = useForm({
    initialValues: filters
  });
  const selectedSubjects = form.values.subjects;
  const selectedCategories = form.values.categories;

  useEffect(() => {
    const fetchData = async () => {
      const actions = await fetchActions({
        filters: {
          subjects: selectedSubjects,
          categories: []
        }
      });
      const categories = uniq(actions.flatMap(action => action.tags));
      setCategories(categories);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubjects]);

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
                    {themes.map(theme => (
                      <Radio
                        id={theme}
                        key={theme}
                        label={theme}
                        value={theme}
                        checked={selectedSubjects?.includes(theme)}
                        onChange={subject => {
                          form.setValues({ subjects: [subject.target.value] });
                        }}
                      />
                    ))}
                  </Stack>
                </RadioGroup>
              </Card>
              {categories?.length ? (
                <Card>
                  <Title order={2}>{t('interested_subjects')}</Title>
                  <CheckboxGroup
                    onChange={categories => form.setFieldValue('categories', categories)}
                    value={selectedCategories}>
                    <Stack gap="xs" pt="xs">
                      {categories.map(category => (
                        <Checkbox
                          id={category}
                          key={category}
                          label={category}
                          value={category}
                          name={`categories[${category}]`}
                          checked={selectedCategories?.includes(category)}
                        />
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </Card>
              ) : null}
            </Stack>
          </GridCol>
          {selectedCategories?.length ? (
            <GridCol span={{ base: 12, sm: 6 }}>
              <Card>
                <Title order={2}>{t('summary')}</Title>
                <Stack gap="xl" pt="xl">
                  <Stack gap="xs">
                    {selectedSubjects?.length ? <Title order={3}>{t('themes')}</Title> : null}
                    <Group gap="xs">
                      {selectedSubjects?.map(subject => <Badge key={`tag-${subject}`}>{tTheme(subject)}</Badge>) ||
                        null}
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
