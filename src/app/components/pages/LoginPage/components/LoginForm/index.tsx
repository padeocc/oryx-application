'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'supertokens-web-js/recipe/emailpassword';

const LoginFormPage = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  const t = useTranslations('login_form_page');

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsloading(true);
        try {
          const response = await signIn({
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
            throw { message: response.status };
          }
        } catch (err: any) {
          setIsloading(false);
          setError(err?.message || t('unknown_error')); // Use translated error message
        }
      })}>
      <TextInput
        withAsterisk
        label={t('email_address')}
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <TextInput withAsterisk label={t('password')} type="password" {...form.getInputProps('password')} />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="signup/reset-password">
          {t('forgot_password')}
        </Button>
        <Button variant="outline" loading={isLoading} component={Link} href="signup">
          {t('signup')}
        </Button>
        <Button type="submit" loading={isLoading}>
          {t('login')}
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default LoginFormPage;
