import LoginForm from '@/app/components/pages/LoginPage/components/LoginForm';
import { Card, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('login_page');

  return (
    <Card color={'white'} maw={840} mx="auto">
      <Stack gap={'lg'}>
        <Title order={2}>{t('login')}</Title>
        <LoginForm />
      </Stack>
    </Card>
  );
}
