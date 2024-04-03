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
      connectionURI: 'https://st-dev-feaca450-db39-11ee-8a14-9511970816ad.aws.supertokens.io',
      apiKey: 'RJnxmo--hns46ib9GLSa4a-ZQj'
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
