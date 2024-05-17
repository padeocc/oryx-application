import { Service } from '../pages/ActionsPage/utils';

export const getLogoImage = ({ service }: { service: Service }) => {
  const logoUrl = service?.logo?.data?.attributes?.url
    ? `${process?.env?.NEXT_PUBLIC_STRAPI_ENDPOINT || ''}${service.logo.data.attributes.url}`
    : `/images/default-service-image.jpg`;
  return logoUrl;
};
