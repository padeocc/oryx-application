'use client';

import { cleanFiltersValues } from '@/app/components/content/utils';
import { getIconFromTheme } from '@/app/components/content/utils-ui';
import { getActionFilters, Theme, themesColors } from '@/config';
import { ActionFilters, DistinctFilters, Filters } from '@/types';
import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  ComboboxData,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  Pill,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { FacetHits } from 'algoliasearch';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const Form = ({
  initialValues,
  distinctValues,
  isLoading,
  setIsLoading,
  suggestions
}: {
  initialValues: Filters;
  distinctValues: DistinctFilters;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  suggestions?: string[];
}) => {
  const t = useTranslations('services');
  const tFilters = useTranslations('filters_component');
  const [openedDrawer, { toggle, close }] = useDisclosure(false);
  const [actions, setActions] = useState<ActionFilters>(getActionFilters());
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setActions(getActionFilters(initialValues.theme ? [initialValues.theme] : undefined));
    form.setValues(initialValues);
  }, [initialValues]);

  const getFilters = (facet: FacetHits[], name: string, splitter?: string): ComboboxData => {
    const list = facet.map(({ value, count }) => {
      let label = '';
      if (splitter) {
        const pieces = value.split(splitter);
        label = pieces
          .map(piece => {
            const cleanedPiece = piece.trim();
            const key = `${name}_${cleanedPiece.replaceAll(' ', '-')}_label`;
            return tFilters.has(key) ? tFilters(key) : cleanedPiece;
          })
          .join(', ');
      } else {
        const key = `${name}_${value.replaceAll(' ', '-')}_label`;
        label = tFilters.has(key) ? tFilters(key) : value;
      }
      return { label: `${label} (${count})`, value };
    });
    return [...list].sort((a, b) => (a.label > b.label ? 1 : -1));
  };

  const form = useForm({
    initialValues
  });

  const handleSubmit = (values: Filters) => {
    setIsLoading(true);
    close();
    redirect(`/services?filters=${cleanFiltersValues(values)}`);
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

  const selectedFilters = ['theme', 'query', 'region', 'location'].reduce((all: string[], key: string) => {
    /*@ts-ignore*/
    const value = values?.[key];
    if (value) {
      return [...all, key];
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
            onChange={event => {
              const value = event.target.value;
              form.setFieldValue('query', value);

              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
              }

              //@ts-ignore
              typingTimeoutRef.current = setTimeout(() => {
                handleSubmit(form.getValues());
              }, 700);
            }}
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
                const fieldsToReset = getActionFilters(values?.theme ? [values?.theme] : undefined);
                Object.keys(fieldsToReset).forEach(field => {
                  form.setFieldValue(field, null);
                });
                form.setFieldValue('theme', (theme as Theme) || null);
                handleSubmit(form.getValues());
              }}
            />
            <Select
              disabled={isLoading}
              size={'sm'}
              placeholder={t('filter-region-label')}
              name="region"
              {...form.getInputProps('region')}
              data={getFilters(distinctValues.region, 'region', ';')}
              onChange={value => {
                form.setFieldValue('region', value || null);
                handleSubmit(form.getValues());
              }}
            />
            <Select
              disabled={isLoading}
              size={'sm'}
              placeholder={t('filter-location-label')}
              name="location"
              {...form.getInputProps('location')}
              data={getFilters(distinctValues.location, 'location')}
              onChange={value => {
                form.setFieldValue('location', value || null);
                handleSubmit(form.getValues());
              }}
            />
          </SimpleGrid>

          <Grid justify="space-between">
            <GridCol span={{ base: 12, md: 7, lg: 8 }}>
              {suggestions?.length ? (
                <>
                  <Group gap={'xs'}>
                    <Text fz="sm">{tFilters('suggestions-title')}</Text>
                    {suggestions.map(suggestion => {
                      const suggestionValues: Filters = { theme: values?.theme, query: suggestion };
                      return (
                        <div
                          onClick={() => {
                            setIsLoading(true);
                          }}>
                          <Text
                            fz="xs"
                            component={Link}
                            key={`sugg-${suggestion}`}
                            href={`/services?filters=${cleanFiltersValues(suggestionValues)}`}
                            styles={{ root: { textDecoration: 'underline' } }}>
                            {suggestion}
                          </Text>
                        </div>
                      );
                    })}
                  </Group>
                </>
              ) : null}
            </GridCol>
            <GridCol span={{ base: 12, md: 5, lg: 4 }}>
              <Group align="end" justify="end">
                {Object.keys(actions)?.length ? (
                  <Button onClick={toggle} variant="transparent" disabled={isLoading}>
                    {t('form-drawer-label', { count: selectedActions.length })}
                  </Button>
                ) : null}
                <Button
                  variant="transparent"
                  disabled={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    form.reset();
                    form.setValues(initialValues);
                    redirect('/services');
                  }}>
                  {t('form-clear-filters-label')}
                </Button>
              </Group>
            </GridCol>
            <GridCol span={{ base: 12 }}>
              <Collapse in={openedDrawer} transitionDuration={300} transitionTimingFunction="linear">
                <Alert>
                  <Stack>
                    <Group>
                      {Object.keys(actions)
                        .sort((a, b) => (a > b ? 1 : -1))
                        .map(action => {
                          return (
                            <Checkbox
                              label={t(`action-${action}-label`)}
                              variant="filled"
                              size="sm"
                              key={`chip_${action}`}
                              name={action}
                              defaultChecked={selectedActions.includes(action)}
                              checked={selectedActions.includes(action)}
                              {...form.getInputProps(action)}
                            />
                          );
                        })}
                    </Group>
                    <Group justify="right">
                      <Button
                        size="md"
                        type="submit"
                        disabled={!form.isDirty() || isLoading}
                        onClick={() => {
                          setIsLoading(true);
                          toggle();
                          handleSubmit(form.getValues());
                        }}>
                        <MagnifyingGlass size={'2rem'} />
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              </Collapse>
            </GridCol>
          </Grid>
          {selectedFilters.length || selectedActions.length ? (
            <>
              <Divider />
              <Group>
                {selectedFilters.map(filter => {
                  /*@ts-ignore */
                  const value = values[filter];
                  const key = `${filter}_${value.replaceAll(' ', '-')}_label`;
                  const label = tFilters.has(key) ? tFilters(key) : value;
                  return (
                    <Pill
                      key={`action-pill-${filter}`}
                      withRemoveButton
                      disabled={isLoading}
                      onRemove={() => {
                        const values = form.getValues();
                        const updatedValues = Object.keys(values).reduce((all: Filters, valueKey: string) => {
                          /*@ts-ignore*/
                          const value = values?.[valueKey];
                          return { ...all, [valueKey]: valueKey === filter ? undefined : value };
                        }, {});
                        form.setFieldValue(filter, filter === 'query' ? '' : null);
                        handleSubmit(updatedValues);
                      }}>
                      {t(`filter-selected-${filter}-label`, { value: label })}
                    </Pill>
                  );
                })}
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
                        form.setFieldValue(action, null);
                        handleSubmit(updatedValues);
                      }}>
                      {t(`action-${action}-label`)}
                    </Pill>
                  );
                })}
              </Group>
            </>
          ) : null}
        </Stack>
      </form>
      <Divider />
    </Stack>
  );
};

export default Form;
