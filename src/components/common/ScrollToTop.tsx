'use client';

import { ActionIcon } from '@mantine/core';
import { ArrowUp } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <ActionIcon
      hiddenFrom="md"
      onClick={scrollToTop}
      size="xl"
      radius="xl"
      variant="filled"
      color="green_oryx.7"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(52, 152, 162, 0.3)',
        transition: 'all 0.3s ease'
      }}
    >
      <ArrowUp size={24} weight="bold" />
    </ActionIcon>
  );
};

export default ScrollToTop;

