import SignupFormPage from '@/pages/SignupFormPage';

const handleSignup = async () => {
  'use server';
  console.log('handleSignup');
};

export default function Signup() {
  return (
    <main>
      <SignupFormPage handleSubmit={handleSignup} />
    </main>
  );
}
