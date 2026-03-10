'use client';
import { useState } from 'react';
import { PSFilters, UsePSFilters } from './types';
import { Service } from '@/types';

const defaultFilters: PSFilters = {
  economic: false,
  ess: false,
  title: '',
};

const usePSFilters: UsePSFilters = (allServices: Service[]) => {
  const [activeFilters, setActiveFilters] = useState<PSFilters>(defaultFilters);

  const clearFilters = () => setActiveFilters(defaultFilters);

  const titleQuery = activeFilters.title
    .trim()
    .toLowerCase();

  let filteredServices: Service[] = allServices;

  if (activeFilters.ess) {
    filteredServices = filteredServices.filter((s) => s.ess);
  }
  if (activeFilters.economic) {
    filteredServices = filteredServices.filter((s) => s.economic);
  }
  if (titleQuery.length) {
    filteredServices = filteredServices.filter((s) => s.name
      .toLocaleLowerCase()
      .includes(titleQuery));
  }

  return {
    filteredServices,
    activeFilters,
    filterItems: setActiveFilters,
    clearFilters,
  };
};

export default usePSFilters;
