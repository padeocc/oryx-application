import SignupPage from '@/app/components/pages/SignupPage';
import { Container } from '@mantine/core';

export default function Signup() {
  return (
    <main>
      <Container maw={'800px'}>
        <SignupPage />
      </Container>
    </main>
  );
}
