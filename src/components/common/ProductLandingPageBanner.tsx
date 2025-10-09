import { landingPagesUrl, Theme } from '@/config';
import { Anchor, Button, Group, Space, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';

type Props = {
  theme: Theme;
};

const ProductLandingPageBanner = ({ theme }: Props) => {
  const t = useTranslations('themes');
  const tService = useTranslations('services');
  const pageURL = landingPagesUrl.get(theme);

  if (pageURL) {
    return (
      <>
        <Space h="md" />
        <Group justify="center">
          <Button>
            <Anchor c="white" href={pageURL}>
              {tService('landing-page-cta-label', { value: t(theme) })}
            </Anchor>
          </Button>
        </Group>
        <Space h="md" />
      </>
    );
  }

  return null;
};

export default ProductLandingPageBanner;
