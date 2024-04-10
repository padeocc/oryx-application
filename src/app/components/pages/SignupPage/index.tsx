import SignupFormPage from '@/app/components/pages/SignupPage/components/SignupForm';
import { Card, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function SignupPage() {
  const t = await getTranslations('signup_page');

  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>{t('signup_title')}</Title>
        <SignupFormPage />
      </Stack>
    </Card>
  );
}
