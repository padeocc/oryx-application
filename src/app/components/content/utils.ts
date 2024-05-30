import { Theme } from '@/config';
import { Service } from '../pages/ActionsPage/utils';

export const getLogoImage = ({ service, theme }: { service: Service; theme: Theme }) => {
  const defaultImage = `/images/default-${theme}-image.png`;
  const logoUrl = service?.logo?.data?.attributes?.url
    ? `${process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT || ''}${service.logo.data.attributes.url}`
    : defaultImage;
  return logoUrl;
};
