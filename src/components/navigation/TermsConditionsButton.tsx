import { Modal, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

const TermsConditionsButton = ({ label }: { label?: string }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <Link onClick={() => setOpened(true)} href={'#'} color="gray">
        {label || 'Lire les conditions d\'utilisation'}
      </Link>
      <Modal size="xl" opened={opened} onClose={() => setOpened(false)}>
        <h1>Conditions d'Acceptation pour l'Utilisation de Cookies et le Stockage des Sessions Utilisateurs</h1>
        <Text>En utilisant notre application web, vous acceptez les conditions suivantes concernant l'utilisation de cookies et le stockage des sessions utilisateurs :</Text>
        <ol>
          <li>
            <strong>Consentement explicite :</strong> En accédant à notre application web, vous consentez explicitement à l'utilisation de cookies et au stockage des sessions utilisateurs conformément à la présente politique.
          </li>
          <li>
            <strong>Politique de confidentialité :</strong> Vous reconnaissez avoir lu, compris et accepté notre politique de confidentialité, qui décrit en détail quelles données sont collectées, comment elles sont utilisées, partagées et stockées.
          </li>
          <li>
            <strong>Opt-in pour les cookies tiers :</strong> Vous avez la possibilité de consentir spécifiquement à l'utilisation de cookies tiers pour l'analyse d'activités ou d'autres fins. Ce consentement peut être donné ou retiré à tout moment dans les paramètres de votre compte.
          </li>
          <li>
            <strong>Droit de retrait du consentement :</strong> Vous avez le droit de retirer votre consentement à tout moment. Le retrait du consentement peut être effectué en modifiant les paramètres de votre compte ou en suivant les instructions fournies dans notre politique de confidentialité.
          </li>
          <li>
            <strong>Expiration des sessions :</strong> Veuillez noter que les sessions utilisateur peuvent expirer après une période définie d'inactivité ou conformément à nos politiques internes de gestion des sessions.
          </li>
        </ol>
        <Text>Si vous avez des questions ou des préoccupations concernant notre utilisation des cookies ou le stockage des sessions utilisateur, veuillez nous contacter sur</Text>
        <a href="mailto:support@oryxchange.com">support@oryxchange.com</a>.
      </Modal>
    </>
  );
};

export default TermsConditionsButton;
