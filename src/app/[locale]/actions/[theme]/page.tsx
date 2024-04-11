import CatalogPage from '@/app/components/pages/ActionsPage';
import { Theme } from '@/config';

export default function Actions({ params }: { params: { theme: Theme } }) {
  return (
    <main>
      <CatalogPage themes={params.theme ? [params.theme] : []} />
    </main>
  );
}
