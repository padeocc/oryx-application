'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword';

const PasswordReminderValidationFormPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const t = useTranslations('password_reminder_validation_page');

  const form = useForm({
    initialValues: {
      password: ''
    },
    validate: {}
  });

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsLoading(true);
        try {
          let response = await submitNewPassword({
            formFields: [
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
          setIsLoading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput withAsterisk label={t('password')} type="password" {...form.getInputProps('password')} />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={isLoading}>
          {t('reset')}
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default PasswordReminderValidationFormPage;
