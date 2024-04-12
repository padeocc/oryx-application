import { Theme } from '@/config';
import List from './components/List';
import { Filters, fetchActions, getCategoriesFromSubjects } from './utils';

const ActionsPage = async ({ themes, showAssistant }: { themes?: Theme[]; showAssistant?: boolean }) => {
  const subjects = themes ? themes : [];
  const categories = getCategoriesFromSubjects(subjects);
  const actions = await fetchActions({
    filters: {
      categories: categories.map(c => c.code),
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
      categories={categories}
      showAssistant={showAssistant}
    />
  );
};

export default ActionsPage;
