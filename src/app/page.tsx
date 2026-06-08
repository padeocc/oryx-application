import { metaAuthors } from '@/config';
import { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import messages from '../../i18n/messages/fr.json';

const url = process?.env?.NEXT_PUBLIC_APP_URL || '';
const meta = messages.metadata.homepage;

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: { type: 'website', title: meta.title, description: meta.description, url },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
    metadataBase: new URL(url),
    alternates: { canonical: '/' },
    authors: metaAuthors,
    publisher: 'OryxChange',
    robots: 'index, follow'
  };
};

export default function Home() {
  return <HomePage />;
}
