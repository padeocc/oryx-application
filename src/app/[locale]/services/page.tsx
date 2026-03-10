import { metaAuthors } from '@/config';
import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

import ServicesPage from '@/components/pages/ServicesPage';
import { Theme } from '@/config';
import { set } from 'lodash';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }) => {
  const url = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
  const params = await props.params;
  const { locale = 'fr' } = params;

  const messages = await getMessages({ locale });
  const metadata: any = messages.metadata || {};
  const metadataTags: Metadata = {
    title: metadata.services.title,
    description: metadata.services.description,
    keywords: metadata.services.keywords,
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
    robots: 'noindex, follow'
  };
  return metadataTags;
};

const transformParams = (params: { [key: string]: string | string[] | undefined } | undefined = {}) => {
  const result = {
    page: '0',
    filters: '{}'
  };
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
