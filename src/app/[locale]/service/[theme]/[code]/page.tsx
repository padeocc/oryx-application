import ServicePage from '@/app/components/pages/ServicePage';
import { fetchService } from '@/cms/utils';
import { Theme } from '@/config';
import { Metadata } from 'next';

import { Service as ServiceType } from '@/types';

export const generateMetadata = async (props: { params: Promise<{ code: string; theme: Theme }> }) => {
  const params = await props.params;
  const code = params.code;
  const theme = params.theme;
  const service: ServiceType | undefined = await fetchService({ code, theme });
  const metadataTags: Metadata = {
    title: `${service?.name} - OryxChange`,
    description: service?.description,
    keywords: [service?.name, ...(service?.tags || [])].join(', '),
    openGraph: {
      type: 'website',
      title: service?.name,
      description: service?.description,
      url: service?.url
    },
    metadataBase: service?.url ? new URL(service?.url) : undefined,
    alternates: {
      canonical: '/'
    },
    publisher: 'OryxChange',
    robots: 'index, follow'
  };
  return metadataTags;
};

export default async function Service(props: { params: Promise<{ code: string; theme: Theme }> }) {
  const params = await props.params;
  const code = params.code;
  const theme = params.theme;
  return (
    <main>
      <ServicePage code={code} theme={theme} />
    </main>
  );
}
