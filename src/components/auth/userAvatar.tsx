'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-web-js/recipe/session';

interface AvatarProps {
    translations :{
        signin: string;
        signout: string;
    }
}

const UserAvatar = ({translations}:AvatarProps) => {
  async function onLogout() {
    await signOut();
  }
  const session = useSessionContext();

  if (session.loading) {
    return <div>Loading...</div>;
  } else if (session.doesSessionExist === false) {
    return (
      <Button component={Link} href="/auth" color="green_oryx" style={{ width: '100%' }}>
        {translations.signin}
      </Button>
    );
  } else {
    return (
      <Button onClick={onLogout} component={Link} href="/" color="green_oryx" style={{ width: '100%' }}>
        {translations.signout}
      </Button>
    );
  }
};
export default UserAvatar;
