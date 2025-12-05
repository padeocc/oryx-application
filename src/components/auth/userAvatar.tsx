'use client';

import { useCurrentUser, useCurrentUserDispatch } from '@/app/context/CurrentUserContext';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { redirectToAuth } from 'supertokens-auth-react';
import { signOut } from 'supertokens-web-js/recipe/session';

interface AvatarProps {
  translations: {
    signin: string;
    signout: string;
  };
}

const UserAvatar = ({ translations }: AvatarProps) => {
  const dispatch = useCurrentUserDispatch();
  const currentUser = useCurrentUser();
  async function onLogin() {
    await redirectToAuth({show: "signin",redirectBack: false});
    dispatch({ type: 'removeUser' });
  }
  async function onLogout() {
    await signOut();
    dispatch({ type: 'removeUser' });
  }

  function LoginBtn() {
    if (currentUser.user) {
      return (
        <>
          <Button
            component={Link}
            href={`/users/${currentUser.user?.id}`}
            color="var(--mantine-color-dark-outline)"
            style={{ width: '100%', marginBottom: '4px' }}>
            Mes favoris
          </Button>
          <Button onClick={onLogout} component={Link} href="/" color="green_oryx" style={{ width: '100%' }}>
            {translations.signout}
          </Button>
        </>
      );
    } else {
      return (
        <Button onClick={onLogin} component={Link} href="/auth" color="green_oryx" style={{ width: '100%' }}>
          {translations.signin}
        </Button>
      );
    }
  }

  return (
    <>
      <LoginBtn />
    </>
  );
};
export default UserAvatar;
