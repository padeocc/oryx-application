import SignupFormPage from '@/pages/SignupFormPage';
import { Card, Stack } from '@mantine/core';

// export type SignupParams = { email: string; password: string; termsOfService: boolean; name: string };

const handleSignup = async ({ response }: { response: any }): Promise<void> => {
  'use server';
  console.log('handleSignup', response);
};

export default function Signup() {
  return (
    <main>
      <Stack gap={'xl'} justify="center" align="center">
        <Card color={'white'} maw={840}>
          <SignupFormPage handleSubmit={handleSignup} />
        </Card>
        <Card color={'white'} maw={840}>
          <h1>
            Conditions d&lsquo;Acceptation pour l&lsquo;Utilisation de Cookies et le Stockage des Sessions Utilisateurs
          </h1>
          <p>
            En utilisant notre application web, vous acceptez les conditions suivantes concernant l&lsquo;utilisation de
            cookies et le stockage des sessions utilisateurs :
          </p>
          <ol>
            <li>
              <strong>Consentement explicite :</strong> En accédant à notre application web, vous consentez
              explicitement à l&lsquo;utilisation de cookies et au stockage des sessions utilisateurs conformément à la
              présente politique.
            </li>
            <li>
              <strong>Politique de confidentialité :</strong> Vous reconnaissez avoir lu, compris et accepté notre
              politique de confidentialité, qui décrit en détail quelles données sont collectées, comment elles sont
              utilisées, partagées et stockées.
            </li>
            <li>
              <strong>Opt-in pour les cookies tiers :</strong> Vous avez la possibilité de consentir spécifiquement à
              l&lsquo;utilisation de cookies tiers pour l&lsquo;analyse d&lsquo;activités ou d&lsquo;autres fins. Ce
              consentement peut être donné ou retiré à tout moment dans les paramètres de votre compte.
            </li>
            <li>
              <strong>Droit de retrait du consentement :</strong> Vous avez le droit de retirer votre consentement à
              tout moment. Le retrait du consentement peut être effectué en modifiant les paramètres de votre compte ou
              en suivant les instructions fournies dans notre politique de confidentialité.
            </li>
            <li>
              <strong>Expiration des sessions :</strong> Veuillez noter que les sessions utilisateur peuvent expirer
              après une période définie d&lsquo;inactivité ou conformément à nos politiques internes de gestion des
              sessions.
            </li>
          </ol>
          <p>
            En utilisant notre application web, vous acceptez que nous utilisions des cookies et stockions des sessions
            utilisateur conformément aux conditions énoncées ci-dessus. Si vous avez des questions ou des préoccupations
            concernant notre utilisation des cookies ou le stockage des sessions utilisateur, veuillez nous contacter
            sur <a href="mailto:contact@oryxchange.com">contact@oryxchange.com</a>.
          </p>
        </Card>
      </Stack>
    </main>
  );
}
