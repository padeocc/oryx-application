'use client';

import TermsConditionsButton from '@/components/TermsConditionsButton';
import { Button, Checkbox, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
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

  return (
    <form
      onSubmit={form.onSubmit(async values => {
        setIsloading(true);
        try {
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
      <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />
      <Checkbox
        mt="md"
        label={
          <Group>
            Je suis d&lsquo;accord avec les conditions d&lsquo;inscription <TermsConditionsButton label="(Lire)" />
          </Group>
        }
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" loading={isLoading} component={Link} href="/fr/login">
          Se connecter
        </Button>
        <Button type="submit" loading={isLoading}>
          S&lsquo;inscrire
        </Button>
      </Group>
      {error ? <Text c="red">{error}</Text> : null}
    </form>
  );
};

export default SignupFormPage;
