import GoogleAnalytics from '@/components/GoogleAnalytics';
import HeaderMenu from '@/components/navigation/HeaderMenu';
import { theme } from '@/theme';
import { AppShell, AppShellMain, ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import GDPRConsent from '../components/navigation/GDPRConsent';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oryx - Le compagnon des initiatives écoresponsables !',
  description: 'Le compagnon des initiatives écoresponsables'
};

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
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ColorSchemeScript defaultColorScheme="light" />
          <MantineProvider defaultColorScheme="light" theme={theme}>
            <AppShell bg="var(--mantine-primary-color-1)">
              <header>
                <HeaderMenu />
              </header>
              <AppShellMain>
                <Container maw={'1280px'} p="md">
                  {children}
                </Container>
              </AppShellMain>
            </AppShell>
          </MantineProvider>
          <GoogleAnalytics />
          <GDPRConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
