import type { CatalogFilters as CatalogFiltersType } from '@/entities/product';
import {
  BrandFilter,
  PriceFilter,
  SpecFilter,
} from '@/features/product-filter';
import { Accordion } from '@/shared/ui';

import { FILTER_ACCORDION_KEYS } from '../config/constants';
import { CatalogAccordionItem } from './CatalogAccordionItem';

interface Props {
  filters: CatalogFiltersType;
}

export function CatalogFilters({ filters }: Props) {
  const { brands, specs, priceRange } = filters;

  return (
    <aside className="flex flex-col w-70">
      <Accordion
        type="multiple"
        defaultValue={[
          FILTER_ACCORDION_KEYS.PRICE,
          FILTER_ACCORDION_KEYS.BRAND,
          ...specs.map((spec) => spec.name),
        ]}
      >
        <CatalogAccordionItem value={FILTER_ACCORDION_KEYS.PRICE} title="Price">
          <PriceFilter bounds={priceRange} />
        </CatalogAccordionItem>
        <CatalogAccordionItem value={FILTER_ACCORDION_KEYS.BRAND} title="Brand">
          <BrandFilter brands={brands} />
        </CatalogAccordionItem>
        {specs.map((spec) => (
          <CatalogAccordionItem
            key={spec.name}
            value={spec.name}
            title={spec.name}
          >
            <SpecFilter spec={spec} />
          </CatalogAccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
