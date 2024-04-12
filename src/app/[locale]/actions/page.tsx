import ActionsPage from '@/app/components/pages/ActionsPage';

export default function Actions({ searchParams }: { searchParams: { assistant: string } }) {
  const assistant = searchParams.assistant === 'true';
  return (
    <main>
      <ActionsPage showAssistant={assistant} />
    </main>
  );
}
