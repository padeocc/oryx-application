import { Service } from '@/app/components/pages/CatalogPage';
import demoServices from '@/app/demo.json';
import UserActionsPage from '@/components/pages/UserActionsPage';

const data = demoServices as unknown as Service[];

const UserActions = () => {
  return (
    <main>
      <UserActionsPage />
    </main>
  );
};

export default UserActions;
