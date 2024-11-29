import { Theme, themes, themesColors, themesIcons } from '@/config';
import { Alert, Badge, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';

const ThemesBanner = ({
  selectedThemes = [],
  handleClick
}: {
  selectedThemes?: Theme[];
  handleClick: (theme: Theme) => void;
}) => {
  const t = useTranslations('themes');
  return (
    <Alert>
      <Group justify="flex-start">
        {themes.map(theme => {
          const Icon = themesIcons[theme];
          const selected = selectedThemes.length === 0 || selectedThemes.includes(theme);
          return (
            <Badge
              key={`badge-${theme}`}
              radius={'lg'}
              bg={selected ? themesColors[theme] : 'white'}
              c={selected ? 'white' : themesColors[theme]}
              bd={`1px solid ${themesColors[theme]}`}
              styles={{
                root: {
                  textTransform: 'none',
                  cursor: 'pointer'
                }
              }}
              p="sm"
              h="auto"
              leftSection={Icon ? <Icon weight="fill" fontSize={'1.4rem'} /> : null}
              onClick={() => handleClick(theme)}>
              {t(theme)}
            </Badge>
          );
        })}
      </Group>
    </Alert>
  );
};

export default ThemesBanner;
