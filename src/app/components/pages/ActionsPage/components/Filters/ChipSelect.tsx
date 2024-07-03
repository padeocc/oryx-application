import { inputDefaultBackgrounColor } from '@/theme';
import {
  Badge,
  Button,
  Chip,
  CloseButton,
  Group,
  Input,
  Menu,
  MenuDropdown,
  MenuTarget,
  SimpleGrid
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

const ChipSelect = ({
  all,
  selected = [],
  save,
  placeholder,
  className,
  single,
  color
}: {
  all: { value: string; label: string }[];
  selected?: string[];
  save: (items: string[]) => void;
  placeholder: string;
  className: string;
  single?: boolean;
  color: string;
}) => {
  const [opened, setOpened] = useState(false);
  const selectedItem = single && selected?.[0] ? selected[0] : null;
  const t = useTranslations('filters_component');
  const placeholderToDisplay =
    (selectedItem && all.find(item => item.value === selectedItem)?.label) || placeholder || '';

  return (
    <Menu position="bottom-start" radius={0} withinPortal opened={opened} onChange={setOpened}>
      <MenuTarget>
        <Group bg={inputDefaultBackgrounColor} w="100%" align="center" style={{ cursor: 'pointer' }}>
          {all?.length <= 0 ? (
            <Input
              readOnly
              c={'dark'}
              disabled
              placeholder={placeholderToDisplay}
              size="lg"
              radius="0"
              variant="filled"
              className={className}
            />
          ) : (
            <Link href="#" style={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}>
              <Group gap={'xs'} p="md">
                {placeholderToDisplay}
                {selected.length ? <Badge color={color}>{selected.length}</Badge> : null}
              </Group>
            </Link>
          )}
        </Group>
      </MenuTarget>
      <MenuDropdown p="md">
        <Group justify="flex-end">
          <CloseButton
            onClick={() => {
              setOpened(false);
            }}
          />
        </Group>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing={'0.4rem'} style={{ overflow: 'scroll', width: '100%' }}>
          {all.map(item => (
            <Chip
              radius={0}
              variant="filled"
              size="xs"
              key={`chip_${item.value}`}
              value={item.value}
              checked={selected.includes(item?.value)}
              onChange={value => {
                if (single) {
                  return save(value ? [item.value] : []);
                }
                let items = selected ? [...selected] : [];
                if (value) {
                  items = [...items, item.value];
                } else {
                  items = items.filter(searchedItem => searchedItem !== item.value);
                }
                save(items);
              }}>
              {item.label}
            </Chip>
          ))}
        </SimpleGrid>
        <Group justify="flex-end" pt="sm">
          <Button
            size="xs"
            variant="subtle"
            disabled={selected.length === 0}
            onClick={() => {
              save([]);
              setOpened(false);
            }}>
            {t('reset-filter-label')}
          </Button>
        </Group>
      </MenuDropdown>
    </Menu>
  );
};

export default ChipSelect;
