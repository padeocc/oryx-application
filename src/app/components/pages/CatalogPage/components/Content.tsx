'use client';

import { ComboboxData, Grid, GridCol, Group, Select, Title } from '@mantine/core';
import uniq from 'lodash/uniq';
import { useEffect, useRef, useState } from 'react';
import FiltersComponent from './Filters';
import ServiceCard from './ServiceCard';

export type Service = { tags: string[]; title: string; shortDescription: string; imagePath: string };
export type Filters = { vertical: string; tags: string[] };

const getTagsfromActions = (actions: Service[]) => uniq(actions.flatMap(action => action.tags));

const Content = ({
  verticalsOptions,
  fetchActions,
  data: initialData
}: {
  verticalsOptions: ComboboxData;
  fetchActions: ({ vertical }: { vertical: string }) => Promise<Service[]>;
  data: Service[];
}) => {
  const [data, setData] = useState<Service[]>(initialData);
  const [filters, setFilters] = useState<Filters>({ vertical: 'transport', tags: getTagsfromActions(data) });
  const firstFetch = useRef(true);

  /* Only when filters change*/
  useEffect(() => {
    if (!firstFetch.current) {
      // const fetchData = async () => {
      //   const data = await fetchActions({ vertical: 'transport' });
      //   // setFilters({ ...filters, tags: getTagsfromActions(data) });
      //   setData(data);
      // };
      // fetchData();
    } else {
      firstFetch.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <Grid>
        <GridCol span={{ base: 12, sm: 8 }}>
          <Title order={2}>Quelques inspirations pour vous aujourd&apos;hui !</Title>
        </GridCol>
        <GridCol span={{ base: 12, sm: 4 }} ta={'right'}>
          <Group align="flex-end" justify="flex-end">
            <Select data={verticalsOptions} value={'transport'} />
            <FiltersComponent filters={filters} setFilters={setFilters} />
          </Group>
        </GridCol>
      </Grid>
      <Grid bg={'gray'} justify="left" align="stretch">
        {data.map((service, index) => (
          <GridCol span={{ base: 12, sm: 6, md: 4 }} key={`action-${service.title}-${index}`}>
            <ServiceCard service={service} />
          </GridCol>
        ))}
      </Grid>
    </>
  );
};

export default Content;
