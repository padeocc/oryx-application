import ResetPasswordPage from '@/app/components/pages/ResetPasswordPage';
import { Container } from '@mantine/core';

export default function ResetPassword({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;
  return (
    <main>
      <Container maw={'800px'}>
        <ResetPasswordPage
          searchParams={{
            token
          }}
        />
      </Container>
    </main>
  );
}
