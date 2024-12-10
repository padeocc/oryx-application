'use client';

import BadgeSelector from '@/app/components/pages/ServicesPage/components/Form/components/BadgeSelector';
import { LOCATIONS, REGIONS, Theme, themes, themesColors, themesIcons } from '@/config';
import { Button, Group, InputLabel, MultiSelect, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getOptionsFromThemes, getTagsFromThemes } from '../utils';

const Form = ({
  handleSubmit,
  sitekey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
}: {
  sitekey?: string;
  handleSubmit: (formData: FormData) => Promise<{
    sent: boolean;
    errors?: { [key: string]: string };
  }>;
}) => {
  const t = useTranslations('service-add');
  const tThemes = useTranslations('themes');
  const tFilters = useTranslations('filters_component');
  const [okNotification, setOkNotification] = useState<boolean>(false);
  const [koNotification, setKoNotification] = useState<boolean>(false);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOkNotification(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [okNotification]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKoNotification(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [koNotification]);

  const form = useForm({
    initialValues: {
      label: '',
      tags: [],
      url: '',
      theme: [],
      region: [],
      location: '',
      options: []
    },
    validate: {
      label: isNotEmpty(t('error-label-field')),
      url: isNotEmpty(t('error-url-field')),
      location: isNotEmpty(t('error-location-field')),
      tags: isNotEmpty(t('error-tags-field')),
      theme: isNotEmpty(t('error-theme-field')),
      region: isNotEmpty(t('error-region-field'))
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
        action={async (formValues: FormData) => {
          /* action submit formdata does not have theme*/
          /*@ts-ignore*/
          formValues.set('theme', values?.theme || []);
          const { sent, errors = {} } = await handleSubmit(formValues);

          if (sent === true) {
            //form.reset();
            setOkNotification(true);
            recaptcha?.current?.reset();
          } else {
            const errorKeys = Object.keys(errors);
            const translatedErrors = errorKeys.reduce(
              (all, errorKey) => ({ ...all, [errorKey]: t(`form-error-${errors[errorKey]}`) }),
              {}
            );
            form.setErrors(translatedErrors);
            setKoNotification(true);
          }
          setIsSending(false);
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
              {...form.getInputProps('url')}
            />
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
              multiple
              data={tags}
              searchable
            />

            <MultiSelect
              disabled={isSending || options.length === 0}
              size={'sm'}
              placeholder={t('filter-options-placeholder')}
              name="options"
              label={t('form-options-label')}
              {...form.getInputProps('options')}
              multiple
              data={options}
              searchable
            />

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

          {/* <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} /> */}

          <Button type="submit" loading={isSending}>
            {t('form-submit-label')}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Form;
