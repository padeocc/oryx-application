'use client';

import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';

const SignupFormPage = ({ handleSubmit }: { handleSubmit: ({ response }: { response: any }) => Promise<void> }) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      termsOfService: false
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  //fakace@mailinator.com

  return (
    <form
      onSubmit={form.onSubmit(async values => {
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
          handleSubmit({ response });
        } catch (err: any) {
          console.error(err.message);
        }
      })}>
      <TextInput withAsterisk label="Prénom et nom" placeholder="" {...form.getInputProps('name')} />
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
  );
};

export default SignupFormPage;
