'use client';

import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

const Bookmark = ({ actionId }: { actionId: string }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <BookmarkSimple
      style={{ cursor: 'pointer' }}
      size={'16px'}
      color="orange"
      weight={isActive ? 'fill' : 'regular'}
      onClick={() => {
        setIsActive(!isActive);
      }}
    />
  );
};

export default Bookmark;
