import { Box, Button, Group, TextInput } from '@mantine/core';
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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps('password')} />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginFormPage;
