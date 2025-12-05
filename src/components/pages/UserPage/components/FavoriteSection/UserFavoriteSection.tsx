'use client';
import { useTranslations } from 'next-intl';
import styles from './UserFavoritesSection.module.css';
import { useCurrentUser } from '@/app/context/CurrentUserContext';
import { SimpleGrid, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Service } from '@/types';
import ServiceCard from '@/components/ServiceCard';
import { themesColors } from '@/config';
const UserFavoritesSection = () => {
  const t = useTranslations('userPage');
  const currentUser = useCurrentUser();
  const [favorites, setFavorites] = useState([] as Service[]);



  useEffect(() => {
    const searchParams = new URLSearchParams({
      userId: (currentUser.user?.id || -1).toString()
    });
    const baseURL = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
    const url = `${baseURL}/api/favorite?${searchParams}`;
    Promise.resolve(
      fetch(url, {
        next: {
          tags: ['search']
        }
      }).then(async data => {
        const res = await data.json();
        return setFavorites(res.favorites);
      })
    );
  }, []);

  return (
    <>
      <Stack gap={'xl'} pt="xl">
        <Title c="green_oryx" fw={'bold'} order={1}>
          {t('favorites.title')}
        </Title>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 4 }} spacing={{ base: 'md' }}>
            {favorites &&
              favorites.map((service, index) => (
                <ServiceCard key={`action-${service.theme}-${service.name}-${index}`}
                  service={service}
                  backgroundColor={'var(--mantine-primary-color-2)'}
                  theme={service.theme[0]}
                  color={themesColors[service.theme[0]]}
                  titleOrder={4}
                />
              ))}
          </SimpleGrid>
      </Stack>
    </>
  );
};

export default UserFavoritesSection;
