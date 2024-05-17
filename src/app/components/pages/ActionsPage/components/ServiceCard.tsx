import { getLogoImage } from '@/app/components/content/utils';
import NotFound from '@/app/components/navigation/NotFound';
import { Service } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import {
  Badge,
  Button,
  Card,
  CardSection,
  DefaultMantineColor,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  StyleProp,
  Text,
  Title
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ServiceCard = ({
  service,
  noImage = false,
  backgroundColor,
  link,
  theme
}: {
  service: Service;
  noImage?: boolean;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  link?: string;
  theme: Theme;
}) => {
  const t = useTranslations('service_card');

  if (!service) {
    return <NotFound />;
  }

  return (
    <Card h={'100%'} bg={backgroundColor}>
      {!noImage ? (
        <CardSection>
          <Image src={getLogoImage({ service })} alt={service.name} height={100} />
        </CardSection>
      ) : null}
      <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
        <Stack>
          <Grid>
            <GridCol span={{ base: 12 }} ta={'right'} pt={'sm'}>
              <Group gap={'xs'}>
                {(service?.tags || [])?.map(tag => (
                  <Badge
                    key={`tag-${tag}`}
                    size="sm"
                    variant="outline"
                    color="var(--mantine-color-dark-outline)"
                    bg="white">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </GridCol>
            {/* <GridCol span={{ base: 2 }} ta={'right'} pt={'sm'}>
              <Bookmark serviceCode={service.code} />
            </GridCol> */}
            <GridCol span={{ base: 12 }}>
              <Title order={3} c="orange">
                {service.name}
              </Title>
            </GridCol>
          </Grid>

          <Text fz="sm" size="sm">
            {service.description}
          </Text>
        </Stack>
        <CardSection>
          <Button
            color="var(--mantine-color-dark-outline)"
            variant="transparent"
            style={{ bottom: '0px' }}
            w={'100%'}
            component={Link}
            href={link ? link : `/action/${theme}/${service.code}`}>
            {t('see_more')}
          </Button>
        </CardSection>
      </Stack>
    </Card>
  );
};

export default ServiceCard;
