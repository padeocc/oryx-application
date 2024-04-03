'use client';

import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'supertokens-web-js/recipe/emailpassword';

const LoginFormPage = ({ handleSubmit }: { handleSubmit: any }) => {
  // SuperTokensWebJs.init(getFrontendAuthConfig());

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  return (
    <form
      onSubmit={form.onSubmit(async values => {
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
          await handleSubmit({ response });
          window.location.replace('/');
        } catch (err: any) {
          console.error(err.message);
        }
      })}>
      <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Se connecter</Button>
      </Group>
    </form>
  );
};

export default LoginFormPage;
