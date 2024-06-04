'use client';

import CookieConsent from 'react-cookie-consent';

const GDPRConsent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      cookieName="oryx-gdpr"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={150}>
      Ce site internet utilise des cookies pour son fonctionnement. En cliquant sur {'Accepter'} ou en continuant de
      naviguer, vous les acceptez.
    </CookieConsent>
  );
};

export default GDPRConsent;
