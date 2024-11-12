import { Theme, themesColors, themesIcons } from '@/config';
import { Alert, Container, SimpleGrid, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getIconFromTheme } from '../content/utils-ui';

const ThemesBanner = ({ selectedTheme, coloredByDefault }: { selectedTheme?: Theme; coloredByDefault?: boolean }) => {
  const tTheme = useTranslations('themes');

  const themesOptions = Object.keys(themesIcons).map(parsedTheme => {
    const color = themesColors[parsedTheme];
    const actualColor = coloredByDefault || selectedTheme === parsedTheme ? color : 'dark';

    return (
      <Link
        href={`/actions/${parsedTheme}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
        key={`select-theme-${parsedTheme}`}>
        <Stack align="center" gap={'xs'}>
          <Container c={actualColor}>
            {getIconFromTheme({
              theme: parsedTheme as Theme,
              selected: selectedTheme === parsedTheme || coloredByDefault
            })}
          </Container>
          <Text fz="xs" ta="center" c={actualColor} visibleFrom="sm">
            {tTheme(parsedTheme)}
          </Text>
        </Stack>
      </Link>
    );
  });

  return (
    <Alert>
      <SimpleGrid cols={{ base: 7, sm: 7, md: 7, lg: 9 }}>{themesOptions}</SimpleGrid>
    </Alert>
  );
};

export default ThemesBanner;
