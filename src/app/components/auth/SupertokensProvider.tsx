'use client';
import { getFrontendAuthConfig } from '@/app/config/frontend';
import React from 'react';
import SuperTokensWebJs from 'supertokens-web-js';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensWebJs.init(getFrontendAuthConfig());
}
const SupertokensProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // useEffect(() => {
  //   SuperTokensWebJs.init(getFrontendAuthConfig());
  // }, []);
  return <>{children}</>;
};

export default SupertokensProvider;
