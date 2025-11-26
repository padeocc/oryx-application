import { AspectRatio, Card, Container, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

const TeamPage = async ({}: {}) => {
  const t = await getTranslations('team_page');
  const team = [
    {
      name: 'Séverine CANO',
      jobs: ['Dev stratégique'],
      imageLink: '/images/team_Severine_C.png'
    },
    {
      name: 'Olivier DEBARGE',
      jobs: ['Dev stratégique'],
      imageLink: '/images/team_Olivier_D.png'
    },
    {
      name: 'Jérôme FONTANE',
      jobs: ['Enseignant chercheur ISAE- SUPAERO', 'Comité scientifique'],
      imageLink: '/images/team_Jerome_F.png'
    },
    {
      name: 'Benjamin TALOU',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Benjamin_T.png'
    },
    {
      name: 'Dalinda ALOUI',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Dalinda_A.png'
    },
    {
      name: 'Mehmet TOKGOZ',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Mehmet_T.jpg'
    },
    {
      name: 'Laurent IGNACIO',
      jobs: ['Graphiste'],
      imageLink: '/images/team_Laurent_I.jpg'
    },
    {
      name: 'Louis BRUNET',
      jobs: ['Dev stratégique'],
      imageLink: '/images/team_Louis_B.png'
    },
    {
      name: 'Géraldine PELISSIER',
      jobs: ['Dev stratégique '],
      imageLink: '/images/team_Geraldine_P.png'
    },
    {
      name: 'Philippe COUZON',
      jobs: ['Digital marketing & SEO'],
      imageLink: '/images/team_Philippe_C.jpg'
    },
    {
      name: 'Guillaume CASBAS',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Guillaume_C.png'
    },
    {
      name: 'Antoine LUPIAC',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Antoine_L.jpg'
    },
    {
      name: 'Rémy LOUBRADOU',
      jobs: ['Infra site internet'],
      imageLink: '/images/team_Remy_L.jpg'
    },
    {
      name: 'Brahmjot KAUR',
      jobs: ['UX design'],
      imageLink: '/images/team_Brahmjot_K.jpg'
    },
    {
      name: 'Naima TOURAGHE',
      jobs: ['Dev full stack'],
      imageLink: '/images/team_Naima_T.jpg'
    },
  ];
  const cards = team.map(member => (
    <Card key={member.name} p="md" radius="md" component="a">
      <AspectRatio ratio={1}>
        <Image src={member.imageLink} radius="100" />
      </AspectRatio>
      <Text fw={700} ta="center">{member.name}</Text>
      {member.jobs.map(job =>
        <Text key={job} ta="center">{job}</Text>
      )}
    </Card>
  ));
  return (
    <Stack>
      <Title order={1}>{t('title')}</Title>
      <Container py="xl">
        <SimpleGrid cols={{ base: 1, xs:2, sm: 2, md: 4}} spacing={{ base: 'md' }}>
          {cards}
        </SimpleGrid>
      </Container>
    </Stack>
  );
};

export default TeamPage;
