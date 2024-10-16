'use client';

import '@mantine/spotlight/styles.css';

import { IResults } from '@/algolia/types';
import { useState } from 'react';
import Modal from './Modal';

const QuickSearch = ({ label, onSearch }: { label: string; onSearch: ({ query }: { query: string }) => any }) => {
  const [results, setResults] = useState<IResults[]>([]);
  return <Modal onSearch={onSearch} results={results} setResults={setResults} label={label} />;
};

export default QuickSearch;
