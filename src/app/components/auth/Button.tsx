'use client';

import { getFrontendAuthConfig } from '@/app/config/frontend';
import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from 'supertokens-node';
import SuperTokensWebJs from 'supertokens-web-js';
import Session, { signOut } from 'supertokens-web-js/recipe/session';

const AuthButton = ({ type = 'button' }: { type?: 'button' | 'link' }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const t = useTranslations('auth_button');

  useEffect(() => {
    setIsloading(true);

    const fetchData = async () => {
      SuperTokensWebJs.init(getFrontendAuthConfig());

      const hasSession = await Session.attemptRefreshingSession();
      if (hasSession) {
        const userInfoResponse = hasSession
          ? await fetch(process?.env?.NEXT_PUBLIC_APPINFO_API_GETUSER_ENDPOINT || '')
          : undefined;
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
    <Button loading color={'var(--mantine-color-dark-outline)'}>
      {t('login.connect')}
    </Button>
  ) : !!user ? (
    <Stack gap={0} ta="right">
      <Text
        c={type === 'button' ? 'var(--mantine-color-dark-outline)' : 'var(--mantine-primary-color-2)'}
        fw={700}
        fz={'sm'}>
        {user.emails[0]}
      </Text>
      <Link
        href=""
        style={{ textDecoration: 'none' }}
        onClick={async () => {
          setIsloading(true);
          await signOut();
          window.location.reload();
        }}>
        <Text c={type === 'button' ? 'var(--mantine-color-dark-outline)' : 'var(--mantine-primary-color-2)'} fz={'xs'}>
          {t('login.disconnect')}
        </Text>
      </Link>
    </Stack>
  ) : type === 'button' ? (
    <Button component={Link} href="login" color={'var(--mantine-color-dark-outline)'}>
      {t('login.connect')}
    </Button>
  ) : (
    <Link href="login" color={'var(--mantine-color-dark-outline)'} style={{ color: 'inherit', textDecoration: 'none' }}>
      {t('login.connect')}
    </Link>
  );
};

export default AuthButton;
