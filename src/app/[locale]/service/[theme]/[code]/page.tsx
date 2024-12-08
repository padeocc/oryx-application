import ServicePage from '@/app/components/pages/ServicePage';
import { Theme } from '@/config';

export default async function Service(props: { params: Promise<{ code: string; theme: Theme }> }) {
  const params = await props.params;
  const code = params.code;
  const theme = params.theme;
  return (
    <main>
      <ServicePage code={code} theme={theme} />
    </main>
  );
}
