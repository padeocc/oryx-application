import ActionsPage from '@/app/components/pages/ActionsPage';
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
    sort: '',
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
  const params = await props.params;
  const parameters: RequestParameters = transformParams(searchParams);
  return (
    <main>
      <ActionsPage theme={params.theme} parameters={parameters} />
    </main>
  );
}
