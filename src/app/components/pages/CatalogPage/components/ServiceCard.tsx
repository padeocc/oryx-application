import Bookmark from '@/components/pages/CatalogPage/components/Bookmark';
import { Service } from '@/pages/CatalogPage';
import { getCategoryLabel } from '@/pages/CatalogPage/utils';
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
  link
}: {
  service: Service;
  noImage?: boolean;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  link?: string;
}) => {
  const t = useTranslations('service_card');

  return (
    <Card h={'100%'} bg={backgroundColor}>
      {!noImage ? (
        <CardSection>
          <Image src={service?.logo || `/default-service-image.jpg`} alt={service.title} height={100} />
        </CardSection>
      ) : null}
      <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
        <Stack>
          <Grid>
            <GridCol span={{ base: 10 }} ta={'right'} pt={'sm'}>
              <Group gap={'xs'}>
                {service.tags.map(tag => (
                  <Badge
                    key={`tag-${tag}`}
                    size="sm"
                    variant="outline"
                    color="var(--mantine-color-dark-outline)"
                    bg="white">
                    {getCategoryLabel(tag)}
                  </Badge>
                ))}
              </Group>
            </GridCol>
            <GridCol span={{ base: 2 }} ta={'right'} pt={'sm'}>
              <Bookmark actionId={service.title} />
            </GridCol>
            <GridCol span={{ base: 12 }}>
              <Title order={3} c="orange">
                {service.title}
              </Title>
            </GridCol>
          </Grid>

          <Text fz="sm" size="sm">
            {service.shortDescription}
          </Text>
        </Stack>
        <CardSection>
          <Button
            color="var(--mantine-color-dark-outline)"
            variant="transparent"
            style={{ bottom: '0px' }}
            w={'100%'}
            component={Link}
            href={link ? link : '/fr/action'}>
            {t('see_more')}
          </Button>
        </CardSection>
      </Stack>
    </Card>
  );
};

export default ServiceCard;
