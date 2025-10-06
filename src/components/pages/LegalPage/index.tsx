import { Alert, Flex, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

const LegalPage = async ({}: {}) => {
  const t = await getTranslations('legal');

  return (
    <Flex justify={'center'} pb="14rem">
      <Alert maw="800px">
        <Stack gap={'md'} justify="center">
          <Title order={2}>{t('title')}</Title>

          <Title order={3}>{t('sections.preamble')}</Title>
          <Text>{t('content.preamble')}</Text>

          <Title order={3}>{t('sections.legalMentions')}</Title>
          <Text>
            <strong>{t('content.legalMentions.editor')}</strong>
          </Text>
          <Text>{t('content.legalMentions.editorInfo')}</Text>
          <Text>
            <strong>{t('content.legalMentions.publicationDirector')}</strong>
          </Text>
          <Text>{t('content.legalMentions.publicationDirectorInfo')}</Text>
          <Text>
            <strong>{t('content.legalMentions.hosting')}</strong>
          </Text>
          <Text>{t('content.legalMentions.hostingInfo')}</Text>

          <Text>
            <strong>{t('content.legalMentions.tracking')}</strong>
          </Text>
          <Text>{t('content.legalMentions.trackingInfo')}</Text>

          <Title order={3}>{t('sections.platformPurpose')}</Title>
          <Text>{t('content.platformPurpose')}</Text>

          <Title order={3}>{t('sections.access')}</Title>
          <Text>{t('content.access')}</Text>

          <Title order={3}>{t('sections.userAccount')}</Title>
          <Text>{t('content.userAccount')}</Text>

          <Title order={3}>{t('sections.personalData')}</Title>
          <Text>{t('content.personalData')}</Text>

          <Title order={3}>{t('sections.companyRights')}</Title>
          <Text>{t('content.companyRights')}</Text>

          <Title order={3}>{t('sections.responsibilities')}</Title>
          <Text>{t('content.responsibilities')}</Text>

          <Title order={3}>{t('sections.intellectualProperty')}</Title>
          <Text>{t('content.intellectualProperty')}</Text>

          <Title order={3}>{t('sections.modifications')}</Title>
          <Text>{t('content.modifications')}</Text>

          <Title order={3}>{t('sections.applicableLaw')}</Title>
          <Text>{t('content.applicableLaw')}</Text>

          <Text>
            <em>{t('lastUpdate')}</em>
          </Text>
        </Stack>
      </Alert>
    </Flex>
  );
};

export default LegalPage;
