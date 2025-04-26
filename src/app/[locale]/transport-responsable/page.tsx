import LandingTransportPage from '@/app/components/pages/LandingTransportPage';
import { fetchLandingPage } from '@/cms/utils';
import { Theme } from '@/config';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { title, metaDescription: description, keywords } = await fetchLandingPage('landing-page-transport');
  return {
    title,
    description,
    keywords
  };
}

export default async function Page(props: { params: Promise<{ theme: Theme }> }) {
  const page = await fetchLandingPage('landing-page-transport');
  return (
    <main>
      <LandingTransportPage page={page} />
    </main>
  );
}
