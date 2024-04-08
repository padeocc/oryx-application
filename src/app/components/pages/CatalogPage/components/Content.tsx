'use client';

import { Theme } from '@/app/[locale]/actions/[theme]/page';
import { Alert, Grid, GridCol, Loader, Modal, Text, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef, useState } from 'react';
import { Filters, Service } from '..';
import FinderPage from '../../FinderPage';
import FiltersComponent from './Filters';
import ServiceCard from './ServiceCard';

const Content = ({
  fetchActions,
  data: initialData,
  themes,
  showAssistant = false
}: {
  fetchActions: ({ filters }: { filters: Filters }) => Promise<Service[]>;
  data: Service[];
  themes?: Theme[];
  showAssistant?: boolean;
}) => {
  const [data, setData] = useState<Service[]>(initialData);
  const [filters, setFilters] = useState<Filters>({ subjects: themes ? themes : [], categories: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(showAssistant);

  const firstFetch = useRef(true);

  /* Only when filters change*/
  useEffect(() => {
    if (!firstFetch.current) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchActions({ filters });
        setData(data);
        setLoading(false);
      };
      fetchData();
    } else {
      firstFetch.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.categories]);

  return (
    <>
      <Grid>
        <GridCol span={{ base: 12, sm: 5, md: 4 }}>
          <Title order={2}>{loading ? <Loader size={'xs'} /> : `${data.length} inspirations trouvées`}</Title>
          {/* <Group align="top">
            <Button
              size="md"
              color="orange"
              variant="transparent"
              m="0"
              p="0"
              onClick={e => {
                e.preventDefault();
                setOpened(!opened);
              }}
              leftSection={<MagicWand size="16" />}>
              Rechercher
            </Button>
            <Button
              m="0"
              p="0"
              size="md"
              variant="transparent"
              onClick={_e => {
                setFilters({ categories: [], subjects: [] });
                redirect('/fr');
              }}>
              Voir toutes les actions
            </Button>
          </Group> */}
        </GridCol>
        <GridCol span={{ base: 12, sm: 7, md: 8 }} pt="0">
          <FiltersComponent
            loading={loading}
            filters={filters}
            handleSubmit={values => {
              setFilters(values);
            }}
          />
        </GridCol>
      </Grid>
      <Grid justify="space-between" align="top" mt="lg">
        {loading ? (
          <Loader />
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 4, xl: 3 }} key={`action-${service.title}-${index}`}>
              <ServiceCard service={service} backgroundColor={'lightgreen'} />
            </GridCol>
          ))
        )}
        {!loading && data.length === 0 ? (
          <GridCol span={{ base: 12 }} key={`action-empty`}>
            <Alert
              variant="outline"
              color="orange"
              title="Pas de résultat pour cette recherche !"
              icon={<SmileyMeh size={30} />}>
              <Text>Vous voulez ajouter une initiative ? Contactez-nous !</Text>
            </Alert>
          </GridCol>
        ) : null}
      </Grid>
      <Modal
        opened={opened}
        title={<Title order={2}>Choisir un thème !</Title>}
        size={'xl'}
        onClose={() => {
          setOpened(false);
        }}>
        <FinderPage
          filters={filters}
          handleSubmit={values => {
            setFilters(values);
            setOpened(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Content;
