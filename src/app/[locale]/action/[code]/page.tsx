import ActionPage from '@/app/components/pages/ActionPage';

export default function Action({ params }: { params: { code: string } }) {
  const code = params.code;
  return (
    <main>
      <ActionPage code={code} />
    </main>
  );
}
