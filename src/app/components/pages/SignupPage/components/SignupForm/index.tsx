'use client';

import TermsConditionsButton from '@/components/TermsConditionsButton';
import { Button, Checkbox, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';

const SignupFormPage = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  const t = useTranslations('signup_form_page');

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsloading(true);
        try {
          if (values.termsOfService !== true) {
            throw { message: 'termsOfServicesNotChecked' };
          }

          const response = await signUp({
            formFields: [
              {
                id: 'email',
                value: values.email
              },
              {
                id: 'password',
                value: values.password
              }
            ]
          });

          if (response.status === 'OK') {
            window.location.replace('/');
          } else {
            // TODO translate
            throw { message: response.status };
          }
        } catch (err: any) {
          setIsloading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput withAsterisk label={t('email_label')} placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput withAsterisk label={t('password_label')} type="password" {...form.getInputProps('password')} />
      <Checkbox
        mt="md"
        label={
          <Group>
            {t('terms_of_service_text')} <TermsConditionsButton label={t('terms_conditions_button_label')} />
          </Group>
        }
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="/login">
          {t('login_button_label')}
        </Button>
        <Button type="submit" loading={isLoading}>
          {t('signup_button_label')}
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default SignupFormPage;
