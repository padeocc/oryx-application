import SuperTokens from 'supertokens-node';
import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import EmailVerification from 'supertokens-node/recipe/emailverification';
import { appInfo } from './appInfo';
import { TypeInput } from 'supertokens-node/types';
import { getDBConnection } from '../../db/connection';
import { User } from '../../db/entities/User';
export const backendConfig = (): TypeInput => {
  async function getUser(userId: string) {
    const dataSource = await getDBConnection();
    return Promise.resolve(dataSource)
      .then(async () => {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.find({
          where: {
            uuid: userId
          },
          relations: {
            favorites: true
          }
        });
        return user;
      })
      .catch(error => console.log('Error: ', error));
  }
  async function addUser(dto: any) {
    const dataSource = await getDBConnection();
    return Promise.resolve(dataSource)
      .then(async () => {
        const user = new User();
        user.uuid = dto.uuid;
        user.pseudo = dto.pseudo;
        user.email = dto.email;
        user.firstname = dto.email;
        user.lastname = dto.email;

        await dataSource.manager.save(user);
        console.log('User has been saved: ', user);
      })
      .catch(error => console.log('Error: ', error));
  }

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
            },
            {
              id: 'firstname'
            },
            {
              id: 'lastname'
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
                const firstname = input.formFields.find(f => f.id === 'first_name')?.value?.toString() || '';
                const lastname = input.formFields.find(f => f.id === 'last_name')?.value?.toString() || '';
                const pseudo = input.formFields.find(f => f.id === 'pseudo')?.value?.toString() || '';
                const email = input.formFields.find(f => f.id === 'email')?.value?.toString() || '';
                const dto = { uuid: response.user.id, pseudo, email, firstname, lastname };
                await addUser(dto);
                // Store in user metadata
                await UserMetadata.updateUserMetadata(response.user.id, {
                  first_name: firstname,
                  last_name: lastname,
                  pseudo: pseudo
                });
              }
              return response;
            },
            signInPOST: async function (input) {
              let response = await original.signInPOST!(input);
              if (response.status === 'OK') {
                const user = await getUser(response.user.id);
                // response.currentUser = user
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
