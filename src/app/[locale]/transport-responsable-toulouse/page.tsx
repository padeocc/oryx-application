import LandingTransportPage from "@/app/components/pages/LandingTransportPage";
import { fetchLandingPage } from "@/cms/utils";
import { Theme } from '@/config';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLandingPage('landing-page-transport');

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
  };
};

 export default async function Page(props: {
  params: Promise<{ theme: Theme }>;
}) {
  const page = await fetchLandingPage('landing-page-transport');
  const params = await props.params;

  return (
    <main>
      <LandingTransportPage page={page} theme={params.theme} />
    </main>
  );
}