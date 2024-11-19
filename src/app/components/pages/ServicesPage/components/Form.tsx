'use client';

import { getIconFromTheme } from '@/app/components/content/utils-ui';
import { Theme, themesColors } from '@/config';
import { DistinctFilters, Filters } from '@/types';
import { ComboboxData, Flex, Group, LoadingOverlay, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Form = ({ initialValues, distinctValues }: { initialValues: Filters; distinctValues: DistinctFilters }) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');
  const typingTimeoutRef = useRef(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    setIsSending(false);
  }, [initialValues]);

  const getFilters = (facet: FacetHits[], name: string): ComboboxData =>
    facet.map(({ value, count }) => {
      const key = `${name}_${value.replaceAll(' ', '-')}_label`;
      const label = tFilters.has(key) ? tFilters(key) : value;
      return { label: `${label} (${count})`, value };
    });

  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: Filters) => {
    setIsSending(true);
    return redirect(`?filters=${encodeURIComponent(JSON.stringify(values))}`);
  };

  return (
    <form>
      <Stack pos="relative">
        <LoadingOverlay visible={isSending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 0.1 }} />
        <TextInput
          size="xl"
          withAsterisk
          label={''}
          placeholder={t('form-query-placeholder')}
          name="query"
          disabled={isSending}
          {...form.getInputProps('query')}
          onChange={event => {
            const value = event.target.value;
            form.setFieldValue('query', value);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
            const timeo = setTimeout(() => {
              handleSubmit(form.getValues());
            }, 400);
            /*@ts-ignore*/
            typingTimeoutRef.current = timeo;
          }}
        />
        <Group justify="right">
          <Select
            disabled={isSending}
            size="lg"
            placeholder={t('filter-theme-label')}
            name="theme"
            {...form.getInputProps('theme')}
            data={getFilters(distinctValues.theme, 'theme')}
            clearable
            onClear={() => {
              form.setFieldValue('theme', undefined);
            }}
            miw={'35%'}
            maxLength={10}
            onChange={value => {
              form.setFieldValue('theme', (value as Theme) || '');
              handleSubmit(form.getValues());
            }}
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
            disabled={isSending}
            size="lg"
            placeholder={t('filter-region-label')}
            name="region"
            {...form.getInputProps('region')}
            data={getFilters(distinctValues.region, 'region')}
            clearable
            onClear={() => {
              form.setFieldValue('region', undefined);
            }}
            onChange={value => {
              form.setFieldValue('region', value || '');
              handleSubmit(form.getValues());
            }}
          />
          <Select
            disabled={isSending}
            size="lg"
            placeholder={t('filter-location-label')}
            name="location"
            {...form.getInputProps('location')}
            data={getFilters(distinctValues.location, 'location')}
            clearable
            onClear={() => {
              form.setFieldValue('location', undefined);
            }}
            onChange={value => {
              form.setFieldValue('location', value || '');
              handleSubmit(form.getValues());
            }}
          />
        </Group>
      </Stack>
    </form>
  );
};

export default Form;
