'use client';
import { Button, Flex, Grid, Switch, TextInput } from "@mantine/core";
import { Backspace } from '@phosphor-icons/react/dist/ssr'

import { Service } from "@/types";
import usePSFilters from "@/domain/productstructure/usePSFilters";
import { PSFilters } from "@/domain/productstructure/types";
import { ServiceCard } from "./ServiceCard";
import { useTranslations } from "next-intl";

type GridProps = {
  items: Service[]
  productstructure: string
}

type FiltersProps = {
  activeFilters: PSFilters;
  onFilterChange: (f: PSFilters) => void;
  onFilterClear: () => void;
};

export const GridFilters = ({ activeFilters, onFilterChange, onFilterClear }: FiltersProps) => {
  const t = useTranslations('tag-page')

  const handleBoolFilterChange = (key: keyof PSFilters) => {
    if (key === 'title') {
      return; 
    }
    onFilterChange({
      ...activeFilters,
      [key]: !activeFilters[key]
    });
  };

  const handleTitleFilterChange = (query: string) => {
    onFilterChange({ ...activeFilters, title: query });
  }

  return (
    <Flex
      gap="lg"
      justify="flex-end"
      align="center"
    >
      <Switch
        id="ess-filter"
        label={t('filter-ess')}
        checked={activeFilters.ess}
        onChange={() => handleBoolFilterChange('ess')}
      />
      <Switch
        id="economic-filter"
        label={t('filter-economic')}
        checked={activeFilters.economic}
        onChange={() => handleBoolFilterChange('economic')}
      />
      <TextInput
        placeholder={t('filter-title')}
        size="xs"
        value={activeFilters.title}
        onChange={(e) => handleTitleFilterChange(e.target.value)}
      />
      <Button
        variant="outline"
        size="xs"
        aria-label={t('filter-clear')}
        type="reset"
        title={t('filter-clear')}
        onClick={onFilterClear}
      >
        <Backspace weight="fill" fontSize={'1.4rem'} />
      </Button>
    </Flex>
  );
};

const FilterableGrid = ({
  items,
  productstructure,
}: GridProps) => {
    const t = useTranslations('tag-page');
    const {
    filteredServices,
    activeFilters,
    filterItems,
    clearFilters,
  } = usePSFilters(items);
  
  return(
    <div>
      <GridFilters activeFilters={activeFilters} onFilterChange={filterItems} onFilterClear={clearFilters}/>
      <div>
        <strong>{t('results', { count: filteredServices.length })}</strong>
      </div>
      <Grid>
        {filteredServices.map((service) => (
          <Grid.Col span={4} key={service.code}>
            <ServiceCard
              service={service}
              productstructure={productstructure}
            />

          </Grid.Col>
        ))}
      </Grid>
    </div>
  )
};

export default FilterableGrid;
