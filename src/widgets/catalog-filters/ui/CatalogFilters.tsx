import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Slider,
} from '@/shared/ui';
import { Input } from '@/shared/ui';
import { FilterCheckboxList } from './FilterCheckboxList';

export function CatalogFilters() {
  return (
    <aside className="flex flex-col w-[280px]">
      <Accordion
        type="multiple"
        defaultValue={[
          'price',
          'brand',
          'memory',
          'protection',
          'screen_diagonal',
          'screen_type',
          'battery',
        ]}
      >
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Price
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-0 px-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="price-from"
                  className="text-sm text-[#A7A7A7] font-normal text-left tracking-[-0.5%] cursor-pointer"
                >
                  From
                </label>
                <label
                  htmlFor="price-to"
                  className="text-sm text-[#A7A7A7] font-normal text-right tracking-[-0.5%] cursor-pointer"
                >
                  To
                </label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Input
                  id="price-from"
                  type="number"
                  defaultValue={0}
                  className="w-full bg-background border-border text-foreground font-medium text-sm text-left p-2 rounded-[3px]"
                  aria-label="Minimum price"
                />
                <div className="w-5 h-px shrink-0 bg-[#E7E7E7]" />
                <Input
                  id="price-to"
                  type="number"
                  defaultValue={1299}
                  className="w-full bg-background border-border text-foreground font-medium text-sm text-right p-2 rounded-[3px]"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            <Slider
              defaultValue={[0, 1299]}
              max={2000}
              step={1}
              className="mt-4 mb-2"
              aria-label="Price range"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            <FilterCheckboxList
              showSearch
              items={[
                { label: 'Apple', count: 110, checked: true },
                { label: 'Samsung', count: 125 },
                { label: 'Xiaomi', count: 68 },
                { label: 'Poco', count: 44 },
                { label: 'OPPO', count: 36 },
                { label: 'Honor', count: 10 },
                { label: 'Motorola', count: 34 },
                { label: 'Nokia', count: 22 },
                { label: 'Realme', count: 35 },
              ]}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="memory">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Built-in memory
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            <FilterCheckboxList
              showSearch
              items={[
                { label: '16GB', count: 65 },
                { label: '32GB', count: 123 },
                { label: '64GB', count: 48 },
                { label: '128GB', count: 50 },
                { label: '256GB', count: 24 },
                { label: '512GB', count: 8 },
              ]}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="protection">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Protection class
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for protection class */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="screen_diagonal">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Screen diagonal
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for screen diagonal */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="screen_type">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6">
            Screen type
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for screen type */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="battery">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3 border-b-0">
            Battery capacity
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for battery capacity */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
