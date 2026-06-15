import { metaAuthors } from '@/config';
import { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';
import { Theme } from '@/config';
import { set } from 'lodash';
import messages from '../../../i18n/messages/fr.json';

const meta = messages.metadata.services;

export const generateMetadata = async (): Promise<Metadata> => {
  const url = process?.env?.NEXT_PUBLIC_APP_URL || '';
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: { type: 'website', title: meta.title, description: meta.description, url },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
    metadataBase: new URL(url),
    alternates: { canonical: '/services' },
    authors: metaAuthors,
    publisher: 'OryxChange',
    robots: 'noindex, follow'
  };
};

const transformParams = (params: { [key: string]: string | string[] | undefined } | undefined = {}) => {
  const result = { page: '0', filters: '{}' };
  Object.keys(params).forEach(key => {
    const value = params[key];
    const transformedKey = key.replace(/\[(\w+)\]/g, '.$1');
    set(result, transformedKey, value);
  });
  return result;
};

export default async function ActionsTheme(props: {
  params: Promise<{ theme: Theme }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined } | undefined>;
}) {
  const searchParams = await props.searchParams;
  const parameters = transformParams(searchParams);
  return (
    <main>
      <ServicesPage parameters={parameters} />
    </main>
  );
}
