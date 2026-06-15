'use client';

import { Button, Container, Modal, Notification, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Check, Warning } from '@phosphor-icons/react/dist/ssr';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import messages from '../../../../../i18n/messages/fr.json';

const c = messages.contact;

const Form = ({
  sendContactEmail,
  sitekey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  defaultMessage = '',
  report = false
}: {
  sitekey?: string;
  sendContactEmail: (formData: FormData) => Promise<{ sent: boolean; errors?: { [key: string]: string } }>;
  defaultMessage?: string;
  report?: boolean;
}) => {
  const [okNotification, setOkNotification] = useState<boolean>(false);
  const [koNotification, setKoNotification] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const recaptcha: RefObject<ReCAPTCHA | null> = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setOkNotification(false), 10000);
    return () => clearTimeout(timeoutId);
  }, [okNotification]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setKoNotification(false), 5000);
    return () => clearTimeout(timeoutId);
  }, [koNotification]);

  const form = useForm({
    initialValues: { email: '', company: '', message: defaultMessage, name: '', recaptcha: '', url: '' }
  });

  const errorLabels: Record<string, string> = {
    required: c['form-error-required'],
    unknow: c['form-error-unknow']
  };

  return (
    <>
      <form
        onSubmit={() => setIsSending(true)}
        action={async (values: FormData) => {
          const { sent, errors = {} } = await sendContactEmail(values);
          if (sent === true) {
            form.reset();
            setOkNotification(true);
            recaptcha?.current?.reset();
          } else {
            const translatedErrors = Object.keys(errors).reduce(
              (all, key) => ({ ...all, [key]: errorLabels[errors[key]] || errors[key] }),
              {}
            );
            form.setErrors(translatedErrors);
            setKoNotification(true);
          }
          setIsSending(false);
        }}>
        <Stack gap={'xl'}>
          <TextInput withAsterisk label={c['form-name-label']} placeholder={c['form-name-placeholder']} name="name" disabled={isSending} {...form.getInputProps('name')} />
          {!report && (
            <TextInput label={c['form-company-label']} placeholder={c['form-company-placeholder']} name="company" disabled={isSending} {...form.getInputProps('company')} />
          )}
          <TextInput type="email" withAsterisk label={c['form-email-label']} placeholder={c['form-email-placeholder']} name="email" disabled={isSending} {...form.getInputProps('email')} />
          {!report && (
            <TextInput label={c['form-url-label']} name="url" disabled={isSending} {...form.getInputProps('url')} />
          )}
          <Textarea {...form.getInputProps('message')} label={c['form-message-label']} placeholder={c['form-message-placeholder']} withAsterisk name="message" disabled={isSending} rows={5} />
          <ReCAPTCHA sitekey={sitekey} ref={recaptcha} {...form.getInputProps('recaptcha')} />
          <Button type="submit" loading={isSending}>{c['form-submit-label']}</Button>
        </Stack>
      </form>
      <Container style={{ top: '5em', right: 0 }}>
        <Modal
          opened={okNotification}
          p="0"
          m="0"
          styles={{ content: { border: '0px', boxShadow: 'none', backgroundColor: 'transparent' } }}
          withCloseButton={false}
          onClose={() => setOkNotification(false)}>
          <Notification icon={<Check />} color="green" title={c['form-sent-success-title']} withBorder={false} onClose={() => setOkNotification(false)}>
            {c['form-sent-success-message']}
          </Notification>
        </Modal>
        {koNotification ? (
          <Notification icon={<Warning />} color="red" withBorder title={c['form-sent-fail-title']} onClose={() => setKoNotification(false)}>
            {c['form-sent-fail-message']}
          </Notification>
        ) : null}
      </Container>
    </>
  );
};

export default Form;
