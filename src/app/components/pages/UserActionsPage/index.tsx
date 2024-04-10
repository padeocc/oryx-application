import { Service } from '@/app/components/pages/CatalogPage';
import demoServices from '@/data/actions.json';
import { Alert, Input, Stack, Switch, Table, TableTd, TableTr, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

const data = demoServices as unknown as Service[];

const UserActions = async () => {
  const t = await getTranslations('user_actions');

  return (
    <>
      <Title order={2}>{t('user_actions_title')}</Title>
      <Alert color="orange">{t('coming_soon')}</Alert>
      <br />
      <br />
      <Stack>
        <Text>{t('create_page_text')}</Text>

        <Switch label={t('publish_page_label')} />
        <Input readOnly value={'https://oryx.com/aos23934Ddk323/'} placeholder={t('share_page_label')} />

        <Table>
          {data.map((service, index) => (
            <TableTr key={`action-${service.title}-${index}`}>
              <TableTd>{service.title}</TableTd>
              <TableTd>
                <Switch label={t('display_label')} />
              </TableTd>
            </TableTr>
          ))}
        </Table>
      </Stack>
    </>
  );
};

export default UserActions;
