import demoServices from '@/data/actions.json';
import subjects from '@/data/subjects.json';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';

export type Category = {
  title: string;
  code: string;
};

export const getSubjetLabel = (code: string) => {
  const found = subjects.find(subject => subject.code === code);
  return found?.title || '';
};

export const getCategoryLabel = (code: string) => {
  const found = subjects.flatMap(({ categories }) => categories).find(category => category.code === code);
  return found?.title || '';
};

export const getCategoriesFromSubjects = (codes: string[]) => {
  const subjectItems = subjects.filter(subject => codes?.includes(subject.code));
  return subjectItems.flatMap(({ categories }) => categories);
};

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service[]>;

export type Service = {
  tags: string[];
  title: string;
  shortDescription: string;
  logo?: string;
  verticals: string[];
  code: string;
};

export type Filters = { subjects: string[]; categories: string[]; codes?: (string | undefined)[] };

export const fetchActions = async ({ filters }: { filters: Filters }) => {
  let actions = demoServices as unknown as Service[];

  if (filters.codes) {
    actions = actions.filter(a => filters.codes?.includes(a.code));
  }

  if (filters.subjects.length === 0) {
    return actions;
  }
  if (filters.categories.length) {
    return actions.filter(action => !!intersection(action.tags, filters.categories).length);
  }
  return actions.filter(action => !!intersection(action.verticals, filters.subjects).length);
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));
