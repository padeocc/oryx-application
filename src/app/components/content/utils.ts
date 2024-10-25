import { Theme, imagesMapping } from '@/config';
import { Service } from '@/types';

export const getLogoImage = ({
  service,
  theme,
  domain = process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT || ''
}: {
  service: Service;
  theme: Theme;
  domain?: string;
}) => {
  const tagKey = Object.keys(imagesMapping).find(tag => (service?.tags || []).map(t => t.toLowerCase()).includes(tag));
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;
  const defaultImage = tag ? `/images/default-${tag}-tag-image.png` : `/images/default-${theme}-image.png`;
  return service?.logo?.data?.attributes?.url ? `${domain}${service.logo.data.attributes.url}` : defaultImage;
};
