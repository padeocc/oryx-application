'use client';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './ActionsWrapper.module.css';

const ActionsWrapper = ({ serviceCode, isServiceFavorite }: { serviceCode: String; isServiceFavorite: boolean }) => {
  return (
    <>
      <ul className={[styles['actions-wrapper']].join(' ')}>
        <li>
            <FavoriteButton serviceCode={serviceCode} isServiceFavorite={isServiceFavorite}/>
        </li>
      </ul>
    </>
  );
};

export default ActionsWrapper;
