import SignupFormPage from '@/pages/SignupFormPage';
import { Card } from '@mantine/core';

const handleSignup = async () => {
  'use server';
  console.log('handleSignup');
};

export default function Signup() {
  return (
    <main>
      <Card color={'white'} maw={680} mx="auto">
        <SignupFormPage handleSubmit={handleSignup} />
      </Card>
    </main>
  );
}
