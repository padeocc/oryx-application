import { Theme, themesIcons } from '@/config';
import { Text } from '@mantine/core';
import { PottedPlant } from '@phosphor-icons/react/dist/ssr';

export const getIconFromTheme = ({
  theme,
  selected = false,
  size = 30,
  color = undefined
}: {
  theme: Theme;
  selected?: boolean;
  size?: number;
  color?: string;
}) => {
  const Icon = themesIcons?.[theme] || PottedPlant;
  return (
    <Text c={color}>
      <Icon size={size} style={{ cursor: 'pointer' }} weight={selected ? 'fill' : 'regular'} />
    </Text>
  );
};
