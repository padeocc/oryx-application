import { Theme } from "@/config";
import { productStructureData } from "./productstructure-data";
import { ProductStructureItem } from "./types";

/**
 * getProductStructureBySlug finds productstructure item by slug
 * 
 * @param slug 
 * @returns either the product structure item or undefined
 */
export function getProductStructureBySlug(slug: string): ProductStructureItem | undefined {
  return productStructureData.find(item => item.slug === slug);
}

/**
 * getAllProductStructureSlugs gets all product structure slugs for static generation
 * 
 * @returns string[]
 */
export function getAllProductStructureSlugs(): string[] {
  return productStructureData.map(item => item.slug);
}

/**
 * getBreadcrumbPath gets the parents in hierarchical order
 * to generate the breadcrumb path for a product structure
 * 
 * @param slug string
 * @returns ProductStructureItem[]
 */
export function getBreadcrumbPath(slug: string): ProductStructureItem[] {
  const item = getProductStructureBySlug(slug);
  if (!item) return [];
  
  const path: ProductStructureItem[] = [...item.parents.map(parentSlug => {
    const parentItem = getProductStructureBySlug(parentSlug);
    return parentItem || { productstructure: parentSlug, title: parentSlug, slug: '', meta_title: '', meta_description: '', keywords: '', content: '', parents: [], theme: 'foods' as Theme };
  }), item];
  
  return path.filter(Boolean) as ProductStructureItem[];
}

/**
 * getBreadcrumbPath gets the direct child items
 * 
 * @param slug 
 * @returns ProductStructureItem[]
 */
export function getChildrenItemsBySlug(slug: string): ProductStructureItem[] {
  
  const item = getProductStructureBySlug(slug);
  if (!item) {
    return [];
  }

  const res = productStructureData.filter((ps) => {
    return ps.parents.includes(item.slug) && (ps.parents.length === item.parents.length + 1)
  });

  return res;
}