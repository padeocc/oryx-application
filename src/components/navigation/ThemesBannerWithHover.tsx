'use client';

import { Theme, themes, themesIcons } from '@/config';
import { Box, Group, Stack, Text, Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Example from '../common/Example';
import { CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import data from './themes-categories.json';
import styles from './themes-banner.module.css';
import { Filters } from '@/types';
import { cleanFiltersValues, sortAlphabetically } from '../content/utils';

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

  const getCategories = (theme: Theme) => {
    const categories = Object.keys(data[theme] || {});
    return categories.sort(sortAlphabetically);
  };
  
  const getSubCategories = (theme: Theme, category: string): string[] => {
    const themeData: any = data[theme] || {};
    const subCats = themeData[category];
    return Array.isArray(subCats) 
      ? subCats.sort(sortAlphabetically)
      : [];
  };

  const hasCategoriesWithSubCategories = (theme: Theme): boolean => {
    const categories = getCategories(theme);
    return categories.some(category => {
      const subCats = getSubCategories(theme, category);
      return subCats.length > 0;
    });
  };
  
  const calculateDropdownPosition = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const padding = 16;
    let left = rect.left;
    
    if (left < padding) {
      left = padding;
    }
    
    return { top: rect.bottom, left };
  };

  const handleMouseEnter = (theme: Theme) => {
    const element = buttonRefs.current[theme];
    if (element) {
      const position = calculateDropdownPosition(element);
      setMenuPosition(position);
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
          {themes.sort((a, b) => sortAlphabetically(t(a), t(b))).map(theme => renderButton('theme', theme))}
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
            {themes.sort((a, b) => sortAlphabetically(t(a), t(b))).map(theme => renderButton('theme', theme, true))}
            {renderButton('economic', undefined, true)}
          </Group>
        </Box>
      </div>
      
      {!disableHover && hoveredTheme && getCategories(hoveredTheme).length > 0 && (
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
            <div className={`${styles.dropdownGrid} ${hoveredCategory && getSubCategories(hoveredTheme, hoveredCategory).length > 0 ? styles.dropdownGridWithSub : styles.dropdownGridNoSub}`}>
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
                    <div key={category}>
                      <Link 
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
                      {isHovered && subCategories.length > 0 && (
                        <div className={styles.subCategoriesBelow}>
                          {subCategories.map((subCat: string) => (
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
                  <>
                    <Link 
                      href={`/services?filters=${cleanFiltersValues({ theme: [mobileModalOpen], query: mobileSelectedCategory })}`} 
                      style={{ textDecoration: 'none' }}
                      onClick={() => {
                        setMobileModalOpen(null);
                        setMobileSelectedCategory(null);
                      }}
                    >
                      <div
                        className={styles.mobileCategoryItem}
                        onTouchStart={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--mantine-color-green_oryx-1)';
                          e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-7)';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-1)';
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
                    {getSubCategories(mobileModalOpen, mobileSelectedCategory).map((subCat: string) => (
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
                            e.currentTarget.style.backgroundColor = 'var(--mantine-color-green_oryx-1)';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-7)';
                          }}
                          onTouchEnd={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-1)';
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
                    ))}
                  </>
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
                          e.currentTarget.style.backgroundColor = 'var(--mantine-color-green_oryx-1)';
                          e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-7)';
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-1)';
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
                    const categoryUrl = `/services?filters=${cleanFiltersValues({ theme: [mobileModalOpen], query: category })}`;
                    
                    return hasSubCategories ? (
                      <div
                        key={category}
                        className={styles.mobileCategoryItem}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <div
                          style={{ flex: 1 }}
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
                        <div
                          className={styles.mobileCategoryArrow}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMobileSelectedCategory(category);
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            e.currentTarget.style.backgroundColor = 'var(--mantine-color-green_oryx-1)';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-7)';
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-1)';
                          }}
                          style={{ cursor: 'pointer', padding: '8px', marginLeft: '8px' }}
                        >
                          <Text c="green_oryx.7" size="lg" fw={700}>›</Text>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        key={category}
                        href={categoryUrl}
                        style={{ textDecoration: 'none' }}
                        onClick={() => {
                          setMobileModalOpen(null);
                          setMobileSelectedCategory(null);
                        }}
                      >
                        <div
                          className={styles.mobileCategoryItem}
                          onTouchStart={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--mantine-color-green_oryx-1)';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-7)';
                          }}
                          onTouchEnd={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-green_oryx-1)';
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
