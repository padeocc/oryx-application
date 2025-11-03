'use client';
import React from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig, setRouter } from '../app/config/frontend';
import { usePathname, useRouter } from 'next/navigation';
import { EmailPasswordComponentsOverrideProvider } from 'supertokens-auth-react/recipe/emailpassword';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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