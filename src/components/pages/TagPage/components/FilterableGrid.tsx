'use client';
import { Button, Flex, Grid, Switch, TextInput } from "@mantine/core";
import { Backspace } from '@phosphor-icons/react/dist/ssr';
import { Service } from "@/types";
import usePSFilters from "@/domain/productstructure/usePSFilters";
import { PSFilters } from "@/domain/productstructure/types";
import { ServiceCard } from "./ServiceCard";

type GridProps = {
  items: Service[];
  productstructure: string;
};

type FiltersProps = {
  activeFilters: PSFilters;
  onFilterChange: (f: PSFilters) => void;
  onFilterClear: () => void;
};

export const GridFilters = ({ activeFilters, onFilterChange, onFilterClear }: FiltersProps) => {
  const handleBoolFilterChange = (key: keyof PSFilters) => {
    if (key === 'title') return;
    onFilterChange({ ...activeFilters, [key]: !activeFilters[key] });
  };

  const handleTitleFilterChange = (query: string) => {
    onFilterChange({ ...activeFilters, title: query });
  };

  return (
    <Flex gap="lg" justify="flex-end" align="center">
      <Switch id="ess-filter" label="ESS" checked={activeFilters.ess} onChange={() => handleBoolFilterChange('ess')} />
      <Switch id="economic-filter" label="Économique" checked={activeFilters.economic} onChange={() => handleBoolFilterChange('economic')} />
      <TextInput placeholder="Titre" size="xs" value={activeFilters.title} onChange={(e) => handleTitleFilterChange(e.target.value)} />
      <Button variant="outline" size="xs" aria-label="Effacer les filters" type="reset" title="Effacer les filters" onClick={onFilterClear}>
        <Backspace weight="fill" fontSize={'1.4rem'} />
      </Button>
    </Flex>
  );
};

const FilterableGrid = ({ items, productstructure }: GridProps) => {
  const { filteredServices, activeFilters, filterItems, clearFilters } = usePSFilters(items);

  return (
    <div>
      <GridFilters activeFilters={activeFilters} onFilterChange={filterItems} onFilterClear={clearFilters} />
      <div>
        <strong>Résultats: {filteredServices.length}</strong>
      </div>
      <Grid>
        {filteredServices.map((service) => (
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }} key={service.code}>
            <ServiceCard service={service} productstructure={productstructure} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default FilterableGrid;
