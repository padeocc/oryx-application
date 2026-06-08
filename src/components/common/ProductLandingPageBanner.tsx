import { landingPagesUrl, Theme } from '@/config';
import { Anchor, Button, Group, Space, Stack } from '@mantine/core';
import messages from '../../../i18n/messages/fr.json';

const themesLabels = messages.themes as Record<string, string>;
const servicesLabels = messages.services as Record<string, string>;

type Props = {
  theme: Theme;
};

const ProductLandingPageBanner = ({ theme }: Props) => {
  const pageURL = landingPagesUrl.get(theme);

  if (pageURL) {
    return (
      <>
        <Space h="md" />
        <Group justify="center">
          <Button>
            <Anchor c="white" href={pageURL}>
              {servicesLabels['landing-page-cta-label']?.replace('{value}', themesLabels[theme] || theme)}
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
