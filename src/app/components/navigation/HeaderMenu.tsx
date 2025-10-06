import { Container, Flex, Group, Image, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import HeaderMenuDesktop from './HeaderMenuDesktop';
import HeaderMenuMobile from './HeaderMenuMobile';
import styles from './header-menu.module.css';

const HeaderMenu = async () => {
  const t = await getTranslations('header');
  
  return (
    <Container 
      className={styles.container} 
      fluid 
      p={{ base: 'xs', md: 'md' }}
      h={{ base: 60, md: 120 }}
    >
      <Flex justify={'space-between'} align={'center'} w="100%" h="100%">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Stack gap={4}>
            <Image src="/images/logo.png" maw={{ base: '9rem', md: '11rem' }} />
            <Text 
              c="dark" 
              fz="sm" 
              fw="bold" 
              visibleFrom="md"
            >
              {t('tagline')}
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
