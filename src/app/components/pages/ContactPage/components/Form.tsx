'use client';

import { Button, Container, Modal, Notification, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Check, Warning } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Form = ({
  sendContactEmail,
  sitekey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
}: {
  sitekey?: string;
  sendContactEmail: (formData: FormData) => Promise<{
    sent: boolean;
    errors?: { [key: string]: string };
  }>;
}) => {
  const t = useTranslations('contact');
  const [okNotification, setOkNotification] = useState<boolean>(false);
  const [koNotification, setKoNotification] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const recaptcha: RefObject<ReCAPTCHA | null> = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOkNotification(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [okNotification]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKoNotification(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [koNotification]);

  const form = useForm({
    initialValues: {
      email: '',
      company: '',
      message: '',
      name: '',
      recaptcha: '',
      url: ''
    }
  });

  return (
    <>
      <form
        onSubmit={() => {
          setIsSending(true);
        }}
        action={async (values: FormData) => {
          const { sent, errors = {} } = await sendContactEmail(values);
          if (sent === true) {
            form.reset();
            setOkNotification(true);
            recaptcha?.current?.reset();
          } else {
            const errorKeys = Object.keys(errors);
            const translatedErrors = errorKeys.reduce(
              (all, errorKey) => ({ ...all, [errorKey]: t(`form-error-${errors[errorKey]}`) }),
              {}
            );
            form.setErrors(translatedErrors);
            setKoNotification(true);
          }
          setIsSending(false);
        }}>
        <Stack gap={'xl'}>
          <TextInput
            withAsterisk
            label={t('form-name-label')}
            placeholder={t('form-name-palceholder')}
            name="name"
            disabled={isSending}
            {...form.getInputProps('name')}
          />
          <TextInput
            label={t('form-company-label')}
            placeholder={t('form-company-palceholder')}
            name="company"
            disabled={isSending}
            {...form.getInputProps('company')}
          />
          <TextInput
            type="email"
            withAsterisk
            label={t('form-email-label')}
            placeholder={t('form-email-palceholder')}
            name="email"
            disabled={isSending}
            {...form.getInputProps('email')}
          />
          <TextInput label={t('form-url-label')} name="url" disabled={isSending} {...form.getInputProps('url')} />
          <Textarea
            {...form.getInputProps('message')}
            label={t('form-message-label')}
            placeholder={t('form-message-palceholder')}
            withAsterisk
            name="message"
            disabled={isSending}
            rows={5}
          />
          <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} />
          <Button type="submit" loading={isSending}>
            {t('form-submit-label')}
          </Button>
        </Stack>
      </form>
      <Container style={{ position: 'fixed', top: '5em', right: 0 }}>
        <Modal
          opened={okNotification}
          p="0"
          m="0"
          styles={{
            content: { border: '0px', boxShadow: 'none', backgroundColor: 'transparent' }
          }}
          withCloseButton={false}
          onClose={() => {
            setOkNotification(false);
          }}>
          <Notification
            icon={<Check />}
            color="green"
            title={t('form-sent-success-title')}
            withBorder={false}
            onClose={() => {
              setOkNotification(false);
            }}>
            {t('form-sent-success-message')}
          </Notification>
        </Modal>
        {koNotification ? (
          <Notification
            icon={<Warning />}
            color="red"
            withBorder
            title={t('form-sent-fail-title')}
            onClose={() => {
              setKoNotification(false);
            }}>
            {t('form-sent-fail-message')}
          </Notification>
        ) : null}
      </Container>
    </>
  );
};

export default Form;
