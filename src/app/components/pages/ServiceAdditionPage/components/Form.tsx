'use client';

import BadgeSelector from '@/app/components/pages/ServicesPage/components/Form/components/BadgeSelector';
import ServiceCard from '@/app/components/ServiceCard';
import { LOCATIONS, REGIONS, Theme, themes, themesColors, themesIcons } from '@/config';
import {
  Button,
  Group,
  InputLabel,
  MultiSelect,
  Select,
  Stack,
  Stepper,
  StepperCompleted,
  StepperStep,
  TextInput,
  Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

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
    label: tFilters(location),
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

  const [active, setActive] = useState(0);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      label: '',
      description: '',
      url: '',
      theme: [],
      region: [],
      location: ''
    }
  });

  const values = form.getValues();

  return (
    <>
      <form
        onSubmit={() => {
          setIsSending(true);
        }}
        action={async (values: FormData) => {
          const { sent, errors = {} } = await handleSubmit(values);
          if (sent === true) {
            form.reset();
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
          <Stepper active={active} onStepClick={setActive} c="green_oryx">
            <StepperStep label={t('form-firststep-label')} description={t('form-firststep-description')}>
              <Stack gap={'lg'}>
                <TextInput
                  withAsterisk
                  label={t('form-label-label')}
                  placeholder={t('form-label-placeholder')}
                  name="label"
                  disabled={isSending}
                  {...form.getInputProps('label')}
                />
                <Stack gap="sm">
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
                            const newSelectedThemes: Theme[] = selected
                              ? values.theme.filter(t => t !== theme)
                              : [...(values?.theme || []), theme];
                            form.setFieldValue('theme', newSelectedThemes as never[]);
                          }}
                          bg={selected ? themesColors[theme] : 'white'}
                          c={selected ? 'white' : themesColors[theme]}
                          bd={`1px solid ${themesColors[theme]}`}
                        />
                      );
                    })}
                  </Group>
                </Stack>
              </Stack>
            </StepperStep>
            <StepperStep label={t('form-secondstep-label')} description={t('form-secondstep-description')}>
              <Stack gap={'lg'}>
                <TextInput
                  withAsterisk
                  label={t('form-url-label')}
                  placeholder={t('form-url-placeholder')}
                  name="url"
                  disabled={isSending}
                  {...form.getInputProps('url')}
                />
                <Textarea
                  label={t('form-description-label')}
                  placeholder={t('form-description-placeholder')}
                  name="description"
                  disabled={isSending}
                  {...form.getInputProps('description')}
                />
              </Stack>
            </StepperStep>
            <StepperStep label={t('form-thirdstep-label')} description={t('form-thirdstep-description')}>
              <Stack gap={'lg'}>
                <MultiSelect
                  disabled={isSending}
                  size={'sm'}
                  placeholder={t('filter-region-label')}
                  name="region"
                  label={t('form-region-label')}
                  {...form.getInputProps('region')}
                  multiple
                  data={regions}
                />
                <Select
                  disabled={isSending}
                  size={'sm'}
                  placeholder={t('filter-location-label')}
                  name="location"
                  label={t('form-location-label')}
                  {...form.getInputProps('location')}
                  data={locations}
                />
              </Stack>
            </StepperStep>

            <StepperCompleted>
              <Stack gap={'lg'}>
                <ServiceCard
                  asPreview
                  color={themesColors[values.theme?.[0]]}
                  theme={values.theme?.[0]}
                  service={{
                    name: values.label,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    publishedAt: new Date(),
                    description: values.description,
                    url: values.url,
                    tags: [],
                    code: values.label,
                    region: values.region.join(','),
                    location: values.location,
                    theme: values.theme?.[0],
                    country: 'France',
                    type: ['']
                  }}
                />
                <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} />
                <Button type="submit" loading={isSending}>
                  {t('form-submit-label')}
                </Button>
              </Stack>
            </StepperCompleted>
          </Stepper>

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default Form;
