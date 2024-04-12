import SuperTokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import { TypeInput } from 'supertokens-node/types';
import { appInfo } from './appInfo';

export const getBackendAuthConfig = (): TypeInput => {
  return {
    appInfo,
    recipeList: [EmailPassword.init(), SessionNode.init()],
    isInServerlessEnv: true,
    framework: 'custom',
    supertokens: {
      connectionURI: process?.env?.AUTH_APPINFO_CONNECTIONURL || '',
      apiKey: process?.env?.AUTH_APPINFO_CONNECTIONKEY || ''
    }
  };
};

let initialized = false;

export async function ensureSuperTokensInit() {
  if (!initialized) {
    await SuperTokens.init(getBackendAuthConfig());
    initialized = true;
  }
}
