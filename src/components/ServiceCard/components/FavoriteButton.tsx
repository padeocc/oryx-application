'use client';

import { useCurrentUser } from '@/app/context/CurrentUserContext';
import { ActionIcon, Checkbox, CheckboxProps, VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeartIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';

const FavoriteButton = ({ serviceCode, isServiceFavorite }: { serviceCode: String, isServiceFavorite: boolean }) => {
  const currentUser = useCurrentUser();
  const [isFavorite, handlersFavorite] = useDisclosure(isServiceFavorite);
  async function addFavorites() {
    const baseURL = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
    const url = `${baseURL}/api/favorite`;
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userId: currentUser.user?.id, serviceCode })
    })
      .then(res => {
        const data = res.json();
        if (res.status === 200) {
          handlersFavorite.open();
        } else {
          handlersFavorite.close();
        }
        return data;
      })
      .then(data => console.log(data));
  }
  async function removeFavorites() {
    const baseURL = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';
    const url = `${baseURL}/api/favorite`;
    return await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ userId: currentUser.user?.id, serviceCode })
    })
      .then(res => {
        const data = res.json();
        if (res.status === 200) {
          handlersFavorite.close();
        } else {
          handlersFavorite.open();
        }
        return data;
      })
      .then(data => console.log(data));
  }
  async function toggleFavorites() {
    isFavorite ? removeFavorites() : addFavorites();
  }

  useEffect(() => {
    isServiceFavorite?handlersFavorite.open():handlersFavorite.close();
  }, [isServiceFavorite]);
  if (!currentUser.user) {
    return <></>;
  }
  return (
    <>
      <ActionIcon onClick={toggleFavorites}>
        {isFavorite ? (
          <>
            <VisuallyHidden>Remove from favorite</VisuallyHidden>
            <HeartIcon weight="fill" color="9F163C"></HeartIcon>
          </>
        ) : (
          <>
            <VisuallyHidden>Add to favorite</VisuallyHidden>
            <HeartIcon weight="regular" color="9F163C"></HeartIcon>
          </>
        )}

        {/* <Checkbox
        icon={FavoriteIcon}
        checked={isFavorite}
        onChange={e => toggleFavorites(e.currentTarget.checked)}
        label="Ajouter aux favoris"
      /> */}
      </ActionIcon>
    </>
  );
};

export default FavoriteButton;
