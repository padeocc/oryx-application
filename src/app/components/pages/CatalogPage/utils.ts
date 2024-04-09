import subjects from '@/data/subjects.json';

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
