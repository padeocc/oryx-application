import ResetPasswordFormPage from '@/app/components/pages/ResetPasswordPage/components/ResetPasswordForm';
import ResetPasswordValidationFormPage from '@/app/components/pages/ResetPasswordPage/components/ResetPasswordValidationForm';
import { Card, Stack, Title } from '@mantine/core';

export default function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;

  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>Réinitialiser son mot de passe</Title>
        {token ? <ResetPasswordValidationFormPage /> : <ResetPasswordFormPage />}
      </Stack>
    </Card>
  );
}
