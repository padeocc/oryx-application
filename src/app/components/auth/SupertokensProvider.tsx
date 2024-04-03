'use client';
import { appInfo } from '@/app/config/appInfo';
import React, { useEffect } from 'react';
import SuperTokensWebJs from 'supertokens-web-js';
import EmailPasswordWebJs from 'supertokens-web-js/recipe/emailpassword';
import SessionWebJs from 'supertokens-web-js/recipe/session';
import { SuperTokensConfig } from 'supertokens-web-js/types';

const getFrontendAuthConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [EmailPasswordWebJs.init(), SessionWebJs.init()]
  };
};

const SupertokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    SuperTokensWebJs.init(getFrontendAuthConfig());
  }, []);
  return <>{children}</>;
};

export default SupertokensProvider;
