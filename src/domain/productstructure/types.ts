import { Theme } from '@/config';
import { Service } from '@/types';

export type PSFilters = {
  economic: boolean;
  ess: boolean;
  title: string;
};

export type ProductStructureItem = {
  productstructure: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  parents: string[];
  theme: Theme;
};

export type UsePSFilters = (allServices: Service[]) => {
  activeFilters: PSFilters;
  filteredServices: Service[];
  filterItems: (f: PSFilters) => void;
  clearFilters: () => void;
};
