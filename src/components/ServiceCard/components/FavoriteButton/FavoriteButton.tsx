'use client';
import { useCurrentUser } from '@/app/context/CurrentUserContext';
import { ActionIcon, Checkbox, CheckboxProps, Modal, Text, VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeartIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './FavoriteButton.module.css';
const FavoriteButton = ({ serviceCode, isServiceFavorite }: { serviceCode: String; isServiceFavorite: boolean }) => {
  const t = useTranslations('modal_favorite');

  const currentUser = useCurrentUser();
  const [isFavorite, handlersFavorite] = useDisclosure(isServiceFavorite);
  const [isModalOpened, handlersModal] = useDisclosure(false);
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
      });
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
      });
  }
  async function toggleFavorites() {
    isFavorite ? removeFavorites() : addFavorites();
  }
  function toggleModal() {
    handlersModal.toggle();
  }
  function onActionIconClicked() {
    return currentUser.user?.email ? toggleFavorites() : toggleModal();
  }

  useEffect(() => {
    isServiceFavorite ? handlersFavorite.open() : handlersFavorite.close();
  }, [isServiceFavorite]);

  return (
    <>
    <div className={styles['favorite-checkbox-wrapper']}>
      <input type="checkbox" id={`favorite-${serviceCode}`}  checked={isFavorite} onChange={onActionIconClicked}/>
      <label
        htmlFor={`favorite-${serviceCode}`}
        className={styles['add-favorite-checkbox']}>
        <HeartIcon className={[styles.icon, styles.empty].join(' ')} weight="regular"></HeartIcon>
        <HeartIcon className={[styles.icon, styles.fill].join(' ')} weight="fill"></HeartIcon>
        {isFavorite ? (
          <>
            <VisuallyHidden>Remove from favorite</VisuallyHidden>
          </>
        ) : (
          <>
            <VisuallyHidden>Add to favorite</VisuallyHidden>
          </>
        )}
      </label>
        {/* <Text c="dark" fz="sm" fw={'bold'} className={styles["count"]}>
          5
        </Text> */}
      </div>
      <Modal opened={isModalOpened} onClose={handlersModal.close} centered radius={'lg'} padding={'lg'}>
        <Text c="dark" fz="1.375em" fw={'bold'}>
          {t('title')}
        </Text>
        <Text c="dark" fz="x." fw={'bold'} mt={'lg'}>
          {t('description')}
        </Text>
        <Text c="dark" fz="lg" mt={'lg'}>
          {t('signin.label')}
          <Link href={'/auth?show=signin'}>{t('signin.link')}</Link>
        </Text>
        <Text c="dark" fz="lg">
          {t('signup.label')}
          <Link href={'/auth?show=signup'}>{t('signup.link')}</Link>
        </Text>
      </Modal>
    </>
  );
};

export default FavoriteButton;