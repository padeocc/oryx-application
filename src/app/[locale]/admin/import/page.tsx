import { Theme } from '@/config';
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
      const tags = item.tags?.split('-').map((t: string) => t.replaceAll('\n', ' ')) || [];
      return tags;
    })
  );
};

const importData = async () => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const importValues = ({ items, theme }: { items: any[]; theme: Theme }) => {
    items.forEach(async item => {
      const tags = item.tags.split('-').map((t: string) => t.replaceAll('\n', ' '));

      const optionalFields: any = {};

      if (item.moralscore !== undefined) {
        optionalFields.moralscore = item.moralscore.toString();
      }
      if (item.weight !== undefined) {
        optionalFields.weight = item.weight.toString();
      }
      if (item.region) {
        optionalFields.region = item.region.toString();
      }

      if (item.organic !== undefined) {
        optionalFields.organic = Number(item?.organic);
      }
      if (item.local !== undefined) {
        optionalFields.local = Number(item?.local);
      }
      if (item.season !== undefined) {
        optionalFields.season = Number(item?.season);
      }
      if (item.shortcircuit !== undefined) {
        optionalFields.shortcircuit = !!item?.shortcircuit;
      }
      if (item.wastereducer !== undefined) {
        optionalFields.wastereducer = !!item?.wastereducer;
      }
      if (item.cookmore !== undefined) {
        optionalFields.cookmore = !!item?.cookmore;
      }
      if (item.foodwastereducer !== undefined) {
        optionalFields.foodwastereducer = !!item?.foodwastereducer;
      }

      if (item.used !== undefined) {
        optionalFields.used = !!item?.used;
      }
      if (item.reused !== undefined) {
        optionalFields.reused = !!item?.reused;
      }
      if (item.rent !== undefined) {
        optionalFields.rent = !!item?.rent;
      }
      if (item.mutualise !== undefined) {
        optionalFields.mutualise = !!item?.mutualise;
      }
      if (item.repair !== undefined) {
        optionalFields.repair = !!item?.repair;
      }
      if (item.ecobuilt !== undefined) {
        optionalFields.ecobuilt = !!item?.ecobuilt;
      }
      if (item.local !== undefined) {
        optionalFields.local = !!item?.local;
      }
      if (item.organic !== undefined) {
        optionalFields.organic = !!item?.organic;
      }
      if (item.lowtech !== undefined) {
        optionalFields.lowtech = !!item?.lowtech;
      }
      if (item.recycled !== undefined) {
        optionalFields.recycled = !!item?.recycled;
      }
      if (item.diy !== undefined) {
        optionalFields.diy = !!item?.diy;
      }
      if (item.comparer !== undefined) {
        optionalFields.comparer = !!item?.comparer;
      }
      if (item.relocating !== undefined) {
        optionalFields.relocating = !!item?.relocating;
      }

      const data = { ...item, code: createCodeField(item.name), tags, ...optionalFields };

      const response = await fetch(`${url}/${theme}`, {
        headers: {
          Authorization: `Bearer ${process?.env?.STRAPI_SECRET_ADMIN_TOKEN || ''}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          data
        })
      });
      const resp = await response.json();
      if (resp.error) {
        console.error(JSON.stringify({ response: resp, data }, null, 2));
      } else {
        console.info(`Ok: ${resp.data.attributes.name}`);
      }
    });
  };

  importValues({ items: goods, theme: 'goods' });
  importValues({ items: transports, theme: 'transports' });
  importValues({ items: foods, theme: 'foods' });

  // const tags = getUniquesTags(goods);
  // console.log('------------');
  // tags.map(t => {
  //   console.log(`${t}\n`);
  // });

  return <CheckCircle fontSize={'10rem'} color="green" />;
};

export default importData;
