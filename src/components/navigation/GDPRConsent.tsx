'use client';

import { Button, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';

const GDPRConsent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="J'accepte"
      cookieName="oryx-gdpr"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={150}>
      <Stack p={'xl'}>
        <Text>Ce site n'utilise pas de cookies pour enregistrer votre activité. Cependant, des cookies sont utilisés pour des raisons de sécurité lors de l'envoi d'informations via le formulaire de contact. De plus, des cookies peuvent être employés pour identifier un utilisateur en cas de création de compte. En poursuivant votre navigation sur cette plateforme, vous acceptez les conditions énoncées dans notre page des CGU.</Text>
        <Button component={Link} href="/legal">
          Voir les Conditions Générales d'Utilisation
        </Button>
      </Stack>
    </CookieConsent>
  );
};

export default GDPRConsent;
