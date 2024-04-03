'use client';

import { Button, Loader, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from 'supertokens-node';
import Session, { signOut } from 'supertokens-web-js/recipe/session';

const AuthButton = ({}: {}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    setIsloading(true);

    const fetchData = async () => {
      const hasSession = await Session.attemptRefreshingSession();
      if (hasSession) {
        const userInfoResponse = hasSession ? await fetch('http://localhost:3000/api/user') : undefined;
        const jsonResponse = await userInfoResponse?.json();
        setUser(jsonResponse);
      } else {
        setUser(undefined);
      }
      setIsloading(false);
    };

    fetchData();
  }, [router]);

  return isLoading ? (
    <Loader size={'xs'} />
  ) : !!user ? (
    <Stack gap={0} ta="right">
      <Text c={'white'} fw={700} fz={'sm'}>
        {user.emails[0]}
      </Text>
      <Link
        href=""
        style={{ textDecoration: 'none' }}
        onClick={async () => {
          await signOut();
          window.location.replace('/');
        }}>
        <Text c={'white'} fz={'xs'}>
          Se déconnecter
        </Text>
      </Link>
    </Stack>
  ) : (
    <Button component={Link} href="/fr/login">
      Se connecter
    </Button>
  );
};

export default AuthButton;
