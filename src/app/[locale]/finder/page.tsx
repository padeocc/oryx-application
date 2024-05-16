import { fetchActions } from '@/app/components/pages/ActionsPage/utils';
import FinderPage from '@/components/pages/FinderPage';

export default function Finder() {
  return (
    <main>
      <FinderPage
        fetchActions={async ({ filters }) => {
          'use server';
          return fetchActions({ filters });
        }}
      />
    </main>
  );
}
