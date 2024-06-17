import ActionsPage from '@/app/components/pages/ActionsPage';
import { UrlParameters } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { set } from 'lodash';

const transformParams = (params: { [key: string]: string | string[] | undefined } | undefined = {}): UrlParameters => {
  const result: UrlParameters = {
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

export default function ActionsTheme({
  params,
  searchParams
}: {
  params: { theme: Theme };
  searchParams?: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const parameters: UrlParameters = transformParams(searchParams);
  return (
    <main>
      <ActionsPage theme={params.theme} parameters={parameters} />
    </main>
  );
}
