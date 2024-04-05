import LoginFormPage from '@/pages/LoginFormPage';
import { Card, Stack, Title } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <Stack gap={'lg'}>
          <Title order={2}>Se connecter</Title>
          <LoginFormPage />
        </Stack>
      </Card>
    </main>
  );
}
