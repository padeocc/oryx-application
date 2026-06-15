'use client';

import BadgeSelector from '@/components/pages/ServicesPage/components/Form/components/BadgeSelector';
import { sortAlphabetically } from '@/components/content/utils';
import { LOCATIONS, REGIONS, Theme, themes, themesColors, themesIcons } from '@/config';
import { Service } from '@/types';
import {
  Button,
  Fieldset,
  Grid,
  GridCol,
  Group,
  InputLabel,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { RefObject, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getOptionsFromThemes, getTagsFromThemes } from '../utils';
import messages from '../../../../../i18n/messages/fr.json';

const sa = messages['service-add'] as Record<string, string>;
const themesLabels = messages.themes as Record<string, string>;
const filtersLabels = messages.filters_component as Record<string, string>;

const urlRegexString =
  '^(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
const URLREGEX = new RegExp(urlRegexString, 'i');

const Form = ({
  handleSubmit,
  sitekey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
}: {
  sitekey?: string;
  handleSubmit: (data: { [key: string]: any }) => Promise<{
    sent: boolean;
    service?: Service;
    errors?: { [key: string]: string };
  }>;
}) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const recaptcha: RefObject<ReCAPTCHA | null> = useRef(null);

  const regions = REGIONS.map(region => ({
    label: filtersLabels[`region_${region}_label`] || region,
    value: region
  }));

  const locations = LOCATIONS.map(location => ({
    label: filtersLabels[`location_${location}_label`] || location,
    value: location
  }));

  const form = useForm({
    initialValues: {
      label: '',
      tags: [],
      url: '',
      theme: [],
      region: [],
      location: '',
      options: [],
      email: '',
      structure: '',
      shopadress: '',
      shopcity: '',
      shoppostalcode: ''
    },
    validate: {
      label: isNotEmpty(sa['error-label-field']),
      url: matches(URLREGEX, sa['error-url-field']),
      location: isNotEmpty(sa['error-location-field']),
      tags: isNotEmpty(sa['error-tags-field']),
      theme: isNotEmpty(sa['error-theme-field']),
      shoppostalcode: value => (value.length !== 5 ? 'Veuillez saisir un code postal valide.' : null)
    }
  });

  const values = form.getValues();
  const needsRegion = ['store', 'store-and-online'].includes(values.location);
  const tags = getTagsFromThemes(values.theme)
    .sort(sortAlphabetically)
    .map((tag: string) => ({ value: tag, label: tag }));
  const options = getOptionsFromThemes(values.theme, values.tags)
    .sort(sortAlphabetically)
    .map((option: string) => ({ value: option, label: option }));

  const structureOptions = [
    { value: 'company', label: sa['form-structure-company'] },
    { value: 'school', label: sa['form-structure-school'] },
    { value: 'ngo', label: sa['form-structure-ngo'] },
    { value: 'other', label: sa['form-structure-other'] }
  ];

  return (
    <>
      <form
        onSubmit={() => setIsSending(true)}
        action={async (_formValues: FormData) => {
          const validation = form.validate();
          if (validation.hasErrors) {
            setIsSending(false);
            return;
          }
          const { sent, service } = await handleSubmit(values);

          if (sent === true || !!service?.code) {
            recaptcha?.current?.reset();
            notifications.show({
              title: sa['form-validation-ok-title'],
              message: sa['form-validation-ok-description'],
              position: 'top-center',
              autoClose: 10000
            });
            setTimeout(() => redirect('/'), 10000);
          } else {
            notifications.show({
              title: sa['form-validation-ko-title'],
              message: sa['form-validation-ko-description'],
              color: 'red',
              position: 'top-center',
              fz: 'xl',
              autoClose: 10000
            });
            setIsSending(false);
          }
        }}>
        <Stack gap={'xl'}>
          <Stack gap={'lg'}>
            <Stack gap="0">
              <InputLabel>
                {sa['form-themes-label']}
                <Group justify="flex-start">
                  {themes.map(theme => {
                    const Icon = themesIcons[theme];
                    const selected = !!(values.theme as Theme[])?.includes(theme);
                    return (
                      <BadgeSelector
                        isLoading={isSending}
                        key={`badge-selector-${theme}`}
                        label={themesLabels[theme] || theme}
                        selected={selected}
                        Icon={Icon}
                        handleClick={_isSelected => {
                          form.setFieldValue('theme', [theme as never]);
                          form.setFieldValue('tags', []);
                          form.setFieldValue('options', []);
                        }}
                        bg={selected ? themesColors[theme] : 'white'}
                        c={selected ? 'white' : themesColors[theme]}
                        bd={`1px solid ${themesColors[theme]}`}
                      />
                    );
                  })}
                </Group>
              </InputLabel>
            </Stack>

            <MultiSelect
              disabled={isSending || tags.length === 0}
              size={'sm'}
              placeholder={sa['filter-tags-placeholder']}
              name="tags"
              label={sa['form-tags-label']}
              {...form.getInputProps('tags')}
              data={tags}
              onChange={(value: string[]) => {
                form.setFieldValue('options', []);
                form.setFieldValue('tags', value as never[]);
              }}
              searchable
            />

            <MultiSelect
              disabled={isSending || options.length === 0}
              size={'sm'}
              placeholder={sa['filter-options-placeholder']}
              name="options"
              label={sa['form-options-label']}
              {...form.getInputProps('options')}
              data={options}
              searchable
            />
          </Stack>
          <Stack gap={'lg'}>
            <TextInput withAsterisk label={sa['form-label-label']} placeholder={sa['form-label-placeholder']} name="label" disabled={isSending} {...form.getInputProps('label')} />
            <TextInput withAsterisk label={sa['form-url-label']} placeholder={sa['form-url-placeholder']} name="url" disabled={isSending} leftSection={<Text fz="0.5rem">https://</Text>} {...form.getInputProps('url')} />
          </Stack>
          <Stack gap={'lg'}>
            <Select disabled={isSending} size={'sm'} placeholder={sa['filter-location-placeholder']} name="location" label={sa['form-location-label']} {...form.getInputProps('location')} data={locations} withAsterisk />
            {needsRegion ? (
              <MultiSelect disabled={isSending} size={'sm'} placeholder={sa['filter-region-placeholder']} name="region" label={sa['form-region-label']} {...form.getInputProps('region')} multiple data={regions} searchable />
            ) : null}
            <Select disabled={isSending} size={'sm'} placeholder={sa['form-structure-placeholder']} name="structure" label={sa['form-structure-label']} {...form.getInputProps('structure')} data={structureOptions} />
          </Stack>
          <TextInput autoComplete="on" label={sa['form-email-label']} placeholder={sa['form-email-placeholder']} name="email" disabled={isSending} {...form.getInputProps('email')} />
          <Fieldset variant="unstyled">
            <Grid>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput label={sa['form-shopadress-label']} placeholder={sa['form-shopadress-placeholder']} name="shopadress" disabled={isSending} {...form.getInputProps('shopadress')} />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput label={sa['form-shopcity-label']} placeholder={sa['form-shopcity-placeholder']} name="shopcity" disabled={isSending} {...form.getInputProps('shopcity')} />
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <TextInput label={sa['form-shoppostalcode-label']} placeholder={sa['form-shoppostalcode-placeholder']} name="shoppostalcode" type="number" disabled={isSending} {...form.getInputProps('shoppostalcode')} />
              </GridCol>
            </Grid>
          </Fieldset>
          <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} />
          <Button type="submit" loading={isSending}>{sa['form-submit-label']}</Button>
        </Stack>
      </form>
    </>
  );
};

export default Form;
