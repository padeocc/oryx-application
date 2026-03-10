import React from 'react';
import Link from 'next/link';

import { ProductStructureItem } from '@/domain/productstructure/types';
import { Breadcrumbs } from '@mantine/core';

interface TagsBreadcrumbsProps {
  path: ProductStructureItem[];
}

export default function TagsBreadcrumbs({ path }: TagsBreadcrumbsProps) {
  if (path.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
      {path.map((item, index) => (
        <span key={item.productstructure}>
          {index < path.length - 1 ? (
            <Link href={`/tag/${item.slug}`}>{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          )}
        </span>
      ))}
    </Breadcrumbs>
  );
}