import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ProductStructureItem } from '@/domain/productstructure/types';
import { Pill } from '@mantine/core';

interface SubTagsItemsProps {
  items: ProductStructureItem[];
}

export default function SubTagsItems({ items }: SubTagsItemsProps) {
  const t = useTranslations('tag-page');

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <strong>{t('sub-items')} </strong>
      {items.map(item => (
        <Link key={`sub-item-${item.slug}`} href={`/tag/${item.slug}`}>
          <Pill size="md" radius={5}>
            {item.title}
          </Pill>
        </Link>
      ))}
    </div>
  );
}
