import ContactPage from '@/app/components/pages/ContactPage';

export default function Contact({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main>
      <ContactPage searchParams={searchParams as any} />
    </main>
  );
}
