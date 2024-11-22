'use client';

import { getIconFromTheme } from '@/app/components/content/utils-ui';
import { getActionFilters, Theme, themesColors } from '@/config';
import { ActionFilters, DistinctFilters, Filters } from '@/types';
import {
  Button,
  Checkbox,
  ComboboxData,
  Drawer,
  Flex,
  Group,
  LoadingOverlay,
  Select,
  SimpleGrid,
  Stack,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Form = ({
  initialValues,
  distinctValues,
  setIsLoading,
  isLoading
}: {
  initialValues: Filters;
  distinctValues: DistinctFilters;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [actions, setActions] = useState<ActionFilters>(getActionFilters());

  useEffect(() => {
    setActions(getActionFilters(initialValues.theme ? [initialValues.theme] : undefined));
    form.setValues(initialValues);
    form.setInitialValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const getFilters = (facet: FacetHits[], name: string): ComboboxData => {
    const list = facet.map(({ value, count }) => {
      const key = `${name}_${value.replaceAll(' ', '-')}_label`;
      const label = tFilters.has(key) ? tFilters(key) : value;
      return { label: `${label} (${count})`, value };
    });
    return [...list];
  };

  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: Filters) => {
    const cleanedValues: Filters = Object.keys(values).reduce((all, valueKey) => {
      /* @ts-ignore */
      const value = values?.[valueKey];
      if (!value) {
        return all;
      }
      return { ...all, [valueKey]: value };
    }, {});

    return redirect(`?filters=${encodeURIComponent(JSON.stringify(cleanedValues))}`);
  };

  const values = form.getValues();
  const selectedActions = Object.keys(actions).reduce((all: string[], actionKey: string) => {
    /*@ts-ignore*/
    const value = values?.[actionKey];
    if (value) {
      return [...all, actionKey];
    }
    return all;
  }, []);

  return (
    <Stack pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ blur: 0.2, bg: 'transparent' }}
        loaderProps={{ color: 'green_oryx', type: 'bars' }}
      />
      <form
        onSubmit={() => {
          setIsLoading(true);
        }}
        action={async (values: FormData) => {
          handleSubmit(Object.fromEntries(values.entries()));
        }}>
        <Stack>
          <TextInput
            size="xl"
            withAsterisk
            label={''}
            placeholder={t('form-query-placeholder')}
            name="query"
            disabled={isLoading}
            {...form.getInputProps('query')}
            rightSection={
              <Group
                onClick={() => {
                  form.setFieldValue('query', '');
                }}>
                <X size={'17px'} style={{ cursor: 'pointer' }} />
              </Group>
            }
          />
          <SimpleGrid cols={3}>
            <Select
              value={initialValues.theme}
              defaultValue={initialValues.theme}
              disabled={isLoading}
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
              disabled={isLoading}
              size="lg"
              placeholder={t('filter-region-label')}
              name="region"
              {...form.getInputProps('region')}
              data={getFilters(distinctValues.region, 'region')}
              clearable
            />
            <Select
              disabled={isLoading}
              size="lg"
              placeholder={t('filter-location-label')}
              name="location"
              {...form.getInputProps('location')}
              data={getFilters(distinctValues.location, 'location')}
              clearable
            />
          </SimpleGrid>
          <Group align="end" justify="end">
            {Object.keys(actions)?.length ? (
              <Button onClick={openDrawer} variant="transparent">
                {t('form-drawer-label', { count: selectedActions.length })}
              </Button>
            ) : null}
            <Button
              variant="transparent"
              onClick={() => {
                form.reset();
                form.setValues(initialValues);
                form.setInitialValues(initialValues);
                redirect('/services');
              }}>
              {t('form-clear-filters-label')}
            </Button>
            <Button size="lg" type="submit" disabled={!form.isDirty()}>
              <MagnifyingGlass size={'2rem'} />
            </Button>
          </Group>
        </Stack>
        <Drawer
          offset={8}
          radius="md"
          opened={openedDrawer}
          onClose={() => {
            closeDrawer();
          }}
          position={'right'}>
          <Stack>
            {Object.keys(actions).map(action => {
              return (
                <Checkbox
                  label={t(`action-${action}-label`)}
                  variant="filled"
                  size="xs"
                  key={`chip_${action}`}
                  name={action}
                  checked={selectedActions.includes(action)}
                  defaultChecked={selectedActions.includes(action)}
                  {...form.getInputProps(action)}
                />
              );
            })}
            <Button
              onClick={() => {
                closeDrawer();
                handleSubmit(form.getValues());
              }}>
              {t('form-submit-actions-label')}
            </Button>
          </Stack>
        </Drawer>
      </form>
    </Stack>
  );
};

export default Form;
