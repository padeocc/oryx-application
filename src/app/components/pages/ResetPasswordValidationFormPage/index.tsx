'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword';

const PasswordReminderValidationFormPage = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useForm({
    initialValues: {
      password: ''
    },
    validate: {}
  });

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsloading(true);
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
          setIsloading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={isLoading}>
          Réinitialiser
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default PasswordReminderValidationFormPage;
