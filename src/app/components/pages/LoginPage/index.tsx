import LoginForm from '@/app/components/pages/LoginPage/components/LoginForm';
import { Card, Stack, Title } from '@mantine/core';

export default function LoginPage() {
  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>Se connecter</Title>
        <LoginForm />
      </Stack>
    </Card>
  );
}
