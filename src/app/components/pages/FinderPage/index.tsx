'use client';

import { getNavigationUrl, getTagsFromServices } from '@/app/components/pages/ActionsPage/utils';
import { Theme, themes } from '@/config';
import { FetchServicesResponse, Filters } from '@/types';
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
  const [tags, setTags] = useState<string[]>([]);
  const form = useForm({
    initialValues: { theme: 'transports', tags: [] } as Filters
  });
  const selectedTheme = form.values.theme;
  const selectedTags = form.values.tags;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchServices({
        filters: {
          theme: selectedTheme,
          tags: []
        }
      });
      const tags = getTagsFromServices(data.services);
      setTags(tags);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  useEffect(() => {
    if (!!selectedTheme) {
      form.setFieldValue('tags', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const actionUrl = getNavigationUrl({ filters: form.getValues() });

  return (
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <form>
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
              {tags?.length ? (
                <Card>
                  <Title order={2}>{t('interested_themes')}</Title>
                  <CheckboxGroup onChange={tags => form.setFieldValue('tags', tags)} value={selectedTags}>
                    <Stack gap="xs" pt="xs">
                      {tags.map(category => (
                        <Checkbox
                          id={category}
                          key={category}
                          label={category}
                          value={category}
                          name={`tags[${category}]`}
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
                      {selectedTags?.map((category: string) => <Badge key={`tag-${category}`}>{category}</Badge>) ||
                        null}
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
