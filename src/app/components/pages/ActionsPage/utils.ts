import uniq from 'lodash/uniq';

export type Category = {
  title: string;
  code: string;
};

export type FetchAction = ({ vertical }: { vertical: string }) => Promise<Service>;

export type Service = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  description: string;
  url: string;
  tags: string[];
  type: string[];
  code: string;
  zipCode: string;
  country: string;
  logo?: string;
};

export type Filters = { subjects: string[]; categories: string[]; codes?: (string | undefined)[] };

export const fetchActions = async ({ filters }: { filters?: any }) => {
  const url = process?.env?.STRAPI_SOLUTIONS_ENDPOINT || '';
  const response = await fetch(`${url}/${filters.subjects[0]}`, {
    headers: { Authorization: `Bearer ${process?.env?.STRAPI_SECRET_TOKEN || ''}` }
  });
  const solutions = await response.json();
  const services = solutions.data?.map((solution: { attributes: Service }) => solution.attributes) || [];
  return services;
};

export const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action?.tags || []));

export const fetchAction = async ({ code }: { code: string }) => {
  // const actions = demoServices as unknown as Service[];
  // return actions.find(a => code === a.code);
  return undefined;
};

export const getCategoryLabel = (code: string) => {
  return code;
};

// export const getCategoriesFromSubjects = (codes: string[]) => {
//   return codes.map(c => ({ title: c, code: c }));
// };

export const getCategoriesFromSubjects = (codes: string[]) => {
  //let solutions: Service[] = await requestActions({});
  // console.log({ codes });
  // const subjectItems = subjects.filter(subject => codes?.includes(subject.code));
  // return subjectItems.flatMap(({ categories }) => categories);
};
