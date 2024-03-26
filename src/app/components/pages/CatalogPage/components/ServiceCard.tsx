import { Badge, Button, Card, CardSection, Grid, GridCol, Group, Image, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import { Service } from '..';
import Bookmark from '../components/Bookmark';

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card h={'100%'}>
      <CardSection>
        <Image src="/service-image.jpg" alt="" height={100} />
      </CardSection>
      <Stack pt="md" justify="space-between" h={'100%'}>
        <Stack>
          <Grid>
            <GridCol span={{ base: 10, sm: 10 }}>
              <Title order={3}>{service.title}</Title>
            </GridCol>
            <GridCol span={{ base: 2, sm: 2 }} ta={'right'} pt="md">
              <Bookmark actionId={service.title} />
            </GridCol>
          </Grid>
          <Group gap={'xs'}>
            {service.tags.map(tag => (
              <Badge key={`tag-${tag}`}>{tag}</Badge>
            ))}
          </Group>
          <div>{service.shortDescription}</div>
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
