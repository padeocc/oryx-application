import LoginFormPage from '@/pages/LoginFormPage';
import { Card } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <Card color={'white'} maw={840} mx="auto">
        <LoginFormPage />
      </Card>
    </main>
  );
}
