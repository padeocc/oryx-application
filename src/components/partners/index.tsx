import { Image, Title, Container, Box, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function Partners() {
  const t = await getTranslations('home_page');
  return (
    <Container size={'xl'} style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)', width: '100%', padding: 10 }}>
      <Title order={2} ta="center" mb="lg">
        <Text fz={{ base: '1.2rem', sm: '2rem' }} c="green_oryx" fw="bold">
          {t('partners')}
        </Text>
      </Title>
      <Box
        mx="xl"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem'
        }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image src="/images/partners/la_mélée.jpg" alt="Logo 3" w={180} h={100} />
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image src="/images/partners/Logo_ADRESS_CMJN_300dpi.jpg" alt="Logo 4" w={180} h={100} />
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image src="/images/partners/ENEDIS_Logo.png" w={180} h={100} />
        </Box>
      </Box>
    </Container>
  );
}
