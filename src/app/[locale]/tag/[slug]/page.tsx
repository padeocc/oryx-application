import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TagPage from '@/components/pages/TagPage';
import { getProductStructureBySlug, getBreadcrumbPath, getChildrenItemsBySlug } from '@/domain/productstructure/utils';
import { search } from '@/algolia/search';
import { Service } from '@/types';
import { Theme } from '@/config';
import { transformServicesFromResults } from '@/algolia/utils';

export const generateMetadata = async (props: { 
  params: Promise<{ slug: string; locale: string }> 
}): Promise<Metadata> => {
  const params = await props.params;
  const { slug } = params;
  
  const productStructure = getProductStructureBySlug(slug);
  
  if (!productStructure) {
    return notFound();
  }

  const canonical = `${process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN}/${params.locale}/tag/${slug}`;
  
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
    alternates: {
      canonical
    },
    publisher: 'OryxChange',
    robots: 'index, follow'
  };
};

// Function to fetch services by product structure
async function fetchServicesByProductStructure(productStructure: string, theme: Theme): Promise<Service[]> {
  try {
    // Search for services that have this product structure in their productstructure field
    // Since productstructure is stored as a string in Algolia, we need to search for it as a tag
    const response = await search({
      query: productStructure,
      filters: {
        theme: [theme]
      },
      page: 0,
      limit: 50,
    });

    // @ts-ignore
    return transformServicesFromResults({ results: response?.results[0].hits as IResult[] || [] });
  } catch (error) {
    console.error('Error fetching services by product structure:', error);
    return [];
  }
}

export default async function ProductStructurePageRoute(props: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const params = await props.params;
  const { slug } = params;
  
  // Get product structure data
  const productStructure = getProductStructureBySlug(slug);
  
  if (!productStructure) {
    return notFound();
  }
  
  // Get breadcrumb path
  const breadcrumbPath = getBreadcrumbPath(slug);
  const children = getChildrenItemsBySlug(slug);
  
  // Fetch services related to this product structure
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

// Generate static paths for all product structures
export async function generateStaticParams() {
  const { getAllProductStructureSlugs } = await import('@/domain/productstructure/utils');
  const slugs = getAllProductStructureSlugs();
  
  return slugs.map(slug => ({ slug }));
}
