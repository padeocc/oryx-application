import ContactPage from '@/app/components/pages/ContactPage';

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ report?: string }>;
}) {
  return (
    <main>
      <ContactPage searchParams={searchParams} />
    </main>
  );
}
