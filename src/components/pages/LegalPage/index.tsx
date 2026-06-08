import { Alert, Flex, Stack, Text, Title } from '@mantine/core';
import messages from '../../../../i18n/messages/fr.json';

const legal = messages.legal;

const LegalPage = async () => {
  return (
    <Flex justify={'center'} pb="14rem">
      <Alert maw="800px">
        <Stack gap={'md'} justify="center">
          <Title order={2}>{legal.title}</Title>

          <Title order={3}>{legal.sections.preamble}</Title>
          <Text>{legal.content.preamble}</Text>

          <Title order={3}>{legal.sections.legalMentions}</Title>
          <Text><strong>{legal.content.legalMentions.editor}</strong></Text>
          <Text>{legal.content.legalMentions.editorInfo}</Text>
          <Text><strong>{legal.content.legalMentions.publicationDirector}</strong></Text>
          <Text>{legal.content.legalMentions.publicationDirectorInfo}</Text>
          <Text><strong>{legal.content.legalMentions.hosting}</strong></Text>
          <Text>{legal.content.legalMentions.hostingInfo}</Text>
          <Text><strong>{legal.content.legalMentions.tracking}</strong></Text>
          <Text>{legal.content.legalMentions.trackingInfo}</Text>

          <Title order={3}>{legal.sections.platformPurpose}</Title>
          <Text>{legal.content.platformPurpose}</Text>

          <Title order={3}>{legal.sections.access}</Title>
          <Text>{legal.content.access}</Text>

          <Title order={3}>{legal.sections.userAccount}</Title>
          <Text>{legal.content.userAccount}</Text>

          <Title order={3}>{legal.sections.personalData}</Title>
          <Text>{legal.content.personalData}</Text>

          <Title order={3}>{legal.sections.companyRights}</Title>
          <Text>{legal.content.companyRights}</Text>

          <Title order={3}>{legal.sections.responsibilities}</Title>
          <Text>{legal.content.responsibilities}</Text>

          <Title order={3}>{legal.sections.intellectualProperty}</Title>
          <Text>{legal.content.intellectualProperty}</Text>

          <Title order={3}>{legal.sections.modifications}</Title>
          <Text>{legal.content.modifications}</Text>

          <Title order={3}>{legal.sections.applicableLaw}</Title>
          <Text>{legal.content.applicableLaw}</Text>

          <Text><em>{legal.lastUpdate}</em></Text>
        </Stack>
      </Alert>
    </Flex>
  );
};

export default LegalPage;
