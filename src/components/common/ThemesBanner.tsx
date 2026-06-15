import { Theme, themes, themesColors, themesIcons } from '@/config';
import { Group } from '@mantine/core';
import Example from './Example';
import messages from '../../../i18n/messages/fr.json';

const themesLabels = messages.themes as Record<string, string>;

const ThemesBanner = async ({ theme }: { theme?: Theme }) => {
  return (
    <Group justify="flex-start">
      {themes.map(theme => {
        return (
          <div key={`theme-banner-${theme}`}>
            <Example
              link={`/services?filters={"theme":["${theme}"]}`}
              Icon={themesIcons[theme]}
              text={themesLabels[theme] || theme}
              gradient={{ from: themesColors[theme], to: themesColors[theme], deg: 90 }}
            />
          </div>
        );
      })}
    </Group>
  );
};

export default ThemesBanner;
