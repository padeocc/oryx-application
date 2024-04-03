import LoginFormPage from '@/pages/LoginFormPage';
import { Card } from '@mantine/core';

const handleSubmit = async ({ response }: { response: any }): Promise<void> => {
  'use server';
  console.log('handleSubmit', response);
};

export default function Home() {
  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <LoginFormPage handleSubmit={handleSubmit} />
      </Card>
    </main>
  );
}
