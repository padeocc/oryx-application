import SignupFormPage from '@/pages/SignupFormPage';
import { Card, Stack, Title } from '@mantine/core';

export default function Signup() {
  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <Stack gap={'lg'}>
          <Title order={2}>S&lsquo;inscrire</Title>
          <SignupFormPage />
        </Stack>
      </Card>
    </main>
  );
}
