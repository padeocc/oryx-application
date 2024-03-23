import { demoServices } from '@/app/components/pages/CatalogPage';
import { Input, Stack, Switch, Table, TableTd, TableTr, Text, Title } from '@mantine/core';

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
          {demoServices.map(service => (
            <TableTr key={`service-${service.title}`}>
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
