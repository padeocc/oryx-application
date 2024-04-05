import ResetPasswordFormPage from '@/app/components/pages/ResetPasswordFormPage';
import ResetPasswordValidationFormPage from '@/app/components/pages/ResetPasswordValidationFormPage';
import { Card, Stack, Title } from '@mantine/core';

export default function PasswordReminder({ searchParams }: { searchParams: any }) {
  const { token, rid } = searchParams;

  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <Stack gap={'lg'}>
          <Title order={2}>Réinitialiser son mot de passe</Title>
          {token ? <ResetPasswordValidationFormPage /> : <ResetPasswordFormPage />}
        </Stack>
      </Card>
    </main>
  );
}
