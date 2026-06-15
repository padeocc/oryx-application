'use client';

import { cleanFiltersValues } from '@/components/content/utils';
import { getActionFilters } from '@/config';
import { ActionFilters, DistinctFilters, Filters } from '@/types';
import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  ComboboxData,
  Divider,
  Grid,
  GridCol,
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
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { FacetHits } from 'algoliasearch';
import { redirect } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import messages from '../../../../../../i18n/messages/fr.json';

const servicesLabels = messages.services as Record<string, string>;
const filtersLabels = messages.filters_component as Record<string, string>;
const themesLabels = messages.themes as Record<string, string>;

const Form = forwardRef<{ toggle: () => void }, {
  initialValues: Filters;
  distinctValues: DistinctFilters;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}>(({ initialValues, distinctValues, isLoading, setIsLoading }, ref) => {
  const [openedDrawer, { toggle, close }] = useDisclosure(false);
  const [actions, setActions] = useState<ActionFilters>(getActionFilters({}));
  const typingTimeoutRef = useRef(null);

  useImperativeHandle(ref, () => ({ toggle }));

  useEffect(() => {
    const newActions = getActionFilters({ themes: initialValues?.theme || undefined });
    setActions(newActions);
    form.setValues(initialValues);
    /*@ts-ignore*/
  }, [initialValues]);

  const hasLabel = (key: string) => key in filtersLabels;

  const getFilters = (facet: FacetHits[], name: string, splitter?: string): ComboboxData => {
    const list = facet.map(({ value, count }) => {
      let label = '';
      if (splitter) {
        const pieces = value?.split(splitter);
        label = pieces.map(piece => {
          const cleanedPiece = piece.trim();
          const key = `${name}_${cleanedPiece.replaceAll(' ', '-')}_label`;
          return hasLabel(key) ? filtersLabels[key] : cleanedPiece;
        }).join(', ');
      } else {
        const key = `${name}_${value.replaceAll(' ', '-')}_label`;
        label = hasLabel(key) ? filtersLabels[key] : value;
      }
      return { label: `${label} (${count})`, value };
    });
    return [...list].sort((a, b) => (a.label > b.label ? 1 : -1));
  };

  const form = useForm({ initialValues });

  const handleSubmit = (values: Filters) => {
    setIsLoading(true);
    close();
    redirect(`/services?filters=${cleanFiltersValues(values)}`);
  };

  const values = form.getValues();

  const selectedActions = Object.keys(actions).reduce((all: string[], actionKey: string) => {
    /*@ts-ignore*/
    const value = values?.[actionKey];
    if (value) return [...all, actionKey];
    return all;
  }, []);

  const selectedFilters = ['query', 'region', 'location'].reduce((all: string[], key: string) => {
    /*@ts-ignore*/
    const value = values?.[key];
    if (value) return [...all, key];
    return all;
  }, []);

  const handleRemoveFilter = (filter: string) => {
    const values = form.getValues();
    const updatedValues = Object.keys(values).reduce((all: Filters, valueKey: string) => {
      /*@ts-ignore*/
      const value = values?.[valueKey];
      return { ...all, [valueKey]: valueKey === filter ? undefined : value };
    }, {});
    form.setFieldValue(filter, filter === 'query' ? '' : null);
    handleSubmit(updatedValues);
  };

  const handleRemoveAction = (action: string) => {
    const values = form.getValues();
    const updatedValues = Object.keys(values).reduce((all: Filters, valueKey: string) => {
      /*@ts-ignore*/
      const value = values?.[valueKey];
      if (valueKey === action) return all;
      return { ...all, [valueKey]: value };
    }, {});
    form.setFieldValue(action, null);
    handleSubmit(updatedValues);
  };

  const drawerCount = selectedActions.filter(a => a !== 'economic' && a !== 'ess').length;
  const drawerLabel = drawerCount > 0 ? `Filtres avancés (${drawerCount})` : 'Filtres avancés';

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ blur: 0.2, bg: 'transparent' }} loaderProps={{ color: 'green_oryx', type: 'bars' }} />
      <form onSubmit={e => { e.preventDefault(); e.stopPropagation(); }}>
        <Stack>
          <TextInput
            size="md"
            withAsterisk
            label={''}
            placeholder={servicesLabels['form-query-placeholder']}
            name="query"
            disabled={isLoading}
            {...form.getInputProps('query')}
            onChange={event => {
              const value = event.target.value;
              form.setFieldValue('query', value);
              if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
              //@ts-ignore
              typingTimeoutRef.current = setTimeout(() => handleSubmit(form.getValues()), 1500);
            }}
          />

          <Stack gap="xs" hiddenFrom="md">
            <Group align="center" gap="xs" justify="flex-end">
              <Button onClick={toggle} variant="outline" disabled={isLoading}>{drawerLabel}</Button>
              <Button variant="transparent" disabled={isLoading} onClick={() => { setIsLoading(true); form.reset(); form.setValues(initialValues); redirect('/services'); }}>
                {servicesLabels['form-clear-filters-label']}
              </Button>
            </Group>
            {selectedFilters.length > 0 && (
              <Group gap="xs" wrap="wrap">
                {selectedFilters.map(filter => {
                  /*@ts-ignore*/
                  const value = values[filter];
                  const key = `${filter}_${value.replaceAll(' ', '-')}_label`;
                  const label = hasLabel(key) ? filtersLabels[key] : value;
                  return (
                    <Pill key={`action-pill-${filter}`} withRemoveButton disabled={isLoading} size="lg" onRemove={() => handleRemoveFilter(filter)}>
                      {servicesLabels[`filter-selected-${filter}-label`]?.replace('{value}', label) || label}
                    </Pill>
                  );
                })}
              </Group>
            )}
          </Stack>

          <Group justify="space-between" align="center" wrap="wrap" visibleFrom="md">
            {selectedFilters.length > 0 ? (
              <Group gap="xs" wrap="wrap">
                {selectedFilters.map(filter => {
                  /*@ts-ignore*/
                  const value = values[filter];
                  const key = `${filter}_${value.replaceAll(' ', '-')}_label`;
                  const label = hasLabel(key) ? filtersLabels[key] : value;
                  return (
                    <Pill key={`action-pill-${filter}`} withRemoveButton disabled={isLoading} size="lg" onRemove={() => handleRemoveFilter(filter)}>
                      {servicesLabels[`filter-selected-${filter}-label`]?.replace('{value}', label) || label}
                    </Pill>
                  );
                })}
              </Group>
            ) : <div></div>}
            <Group align="center" gap="xs" justify="flex-end" style={{ marginLeft: 'auto' }}>
              <Button onClick={toggle} variant="outline" disabled={isLoading}>{drawerLabel}</Button>
              <Button variant="transparent" disabled={isLoading} onClick={() => { setIsLoading(true); form.reset(); form.setValues(initialValues); redirect('/services'); }}>
                {servicesLabels['form-clear-filters-label']}
              </Button>
            </Group>
          </Group>

          <Grid>
            <GridCol span={{ base: 12 }}>
              <Collapse in={openedDrawer} transitionDuration={300} transitionTimingFunction="linear">
                <Alert>
                  <Stack>
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                      <Select disabled={isLoading} size={'sm'} placeholder={servicesLabels['filter-region-label']} name="region" {...form.getInputProps('region')} data={getFilters(distinctValues.region, 'region', ';')} />
                      <Select disabled={isLoading} size={'sm'} placeholder={servicesLabels['filter-location-label']} name="location" {...form.getInputProps('location')} data={getFilters(distinctValues.location, 'location')} />
                    </SimpleGrid>
                    <Group>
                      {Object.keys(actions).sort((a, b) => (a > b ? 1 : -1)).filter(action => action !== 'economic' && action !== 'ess').map(action => (
                        <Checkbox
                          label={servicesLabels[`action-${action}-label`] || action}
                          variant="filled"
                          size="sm"
                          key={`chip_${action}`}
                          name={action}
                          checked={selectedActions.includes(action)}
                          {...form.getInputProps(action)}
                        />
                      ))}
                    </Group>
                    <Group justify="right">
                      <Button size="md" type="submit" disabled={!form.isDirty() || isLoading} onClick={() => { setIsLoading(true); toggle(); handleSubmit(form.getValues()); }}>
                        <MagnifyingGlass size={'2rem'} />
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              </Collapse>
            </GridCol>
          </Grid>

          {selectedActions.length ? (
            <>
              <Divider />
              <Group>
                {selectedActions.map(action => (
                  <Pill key={`action-pill-${action}`} withRemoveButton disabled={isLoading} onRemove={() => handleRemoveAction(action)}>
                    {servicesLabels[`action-${action}-label`] || action}
                  </Pill>
                ))}
              </Group>
            </>
          ) : null}
        </Stack>
      </form>
      <Divider />
    </Stack>
  );
});

Form.displayName = 'Form';

export default Form;
