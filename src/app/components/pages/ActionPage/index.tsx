import { Alert } from '@mantine/core';
import Link from 'next/link';

const ActionPage = async ({}: {}) => {
  return (
    <Alert color="orange">
      Bientôt disponible !<br />
      <br />
      <Link href="/fr/">Retour</Link>
    </Alert>
  );
};

export default ActionPage;
