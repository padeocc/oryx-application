import SupertokensProvider from '@/components/auth/SupertokensProvider';
import HeaderMenu from '@/components/navigation/HeaderMenu';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  Container,
  MantineColorsTuple,
  MantineProvider,
  MantineThemeOverride
} from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oryx',
  description: ''
};

const green: MantineColorsTuple = [
  '#f1f9f8',
  '#e4efee',
  '#c4dfda',
  '#a0cdc6',
  '#83bfb6',
  '#70b6ab',
  '#65b3a5',
  '#549c90',
  '#478c80',
  '#34796e'
];

const gray: MantineColorsTuple = [
  '#dbdbdb',
  '#dfdfdf',
  '#e3e3e3',
  '#e7e7e7',
  '#ebebeb',
  '#eeeeee',
  '#f1f1f1',
  '#f4f4f4',
  '#f7f7f7',
  '#f9f9f9',
  '#fcfcfc',
  '#ffffff'
];

export const theme: MantineThemeOverride = {
  fontFamily: 'Comfortaa,Arial,Helvetica,sans-serif',
  fontSizes: {
    xs: '0.7rem',
    sm: '0.8rem',
    md: '0.9rem',
    lg: '1.0rem',
    xl: '1.2rem'
  },
  headings: {
    sizes: {
      h1: { fontWeight: '100', fontSize: '2.3em' },
      h2: { fontSize: '1.2rem' },
      h3: { fontSize: '1.1rem' }
    }
  },
  colors: {
    green,
    gray
  },
  primaryColor: 'green'
};

const googleAnalyticsId = '';

const GTags: React.ReactNode = googleAnalyticsId ? (
  <div className="container">
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `}
    </Script>
  </div>
) : (
  <span></span>
);

export default async function RootLayout({
  children,
  params: { locale = 'fr' }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <SupertokensProvider>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ColorSchemeScript defaultColorScheme="light" />
            <MantineProvider defaultColorScheme="light" theme={theme}>
              <AppShell bg="var(--mantine-primary-color-1)">
                <AppShellHeader bg="transparent" withBorder={false}>
                  <HeaderMenu />
                </AppShellHeader>
                <AppShellMain pt={{ base: 120, sm: 120 }}>
                  <Container maw={'1280px'} p="xl">
                    {children}
                  </Container>
                </AppShellMain>
              </AppShell>
            </MantineProvider>
            {GTags}
          </NextIntlClientProvider>
        </body>
      </SupertokensProvider>
    </html>
  );
}
