import GoogleAnalytics from '@/components/GoogleAnalytics';
import HeaderMenu from '@/components/navigation/HeaderMenu';
import { theme } from '@/theme';
import { AppShell, AppShellMain, ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { Inter } from 'next/font/google';
import GDPRConsent from '../components/navigation/GDPRConsent';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });
const url = 'https://www.oryxchange.com';

const authors: Author[] = [
  { name: 'Padeo', url: 'https://www.padeo.fr' },
  { name: 'Oryx', url }
];

export const generateMetadata = async ({ params: { locale = 'fr' } }: { params: { locale: string } }) => {
  const messages = await getMessages({ locale });
  const metadata: any = messages.metadata || {};
  const metadataTags: Metadata = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      type: 'website',
      title: metadata.title,
      description: metadata.description,
      url
    },
    twitter: { card: 'summary_large_image', title: metadata.title, description: metadata.description },
    metadataBase: new URL(url),
    alternates: {
      canonical: '/'
    },
    authors,
    publisher: 'Oryx',
    robots: 'index, follow'
  };
  return metadataTags;
};

export default async function RootLayout({
  children,
  params: { locale = 'fr' }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Padeo',
    url: 'https://www.padeo.fr',
    sameAs: ['https://www.linkedin.com/company/pour-un-avenir-durable-en-occitanie/']
  };

  const umamiComponent = process?.env?.UMAMI_TRACKER_ID ? (
    <script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.UMAMI_TRACKER_ID}></script>
  ) : null;

  return (
    <html lang={locale}>
      <head>
        <GDPRConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {umamiComponent}
      </head>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
