import { Theme } from '@/config';
import List from './components/List';
import { Filters, fetchActions } from './utils';

const ActionsPage = async ({ themes }: { themes?: Theme[] }) => {
  const subjects = themes ? themes : [];
  const actions = await fetchActions({
    filters: {
      categories: [],
      subjects
    }
  });
  return (
    <List
      fetchActions={async ({ filters }: { filters: Filters }) => {
        'use server';
        return fetchActions({ filters });
      }}
      data={actions}
      subjects={subjects}
      categories={[]}
    />
  );
};

export default ActionsPage;
