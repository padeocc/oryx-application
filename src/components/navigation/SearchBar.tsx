'use client';

import { ActionIcon, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { cleanFiltersValues } from '../content/utils';

const SearchBar = () => {
  const form = useForm({ initialValues: { query: '' } });
  const router = useRouter();

  return (
    <form
      action={(values: FormData) => {
        const query = values?.get('query')?.toString() || '';
        const url = `/services?filters=${cleanFiltersValues({ query })}`;
        router.push(url);
        setTimeout(() => {
          form.setFieldValue('query', '');
        }, 1000);
      }}>
      <TextInput
        size="sm"
        label={''}
        w={{ base: 'auto', md: '12rem', lg: '20rem', xl: '25rem' }}
        placeholder="Faites une recherche !"
        name="query"
        {...form.getInputProps('query')}
        rightSection={
          <Button
            title="Rechercher"
            variant="filled"
            size="sm"
            color="green_oryx.7"
            type="submit"
            component={ActionIcon}>
            <MagnifyingGlass />
          </Button>
        }
      />
    </form>
  );
};

export default SearchBar;
