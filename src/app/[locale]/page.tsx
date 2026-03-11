import { metaAuthors } from '@/config';
import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

import HomePage from '@/components/pages/HomePage';

const url = process?.env?.NEXT_PUBLIC_APP_URL || '';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }) => {
  const params = await props.params;
  const { locale = 'fr' } = params;

  const messages = await getMessages({ locale });
  const metadata: any = messages.metadata || {};
  const metadataTags: Metadata = {
    title: metadata.homepage.title,
    description: metadata.homepage.description,
    keywords: metadata.homepage.keywords,
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
    authors: metaAuthors,
    publisher: 'OryxChange',
    robots: 'index, follow'
  };
  return metadataTags;
};

export default function Home() {
  return <HomePage />;
}
