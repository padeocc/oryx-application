import { Badge, MantineGradient, MantineSize } from '@mantine/core';
import { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

const Example = ({
  link,
  Icon,
  text,
  gradient = { from: 'green_oryx.8', to: 'green_oryx.4', deg: 90 },
  fz = 'sm',
  onClick,
  style
}: {
  link: string;
  Icon?: Icon;
  text: string;
  gradient?: MantineGradient;
  fz?: MantineSize;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const isCustomStyle = style && (style.backgroundColor === 'white' || style.border);
  const variant = isCustomStyle ? 'outline' : 'gradient';
  
  const BadgeComponent = (
    <Badge
      radius={'lg'}
      variant={variant}
      gradient={isCustomStyle ? undefined : gradient}
      styles={{
        root: {
          textTransform: 'none',
          cursor: 'pointer',
          ...style
        }
      }}
      fz={fz}
      onClick={onClick}
      p="sm"
      h="auto"
      leftSection={Icon ? <Icon weight="fill" fontSize={'1.4rem'} /> : null}>
      {text}
    </Badge>
  );

  return onClick ? BadgeComponent : <Link href={link}>{BadgeComponent}</Link>;
};

export default Example;
