'use client'
import { Stack} from '@mantine/core';
import UserFavoritesSection from './components/FavoriteSection/UserFavoriteSection';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

function UserPage({ userId }: { userId: string }) {
  return (
    <>
    <SessionAuth>
      <Stack>
        <UserFavoritesSection />
      </Stack>
    </SessionAuth>
    </>
  );
}

export default UserPage;
