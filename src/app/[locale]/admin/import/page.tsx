import { fetchService } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import { Title } from '@mantine/core';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { uniq } from 'lodash';
import foods from './data/foods.json';
import goods from './data/goods.json';
import transports from './data/transports.json';

const createCodeField = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
};

const getUniquesTags = (arr: any[]) => {
  return uniq(
    arr.flatMap(item => {
      const tags = item.tags?.split(/ - |\n2\) | 2\) /).map((t: string) => t.replaceAll('\n', ' ')) || [];
      return tags;
    })
  );
};

const fieldsTypes: { [key: string]: 'string' | 'number' | 'boolean' } = {
  shortcircuit: 'boolean',
  wastereducer: 'boolean',
  cookmore: 'boolean',
  foodwastereducer: 'boolean',
  used: 'boolean',
  reused: 'boolean',
  rent: 'boolean',
  mutualise: 'boolean',
  repair: 'boolean',
  ecobuilt: 'boolean',
  lowtech: 'boolean',
  recycled: 'boolean',
  diy: 'boolean',
  comparer: 'boolean',
  relocating: 'boolean',
  // moralscore: 'string',
  // weight: 'string',
  // region: 'string',
  organic: 'boolean',
  local: 'boolean',
  season: 'boolean'
};

const importData = async () => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const importValues = ({ items, theme }: { items: any[]; theme: Theme }) => {
    items.forEach(async item => {
      const tags = item.tags
        .split(/ - |\n2\) | 2\) /)
        .map((t: string) => t.replaceAll('\n', ' '))
        .map((t: string) => t.trim());

      const optionalFields: any = {};

      Object.keys(fieldsTypes).forEach(field => {
        if (item[field] === undefined) {
          return;
        }
        const type = fieldsTypes[field];

        switch (type) {
          case 'boolean':
            optionalFields[field] = !!item[field];

            break;
          case 'number':
            optionalFields[field] = Number(item?.local);
            break;

          default:
            optionalFields[field] = item[field].toString();
            break;
        }
      });

      const code = createCodeField(item.name);

      const data = { ...item, code, tags, ...optionalFields };
      const read = await fetchService({ code: code, theme });
      const id = read.id;

      if (id) {
        const update = await fetch(`${url}/${theme}/${id}`, {
          headers: {
            Authorization: `Bearer ${process?.env?.STRAPI_SECRET_ADMIN_TOKEN || ''}`,
            'Content-Type': 'application/json',
            cache: 'no-cache'
          },
          method: 'PUT',
          body: JSON.stringify({
            data
          })
        });
        const updateResponse = await update.json();
        console.info(`Updated: ${data.name}`);
      } else {
        const response = await fetch(`${url}/${theme}`, {
          headers: {
            Authorization: `Bearer ${process?.env?.STRAPI_SECRET_ADMIN_TOKEN || ''}`,
            'Content-Type': 'application/json',
            cache: 'no-cache'
          },
          method: 'POST',
          body: JSON.stringify({
            data
          })
        });
        const addResponse = await response.json();
        if (addResponse.error) {
          console.error('Validation error', JSON.stringify({ response: addResponse, data }, null, 2));
        } else {
          console.info(`Added: ${addResponse.data.attributes.name}`);
        }
      }
    });
  };

  importValues({ items: goods, theme: 'goods' });
  importValues({ items: transports, theme: 'transports' });
  importValues({ items: foods, theme: 'foods' });

  const goodsTags = getUniquesTags(goods);
  const transportsTags = getUniquesTags(transports);
  const foodsTags = getUniquesTags(foods);

  return (
    <>
      <CheckCircle fontSize={'10rem'} color="green" />
      <br />
      <br />
      <br />
      <Title order={3}>Goods ({goods.length})</Title>
      {uniq(goodsTags).map(t => (
        <div key={`${t}`}>{t}</div>
      ))}
      <br />
      <br />
      <Title order={3}>Transport ({transports.length})</Title>
      {uniq(transportsTags).map(t => (
        <div key={`${t}`}>{t}</div>
      ))}
      <br />
      <br />
      <Title order={3}>Food ({foods.length})</Title>
      {uniq(foodsTags).map(t => (
        <div key={`${t}`}>{t}</div>
      ))}
    </>
  );
};

export default importData;
