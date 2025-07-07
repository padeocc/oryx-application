import SuperTokens from "supertokens-node";
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI: process.env.AUTH_APPINFO_CONNECTIONURL  || '',
      apiKey: process.env.API_KEYS  || '',
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({
        signUpFeature: {
          formFields: [{
            id: "pseudo"
          }]
        }
      }),
      SessionNode.init(),
      Dashboard.init(),
      EmailVerification.init({
        mode: "REQUIRED",
      })
    ],
    isInServerlessEnv: true,
  }
}

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}