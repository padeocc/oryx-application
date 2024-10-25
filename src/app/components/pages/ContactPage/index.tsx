import { sendContactEmail } from '@/mailer';
import { Alert, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Form from './components/Form';

const ContactPage = async ({}: {}) => {
  const t = await getTranslations('contact');

  return (
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <Text>{t('description')}</Text>
      <Alert c="green_oryx">
        <Form sendContactEmail={sendContactEmail} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
      </Alert>
    </Stack>
  );
};

export default ContactPage;
