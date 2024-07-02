import { Chip, Input, Menu, MenuDropdown, MenuTarget, SimpleGrid } from '@mantine/core';

const ChipSelect = ({
  all,
  selected = [],
  save,
  placeholder,
  className,
  single
}: {
  all: { value: string; label: string }[];
  selected?: string[];
  save: (items: string[]) => void;
  placeholder: string;
  className: string;
  single?: boolean;
}) => {
  const selectedItem = single && selected?.[0] ? selected[0] : null;
  const placeholderToDisplay =
    (selectedItem && all.find(item => item.value === selectedItem)?.label) || placeholder || '';

  return (
    <Menu position="bottom-start" radius={0} withinPortal>
      <MenuTarget>
        <Input
          readOnly
          c={'dark'}
          disabled={all?.length <= 0}
          placeholder={placeholderToDisplay}
          size="lg"
          radius="0"
          variant="filled"
          className={className}
          styles={{ input: { cursor: 'pointer' } }}
        />
      </MenuTarget>
      <MenuDropdown p="md">
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
                  return save([item.value]);
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
      </MenuDropdown>
    </Menu>
  );
};

export default ChipSelect;