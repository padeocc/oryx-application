'use client';

import { Box, Button, Checkbox, Group, TextInput } from '@mantine/core';
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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps('password')} />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignupFormPage;
