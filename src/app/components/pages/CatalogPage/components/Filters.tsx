'use client';

import { Button, Card, Checkbox, Drawer, Grid, GridCol, Space, Stack, Title } from '@mantine/core';
import { useState } from 'react';

const Filters = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const content = (
    <Grid>
      <GridCol span={{ base: 12 }}>
        <Card bg="gray">
          <Stack>
            <Title order={4}>Choisissez vos sujets</Title>
            <Checkbox defaultChecked label="Véhicules" />
            <Checkbox defaultChecked label="Panneaux solaires" />
            <Checkbox defaultChecked label="Recyclage" />
            <Checkbox defaultChecked label="Construction" />
            <Space />
            <Button
              onClick={() => {
                setOpened(false);
              }}>
              Valider
            </Button>
          </Stack>
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
        Filtrer
      </Button>
    </>
  );
};

export default Filters;
