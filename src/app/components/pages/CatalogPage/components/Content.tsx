'use client';

import { ComboboxData, Grid, GridCol, Group, Loader, Select, Title } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Filters, Service } from '..';
import FiltersComponent from './Filters';
import ServiceCard from './ServiceCard';

const Content = ({
  verticalsOptions,
  fetchActions,
  data: initialData,
  allTags
}: {
  verticalsOptions: ComboboxData;
  fetchActions: ({ filters }: { filters: Filters }) => Promise<Service[]>;
  data: Service[];
  allTags: string[];
}) => {
  const [data, setData] = useState<Service[]>(initialData);
  const [filters, setFilters] = useState<Filters>({ vertical: 'transport', tags: allTags });
  const [loading, setLoading] = useState<boolean>(false);
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
        <GridCol span={{ base: 12, sm: 8 }}>
          <Title order={2}>Quelques inspirations pour vous aujourd&apos;hui !</Title>
          <Title order={3}>{loading ? '' : `${data.length} services trouvés`}</Title>
        </GridCol>
        <GridCol span={{ base: 12, sm: 4 }} ta={'right'}>
          <Group align="flex-end" justify="flex-end">
            <Select data={verticalsOptions} value={'transport'} />
            <FiltersComponent filters={filters} setFilters={setFilters} allTags={allTags} />
          </Group>
        </GridCol>
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
      </Grid>
    </>
  );
};

export default Content;
