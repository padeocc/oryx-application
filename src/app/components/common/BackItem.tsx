'use client';

import { Theme } from '@/config';
import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BackItem = ({ theme }: { theme: Theme }) => {
  const router = useRouter();
  return (
    <Link
      href={`/services?filters={"theme":["${theme}"]}`}
      onClick={() => {
        router.back();
      }}>
      <ArrowLeft color="black" />
    </Link>
  );
};

export default BackItem;
