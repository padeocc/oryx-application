import ResetPasswordPage from '@/app/components/pages/ResetPasswordPage';

export default function ResetPassword({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;
  return (
    <main>
      <ResetPasswordPage
        searchParams={{
          token
        }}
      />
    </main>
  );
}
