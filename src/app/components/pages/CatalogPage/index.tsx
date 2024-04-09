import { Theme } from '@/app/[locale]/actions/[theme]/page';
import demoServices from '@/data/actions.json';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import Content from './components/Content';
import { getCategoriesFromSubjects } from './utils';

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;
export type Service = { tags: string[]; title: string; shortDescription: string; logo?: string; verticals: string[] };
export type Filters = { subjects: string[]; categories: string[] };

export const fetchActions = async ({ filters }: { filters: Filters }) => {
  'use server';
  const actions = demoServices as unknown as Service[];

  if (filters.subjects.length === 0) {
    return actions;
  }
  if (filters.categories.length) {
    return actions.filter(action => !!intersection(action.tags, filters.categories).length);
  }
  return actions.filter(action => !!intersection(action.verticals, filters.subjects).length);
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));

const CatalogPage = async ({ themes, showAssistant }: { themes?: Theme[]; showAssistant?: boolean }) => {
  const subjects = themes ? themes : [];
  const categories = getCategoriesFromSubjects(subjects);
  const actions = await fetchActions({
    filters: {
      categories: categories.map(c => c.code),
      subjects
    }
  });
  return (
    <Content
      fetchActions={fetchActions}
      data={actions}
      subjects={subjects}
      categories={categories}
      showAssistant={showAssistant}
    />
  );
};

export default CatalogPage;
