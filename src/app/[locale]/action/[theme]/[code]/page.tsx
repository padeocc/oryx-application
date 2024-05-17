import ActionPage from '@/app/components/pages/ActionPage';
import { Theme } from '@/config';

export default function Action({ params }: { params: { code: string; theme: Theme } }) {
  const code = params.code;
  const theme = params.theme;
  return (
    <main>
      <ActionPage code={code} subject={theme} />
    </main>
  );
}
