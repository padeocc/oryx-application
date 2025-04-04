import { Theme, themesIcons } from '@/config';
import { Blockquote, Box, Image, List, ListItem, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';

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
  const Icon = themesIcons?.[theme];

  if (!Icon) {
    return undefined;
  }

  return (
    <Text c={color}>
      <Icon size={size} style={{ cursor: 'pointer' }} weight={selected ? 'fill' : 'regular'} />
    </Text>
  );
};

/**
 * Transforms cms blocks to jsx
 */
export const displayContentElementFromBlocs = (node: any, index: number): React.ReactElement | undefined => {
  const { type, children } = node;
  switch (type) {
    case 'heading':
      return (
        <Title
          key={index}
          order={node.level}
          fw={node.level === 1 ? 'bolder' : node.level === 2 ? 'bold' : node.level === 3 ? 'bold' : 'normal'}
          fz={node.level === 1 ? '1.6rem' : node.level === 2 ? '1.4rem' : node.level === 3 ? '1.2rem' : '1rem'}>
          {children.map(displayContentElementFromBlocs)}
        </Title>
      );
    case 'paragraph':
      return (
        <Box key={index}>
          <Text>{children.map(displayContentElementFromBlocs)}</Text>
        </Box>
      );
    case 'text':
      let props = {};

      if (node.bold) {
        props = { ...props, fw: 'bold' };
      }

      if (node.strikethrough) {
        props = { ...props, td: 'line-through' };
      }

      if (node.underline) {
        props = { ...props, td: 'underline' };
      }

      if (node.italic) {
        props = { ...props, fs: 'italic' };
      }

      return (
        <Text key={index} component="span" {...props}>
          {node.text}
        </Text>
      );
    case 'link':
      return (
        <Link href={`${node.url}`} target="_blank" key={index}>
          {children.map(displayContentElementFromBlocs)}
        </Link>
      );
    case 'image':
      return <Image style={{ maxWidth: '100%' }} src={node.image.url} alt={node.image.alternativeText || ''} key={index} />;
    case 'list':
      const listTag = node.format === 'unordered' ? 'ul' : 'ol';
      return <List c={listTag}>{node.children.map(displayContentElementFromBlocs)}</List>;
    case 'list-item':
      return <ListItem>{node.children.map(displayContentElementFromBlocs)}</ListItem>;
    case 'quote':
      return (
        <>
          <Space h="md" />
          <Blockquote>{children.map(displayContentElementFromBlocs)}</Blockquote>
        </>
      );
    default:
      return <Space h="md" />;
  }
};