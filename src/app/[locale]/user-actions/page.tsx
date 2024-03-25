import { Service } from '@/app/components/pages/CatalogPage';
import demoServices from '@/app/demo.json';
import { Input, Stack, Switch, Table, TableTd, TableTr, Text, Title } from '@mantine/core';

const data = demoServices as unknown as Service[];

const UserServices = () => {
  return (
    <main>
      <Title order={2}>Mes actions</Title>
      <Stack>
        <Text>
          A partir d&lsquo;ici, vous pouvez créer votre page publique regroupant l&lsquo;ensensemble des services que
          vous utilisez au qotidien
        </Text>

        <Switch label="Publier ma page" />
        <Input readOnly value={'https://oryx.com/aos23934Ddk323/'}></Input>

        <Table>
          {data.map((service, index) => (
            <TableTr key={`action-${service.title}-${index}`}>
              <TableTd>{service.title}</TableTd>
              <TableTd>
                <Switch label="Afficher" />
              </TableTd>
            </TableTr>
          ))}
        </Table>
      </Stack>
    </main>
  );
};

export default UserServices;
