import ResetPasswordFormPage from '@/app/components/pages/ResetPasswordPage/components/ResetPasswordForm';
import ResetPasswordValidationFormPage from '@/app/components/pages/ResetPasswordPage/components/ResetPasswordValidationForm';
import { Card, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;
  const t = await getTranslations('reset_password_page');

  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>{t('reset_password_title')}</Title>
        {token ? <ResetPasswordValidationFormPage /> : <ResetPasswordFormPage />}
      </Stack>
    </Card>
  );
}
