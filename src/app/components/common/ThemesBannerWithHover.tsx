'use client';

import { Theme, themes, themesColors, themesIcons } from '@/config';
import { Alert, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Example from './Example';
import { CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import data from '../pages/ServiceAdditionPage/data.json';

interface ThemesBannerProps {
  onThemeClick?: (theme: Theme) => void;
  onEconomicClick?: () => void;
  disableHover?: boolean;
  baseUrl?: string;
  selectedThemes?: Theme[];
  isEconomicSelected?: boolean;
  showSelectionState?: boolean; 
}

const ThemesBannerWithHover = ({ 
  onThemeClick, 
  onEconomicClick, 
  disableHover = false, 
  baseUrl = '/services',
  selectedThemes = [],
  isEconomicSelected = false,
  showSelectionState = false
}: ThemesBannerProps = {}) => {
  const t = useTranslations('themes');
  const tServices = useTranslations('services');
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getCategories = (theme: Theme) => Object.keys(data[theme] || {});
  
  const handleMouseEnter = (theme: Theme) => {
    const element = buttonRefs.current[theme];
    if (element) {
      const rect = element.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setHoveredTheme(theme);
  };

  const renderButton = (type: 'theme' | 'economic', theme?: Theme, isMobile = false) => {
    const isTheme = type === 'theme';
    const key = isTheme ? theme : 'economic';
    const isSelected = showSelectionState && (isTheme ? selectedThemes.includes(theme!) : isEconomicSelected);
    const color = isTheme ? themesColors[theme!] : 'orange';
    const Icon = isTheme ? themesIcons[theme!] : CurrencyEur;
    const text = isTheme ? t(theme!) : tServices('action-economic-label');
    const onClick = isTheme ? (onThemeClick ? () => onThemeClick(theme!) : undefined) : onEconomicClick;
    
    const gradient = isSelected ? 
      { from: color, to: color, deg: 90 } : 
      showSelectionState ? 
        { from: 'white', to: 'white', deg: 90 } : 
        { from: color, to: color, deg: 90 };
    
    const style = isSelected ? {} : showSelectionState ? { 
      border: `1px solid ${color}`,
      color,
      backgroundColor: 'white'
    } : {};
    
    return (
      <div
        key={`${key}-${isMobile ? 'mobile' : 'desktop'}`}
        ref={!isMobile && !disableHover && isTheme ? (el) => { buttonRefs.current[theme!] = el; } : undefined}
        onMouseEnter={!isMobile && !disableHover && isTheme ? () => handleMouseEnter(theme!) : undefined}
        onMouseLeave={!isMobile && !disableHover && isTheme ? () => setHoveredTheme(null) : undefined}
        style={{ position: 'relative', ...(isMobile && { flexShrink: 0 }) }}
      >
        <Example
          link={onClick ? '#' : `${baseUrl}?filters={${isTheme ? `"theme":["${theme}"]` : `"economic": true`}}`}
          Icon={Icon}
          text={text}
          gradient={gradient}
          fz="xs"
          onClick={onClick}
          style={style}
        />
      </div>
    );
  };

  return (
    <Alert>
      <div style={{ position: 'relative' }}>
        {/* Desktop */}
        <Group justify="flex-start" visibleFrom="md" style={{ overflow: 'visible' }}>
          {themes.map(theme => renderButton('theme', theme))}
          {renderButton('economic')}
        </Group>

        {/* Mobile */}
        <Box 
          hiddenFrom="md"
          style={{ 
            width: '70%', overflowX: 'auto', overflowY: 'hidden', 
            WebkitOverflowScrolling: 'touch', padding: '8px 0',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}
          sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          <div style={{ display: 'flex', gap: '12px', width: 'max-content', minWidth: '195%' }}>
            {themes.map(theme => renderButton('theme', theme, true))}
            {renderButton('economic', undefined, true)}
          </div>
        </Box>
      </div>
      
      {/* Dropdown */}
      {!disableHover && hoveredTheme && (
        <Paper
          shadow="lg" radius="md" p="md"
          style={{
            position: 'fixed', top: menuPosition.top, left: menuPosition.left,
            zIndex: 9999, minWidth: '300px', maxWidth: '500px',
            backgroundColor: 'white', border: '1px solid #e9ecef'
          }}
          onMouseEnter={() => setHoveredTheme(hoveredTheme)}
          onMouseLeave={() => setHoveredTheme(null)}
        >
          <Stack gap="xs">
            {getCategories(hoveredTheme).map(category => (
              <Link key={category} href={`/services?filters={"theme":["${hoveredTheme}"], "query": "${category}"}`} style={{ textDecoration: 'none' }}>
                <Text
                  size="sm" c="gray.7"
                  style={{ cursor: 'pointer', padding: '8px 12px', borderRadius: '4px', transition: 'background-color 0.2s', display: 'block' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {category}
                </Text>
              </Link>
            ))}
          </Stack>
        </Paper>
      )}
    </Alert>
  );
};

export default ThemesBannerWithHover;
