import GoogleAnalytics from '@/components/GoogleAnalytics';
import SupertokensProvider from '@/components/auth/SupertokensProvider';
import HeaderMenu from '@/components/navigation/HeaderMenu';
import { theme } from '@/theme';
import { AppShell, AppShellHeader, AppShellMain, ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Footer from '../components/navigation/Footer';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oryx',
  description: ''
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
      <SupertokensProvider>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ColorSchemeScript defaultColorScheme="light" />
            <MantineProvider defaultColorScheme="light" theme={theme}>
              <AppShell bg="var(--mantine-primary-color-1)" header={{ height: '8em' }} pb="xl">
                <AppShellHeader withBorder={false}>
                  <HeaderMenu />
                </AppShellHeader>
                <AppShellMain pt={{ base: 120, sm: 120 }}>
                  <Container maw={'1280px'} p="md">
                    {children}
                  </Container>
                </AppShellMain>
              </AppShell>
              <Footer />
            </MantineProvider>
            <GoogleAnalytics />
          </NextIntlClientProvider>
        </body>
      </SupertokensProvider>
    </html>
  );
}
