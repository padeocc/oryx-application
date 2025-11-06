'use client'
import { User } from '@/types';
import { createContext, Dispatch, useContext, useReducer } from 'react';

interface State {
   user?: User
};

const initialUser = {
  id: -1,
  uuid: '',
  pseudo: '',
  firstname: '',
  lastname: '',
  email: '',
  favorites: []
} as User;
const initialState: State = { user: initialUser };
const CurrentUserContext = createContext(initialState);

const CurrentUserDispatchContext = createContext<Dispatch<Actions>>(() => null)

export function CurrentUserProvider({ children } :any) {
  const [state, dispatch] = useReducer(
    currentUserReducer,
    initialState
  );

  return (
    <CurrentUserContext.Provider value={state}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function useCurrentUserDispatch() {
  return useContext(CurrentUserDispatchContext);
}

function currentUserReducer(state: State, action:Actions) : State {
  switch (action.type) {
    case 'updateUser': {
      return {...state, user: action.user}
    }
    case 'removeUser': {
      return {...state}
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}


type Actions =
  | { type: 'updateUser', user: User }
  | { type: 'removeUser' }
  | never