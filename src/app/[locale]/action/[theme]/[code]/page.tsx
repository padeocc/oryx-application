import NotFound from '@/app/components/navigation/NotFound';
import { Theme } from '@/config';
import { permanentRedirect } from 'next/navigation';

// Legacy page

export default async function Action(props: { params: Promise<{ code: string; theme: Theme }> }) {
  const params = await props.params;
  const code = params.code;
  const theme = params.theme;

  if (!theme) {
    return <NotFound />;
  }
  permanentRedirect(`/service/${theme}/${code}`);
}
