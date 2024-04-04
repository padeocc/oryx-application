import SignupFormPage from '@/pages/SignupFormPage';
import { Card } from '@mantine/core';

export default function Signup() {
  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <SignupFormPage />
      </Card>
    </main>
  );
}
