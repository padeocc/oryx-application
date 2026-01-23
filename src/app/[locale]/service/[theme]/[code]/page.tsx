import ServicePage from '@/components/pages/ServicePage';
import { Theme } from '@/config';
import { Metadata } from 'next';
import { Service as ServiceType } from '@/types';
import { fetchService } from '@/algolia/utils';
import { fetchServiceContent } from '@/cms/utils';

export const generateMetadata = async (props: { params: Promise<{ code: string; theme: Theme }> }) => {
  const params = await props.params;
  const { code, theme } = params;
  const service: ServiceType | undefined = await fetchService({ code, theme });
  const canonical = `${process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN}/fr/${theme}/${code}`;
  const metadataTags: Metadata = {
    title: `${service?.name} - OryxChange`,
    description: service?.description,
    keywords: [service?.name, ...(service?.productstructure || [])].join(', '),
    openGraph: {
      type: 'website',
      title: service?.name,
      description: service?.description,
      url: service?.url
    },
    metadataBase: new URL(canonical),
    alternates: {
      canonical
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
      <ServicePage 
        code={code}
        theme={theme}
        fetchService={fetchService}
        fetchServiceContent={fetchServiceContent}
      />
    </main>
  );
}
