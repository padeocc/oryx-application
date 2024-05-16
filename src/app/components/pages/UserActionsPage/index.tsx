import { Input, Stack, Switch, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { Filters, fetchServices } from '../ActionsPage/utils';
import List from './components/List';

const UserActions = async () => {
  const t = await getTranslations('user_actions');

  return (
    <>
      <Title order={2}>{t('user_actions_title')}</Title>

      <Stack>
        <Text>{t('create_page_text')}</Text>

        <Switch label={t('publish_page_label')} />
        <Input readOnly value={'https://www.oryx.com/page/XXXXXXXXXXX'} placeholder={t('share_page_label')} />

        <List
          fetchServices={async ({ filters }: { filters: Filters }) => {
            'use server';
            return fetchServices({ filters });
          }}
        />
      </Stack>
    </>
  );
};

export default UserActions;
