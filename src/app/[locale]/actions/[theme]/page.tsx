import NotFound from '@/components/navigation/NotFound';
import { Theme } from '@/config';
import { permanentRedirect } from 'next/navigation';

// Legacy page

export default async function ActionsTheme(props: { params: Promise<{ theme: Theme }> }) {
  const params = await props.params;

  if (!params.theme) {
    return <NotFound />;
  }

  permanentRedirect(`/services?filters={"theme":["${params.theme}"]}`);
}
