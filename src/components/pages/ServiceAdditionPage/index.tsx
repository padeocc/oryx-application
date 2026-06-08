import { addService } from '@/cms/utils';
import { sendServiceAdditionEmail } from '@/mailer';
import { Service } from '@/types';
import { Alert, Stack } from '@mantine/core';
import Form from './components/Form';
import messages from '../../../../i18n/messages/fr.json';

const sa = messages['service-add'];

const ServiceAdditionPage = async () => {
  return (
    <Stack>
      <Alert title={sa['form-title']}>{sa['form-description']}</Alert>
      <Alert>
        <Form
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          handleSubmit={async data => {
            'use server';

            const recaptchaResponse = await (
              await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${
                  data?.recaptcha?.toString() || undefined
                }`
              )
            ).json();

            if (!recaptchaResponse?.success) {
              return { sent: false, errors: { validation: 'recaptcha' } };
            }

            const service = (await addService(data)) as Service;
            const { sent } = await sendServiceAdditionEmail(service);
            return { sent, service };
          }}
        />
      </Alert>
    </Stack>
  );
};

export default ServiceAdditionPage;
