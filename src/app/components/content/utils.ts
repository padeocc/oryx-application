import { Theme, imagesMapping } from '@/config';
import { Service } from '@/types';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping).find(tag => (service?.tags || []).map(t => t.toLowerCase()).includes(tag));
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;
  const defaultImage = tag ? `/images/default-${tag}-tag-image.png` : `/images/default-${theme}-image.png`;

  /*@ts-ignore*/
  const imageFromCMS = service?.logo?.data?.attributes?.url;
  const imageFromSearch = typeof service?.logo === 'string' ? service.logo : null;

  return (
    (imageFromCMS && `${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}${imageFromCMS}`) || imageFromSearch || defaultImage
  );
};
