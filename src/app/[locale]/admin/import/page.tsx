import { Theme } from '@/config';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import transports from '../data/transports.json';

const createCodeField = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
};

const importData = async () => {
  const url = process?.env?.STRAPI_API_ENDPOINT || '';
  const importValues = ({ items, theme }: { items: any[]; theme: Theme }) => {
    transports.forEach(async transport => {
      const item = { ...transport, code: createCodeField(transport.name) };
      console.log({ item });

      const response = await fetch(`${url}/${theme}`, {
        headers: {
          Authorization: `Bearer ${process?.env?.STRAPI_SECRET_ADMIN_TOKEN || ''}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          data: item
        })
      });
      console.info(JSON.stringify({ response: await response.json() }, null, 2));
    });
  };

  importValues({ items: transports, theme: 'transports' });

  return <CheckCircle fontSize={'10rem'} color="green" />;
};

export default importData;
