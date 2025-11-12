import { Theme, themesIcons } from '@/config';
import { Blockquote, Box, Image, List, ListItem, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

// Typage minimal, toutes props optionnelles
export type BlockNode = {
  type?: string;
  text?: string;
  children?: BlockNode[];
  url?: string;
  bold?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  italic?: boolean;
  image?: {
    url?: string;
    alternativeText?: string;
  };
  format?: string;
  level?: number;
};

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
export const groupContentBySections = (
  content: BlockNode[]
): Array<{ title: string; content: BlockNode[] }> => {
  const sections: Array<{ title: string; content: BlockNode[] }> = [];
  let currentSection: { title: string; content: BlockNode[] } | null = null;

  content.forEach((node) => {
    if (node.type === 'heading' && node.level === 2) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const titleText =
        node.children && node.children.length === 1 && node.children[0].type === 'text'
          ? node.children[0].text || ''
          : (node.children ?? []).map((child) => child.text || '').join('');
      currentSection = {
        title: titleText,
        content: []
      };
    } else if (currentSection) {
      currentSection.content.push(node);
    } else if (sections.length === 0) {
      currentSection = {
        title: '',
        content: [node]
      };
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }
  return sections;
};


const getMainTitleContent = (children: BlockNode[]): React.ReactNode[] => {
  return children
    .map((child: BlockNode, idx: number) => {
      if (child.type === 'text' && child.text && child.text.trim() !== '') {
        return child.text;
      }
      if (child.type === 'link' && Array.isArray(child.children)) {
        const linkText = child.children
          .map((c: BlockNode) => c.text && c.text.trim() !== '' ? c.text : '')
          .filter(Boolean)
          .join(' ');
        return linkText
          ? (
              <Link href={child.url ?? ''} target="_blank" key={`${child.url}-${idx}`}>
                {linkText}
              </Link>
            )
          : null;
      }
      return null;
    })
    .filter((el) => el != null);
};

/**
 * Transforms cms blocks to jsx
 */
export const displayContentElementFromBlocks = (
  node: BlockNode,
  index: number
): React.ReactElement => {
  const { type, children = [] } = node;
  switch (type) {
    case 'heading': {
      let titleContent: React.ReactNode;
      if (
        children.length === 1 &&
        children[0].type === "text" &&
        children[0].text &&
        children[0].text.trim() !== ''
      ) {
        titleContent = children[0].text;
      } else {
        titleContent = getMainTitleContent(children);
      }

      if (
        titleContent === undefined ||
        (typeof titleContent === 'string' && titleContent.trim() === '') ||
        (Array.isArray(titleContent) && titleContent.length === 0)
      ) {
        return <></>;
      }

      const order: 1|2|3|4|5|6 = [1,2,3,4,5,6].includes(node.level as number)
        ? (node.level as 1|2|3|4|5|6)
        : 3;

      return (
        <Title
          key={index}
          order={order}
          fw={order === 1 ? 'bolder' : order === 2 ? 'bold' : order === 3 ? 'bold' : 'normal'}
          fz={order === 1 ? '1.6rem' : order === 2 ? '1.4rem' : order === 3 ? '1.2rem' : '1rem'}
        >
          {Array.isArray(titleContent)
            ? titleContent.map((frag, i) => <React.Fragment key={i}>{frag} </React.Fragment>)
            : titleContent}
        </Title>
      );
    }
    case 'paragraph':
      return (
        <Box key={index}>
          <Text>{children.map((c, i) => displayContentElementFromBlocks(c, i))}</Text>
        </Box>
      );
    case 'text': {
      let props: Record<string, any> = {};
      if (node.bold) props = { ...props, fw: 'bold' };
      if (node.strikethrough) props = { ...props, td: 'line-through' };
      if (node.underline) props = { ...props, td: 'underline' };
      if (node.italic) props = { ...props, fs: 'italic' };
      return (
        <Text key={index} component="span" {...props}>
          {node.text || ''}
        </Text>
      );
    }
    case 'link':
      return (
        <Link href={`${node.url ?? ''}`} target="_blank" key={index}>
          {children.map((c, i) => displayContentElementFromBlocks(c, i))}
        </Link>
      );
    case 'image':
      return (
        <Image style={{ maxWidth: '100%' }} src={node.image?.url || ''} alt={node.image?.alternativeText || ''} key={index} />
      );
    case 'list': {
      const listTag = node.format === 'unordered' ? 'ul' : 'ol';
      return <List c={listTag} key={index}>{children.map((c, i) => displayContentElementFromBlocks(c, i))}</List>;
    }
    case 'list-item':
      return <ListItem key={index}>{children.map((c, i) => displayContentElementFromBlocks(c, i))}</ListItem>;
    case 'quote':
      return (
        <>
          <Space h="md" />
          <Blockquote>{children.map((c, i) => displayContentElementFromBlocks(c, i))}</Blockquote>
        </>
      );
    default:
      return <Space h="md" key={index} />;
  }
};
