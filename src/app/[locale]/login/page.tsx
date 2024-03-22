import LoginFormPage from '@/pages/LoginFormPage';
import { Card } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <Card color={'white'} maw={680} mx="auto">
        <LoginFormPage
          handleSubmit={function (): {} {
            throw new Error('Function not implemented.');
          }}
        />
      </Card>
    </main>
  );
}
