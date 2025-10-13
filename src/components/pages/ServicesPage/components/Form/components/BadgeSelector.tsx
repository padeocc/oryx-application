import { Badge, DefaultMantineColor, StyleProp } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';

const BadgeSelector = ({
  label,
  selected,
  Icon,
  handleClick,
  bg,
  bd,
  c,
  isLoading
}: {
  label: string;
  selected: boolean;
  Icon: Icon;
  handleClick: (value: boolean) => void;
  bg?: StyleProp<DefaultMantineColor>;
  bd?: string;
  c?: StyleProp<DefaultMantineColor>;
  isLoading?: boolean;
}) => {
  return isLoading ? null : (
    <Badge
      key={`badge-${label}`}
      radius={'lg'}
      bg={bg}
      c={c}
      bd={bd}
      styles={{
        root: {
          textTransform: 'none',
          cursor: 'pointer'
        }
      }}
      p="sm"
      h="auto"
      leftSection={Icon ? <Icon weight="fill" fontSize={'1.4rem'} /> : null}
      onClick={() => handleClick(!selected)}>
      {label}
    </Badge>
  );
};

export default BadgeSelector;
