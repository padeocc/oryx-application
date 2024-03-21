import LoginFormPage from '@/pages/LoginFormPage';

export default function Home() {
  return (
    <main>
      <LoginFormPage
        handleSubmit={function (): {} {
          throw new Error('Function not implemented.');
        }}
      />
    </main>
  );
}
