import { addService } from '@/cms/utils';
import { sendServiceAdditionEmail } from '@/mailer';
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
            const service = await addService(data);
            console.log({ service });
            await sendServiceAdditionEmail(data);
            return { sent: !!service };
          }}
        />
      </Alert>
    </Stack>
  );
};

export default ServiceAdditionPage;
