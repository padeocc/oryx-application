'use client';

import {
  FetchServicesResponse,
  Filters,
  generateUrl,
  getTagsFromServices
} from '@/app/components/pages/ActionsPage/utils';
import { Theme, themes } from '@/config';
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
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FinderPage = ({
  fetchServices
}: {
  fetchServices: ({ filters }: { filters: Filters }) => Promise<FetchServicesResponse>;
}) => {
  const t = useTranslations('finder_page');
  const tTheme = useTranslations('themes');
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>();
  const form = useForm({
    initialValues: { theme: 'transports', categories: [] } as Filters
  });
  const selectedTheme = form.values.theme;
  const selectedTags = form.values.categories;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchServices({
        filters: {
          theme: selectedTheme,
          categories: []
        }
      });
      const categories = getTagsFromServices(data.services);
      setCategories(categories);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  useEffect(() => {
    if (!!selectedTheme) {
      form.setFieldValue('categories', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const actionUrl = generateUrl({ filters: form.getValues() });

  return (
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <form
        action={async () => {
          setFilters(form.values);
          //redirect(`/actions/${selectedTheme}`);
        }}>
        <Grid>
          <GridCol span={{ base: 12, sm: 6 }}>
            <Stack>
              <Card>
                <RadioGroup value={selectedTheme}>
                  <Stack gap="xs" pt="xs">
                    {themes.map(theme => (
                      <Radio
                        id={theme}
                        key={theme}
                        label={tTheme(`${theme}`)}
                        value={theme}
                        checked={selectedTheme === theme}
                        onChange={theme => {
                          form.setValues({ theme: (theme?.target?.value as Theme) || undefined });
                        }}
                      />
                    ))}
                  </Stack>
                </RadioGroup>
              </Card>
              {categories?.length ? (
                <Card>
                  <Title order={2}>{t('interested_themes')}</Title>
                  <CheckboxGroup
                    onChange={categories => form.setFieldValue('categories', categories)}
                    value={selectedTags}>
                    <Stack gap="xs" pt="xs">
                      {categories.map(category => (
                        <Checkbox
                          id={category}
                          key={category}
                          label={category}
                          value={category}
                          name={`categories[${category}]`}
                          checked={selectedTags?.includes(category)}
                        />
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </Card>
              ) : null}
            </Stack>
          </GridCol>
          {selectedTags?.length ? (
            <GridCol span={{ base: 12, sm: 6 }}>
              <Card>
                <Title order={2}>{t('summary')}</Title>
                <Stack gap="xl" pt="xl">
                  <Stack gap="xs">
                    {selectedTheme ? <Title order={3}>{t('themes')}</Title> : null}
                    <Group gap="xs">
                      {selectedTheme ? <Badge key={`tag-${selectedTheme}`}>{tTheme(selectedTheme)}</Badge> : null}
                    </Group>
                  </Stack>
                  <Stack gap="xs">
                    {selectedTags?.length ? <Title order={3}>{t('themes')}</Title> : null}
                    <Group gap="xs">
                      {selectedTags?.map(category => <Badge key={`tag-${category}`}>{category}</Badge>) || null}
                    </Group>
                  </Stack>
                  <Button
                    size="xl"
                    type="submit"
                    disabled={!selectedTags?.length}
                    component={Link}
                    href={actionUrl ? `/actions/${selectedTheme}?${actionUrl}` : '#'}>
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
