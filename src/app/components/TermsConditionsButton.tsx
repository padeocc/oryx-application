import { Modal, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

const TermsConditionsButton = ({ label }: { label?: string }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const t = useTranslations('terms_conditions');

  return (
    <>
      <Link onClick={() => setOpened(true)} href={'#'} color="gray">
        {label || t('read_conditions')}
      </Link>
      <Modal size="xl" opened={opened} onClose={() => setOpened(false)}>
        <h1>{t('cookie_usage')}</h1>
        <Text>{t('cookie_usage_description')}</Text>
        <ol>
          <li>
            <strong>{t('explicit_consent')}</strong> {t('explicit_consent_description')}
          </li>
          <li>
            <strong>{t('privacy_policy')}</strong> {t('privacy_policy_description')}
          </li>
          <li>
            <strong>{t('opt_in_cookies')}</strong> {t('opt_in_cookies_description')}
          </li>
          <li>
            <strong>{t('withdraw_consent')}</strong> {t('withdraw_consent_description')}
          </li>
          <li>
            <strong>{t('session_expiration')}</strong> {t('session_expiration_description')}
          </li>
        </ol>
        <Text>{t('contact_support')}</Text>
        <a href="mailto:support@oryxchange.com">support@oryxchange.com</a>.
      </Modal>
    </>
  );
};

export default TermsConditionsButton;
