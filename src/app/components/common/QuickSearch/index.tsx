'use client';

import '@mantine/spotlight/styles.css';

import { IResults } from '@/algolia/types';
import { useState } from 'react';
import Modal from './Modal';

const QuickSearch = ({
  size,
  label,
  onSearch
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label: string;
  onSearch: ({ query }: { query: string }) => any;
}) => {
  const [results, setResults] = useState<IResults[]>([]);
  return <Modal onSearch={onSearch} results={results} setResults={setResults} label={label} size={size} />;
};

export default QuickSearch;
