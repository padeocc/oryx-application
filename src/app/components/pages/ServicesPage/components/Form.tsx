'use client';

import { getIconFromTheme } from '@/app/components/content/utils-ui';
import { Theme, themesColors } from '@/config';
import { DistinctFilters, Filters } from '@/types';
import { Button, ComboboxData, Flex, Group, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const Form = ({ initialValues, distinctValues }: { initialValues: Filters; distinctValues: DistinctFilters }) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');

  const getFilters = (facet: FacetHits[], name: string): ComboboxData =>
    facet.map(({ value, count }) => {
      let label = value;
      const key = `${name}_${value.replaceAll(' ', '-')}_label`;
      if (tFilters.has(key)) {
        label = tFilters(key);
      }
      return { label: `${label} (${count})`, value };
    });

  const [isSending, setIsSending] = useState<boolean>(false);
  const form = useForm({
    initialValues
  });

  return (
    <>
      <form
        onSubmit={() => {
          setIsSending(true);
        }}
        action={async (values: FormData) => {
          setIsSending(false);
          redirect(`?filters=${JSON.stringify(Object.fromEntries(values.entries()))}`);
        }}>
        <Stack>
          <TextInput
            size="xl"
            withAsterisk
            label={''}
            placeholder={t('form-query-placeholder')}
            name="query"
            disabled={isSending}
            {...form.getInputProps('query')}
          />
          <Group justify="right">
            <Select
              size="lg"
              placeholder={t('filter-theme-label')}
              name="theme"
              {...form.getInputProps('theme')}
              data={getFilters(distinctValues.theme, 'theme')}
              clearable
              miw={'35%'}
              maxLength={10}
              renderOption={({ option, checked }) => {
                const color = themesColors[option.value];
                const themeIcon = getIconFromTheme({
                  theme: option.value as Theme,
                  size: 20,
                  selected: true,
                  color
                });
                return (
                  <Flex gap="sm" justify="center" align="center" direction="row" wrap="nowrap" c={color}>
                    {themeIcon ? themeIcon : null}
                    {option.label}
                  </Flex>
                );
              }}
            />
            <Select
              size="lg"
              placeholder={t('filter-region-label')}
              name="region"
              {...form.getInputProps('region')}
              data={getFilters(distinctValues.region, 'region')}
              clearable
            />
            <Select
              size="lg"
              placeholder={t('filter-location-label')}
              name="location"
              {...form.getInputProps('location')}
              data={getFilters(distinctValues.location, 'location')}
              clearable
            />
            <Button size="lg" type="submit" loading={isSending}>
              {t('form-submit-label')}
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default Form;
