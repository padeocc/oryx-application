import { Button, Container, Group, Title } from '@mantine/core';
import { Horse } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import styles from './header-menu.module.css';

const HeaderMenu = () => {
  return (
    <Container className={styles.container} fluid>
      <Group justify="space-between" h="100%">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Group gap={0}>
            <Horse size="2rem" color="white" />
            <Title c="white" order={1}>
              Oryx
            </Title>
          </Group>
        </Link>
        <Group justify="space-between">
          <Button>Voir les services</Button>
          <Button>Qui sommes-nous ?</Button>
        </Group>
        <Group justify="space-between">
          <Button>Faire un don</Button>
          <Button component={Link} href="/fr/signup">
            Se connecter
          </Button>
        </Group>
      </Group>
    </Container>
  );
};

export default HeaderMenu;
