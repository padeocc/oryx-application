import ServicesPage from '@/app/components/pages/ServicesPage';
import { Theme } from '@/config';
import { RequestParameters } from '@/types';
import { set } from 'lodash';

const transformParams = (
  params: { [key: string]: string | string[] | undefined } | undefined = {}
): RequestParameters => {
  const result: RequestParameters = {
    pagination: {
      start: 0,
      limit: -1
    },
    sortBy: '',
    populate: '',
    filters: {
      theme: 'transports'
    },
    theme: 'transports'
  };

  Object.keys(params).forEach(key => {
    const value = params[key];
    const transformedKey = key.replace(/\[(\w+)\]/g, '.$1');
    set(result, transformedKey, value);
  });

  return result;
};

export default async function ActionsTheme(props: {
  params: Promise<{ theme: Theme }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined } | undefined>;
}) {
  const searchParams = await props.searchParams;
  const parameters: RequestParameters = transformParams(searchParams);
  return (
    <main>
      <ServicesPage parameters={parameters} />
    </main>
  );
}
