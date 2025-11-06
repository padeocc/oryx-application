'use client';
import React, { useEffect } from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig, setRouter } from '../app/config/frontend';
import { usePathname, useRouter } from 'next/navigation';
import { EmailPasswordComponentsOverrideProvider } from 'supertokens-auth-react/recipe/emailpassword';
import { useCurrentUserDispatch } from '@/app/context/CurrentUserContext';
import { FetchUserResponse, User } from '@/types';

const getCurrentUser = async () => {
  const baseURL = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
  const url = `${baseURL}/api/user`;
  const currentUser: User = await fetch(url, {
    method: 'GET'
  })
    .then(res => {
      return res.json();
    })
    .then((userResponse: FetchUserResponse) => {
      return userResponse.user;
    });
  return currentUser;
};

let currentUser: User;
if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
  currentUser = await getCurrentUser();
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const dispatch = useCurrentUserDispatch();
  useEffect(() => {
    const asyncFunc = async (dispatch: any) => {
      dispatch({ type: 'updateUser', user: currentUser });
    };
    asyncFunc(dispatch);
  }, [currentUser]);
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return (
    <SuperTokensWrapper>
      <EmailPasswordComponentsOverrideProvider
        components={{
          EmailPasswordSignUpForm_Override: ({ DefaultComponent, ...props }) => {
            return (
              <DefaultComponent
                {...props}
                formFields={[
                  props.formFields.find(({ id }) => id === 'pseudo')!,
                  props.formFields.find(({ id }) => id === 'firstname')!,
                  props.formFields.find(({ id }) => id === 'lastname')!,
                  props.formFields.find(({ id }) => id === 'email')!,
                  props.formFields.find(({ id }) => id === 'password')!
                ]}
              />
            );
          }
        }}>
        {children}
      </EmailPasswordComponentsOverrideProvider>
    </SuperTokensWrapper>
  );
};