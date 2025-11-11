'use client';

import { Accordion, Box, Text, Title } from '@mantine/core';
import { useState, useEffect } from 'react';
import { displayContentElementFromBlocks, groupContentBySections } from './utils-ui';

export const ContentAccordion = ({ content }: { content: any[] }) => {
  const sections = groupContentBySections(content);

  // Default open panel: the first one
  const [opened, setOpened] = useState<string[]>(sections.length > 0 ? ['section-0'] : []);

  // Open all panels when printing
  useEffect(() => {
    const handleBeforePrint = () => {
      const allValues = sections.map((_, idx) => `section-${idx}`);
      setOpened(allValues);
    };
    const handleAfterPrint = () => {
      setOpened(sections.length > 0 ? ['section-0'] : []);
    };
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [sections]);

  // If no H2 sections: classic fallback
  if (sections.length === 0 || (sections.length === 1 && !sections[0].title)) {
    return (
      <Box px="lg" py="md">
        {content.map(displayContentElementFromBlocks)}
      </Box>
    );
  }

  // Harmonized style: inner margins and vertical spacing
  return (
    <Accordion
      multiple
      value={opened}
      onChange={setOpened}
      variant="separated"
      radius="md"
      chevronPosition="right"
      styles={{
        panel: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        },
        item: { marginTop: '1.2rem', marginBottom: '1.2rem' }, // Space between accordions
        control: { minHeight: '3.2rem', alignItems: 'center' }, // Accessible click area
      }}
    >
      {sections.map((section, sectionIndex) => {
        if (!section.title) {
          return (
            <Box key={`section-before-${sectionIndex}`} mb="md" px="lg" py="md">
              {section.content.map(displayContentElementFromBlocks)}
            </Box>
          );
        }
        return (
          <Accordion.Item key={`section-${sectionIndex}`} value={`section-${sectionIndex}`}>
            <Accordion.Control>
              <Title order={3}>{section.title}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              {section.content.map(displayContentElementFromBlocks)}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
