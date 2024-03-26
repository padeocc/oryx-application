'use client';

import { Tooltip } from '@mantine/core';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

const Bookmark = ({ actionId }: { actionId: string }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <Tooltip label={'Enregistrer cette action comme une action préférée ! (Bientôt disponible)'} color="green">
      <BookmarkSimple
        style={{ cursor: 'pointer' }}
        size={'16px'}
        color="orange"
        weight={isActive ? 'fill' : 'regular'}
        onClick={() => {
          setIsActive(!isActive);
        }}
      />
    </Tooltip>
  );
};

export default Bookmark;
