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
import Link from 'next/link';
import { Service } from '..';
import Bookmark from '../components/Bookmark';
import { getCategoryLabel } from '../utils';

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
  return (
    <Card h={'100%'} bg={backgroundColor}>
      {!noImage ? (
        <CardSection>
          <Image src={service?.logo || `/service-image.jpg`} alt={service.title} height={100} />
        </CardSection>
      ) : null}
      <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
        <Stack>
          <Group gap={'xs'}>
            {service.tags.map(tag => (
              <Badge key={`tag-${tag}`} size="sm" variant="outline" color="darkblue" bg="white">
                {getCategoryLabel(tag)}
              </Badge>
            ))}
          </Group>
          <Grid>
            <GridCol span={{ base: 10, sm: 10 }}>
              <Title order={3} c="orange">
                {service.title}
              </Title>
            </GridCol>
            <GridCol span={{ base: 2, sm: 2 }} ta={'right'} pt={'sm'}>
              <Bookmark actionId={service.title} />
            </GridCol>
          </Grid>

          <Text fz="sm" size="sm">
            {service.shortDescription}
          </Text>
        </Stack>
        <CardSection>
          <Button
            color="darkblue"
            variant="transparent"
            style={{ bottom: '0px' }}
            w={'100%'}
            component={Link}
            href={link ? link : '/fr/action'}>
            Voir plus
          </Button>
        </CardSection>
      </Stack>
    </Card>
  );
};

export default ServiceCard;
