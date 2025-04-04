import { gateway } from '@/cms/utils';
import { sendServiceAdditionEmail } from '@/mailer';
import { Service } from '@/types';
import { Alert, Stack } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Form from './components/Form';

const ServiceAdditionPage = async () => {
  const t = await getTranslations('service-add');
  return (
    <Stack>
      <Alert title={t('form-title')}>{t('form-description')}</Alert>
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

            const service = (await gateway.post(data)) as Service;
            const { sent } = await sendServiceAdditionEmail(service);
            return { sent, service };
          }}
        />
      </Alert>
    </Stack>
  );
};

export default ServiceAdditionPage;
