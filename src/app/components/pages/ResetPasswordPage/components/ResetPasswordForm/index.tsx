'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword';

const PasswordReminderFormPage = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
        setIsloading(true);
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
          setIsloading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />

      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="/fr/login">
          Se connecter
        </Button>
        <Button variant="outline" loading={isLoading}>
          S&lsquo;inscrire
        </Button>
        <Button type="submit" loading={isLoading}>
          Rappeler son mot de passe
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default PasswordReminderFormPage;
