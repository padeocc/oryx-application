import ActionPage from '@/app/components/pages/ActionPage';
import { Theme } from '@/config';

export default async function Action(props: { params: Promise<{ code: string; theme: Theme }> }) {
  const params = await props.params;
  const code = params.code;
  const theme = params.theme;
  return (
    <main>
      <ActionPage code={code} theme={theme} />
    </main>
  );
}
