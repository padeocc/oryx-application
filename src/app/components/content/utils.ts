import { Theme, imagesMapping } from '@/config';
import { Service } from '@/types';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping).find(t => {
    return service.tags.map(t => t.toLowerCase()).includes(t);
  });
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;

  const defaultImage = tag ? `/images/default-${tag}-tag-image.png` : `/images/default-${theme}-image.png`;
  const logoUrl = service?.logo?.data?.attributes?.url
    ? `${process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT || ''}${service.logo.data.attributes.url}`
    : defaultImage;
  return logoUrl;
};
