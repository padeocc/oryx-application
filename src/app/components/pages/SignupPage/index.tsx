import SignupFormPage from '@/app/components/pages/SignupPage/components/SignupForm';
import { Card, Stack, Title } from '@mantine/core';

export default function SignupPage() {
  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>S&lsquo;inscrire</Title>
        <SignupFormPage />
      </Stack>
    </Card>
  );
}
