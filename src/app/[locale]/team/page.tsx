import { Stack, Title } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <Title order={2}>
        Pour un <strong>Avenir Durable</strong> En Occitanie
      </Title>
      <Stack gap={'xl'}>
        <p>
          <strong>PADEO</strong> a pour raison d&lsquo;être de contribuer à la concrétisation de la Transition
          Écologique en intégrant la diversité de nos territoires et en facilitant la vie de celles et ceux qui ont
          décidé d&lsquo;agir pour
          <strong> respecter les 17 objectifs de développement durable de l&lsquo;ONU</strong>
        </p>
        <Stack gap={'md'}>
          <a
            href="https://www.linkedin.com/company/pour-un-avenir-durable-en-occitanie/about/"
            target="_blank"
            rel="noopener">
            Suivez-nous sur Linkedin
          </a>
          <a
            href="https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie"
            target="_blank"
            rel="noopener">
            Suivez-nous sur Helloasso
          </a>
        </Stack>
      </Stack>
    </main>
  );
}
