'use client';

import { useLocalState } from '@/state';
import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'supertokens-web-js/recipe/session';

const AuthButton = ({ type = 'button' }: { type?: 'button' | 'link' }) => {
  const { user, setUser } = useLocalState();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const t = useTranslations('auth_button');

  return !user ? (
    type === 'button' ? (
      <Button
        component={Link}
        href="/login"
        color={isLoading ? 'var(--mantine-color-green-outline)' : 'var(--mantine-color-dark-outline)'}
        loading={isLoading}>
        {t('login.connect')}
      </Button>
    ) : (
      <Button
        variant="transparent"
        p="0"
        m="0"
        component={Link}
        href="/login"
        color={'var(--mantine-color-green-outline)'}
        fz={'lg'}
        loading={isLoading}>
        {t('login.connect')}
      </Button>
    )
  ) : (
    <Stack gap={0} ta="right">
      <Text
        c={type === 'button' ? 'var(--mantine-color-dark-outline)' : 'var(--mantine-primary-color-2)'}
        fw={700}
        fz={'lg'}>
        {user.email}
      </Text>
      <Link
        href="#"
        style={{ textDecoration: 'none' }}
        onClick={async () => {
          setIsloading(true);
          setUser(undefined);
          await signOut();
          setIsloading(false);
        }}>
        <Text c={type === 'button' ? 'var(--mantine-color-dark-outline)' : 'var(--mantine-primary-color-2)'} fz={'md'}>
          {t('login.disconnect')}
        </Text>
      </Link>
    </Stack>
  );
};

export default AuthButton;
