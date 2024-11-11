'use client';

import { DistinctFilters, Filters } from '@/types';
import { Button, ComboboxData, Select, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Form = ({ initialValues, distinctValues }: { initialValues: Filters; distinctValues: DistinctFilters }) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');

  const getFilters = (facet: FacetHits[], name: string): ComboboxData =>
    facet.map(({ value, count }) => {
      const label = tFilters(`${name}_${value}_label`);
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
        }}>
        <Stack>
          <TextInput
            size="xl"
            withAsterisk
            label={''}
            placeholder={t('form-query-palceholder')}
            name="query"
            disabled={isSending}
            {...form.getInputProps('query')}
          />
          <SimpleGrid cols={{ base: 1, md: 4 }}>
            <Select
              size="lg"
              placeholder={t('filter-theme-label')}
              {...form.getInputProps('theme')}
              data={getFilters(distinctValues.theme, 'theme')}
            />
            <Select
              size="lg"
              placeholder={t('filter-region-label')}
              {...form.getInputProps('region')}
              data={getFilters(distinctValues.region, 'region')}
            />
            <Select
              size="lg"
              placeholder={t('filter-location-label')}
              {...form.getInputProps('location')}
              data={getFilters(distinctValues.location, 'location')}
            />
            <Button size="lg" type="submit" loading={isSending}>
              {t('form-submit-label')}
            </Button>
          </SimpleGrid>
        </Stack>
      </form>
    </>
  );
};

export default Form;
