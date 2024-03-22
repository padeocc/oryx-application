import { Container, Group, Title } from '@mantine/core';
import { Horse } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';

const HeaderMenu = () => {
  return (
    <Container className={styles.container} fluid h={{ base: 120, sm: 120 }}>
      <Group justify="space-between" h="100%">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Group gap={0}>
            <Horse size="2rem" color="white" />
            <Title c="white" order={1}>
              Oryx
            </Title>
          </Group>
        </Link>
        <Group hiddenFrom="sm">
          <HeaderMenuMobile />
        </Group>
        <Group gap={'xl'} visibleFrom="sm">
          <HeaderMenuDesktop />
        </Group>
      </Group>
    </Container>
  );
};

export default HeaderMenu;
