import { Container, Flex, Group, Image, Stack, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';

const HeaderMenu = async () => {
  const t = await getTranslations('home_page');

  return (
    <Container className={styles.container} fluid h={{ base: 120 }}>
      <Flex justify={'space-between'} align={'center'} w="100%" h="100%">
        <Group w="auto">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack gap="0">
              <Title c="green_oryx" order={1} fw={'bolder'}>
                <Image src="/images/logo.png" maw={'8rem'} />
              </Title>
              <Title c="dark" fz="sm" fw={'bold'} order={2}>
                {t('welcome')}
              </Title>
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
