import { Alert } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const ActionPage = async ({}: {}) => {
  const t = await getTranslations('action_page');

  return (
    <Alert color="orange">
      {t('coming_soon')}
      <br />
      <br />
      <Link href="#">{t('back')}</Link>
    </Alert>
  );
};

export default ActionPage;
