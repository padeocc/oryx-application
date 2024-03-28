import { Alert } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Alert color="orange">
        Bientôt disponible !<br />
        <br />
        <Link href="/fr/">Retour</Link>
      </Alert>
    </main>
  );
}
