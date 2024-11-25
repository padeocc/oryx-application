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
  Pill,
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
  isLoading,
  setIsLoading
}: {
  initialValues: Filters;
  distinctValues: DistinctFilters;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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

  const getFilters = (facet: FacetHits[], name: string): ComboboxData => {
    const list = facet.map(({ value, count }) => {
      const key = `${name}_${value.replaceAll(' ', '-')}_label`;
      const label = tFilters.has(key) ? tFilters(key) : value;
      return { label: `${label} (${count})`, value };
    });
    return [...list].sort((a, b) => (a.label > b.label ? 1 : -1));
  };

  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: Filters) => {
    setIsLoading(true);
    const cleanedValues: Filters = Object.keys(values).reduce((all, valueKey) => {
      /* @ts-ignore */
      const value = values?.[valueKey];
      if (!value) {
        return all;
      }
      return { ...all, [valueKey]: value };
    }, {});

    redirect(`/services?filters=${encodeURIComponent(JSON.stringify(cleanedValues))}`);
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
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <Stack>
          <TextInput
            size="md"
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
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select
              value={initialValues.theme}
              defaultValue={initialValues.theme}
              disabled={isLoading}
              size={'sm'}
              placeholder={t('filter-theme-label')}
              name="theme"
              {...form.getInputProps('theme')}
              data={getFilters(distinctValues.theme, 'theme')}
              clearable
              miw={'35%'}
              maxLength={10}
              renderOption={({ option }) => {
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
              onChange={theme => {
                const fieldsToReset = getActionFilters(values?.theme ? [values?.theme] : []);
                Object.keys(fieldsToReset).forEach(field => {
                  form.setFieldValue(field, false);
                });
                form.setFieldValue('theme', (theme as Theme) || undefined);
              }}
            />
            <Select
              disabled={isLoading}
              size={'sm'}
              placeholder={t('filter-region-label')}
              name="region"
              {...form.getInputProps('region')}
              data={getFilters(distinctValues.region, 'region')}
              clearable
            />
            <Select
              disabled={isLoading}
              size={'sm'}
              placeholder={t('filter-location-label')}
              name="location"
              {...form.getInputProps('location')}
              data={getFilters(distinctValues.location, 'location')}
              clearable
            />
          </SimpleGrid>
          <Group>
            {selectedActions.map(action => {
              return (
                <Pill
                  key={`action-pill-${action}`}
                  withRemoveButton
                  disabled={isLoading}
                  onRemove={() => {
                    const values = form.getValues();
                    const updatedValues = Object.keys(values).reduce((all: Filters, valueKey: string) => {
                      /*@ts-ignore*/
                      const value = values?.[valueKey];
                      if (valueKey === action) {
                        return all;
                      }
                      return { ...all, [valueKey]: value };
                    }, {});

                    handleSubmit(updatedValues);
                  }}>
                  {t(`action-${action}-label`)}
                </Pill>
              );
            })}
          </Group>
          <Group align="end" justify="end">
            {Object.keys(actions)?.length ? (
              <Button onClick={openDrawer} variant="transparent">
                {t('form-drawer-label', { count: selectedActions.length })}
              </Button>
            ) : null}
            <Button
              variant="transparent"
              onClick={() => {
                setIsLoading(true);
                form.reset();
                form.setValues(initialValues);
                form.setInitialValues(initialValues);
                redirect('/services');
              }}>
              {t('form-clear-filters-label')}
            </Button>
            <Button
              size="md"
              type="submit"
              disabled={!form.isDirty()}
              onClick={() => {
                handleSubmit(form.getValues());
              }}>
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
                  size="sm"
                  key={`chip_${action}`}
                  name={action}
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
