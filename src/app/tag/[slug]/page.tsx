import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TagPage from '@/components/pages/TagPage';
import { getProductStructureBySlug, getBreadcrumbPath, getChildrenItemsBySlug } from '@/domain/productstructure/utils';
import { search } from '@/algolia/search';
import { Service } from '@/types';
import { Theme } from '@/config';
import { transformServicesFromResults } from '@/algolia/utils';

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await props.params;
  const productStructure = getProductStructureBySlug(slug);

  if (!productStructure) return notFound();

  const canonical = `${process?.env?.NEXT_PUBLIC_APP_URL}/tag/${slug}`;

  return {
    title: `${productStructure.title} - OryxChange`,
    description: productStructure.meta_description,
    keywords: productStructure.keywords,
    openGraph: {
      type: 'website',
      title: productStructure.title,
      description: productStructure.meta_description,
      url: canonical
    },
    metadataBase: new URL(canonical),
    alternates: { canonical },
    publisher: 'OryxChange',
    robots: 'index, follow'
  };
};

async function fetchServicesByProductStructure(productStructure: string, theme: Theme): Promise<Service[]> {
  try {
    const response = await search({ query: productStructure, filters: { theme: [theme] }, page: 0, limit: 50 });
    // @ts-ignore
    return transformServicesFromResults({ results: response?.results[0].hits || [] });
  } catch {
    return [];
  }
}

export default async function ProductStructurePageRoute(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params;
  const productStructure = getProductStructureBySlug(slug);

  if (!productStructure) return notFound();

  const breadcrumbPath = getBreadcrumbPath(slug);
  const children = getChildrenItemsBySlug(slug);
  const { theme, productstructure } = productStructure;
  const services = await fetchServicesByProductStructure(productstructure, theme);

  return (
    <main>
      <TagPage
        productStructure={productStructure}
        services={services}
        breadcrumbPath={breadcrumbPath}
        subProductStucture={children}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const { getAllProductStructureSlugs } = await import('@/domain/productstructure/utils');
  const slugs = getAllProductStructureSlugs();
  return slugs.map(slug => ({ slug }));
}
