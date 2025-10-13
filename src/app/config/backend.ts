import SuperTokens from 'supertokens-node';
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from "supertokens-node/recipe/usermetadata";
import EmailVerification from 'supertokens-node/recipe/emailverification';
import { appInfo } from './appInfo';
import { TypeInput } from 'supertokens-node/types';

export const backendConfig = (): TypeInput => {
  return {
    framework: 'custom',
    supertokens: {
      connectionURI: process.env.AUTH_APPINFO_CONNECTIONURL || '',
      apiKey: process.env.API_KEYS || ''
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({
        signUpFeature: {
          formFields: [
            {
              id: 'pseudo'
            }
          ]
        },
        override: {
          apis: original => ({
            ...original,
            signUpPOST: async function (input) {
              let response = await original.signUpPOST!(input);
              if (response.status === 'OK') {
                // Extract custom fields
                const firstName = input.formFields.find(f => f.id === 'first_name')?.value?.toString() ||'';
                const lastName = input.formFields.find(f => f.id === 'last_name')?.value?.toString() ||'';
                const pseudo = input.formFields.find(f => f.id === 'pseudo')?.value?.toString() ||'';

                // Store in user metadata
                await UserMetadata.updateUserMetadata(response.user.id, {
                  first_name: firstName,
                  last_name: lastName,
                  pseudo: pseudo
                });
              }
              return response;
            }
          })
        }
      }),
      SessionNode.init(),
      Dashboard.init(),
      EmailVerification.init({
        mode: 'REQUIRED'
      })
    ],
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