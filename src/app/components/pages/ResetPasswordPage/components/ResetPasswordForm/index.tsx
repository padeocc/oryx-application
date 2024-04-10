'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword';

const PasswordReminderFormPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const t = useTranslations('password_reminder_page');

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsLoading(true);
        try {
          let response = await sendPasswordResetEmail({
            formFields: [
              {
                id: 'email',
                value: values.email
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
          setIsLoading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput
        withAsterisk
        label={t('email_address')}
        placeholder={t('email_placeholder')}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="/fr/login">
          {t('login')}
        </Button>
        <Button variant="outline" loading={isLoading}>
          {t('signup')}
        </Button>
        <Button type="submit" loading={isLoading}>
          {t('reset_password')}
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default PasswordReminderFormPage;
