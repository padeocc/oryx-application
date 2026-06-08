import { Container, Flex, Group, Image, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';
import { t } from '@/i18n';

const HeaderMenu = async () => {
  const tr = t('header');

  return (
    <Container
      className={styles.container}
      fluid
      p={{ base: 'xs', md: 'md' }}
      h={{ base: 60, md: 120 }}
    >
      <Flex justify={'space-between'} align={'center'} w="100%" h="100%">
        <Link href="/" style={{ textDecoration: 'none' }} aria-label={tr('homepage')}>
          <Stack gap={4}>
            <Image src="/images/logo.png" maw={{ base: '9rem', md: '11rem' }} alt="Oryxchange logo" width="143" />
            <Text
              c="dark"
              fz="sm"
              fw="bold"
              visibleFrom="md"
            >
              {tr('tagline')}
            </Text>
          </Stack>
        </Link>

        <Group hiddenFrom="md">
          <HeaderMenuMobile />
        </Group>

        <Group gap="xl" visibleFrom="md">
          <HeaderMenuDesktop />
        </Group>
      </Flex>
    </Container>
  );
};

export default HeaderMenu;
