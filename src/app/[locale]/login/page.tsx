import LoginPage from '@/app/components/pages/LoginPage';
import { Container } from '@mantine/core';

export default function Login() {
  return (
    <main>
      <Container maw={'800px'}>
        <LoginPage />
      </Container>
    </main>
  );
}
