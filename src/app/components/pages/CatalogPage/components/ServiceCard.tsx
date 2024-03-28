import { Badge, Button, Card, CardSection, Grid, GridCol, Group, Image, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Service } from '..';
import Bookmark from '../components/Bookmark';
import { getCategoryLabel } from './Content';

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card h={'100%'}>
      <CardSection>
        <Image src={service?.logo || `/service-image.jpg`} alt={service.title} height={100} />
      </CardSection>
      <Stack pt="md" justify="space-between" h={'100%'}>
        <Stack>
          <Grid>
            <GridCol span={{ base: 10, sm: 10 }}>
              <Title order={3}>{service.title}</Title>
            </GridCol>
            <GridCol span={{ base: 2, sm: 2 }} ta={'right'} pt={'sm'}>
              <Bookmark actionId={service.title} />
            </GridCol>
          </Grid>
          <Group gap={'xs'}>
            {service.tags.map(tag => (
              <Badge key={`tag-${tag}`} size="sm">
                {getCategoryLabel(tag)}
              </Badge>
            ))}
          </Group>
          <Text fz="sm" size="sm">
            {service.shortDescription}
          </Text>
        </Stack>
        <CardSection>
          <Button variant="transparent" style={{ bottom: '0px' }} w={'100%'} component={Link} href="/fr/action">
            Voir plus
          </Button>
        </CardSection>
      </Stack>
    </Card>
  );
};

export default ServiceCard;
