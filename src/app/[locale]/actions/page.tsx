import CatalogPage from '../../components/pages/CatalogPage';

export default function Home({ searchParams }: { searchParams: { assistant: string } }) {
  const assistant = searchParams.assistant === 'true';
  return (
    <main>
      <CatalogPage showAssistant={assistant} />
    </main>
  );
}
