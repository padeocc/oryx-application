import ActionsPage from '@/app/components/pages/ActionsPage';
import { Theme } from '@/config';

export default function ActionsTheme({ params }: { params: { theme: Theme } }) {
  return (
    <main>
      <ActionsPage theme={params.theme} />
    </main>
  );
}
