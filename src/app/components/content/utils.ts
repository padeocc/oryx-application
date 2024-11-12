import { Theme, imagesMapping } from '@/config';
import { Service } from '@/types';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const tagKey = Object.keys(imagesMapping).find(tag => (service?.tags || []).map(t => t.toLowerCase()).includes(tag));
  const tag = tagKey ? imagesMapping?.[tagKey] : undefined;
  const defaultImage = tag ? `/images/default-${tag}-tag-image.png` : `/images/default-${theme}-image.png`;
  return service?.logo ? service.logo : defaultImage;
};
