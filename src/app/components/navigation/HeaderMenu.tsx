import { Container, Group, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';

const HeaderMenu = async () => {
  const t = await getTranslations('home_page');

  return (
    <Container className={styles.container} fluid h={{ base: 120, sm: 120 }}>
      <Group justify="space-between" h="100%">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Stack gap="0">
            <Group gap={0}>
              <Title c="green" order={1}>
                Oryx
              </Title>
            </Group>
            <Title c="dark" fz="md">
              {t('welcome')}
            </Title>
          </Stack>
        </Link>
        <Group hiddenFrom="md" key="header-group-mobile">
          <HeaderMenuMobile />
        </Group>
        <Group gap={'xl'} visibleFrom="md" key="header-group-desktop">
          <HeaderMenuDesktop />
        </Group>
      </Group>
    </Container>
  );
};

export default HeaderMenu;
