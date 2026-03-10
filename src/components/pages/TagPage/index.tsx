import React from 'react';
import { Service } from '@/types';
import { useTranslations } from 'next-intl';

import { ProductStructureItem } from '@/domain/productstructure/types';
import TagsBreadcrumbs from './components/TagsBreadcrumbs';
import FilterableGrid from './components/FilterableGrid';
import Link from 'next/link';
import SubTagsItems from './components/SubTagsItems';

interface ProductStructurePageProps {
  productStructure: ProductStructureItem;
  services: Service[];
  breadcrumbPath: ProductStructureItem[];
  subProductStucture: ProductStructureItem[]
}

export default function TagPage
({ 
  productStructure,
  services,
  breadcrumbPath,
  subProductStucture,
}: ProductStructurePageProps) {
  const t = useTranslations('tag-page');

  return (
    <div>
      <TagsBreadcrumbs path={breadcrumbPath} />
      <h1 className="text-3xl font-bold mb-4">{productStructure.title}</h1>
      <p>{productStructure.meta_description}</p>
      <SubTagsItems items={subProductStucture} />
      {services.length > 0 ? (
        <FilterableGrid items={services} productstructure={productStructure.productstructure} />
      ) : (
        <div>{t('noServicesFound', { productStructure: productStructure.title })}</div>
      )}
    </div>
  );
}