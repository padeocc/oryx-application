import SuperTokens from 'supertokens-node';
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import { TypeInput } from 'supertokens-node/types';
import { appInfo } from './appInfo';

export const backendConfig = (): TypeInput => {
  return {
    framework: 'custom',
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: 'https://st-dev-feaca450-db39-11ee-8a14-9511970816ad.aws.supertokens.io',
      apiKey: 'RJnxmo--hns46ib9GLSa4a-ZQj'
    },
    appInfo,
    recipeList: [EmailPasswordNode.init(), SessionNode.init()],
    isInServerlessEnv: true
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
