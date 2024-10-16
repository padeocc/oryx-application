'use client';

import '@mantine/spotlight/styles.css';

import { IResults } from '@/algolia/types';
import { Button, Image, Loader, Stack, Text } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Modal = ({
  onSearch,
  results,
  setResults,
  label
}: {
  onSearch: ({ query }: { query: string }) => any;
  results: IResults[];
  setResults: Dispatch<SetStateAction<IResults[]>>;
  label: string;
}) => {
  const t = useTranslations('filters_component');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      const termIsNotEmpty = !!searchTerm;
      setIsSearching(termIsNotEmpty);
      setDebouncedTerm(searchTerm);
    }, 500);

    if (!searchTerm) {
      setResults([]);
      setIsSearching(false);
    }
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const performSearch = async (query: string) => {
      try {
        setResults(await onSearch({ query }));
      } catch (error) {
        setResults([]);
      }
      setIsSearching(false);
    };

    if (debouncedTerm) {
      performSearch(debouncedTerm);
    } else {
      setIsSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);

  const actions: SpotlightActionData[] = results.map(result => {
    return {
      id: result.id,
      label: result.label,
      description: `${result.description.slice(0, 200)}...`,
      leftSection: result.logo ? <Image src={result.logo} w={30} height={30} alt="" /> : null,
      onClick: () => router.push(result.url),
      keywords: [debouncedTerm]
    };
  });

  return (
    <>
      <Button leftSection={<MagnifyingGlass size={14} weight="light" />} onClick={spotlight.open}>
        {label}
      </Button>
      <Spotlight
        styles={{
          actionsList: {
            filter: isSearching ? 'blur(3px)' : 'inherit'
          }
        }}
        scrollable
        size={'xl'}
        limit={100}
        actions={actions}
        nothingFound={
          isSearching ? (
            <Loader />
          ) : (
            <Stack>
              {debouncedTerm.length > 0 ? (
                <>
                  <Text>{t('quicksearch-no-results')}</Text>
                  <Text>{t('quicksearch-contact-us')}</Text>
                </>
              ) : null}
            </Stack>
          )
        }
        onQueryChange={setSearchTerm}
        searchProps={{
          leftSection: <MagnifyingGlass />,
          placeholder: t('quicksearch-placeholder')
        }}
        closeOnEscape
      />
    </>
  );
};

export default Modal;
