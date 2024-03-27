import { Service } from '@/app/components/pages/CatalogPage';
import UserActionsPage from '@/components/pages/UserActionsPage';
import demoServices from '@/data/actions.json';

const data = demoServices as unknown as Service[];

const UserActions = () => {
  return (
    <main>
      <UserActionsPage />
    </main>
  );
};

export default UserActions;
