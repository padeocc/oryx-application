import { sendContactEmail } from '@/mailer';
import { Alert, Stack, Text, Title } from '@mantine/core';
import Form from './components/Form';
import { generateReportMessage } from '../ServicePage';
import messages from '../../../../i18n/messages/fr.json';

const contact = messages.contact;

const ContactPage = async ({ searchParams }: { searchParams: Promise<{ report?: string }> }) => {
  const params = await searchParams;
  const code = params?.report;

  return (
    <Stack>
      <Title order={2}>{contact.title}</Title>
      <Text>{code ? contact['description-report'] : contact.description}</Text>
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
