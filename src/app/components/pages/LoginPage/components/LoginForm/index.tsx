'use client';

import { Button, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
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

  //fakace@mailinator.com

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
            // TODO translate
            throw { message: response.status };
          }
        } catch (err: any) {
          setIsloading(false);
          setError(err?.message || 'Unknown');
        }
      })}>
      <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="/fr/signup/reset-password">
          Rappeler son mot de passe
        </Button>
        <Button variant="outline" loading={isLoading} component={Link} href="/fr/signup">
          S&lsquo;inscrire
        </Button>
        <Button type="submit" loading={isLoading}>
          Se connecter
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default LoginFormPage;
