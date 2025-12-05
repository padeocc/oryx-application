import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';
import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import { defaultTranslationsEmailPassword } from './translations/defaultTranslationsEmailPassword';
import EmailVerification from 'supertokens-auth-react/recipe/emailverification';
const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    languageTranslations: {
      translations: defaultTranslationsEmailPassword,
      defaultLanguage: 'fr'
    },
    recipeList: [
      EmailPasswordReact.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'pseudo',
                label: 'PSEUDO_LABEL',
                placeholder: 'PSEUDO_PLACEHOLDER'
              },
              {
                id: 'firstname',
                label: 'FIRSTNAME_LABEL',
                placeholder: 'FIRSTNAME_PLACEHOLDER'
              },
              {
                id: 'lastname',
                label: 'LASTNAME_LABEL',
                placeholder: 'LASTNAME_PLACEHOLDER'
              }
            ]
          }
        }
      }),
      EmailVerification.init({
        mode: 'REQUIRED' // or "OPTIONAL"
      }),
      SessionReact.init()
    ],
    windowHandler: original => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: url => routerInfo.router!.push(url.toString()),
        setHref: url => routerInfo.router!.push(url.toString())
      }
    })
  };
};
