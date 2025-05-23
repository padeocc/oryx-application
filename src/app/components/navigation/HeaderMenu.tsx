import { Container, Flex, Group, Image, Stack, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';

const HeaderMenu = async () => {
  const t = await getTranslations('header');

  return (
    <Container className={styles.container} fluid h={{ base: 120 }}>
      <Flex justify={'space-between'} align={'center'} w="100%" h="100%">
        <Group w="auto">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack gap="0">
              <Image src="/images/logo.png" maw={'11rem'} />
              <Text c="dark" fz="sm" fw={'bold'} order={2}>
                {t('tagline')}
              </Text>
            </Stack>
          </Link>
        </Group>
        <Group hiddenFrom="md" key="header-group-mobile" w="30%" align="flex-end" justify="flex-end">
          <HeaderMenuMobile />
        </Group>
        <Group gap={'xl'} visibleFrom="md" key="header-group-desktop" w="60%" justify="flex-end">
          <HeaderMenuDesktop />
        </Group>
      </Flex>
    </Container>
  );
};

export default HeaderMenu;
