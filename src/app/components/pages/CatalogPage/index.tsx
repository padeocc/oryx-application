import { Badge, Card, CardSection, Grid, GridCol, Group, Image, Stack, Title } from '@mantine/core';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import Filters from './components/Filters';

type Service = { tags: string[]; title: string; shortDescription: string; imagePath: string };

const demoServices: Service[] = [
  {
    tags: ['Renouvelable', 'Énergie', 'Environnement'],
    title: 'Installation de Panneaux Solaires',
    shortDescription: "Exploiter la puissance du soleil pour générer de l'électricité propre.",
    imagePath: 'chemin/vers/image1.jpg'
  },
  {
    tags: ['Transport', 'Véhicules', 'Écologie'],
    title: 'Programme de Partage de Véhicules Électriques',
    shortDescription: 'Promouvoir des options de transport écologiques pour réduire les émissions.',
    imagePath: 'chemin/vers/image2.jpg'
  },
  {
    tags: ['Agriculture', 'Biologique', 'Alimentation'],
    title: 'Agriculture Soutenue par la Communauté',
    shortDescription:
      'Mettre en relation les agriculteurs locaux avec les consommateurs pour soutenir une agriculture durable.',
    imagePath: 'chemin/vers/image3.jpg'
  },
  {
    tags: ['Conservation', 'Eau', 'Environnement'],
    title: 'Système de Récupération des Eaux de Pluie',
    shortDescription: "Capturer les eaux de pluie pour l'irrigation et les usages non potables.",
    imagePath: 'chemin/vers/image4.jpg'
  },
  {
    tags: ['Recyclage', 'Déchets', 'Environnement'],
    title: 'Initiative de Recyclage du Plastique',
    shortDescription: 'Réduire les déchets plastiques grâce à des efforts de recyclage.',
    imagePath: 'chemin/vers/image5.jpg'
  },
  {
    tags: ['Forêt', 'Gestion', 'Environnement'],
    title: 'Programme de Gestion Forestière',
    shortDescription: 'Protéger et gérer les forêts pour les générations futures.',
    imagePath: 'chemin/vers/image6.jpg'
  },
  {
    tags: ['Construction', 'Écologie', 'Environnement'],
    title: 'Conception de Bâtiments Économes en Énergie',
    shortDescription: 'Construire des bâtiments avec un impact environnemental minimal.',
    imagePath: 'chemin/vers/image7.jpg'
  },
  {
    tags: ['Nature', 'Exploration', 'Environnement'],
    title: 'Aménagement de Sentiers Naturels',
    shortDescription: 'Créer des sentiers pour explorer et apprécier la nature.',
    imagePath: 'chemin/vers/image8.jpg'
  },
  {
    tags: ['Pollution', 'Contrôle', 'Environnement'],
    title: "Réseau de Surveillance de la Qualité de l'Air",
    shortDescription: "Surveiller la qualité de l'air pour protéger la santé publique.",
    imagePath: 'chemin/vers/image9.jpg'
  },
  {
    tags: ['Biodiversité', 'Conservation', 'Environnement'],
    title: "Restauration de l'Habitat de la Faune Sauvage",
    shortDescription: 'Restaurer les habitats naturels.',
    imagePath: 'chemin/vers/image10.jpg'
  }
];

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <GridCol span={{ base: 12, sm: 4 }}>
      <Card h={'100%'}>
        <CardSection>
          <Image src="/service-image.jpg" alt="" height={100} />
        </CardSection>
        <Stack pt="md">
          <Grid>
            <GridCol span={{ base: 12, sm: 10 }}>
              <Title order={3}>{service.title}</Title>
            </GridCol>
            <GridCol span={{ base: 12, sm: 2 }} ta={'right'} pt="md">
              <BookmarkSimple size={'16px'} />
            </GridCol>
          </Grid>
          <Group gap={'xs'}>
            {service.tags.map(tag => (
              <Badge key={`tag-${tag}`}>{tag}</Badge>
            ))}
          </Group>
          <div>{service.shortDescription}</div>
        </Stack>
      </Card>
    </GridCol>
  );
};

const CatalogPage = ({}: {}) => {
  return (
    <Stack>
      <Grid>
        <GridCol span={{ base: 12, sm: 8 }}>
          <Title order={2}>Quelques inspirations pour vous aujourd&apos;hui !</Title>
        </GridCol>
        <GridCol span={{ base: 12, sm: 4 }} ta={'right'}>
          <Filters />
        </GridCol>
      </Grid>
      <Grid bg={'gray'} justify="left" align="stretch">
        {demoServices.map(service => (
          <ServiceCard service={service} key={`service-${service.title}`} />
        ))}
      </Grid>
    </Stack>
  );
};

export default CatalogPage;
