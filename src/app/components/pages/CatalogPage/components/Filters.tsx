'use client';

import { Button, Card, Drawer, Grid, GridCol, MultiSelect, Space, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction, useState } from 'react';
import { Filters } from './Content';

const Filters = ({ filters, setFilters }: { filters: Filters; setFilters: Dispatch<SetStateAction<Filters>> }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const form = useForm({
    initialValues: filters
  });

  const content = (
    <Grid>
      <GridCol span={{ base: 12 }}>
        <Card bg="gray">
          <form
            onSubmit={form.onSubmit(values => {
              console.log({ values });
              setFilters(values);
              setOpened(false);
            })}>
            <Stack>
              <Title order={4}>Choisissez vos sujets</Title>
              <MultiSelect label="" data={filters.tags} name="tags" {...form.getInputProps('tags')} />
              <Space />
              <Button type="submit">Valider</Button>
            </Stack>
          </form>
        </Card>
      </GridCol>
    </Grid>
  );
  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="">
        {content}
      </Drawer>
      <Button
        onClick={() => {
          setOpened(true);
        }}>
        Rechercher
      </Button>
    </>
  );
};

export default Filters;
