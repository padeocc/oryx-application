import { Theme, themes, themesColors, themesIcons } from '@/config';
import { Group } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import Example from './Example';

const ThemesBanner = async ({ theme }: { theme?: Theme }) => {
  const t = await getTranslations('themes');
  return (
    <Group justify="flex-start">
      {themes.map(theme => {
        return (
          <div key={`theme-banner-${theme}`}>
            <Example
              link={`/services?filters={"theme":["${theme}"]}`}
              Icon={themesIcons[theme]}
              text={t(theme)}
              gradient={{ from: themesColors[theme], to: themesColors[theme], deg: 90 }}
            />
          </div>
        );
      })}
    </Group>
  );
};

export default ThemesBanner;
