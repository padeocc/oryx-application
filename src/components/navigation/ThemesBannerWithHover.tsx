'use client';

import { Theme, themes, themesColors, themesIcons } from '@/config';
import { Box, Group, Paper, Stack, Text, Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Example from '../common/Example';
import { CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import data from './themes-categories.json';
import styles from './themes-banner.module.css';
import { Filters } from '@/types';
import { cleanFiltersValues } from '../content/utils';

const ALL_ACTION_FILTERS = {
  organic: false,
  local: false,
  season: false,
  shortcircuit: false,
  wastereducer: false,
  foodwastereducer: false,
  cookmore: false,
  used: false,
  rent: false,
  mutualise: false,
  repair: false,
  ecobuilt: false,
  lowtech: false,
  recycled: false,
  reused: false,
  diy: false,
  comparer: false,
  relocating: false
};

interface ThemesBannerProps {
  onThemeClick?: (theme: Theme) => void;
  onEconomicClick?: () => void;
  disableHover?: boolean;
  baseUrl?: string;
  selectedThemes?: Theme[];
  isEconomicSelected?: boolean;
  showSelectionState?: boolean;
  currentFilters?: Filters;
}

const ThemesBannerWithHover = ({ 
  onThemeClick, 
  onEconomicClick, 
  disableHover = false, 
  baseUrl = '/services',
  selectedThemes = [],
  isEconomicSelected = false,
  showSelectionState = false,
  currentFilters
}: ThemesBannerProps = {}) => {
  const t = useTranslations('themes');
  const tServices = useTranslations('services');
  const tCommon = useTranslations('common');
  
  const getThemeLink = (theme: Theme) => {
    if (!currentFilters) {
      return `${baseUrl}?filters=${cleanFiltersValues({ theme: [theme] })}`;
    }
    const currentThemes = currentFilters.theme || [];
    const newThemes = currentThemes.includes(theme)
      ? currentThemes.filter(t => t !== theme)
      : [...currentThemes, theme];

    const updatedFilters = { 
      ...currentFilters, 
      ...ALL_ACTION_FILTERS,
      theme: newThemes,
      economic: false
    };
    return `${baseUrl}?filters=${cleanFiltersValues(updatedFilters)}`;
  };
  
  const getEconomicLink = () => {
    if (!currentFilters) {
      return `${baseUrl}?filters=${cleanFiltersValues({ economic: true })}`;
    }
    const updatedFilters = { 
      ...currentFilters, 
      ...ALL_ACTION_FILTERS,
      economic: !currentFilters.economic
    };
    return `${baseUrl}?filters=${cleanFiltersValues(updatedFilters)}`;
  };
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileModalOpen, setMobileModalOpen] = useState<Theme | null>(null);
  const [mobileSelectedCategory, setMobileSelectedCategory] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getCategories = (theme: Theme) => Object.keys(data[theme] || {});
  
  const getSubCategories = (theme: Theme, category: string): string[] => {
    const themeData: any = data[theme] || {};
    const subCats = themeData[category];
    return Array.isArray(subCats) ? subCats : [];
  };
  
  const handleMouseEnter = (theme: Theme) => {
    const element = buttonRefs.current[theme];
    if (element) {
      const rect = element.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom, left: rect.left });
    }
    setHoveredTheme(theme);
    setHoveredCategory(null);
  };

  const handleMobileClick = (theme: Theme) => {
    setMobileModalOpen(theme);
    setMobileSelectedCategory(null);
  };

  const renderButton = (type: 'theme' | 'economic', theme?: Theme, isMobile = false) => {
    const isTheme = type === 'theme';
    const key = isTheme ? theme : 'economic';
    const isSelected = showSelectionState && (isTheme ? selectedThemes.includes(theme!) : isEconomicSelected);
    const color = isTheme ? 'green_oryx.7' : 'orange';
    const Icon = isTheme ? themesIcons[theme!] : CurrencyEur;
    const text = isTheme ? t(theme!) : tServices('action-economic-label');
    const onClick = isTheme ? (onThemeClick ? () => onThemeClick(theme!) : undefined) : onEconomicClick;
    
    const gradient = isSelected ? 
      { from: color, to: color, deg: 90 } : 
      showSelectionState ? 
        { from: 'white', to: 'white', deg: 90 } : 
        { from: color, to: color, deg: 90 };
    
    const style = isSelected ? {} : showSelectionState ? { 
      border: '1px solid var(--mantine-color-green_oryx-7)',
      color: 'var(--mantine-color-green_oryx-7)',
      backgroundColor: 'white'
    } : {};
    
    const handleClick = () => {
      if (onClick) onClick();
      else if (isMobile && isTheme && !disableHover) handleMobileClick(theme!);
    };
    
    const link = onClick && isTheme 
      ? '#' 
      : isTheme 
        ? getThemeLink(theme!) 
        : getEconomicLink();
    
    const effectiveOnClick = !isTheme ? undefined : handleClick;

    return (
      <div
        key={`${key}-${isMobile ? 'mobile' : 'desktop'}`}
        ref={!isMobile && !disableHover && isTheme ? (el) => { buttonRefs.current[theme!] = el; } : undefined}
        onMouseEnter={!isMobile && !disableHover && isTheme ? () => handleMouseEnter(theme!) : undefined}
        onMouseLeave={!isMobile && !disableHover && isTheme ? () => setHoveredTheme(null) : undefined}
        style={{ position: 'relative', ...(isMobile && { flexShrink: 0 }) }}
      >
        <Example
          link={link}
          Icon={Icon}
          text={text}
          gradient={gradient}
          fz="xs"
          onClick={effectiveOnClick}
          style={style}
        />
      </div>
    );
  };

  return (
    <Box
      style={{
        backgroundColor: 'var(--mantine-primary-color-1)',
        width: '100%'
      }}
    >
      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '8px 1px' }}>
        <Group justify="flex-start" visibleFrom="md" style={{ overflow: 'visible' }}>
          {themes.map(theme => renderButton('theme', theme))}
          {renderButton('economic')}
        </Group>

        <Box 
          hiddenFrom="md"
          className={styles.mobileScroll}
          style={{ 
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <Group gap="xs" wrap="nowrap" style={{ flexWrap: 'nowrap', minWidth: 'min-content' }}>
            {themes.map(theme => renderButton('theme', theme, true))}
            {renderButton('economic', undefined, true)}
          </Group>
        </Box>
      </div>
      
      {!disableHover && hoveredTheme && (
        <div
          className={styles.desktopDropdown}
          style={{
            top: menuPosition.top,
            left: menuPosition.left
          }}
          onMouseEnter={() => setHoveredTheme(hoveredTheme)}
          onMouseLeave={() => {
            setHoveredTheme(null);
            setHoveredCategory(null);
          }}
        >
          <div className={styles.dropdownContent}>
            <div className={`${styles.dropdownGrid} ${hoveredCategory ? styles.dropdownGridWithSub : styles.dropdownGridNoSub}`}>
              <Stack gap={4}>
                <Link 
                  href={`/services?filters=${cleanFiltersValues({ theme: [hoveredTheme] })}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className={styles.categoryItem}
                    onMouseEnter={() => setHoveredCategory(null)}
                  >
                    <Text
                      size="sm"
                      fw={600}
                      c="green_oryx.7"
                      className={styles.comfortaaFont}
                    >
                      {tCommon('see_more_theme')}
                    </Text>
                  </div>
                </Link>
                <Divider my={4} />
                {getCategories(hoveredTheme).map(category => {
                  const subCategories = getSubCategories(hoveredTheme, category);
                  const hasSubCategories = subCategories.length > 0;
                  const isHovered = hoveredCategory === category;
                  
                  return (
                    <Link 
                      key={category}
                      href={`/services?filters=${cleanFiltersValues({ theme: [hoveredTheme], query: category })}`} 
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className={styles.categoryItem}
                        onMouseEnter={() => setHoveredCategory(category)}
                      >
                        <Text
                          size="sm"
                          fw={isHovered ? 600 : 500}
                          c={isHovered ? 'green_oryx.7' : 'gray.8'}
                          className={styles.comfortaaFont}
                        >
                          {category}
                        </Text>
                        {hasSubCategories && (
                          <div className={styles.categoryArrow}>
                            <Text c={isHovered ? 'white' : 'green_oryx.7'} size="xs" fw={700}>›</Text>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </Stack>

              {hoveredCategory && getSubCategories(hoveredTheme, hoveredCategory).length > 0 && (
                <div className={styles.subCategoriesGrid}>
                  {getSubCategories(hoveredTheme, hoveredCategory).map((subCat: string) => (
                    <Link 
                      key={subCat}
                      href={`/services?filters=${cleanFiltersValues({ theme: [hoveredTheme], query: subCat })}`} 
                      style={{ textDecoration: 'none' }}
                    >
                      <div className={styles.subCategoryItem}>
                        <Text
                          size="xs"
                          c="gray.7"
                          className={styles.comfortaaFont}
                        >
                          {subCat}
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mobileModalOpen && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={() => {
              setMobileModalOpen(null);
              setMobileSelectedCategory(null);
            }}
          />
          <div
            className={`${styles.mobileModal} ${mobileSelectedCategory ? styles.mobileModalSlideRight : styles.mobileModalSlideUp}`}
          >
            <div className={styles.mobileModalContent}>
              <div className={styles.mobileHeader}>
                <div className={styles.mobileHeaderLeft}>
                  {mobileSelectedCategory && (
                    <div
                      onClick={() => setMobileSelectedCategory(null)}
                      className={styles.mobileBackButton}
                    >
                      <Text size="xl" c="gray.7">‹</Text>
                    </div>
                  )}
                  <div className={styles.mobileHeaderTitle}>
                    <Text size="lg" fw={700} c="green_oryx.7" className={styles.comfortaaFont}>
                      {t(mobileModalOpen)}
                    </Text>
                    {mobileSelectedCategory && (
                      <Text size="xs" c="gray.6" className={styles.comfortaaFont}>
                        {mobileSelectedCategory}
                      </Text>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => {
                    setMobileModalOpen(null);
                    setMobileSelectedCategory(null);
                  }}
                  className={styles.mobileCloseButton}
                >
                  <Text size="xl" c="gray.7">×</Text>
                </div>
              </div>

              <Stack gap={12}>
                {mobileSelectedCategory ? (
                  getSubCategories(mobileModalOpen, mobileSelectedCategory).map((subCat: string) => (
                    <Link 
                      key={subCat}
                      href={`/services?filters=${cleanFiltersValues({ theme: [mobileModalOpen], query: subCat })}`} 
                      style={{ textDecoration: 'none' }}
                      onClick={() => {
                        setMobileModalOpen(null);
                        setMobileSelectedCategory(null);
                      }}
                    >
                      <div
                        className={styles.mobileCategoryItem}
                        onTouchStart={(e) => {
                          e.currentTarget.style.backgroundColor = '#E1F3F3';
                          e.currentTarget.style.borderColor = '#3498A2';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#E1F3F3';
                        }}
                      >
                        <Text
                          size="sm"
                          fw={600}
                          c="gray.8"
                          className={styles.comfortaaFont}
                        >
                          {subCat}
                        </Text>
                      </div>
                    </Link>
                  ))
                ) : (
                  <>
                    <Link 
                      href={`/services?filters=${cleanFiltersValues({ theme: [mobileModalOpen] })}`} 
                      style={{ textDecoration: 'none' }}
                      onClick={() => {
                        setMobileModalOpen(null);
                        setMobileSelectedCategory(null);
                      }}
                    >
                      <div
                        className={styles.mobileCategoryItem}
                        onTouchStart={(e) => {
                          e.currentTarget.style.backgroundColor = '#E1F3F3';
                          e.currentTarget.style.borderColor = '#3498A2';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#E1F3F3';
                        }}
                      >
                        <Text
                          size="sm"
                          fw={700}
                          c="green_oryx.7"
                          className={styles.comfortaaFont}
                        >
                          {tCommon('see_more_theme')}
                        </Text>
                      </div>
                    </Link>
                    <Divider my={4} />
                    {getCategories(mobileModalOpen).map(category => {
                    const hasSubCategories = getSubCategories(mobileModalOpen, category).length > 0;
                    
                    return hasSubCategories ? (
                      <div
                        key={category}
                        onClick={() => setMobileSelectedCategory(category)}
                        className={styles.mobileCategoryItem}
                        onTouchStart={(e) => {
                          e.currentTarget.style.backgroundColor = '#E1F3F3';
                          e.currentTarget.style.borderColor = '#3498A2';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#E1F3F3';
                        }}
                      >
                        <Text
                          size="sm"
                          fw={600}
                          c="gray.8"
                          className={styles.comfortaaFont}
                        >
                          {category}
                        </Text>
                        <div className={styles.mobileCategoryArrow}>
                          <Text c="green_oryx.7" size="lg" fw={700}>›</Text>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        key={category}
                        href={`/services?filters=${cleanFiltersValues({ theme: [mobileModalOpen], query: category })}`} 
                        style={{ textDecoration: 'none' }}
                        onClick={() => {
                          setMobileModalOpen(null);
                          setMobileSelectedCategory(null);
                        }}
                      >
                        <div
                          className={styles.mobileCategoryItem}
                          onTouchStart={(e) => {
                            e.currentTarget.style.backgroundColor = '#E1F3F3';
                            e.currentTarget.style.borderColor = '#3498A2';
                          }}
                          onTouchEnd={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#E1F3F3';
                          }}
                        >
                          <Text
                            size="sm"
                            fw={600}
                            c="gray.8"
                            className={styles.comfortaaFont}
                          >
                            {category}
                          </Text>
                        </div>
                      </Link>
                    );
                  })}
                  </>
                )}
              </Stack>
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default ThemesBannerWithHover;
