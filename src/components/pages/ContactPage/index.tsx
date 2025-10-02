import { sendContactEmail } from '@/mailer';
import { Alert, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Form from './components/Form';
import {generateReportMessage} from "../ServicePage"

const ContactPage = async ({ searchParams }: { searchParams: Promise<{ report?: string }> }) => {
  const t = await getTranslations('contact');
  const params = await searchParams;
  const code = params?.report;

  return (
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <Text>{code ? t('description-report') : t('description')}</Text>
      <Alert c="green_oryx">
        <Form
          sendContactEmail={sendContactEmail}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          defaultMessage={code ? await generateReportMessage(code) : ''}
          report={!!code}
        />
      </Alert>
    </Stack>
  );
};

export default ContactPage;
