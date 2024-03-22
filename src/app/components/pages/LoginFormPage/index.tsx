import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const LoginFormPage = ({ handleSubmit }: { handleSubmit: () => {} }) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
      //password:
    }
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput withAsterisk label="Adresse email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput withAsterisk label="Mot de passe" type="password" {...form.getInputProps('password')} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Se connecter</Button>
      </Group>
    </form>
  );
};

export default LoginFormPage;
