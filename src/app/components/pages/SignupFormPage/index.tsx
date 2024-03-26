'use client';

import { Alert, Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
// import SuperTokens from 'supertokens-web-js';
// import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
// import Session from 'supertokens-web-js/recipe/session';

// SuperTokens.init({
//   appInfo: {
//     apiDomain: 'http://localhost:3000',
//     apiBasePath: '/auth',
//     appName: '...'
//   },
//   recipeList: [Session.init(), EmailPassword.init()]
// });

const SignupFormPage = ({ handleSubmit }: { handleSubmit: () => {} }) => {
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
    <>
      <Alert color="orange">Bientôt disponible !</Alert>
      <br />
      <br />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />
        <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />
        <Checkbox
          mt="md"
          label="Je suis d'accord avec les conditions d'inscription"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">S&lsquo;inscrire</Button>
        </Group>
      </form>
    </>
  );
};

export default SignupFormPage;
