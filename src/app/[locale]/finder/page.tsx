import { fetchServices } from '@/app/components/pages/ActionsPage/utils';
import FinderPage from '@/components/pages/FinderPage';

export default function Finder() {
  return (
    <main>
      <FinderPage
        fetchServices={async ({ filters }) => {
          'use server';
          return fetchServices({ filters });
        }}
      />
    </main>
  );
}
