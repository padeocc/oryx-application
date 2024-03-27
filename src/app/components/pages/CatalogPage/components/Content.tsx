'use client';

import subjects from '@/data/subjects.json';
import { Alert, Button, Grid, GridCol, Group, Loader, Modal, Text, Title } from '@mantine/core';
import { SmileyMeh } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef, useState } from 'react';
import { Filters, Service } from '..';
import FinderPage from '../../FinderPage';
import ServiceCard from './ServiceCard';

export const getSubjetLabel = (code: string) => {
  const found = subjects.find(subject => subject.code === code);
  return found?.title || '';
};

export const getCategoryLabel = (code: string) => {
  const found = subjects.flatMap(({ categories }) => categories).find(category => category.code === code);
  return found?.title || '';
};

const Content = ({
  fetchActions,
  data: initialData
}: {
  fetchActions: ({ filters }: { filters: Filters }) => Promise<Service[]>;
  data: Service[];
}) => {
  const [data, setData] = useState<Service[]>(initialData);
  const [filters, setFilters] = useState<Filters>({ subjects: [], categories: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

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
  }, [filters]);

  return (
    <>
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Title order={2}>Quelques inspirations pour vous aujourd&apos;hui !</Title>
          <Title order={3}>{loading ? '' : `${data.length} actions trouvées`}</Title>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }} ta={'right'}>
          <Group align="center" justify="flex-end">
            <Button
              size="xl"
              onClick={e => {
                e.preventDefault();
                setOpened(!opened);
              }}>
              Rechercher !
            </Button>
            <Button
              size="md"
              variant="transparent"
              onClick={_e => {
                setFilters({ categories: [], subjects: [] });
              }}>
              Voir toutes les actions
            </Button>
          </Group>
        </GridCol>
        {/* <GridCol span={{ base: 12, sm: 6 }}>
          <MultiSelect
            placeholder="Thèmes"
            value={filters.subjects}
            data={subjects.map(s => ({ value: s.code, label: s.title }))}
          />
          <MultiSelect placeholder="Sujets" value={filters.categories} />
        </GridCol> */}
      </Grid>
      <Grid bg={'gray'} justify="left" align="stretch">
        {loading ? (
          <Loader />
        ) : (
          data.map((service, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 4 }} key={`action-${service.title}-${index}`}>
              <ServiceCard service={service} />
            </GridCol>
          ))
        )}
        {data.length === 0 ? (
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
        title={<Title order={2}>Choisissez un ou plusieurs thèmes !</Title>}
        size={'xl'}
        style={{ width: '100%' }}
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