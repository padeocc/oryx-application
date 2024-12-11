'use client';

import BadgeSelector from '@/app/components/pages/ServicesPage/components/Form/components/BadgeSelector';
import { LOCATIONS, REGIONS, Theme, themes, themesColors, themesIcons } from '@/config';
import { Service } from '@/types';
import { Button, Group, InputLabel, MultiSelect, Select, Stack, Text, TextInput } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { RefObject, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getOptionsFromThemes, getTagsFromThemes } from '../utils';

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
  const t = useTranslations('service-add');
  const tThemes = useTranslations('themes');
  const tFilters = useTranslations('filters_component');
  const [isSending, setIsSending] = useState<boolean>(false);
  const recaptcha: RefObject<ReCAPTCHA | null> = useRef(null);

  const regions = REGIONS.map(region => ({
    label: tFilters(`region_${region}_label`),
    value: region
  }));

  const locations = LOCATIONS.map(location => ({
    label: tFilters(`location_${location}_label`),
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
      email: ''
    },
    validate: {
      label: isNotEmpty(t('error-label-field')),
      url: matches(URLREGEX, t('error-url-field')),
      location: isNotEmpty(t('error-location-field')),
      tags: isNotEmpty(t('error-tags-field')),
      theme: isNotEmpty(t('error-theme-field'))
    }
  });

  const values = form.getValues();
  const needsRegion = ['store', 'store-and-online'].includes(values.location);
  const tags = getTagsFromThemes(values.theme).map((tag: string) => ({ value: tag, label: tag }));
  const options = getOptionsFromThemes(values.theme, values.tags).map((option: string) => ({
    value: option,
    label: option
  }));

  return (
    <>
      <form
        onSubmit={() => {
          setIsSending(true);
        }}
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
              title: t('form-validation-ok-title'),
              message: t('form-validation-ok-description'),
              position: 'top-center',
              autoClose: 10000
            });
            setTimeout(() => {
              redirect('/');
            }, 10000);
          } else {
            notifications.show({
              title: t('form-validation-ko-title'),
              message: t('form-validation-ko-description'),
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
            <TextInput
              withAsterisk
              label={t('form-label-label')}
              placeholder={t('form-label-placeholder')}
              name="label"
              disabled={isSending}
              {...form.getInputProps('label')}
            />
            <TextInput
              withAsterisk
              label={t('form-url-label')}
              placeholder={t('form-url-placeholder')}
              name="url"
              disabled={isSending}
              leftSection={<Text fz="0.5rem">https://</Text>}
              {...form.getInputProps('url')}
            />
          </Stack>
          <Stack gap={'lg'}>
            <Stack gap="0">
              <InputLabel>{t('form-themes-label')}</InputLabel>
              <Group justify="flex-start">
                {themes.map(theme => {
                  const Icon = themesIcons[theme];
                  const selected = !!(values.theme as Theme[])?.includes(theme);
                  return (
                    <BadgeSelector
                      isLoading={isSending}
                      key={`badge-selector-${theme}`}
                      label={tThemes(theme)}
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
            </Stack>

            <MultiSelect
              disabled={isSending || tags.length === 0}
              size={'sm'}
              placeholder={t('filter-tags-placeholder')}
              name="tags"
              label={t('form-tags-label')}
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
              placeholder={t('filter-options-placeholder')}
              name="options"
              label={t('form-options-label')}
              {...form.getInputProps('options')}
              data={options}
              searchable
            />
          </Stack>
          <Stack gap={'lg'}>
            <Select
              disabled={isSending}
              size={'sm'}
              placeholder={t('filter-location-placeholder')}
              name="location"
              label={t('form-location-label')}
              {...form.getInputProps('location')}
              data={locations}
              withAsterisk
            />
            {needsRegion ? (
              <MultiSelect
                disabled={isSending}
                size={'sm'}
                placeholder={t('filter-region-placeholder')}
                name="region"
                label={t('form-region-label')}
                {...form.getInputProps('region')}
                multiple
                data={regions}
                searchable
              />
            ) : null}
          </Stack>

          <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} />

          <TextInput
            label={t('form-email-label')}
            placeholder={t('form-email-placeholder')}
            name="email"
            disabled={isSending}
            {...form.getInputProps('email')}
          />

          <Button type="submit" loading={isSending}>
            {t('form-submit-label')}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Form;
