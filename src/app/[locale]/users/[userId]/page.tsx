import UserPage from '@/components/pages/UserPage';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const {userId} = await params
  return (
    <>
      <main>
        <UserPage userId={userId}/>
      </main>
    </>
  );
}
