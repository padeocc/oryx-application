import { Theme } from '@/config';
import { RequestParameters } from '@/types';
import { permanentRedirect } from 'next/navigation';
import NotFound from '../../navigation/NotFound';

const ActionsPage = async ({ theme, parameters }: { theme: Theme; parameters?: RequestParameters }) => {
  if (!theme) {
    return <NotFound />;
  }
  permanentRedirect(`/services?filters={"theme":["${theme}"]}`);
};

export default ActionsPage;
