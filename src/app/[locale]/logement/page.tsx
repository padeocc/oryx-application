import LangingPage from '@/components/pages/LangingPage';
import { fetchLandingPage } from '@/cms/utils';
import { Theme } from '@/config';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const { title, metaDescription: description, keywords } = await fetchLandingPage('landing-page-batiment');
  return {
    title,
    description,
    keywords
  };
}

export default async function Page(props: { params: Promise<{ theme: Theme }> }) {
    try {
        const page = await fetchLandingPage('landing-page-batiment');
        return (
            <main>
            <LangingPage page={page} />
            </main>
        );
        
    } catch (error) {
        return notFound();
    } 
}
