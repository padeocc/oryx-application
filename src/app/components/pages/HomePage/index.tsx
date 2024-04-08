import { Button, Card, Flex, Grid, GridCol, Space, Stack, Text, Title } from '@mantine/core';
import { BookmarkSimple, Carrot, FlowerLotus, Plant, PottedPlant, Tree } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { fetchActions } from '../CatalogPage';
import ServiceCard from '../CatalogPage/components/ServiceCard';

const HomePage = async ({}: {}) => {
  const actions = await fetchActions({
    filters: {
      subjects: ['transport'],
      categories: []
    }
  });

  return (
    <Stack gap={'xl'} align="center" pl="xl" pr="xl">
      <Grid justify="center" w="100%" align="center">
        <GridCol span={{ base: 0, sm: 2 }} ta="center" visibleFrom="sm">
          <Stack gap={'xl'}>
            <PottedPlant size={80} style={{ color: 'var(--mantine-color-green-text)' }} />
            <Carrot size={80} style={{ color: 'var(--mantine-color-orange-text)' }} weight="fill" />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 10 }}>
          <Card c="darkblue" bg={'lightgreen'}>
            <Stack gap={'lg'}>
              <Title order={1}>
                <Text fz={'inherit'}>Bienvenue sur le compagnon des initiatives écoresponsables&nbsp;!</Text>
              </Title>
              <Text>
                Vous serez guidé-e selon vos centres d&lsquo;intérêts vers des services et des actions que vous pourrez
                vous approprier.
              </Text>
              <Text>
                Vous pourrez les sauvegarder (<BookmarkSimple />) sur votre compte afin d&lsquo;être tenu-e informé-e
                des nouveautés, et faire des retours au sein des communautés.
              </Text>
              <Button color="darkblue" w="100%" component={Link} href="/fr/actions?assistant=true">
                Trouver l&lsquo;inspiration
              </Button>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
      <Space />
      <Grid justify="center" w="100%">
        <GridCol span={{ base: 12 }}>
          <Stack gap={'lg'}>
            <Title order={2} ta="center" size={'3em'}>
              Découvrez les actions qui vous conviennent&nbsp;!
            </Title>
            <Grid>
              <GridCol span={{ base: 12, md: 5 }}>
                <Stack>
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[0]}
                    link="/fr/actions/transport"
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[1]}
                    link="/fr/actions/transport"
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[2]}
                    link="/fr/actions/transport"
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 5 }}>
                <Stack>
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[3]}
                    link="/fr/actions/transport"
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[4]}
                    link="/fr/actions/transport"
                  />
                  <ServiceCard
                    noImage
                    backgroundColor={'lightgreen'}
                    service={actions[5]}
                    link="/fr/actions/transport"
                  />
                </Stack>
              </GridCol>
              <GridCol span={{ base: 12, md: 2 }} ta={'center'} visibleFrom="md">
                <Flex align={'center'} h={'100%'} justify="center">
                  <Stack gap={'lg'}>
                    <Plant size={120} style={{ color: 'var(--mantine-color-green-text)' }} />
                    <FlowerLotus size={120} style={{ color: 'var(--mantine-color-green-text)' }} />
                    <Tree size={120} style={{ color: 'var(--mantine-color-green-text)' }} />
                  </Stack>
                </Flex>
              </GridCol>
            </Grid>
          </Stack>
        </GridCol>
      </Grid>
    </Stack>
  );
};

export default HomePage;
