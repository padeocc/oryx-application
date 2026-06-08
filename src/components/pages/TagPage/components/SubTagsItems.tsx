import React from 'react';
import Link from 'next/link';
import { ProductStructureItem } from '@/domain/productstructure/types';
import { Pill } from '@mantine/core';

interface SubTagsItemsProps {
  items: ProductStructureItem[];
}

export default function SubTagsItems({ items }: SubTagsItemsProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <strong>Sous-tags </strong>
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
