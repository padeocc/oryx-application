import CatalogPage from '@/app/components/pages/CatalogPage';

export type Theme =
  | 'eating'
  | 'housing'
  | 'goods'
  | 'services'
  | 'transport'
  | 'eventformationinfluence'
  | 'finance'
  | 'lifestyle'
  | 'pollution'
  | 'biodiversity';

export default function Home({ params }: { params: { theme: Theme } }) {
  return (
    <main>
      <CatalogPage themes={params.theme ? [params.theme] : []} />
    </main>
  );
}
