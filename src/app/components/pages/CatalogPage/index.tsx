import { Badge, Card, Grid, GridCol, Stack, Title } from '@mantine/core';

const demoServices: { tags: string[]; title: string; shortDescription: string; imagePath: string }[] = [
  {
    tags: ['Renewable Energy'],
    title: 'Solar Power Installation',
    shortDescription: 'Harnessing the power of the sun to generate clean electricity.',
    imagePath: 'path/to/image1.jpg'
  },
  {
    tags: ['Eco-Friendly Transportation'],
    title: 'Electric Vehicle Sharing Program',
    shortDescription: 'Promoting green transportation options to reduce emissions.',
    imagePath: 'path/to/image2.jpg'
  },
  {
    tags: ['Organic Farming'],
    title: 'Community Supported Agriculture',
    shortDescription: 'Connecting local farmers with consumers to support sustainable agriculture.',
    imagePath: 'path/to/image3.jpg'
  },
  {
    tags: ['Water Conservation'],
    title: 'Rainwater Harvesting System',
    shortDescription: 'Capturing rainwater for irrigation and non-potable uses.',
    imagePath: 'path/to/image4.jpg'
  },
  {
    tags: ['Waste Recycling'],
    title: 'Plastic Recycling Initiative',
    shortDescription: 'Reducing plastic waste through recycling efforts.',
    imagePath: 'path/to/image5.jpg'
  },
  {
    tags: ['Sustainable Forestry'],
    title: 'Forest Stewardship Program',
    shortDescription: 'Protecting and managing forests for future generations.',
    imagePath: 'path/to/image6.jpg'
  },
  {
    tags: ['Green Construction'],
    title: 'Energy-Efficient Building Design',
    shortDescription: 'Constructing buildings with minimal environmental impact.',
    imagePath: 'path/to/image7.jpg'
  },
  {
    tags: ['Eco-Tourism'],
    title: 'Nature Trail Development',
    shortDescription: 'Creating trails to explore and appreciate nature.',
    imagePath: 'path/to/image8.jpg'
  },
  {
    tags: ['Pollution Control'],
    title: 'Air Quality Monitoring Network',
    shortDescription: 'Monitoring air quality to safeguard public health.',
    imagePath: 'path/to/image9.jpg'
  },
  {
    tags: ['Biodiversity Conservation'],
    title: 'Wildlife Habitat Restoration Project',
    shortDescription: 'Restoring natural habitats.',
    imagePath: 'path/to/image10.jpg'
  }
];

const CatalogPage = ({}: {}) => {
  return (
    <Stack>
      <Title order={2}>Quelques inspirations pour vous aujourd&apos;hui !</Title>
      <Grid bg={'gray'} justify="left" align="stretch">
        {demoServices.map(service => (
          <GridCol key={`service-${service.title}`} span={{ base: 12, sm: 4 }}>
            <Card h={'100%'}>
              <Stack>
                <div>
                  <Title order={3}>{service.title}</Title>
                  {service.tags.map(tag => (
                    <Badge key={`tag-${tag}`}>{tag}</Badge>
                  ))}
                </div>
                <div>{service.shortDescription}</div>
              </Stack>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
};

export default CatalogPage;
