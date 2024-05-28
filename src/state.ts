import { Filters } from '@/app/components/pages/ActionsPage/utils';
import { xor } from 'lodash';
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
  user: StateUser | undefined;
  setUser: (user: StateUser | undefined) => void;
  toggleUserService: (service: StateService) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const useLocalState = create<LocalState>()(
  devtools(
    persist(
      set => ({
        user: undefined,
        setUser: (user: StateUser | undefined) => set(state => ({ ...state, user })),
        toggleUserService: (service: StateService) =>
          set(state => {
            const services: StateService[] = xor(state.user?.services.map(s => s.code) || [], [service.code]).map(
              s => ({ code: s })
            );
            if (state.user) {
              return { ...state, user: { ...state.user, services } };
            }
            return state;
          }),
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
