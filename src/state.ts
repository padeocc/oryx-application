import { Filters } from '@/app/components/pages/ActionsPage/utils';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StateService {
  code?: string;
}

export interface StateUser {
  email: string;
  services: StateService[];
}

interface LocalState {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const useLocalState = create<LocalState>()(
  devtools(
    persist(
      set => ({
        filters: {
          theme: undefined,
          categories: [],
          regions: [],
          others: {}
        },
        setFilters: filters => set(state => ({ ...state, filters }))
      }),
      {
        name: 'oryx-local-state'
      }
    )
  )
);
