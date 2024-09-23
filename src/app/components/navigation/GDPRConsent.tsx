'use client';

import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';

const GDPRConsent = () => {
  const t = useTranslations('legal');
  return (
    <CookieConsent
      location="bottom"
      buttonText={t('consent_hide')}
      cookieName="oryx-gdpr"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={150}>
      <Stack p={'xl'}>
        <Text>{t('consent_content')}</Text>
        <Button component={Link} href="/legal">
          {t('consent_access_legal_page_label')}
        </Button>
      </Stack>
    </CookieConsent>
  );
};

export default GDPRConsent;
