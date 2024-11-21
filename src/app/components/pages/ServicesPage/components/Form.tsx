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
  Stack,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { X } from '@phosphor-icons/react/dist/ssr';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Form = ({ initialValues, distinctValues }: { initialValues: Filters; distinctValues: DistinctFilters }) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');
  const typingTimeoutRef = useRef(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [actions, setActions] = useState<ActionFilters>(getActionFilters());

  useEffect(() => {
    setIsSending(false);
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
    return [{ label: 'Tous', value: '' }, ...list];
  };

  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: Filters) => {
    setIsSending(true);
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

  return (
    <Stack pos="relative">
      <LoadingOverlay
        visible={isSending}
        zIndex={1000}
        overlayProps={{ blur: 0.2, bg: 'transparent' }}
        loaderProps={{ color: 'green_oryx', type: 'bars' }}
      />
      <form>
        <Stack>
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
              }, 700);
              /*@ts-ignore*/
              typingTimeoutRef.current = timeo;
            }}
            rightSection={
              <Group
                onClick={() => {
                  form.setFieldValue('query', '');
                  handleSubmit(form.getValues());
                }}>
                <X size={'14px'} style={{ cursor: 'pointer' }} />
              </Group>
            }
          />
          <Group justify="right">
            <Select
              value={initialValues.theme}
              defaultValue={initialValues.theme}
              disabled={isSending}
              size="lg"
              placeholder={t('filter-theme-label')}
              name="theme"
              {...form.getInputProps('theme')}
              data={getFilters(distinctValues.theme, 'theme')}
              clearable
              onClear={() => {
                form.setFieldValue('theme', '');
                handleSubmit(form.getValues());
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
                form.setFieldValue('region', '');
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
                form.setFieldValue('location', '');
              }}
              onChange={value => {
                form.setFieldValue('location', value || '');
                handleSubmit(form.getValues());
              }}
            />
          </Group>
          <Group align="end" justify="end">
            {Object.keys(actions)?.length ? (
              <Button onClick={openDrawer} variant="transparent">
                {t('form-drawer-label')}
              </Button>
            ) : null}
            <Button href="/services" variant="transparent" component={Link}>
              {t('form-clear-filters-label')}
            </Button>
          </Group>
        </Stack>
        <Drawer
          offset={8}
          radius="md"
          opened={openedDrawer}
          onClose={() => {
            closeDrawer();
            handleSubmit(form.getValues());
          }}
          position={'right'}>
          <Stack>
            {Object.keys(actions).map(action => (
              <Checkbox
                label={t(`action-${action}-label`)}
                variant="filled"
                size="xs"
                key={`chip_${action}`}
                name={action}
                {...form.getInputProps(action)}
              />
            ))}
          </Stack>
        </Drawer>
      </form>
    </Stack>
  );
};

export default Form;
