'use client';

import { Button, Card, ComboboxData, Drawer, Grid, GridCol, MultiSelect, Space, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction, useState } from 'react';
import { Filters } from './Content';

const Filters = ({
  filters,
  setFilters,
  allTags
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  allTags: ComboboxData;
}) => {
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
              setFilters(values);
              setOpened(false);
            })}>
            <Stack>
              <Title order={4}>Choisissez vos sujets</Title>
              <MultiSelect label="" value={filters.tags} data={allTags} name="tags" {...form.getInputProps('tags')} />
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
