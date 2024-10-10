'use client';

import '@mantine/spotlight/styles.css';

import { IResults } from '@/algolia/types';
import { Image, Loader } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const QuickSearch = ({ onSearch }: { onSearch: ({ query }: { query: string }) => any }) => {
  const t = useTranslations('filters_component');
  const [results, setResults] = useState<IResults[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm) {
      setIsSearching(false);
      setResults([]);
    } else {
      const handler = setTimeout(() => {
        setDebouncedTerm(searchTerm);
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchTerm]);

  useEffect(() => {
    const performSearch = async (query: string) => {
      try {
        const results = await onSearch({ query });
        setResults(results);
      } catch (error) {}
      setIsSearching(false);
    };

    if (debouncedTerm) {
      performSearch(debouncedTerm);
    } else {
      setIsSearching(false);
    }
  }, [debouncedTerm, onSearch]);

  const actions: SpotlightActionData[] = results.map(result => {
    return {
      id: result.id,
      label: result.label,
      description: `${result.description.slice(0, 200)}...`,
      leftSection: result.logo ? <Image src={result.logo} w={30} height={30} alt="" /> : null,
      onClick: () => {
        router.push(result.url);
      }
    };
  });

  return (
    <>
      <MagnifyingGlass size={36} weight="light" onClick={spotlight.open} style={{ cursor: 'pointer' }} />
      <Spotlight
        scrollable
        size={'xl'}
        actions={isSearching ? actions : actions}
        nothingFound={isSearching ? <Loader /> : t('quicksearch-no-results')}
        onQueryChange={async query => {
          setIsSearching(true);
          setSearchTerm(query);
        }}
        searchProps={{
          leftSection: <MagnifyingGlass />,
          placeholder: t('quicksearch-placeholder')
        }}
      />
    </>
  );
};

export default QuickSearch;
