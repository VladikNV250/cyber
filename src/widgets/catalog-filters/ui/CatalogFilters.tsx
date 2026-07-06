import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Slider,
} from '@/shared/ui';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui';

export function CatalogFilters() {
  return (
    <aside className="flex flex-col gap-6 w-[280px]">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg flex items-center justify-between">
          Price{' '}
          <span className="text-muted-foreground ml-auto cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-xs text-muted-foreground mb-1 block">
              From
            </span>
            <Input
              type="number"
              defaultValue={1299}
              className="h-10 text-center text-sm"
            />
          </div>
          <span className="text-border mx-2 mt-4">—</span>
          <div className="flex-1">
            <span className="text-xs text-muted-foreground mb-1 block">To</span>
            <Input
              type="number"
              defaultValue={1299}
              className="h-10 text-center text-sm"
            />
          </div>
        </div>
        <Slider defaultValue={[1299]} max={2000} step={1} className="mt-2" />
      </div>

      <Accordion
        type="multiple"
        defaultValue={[
          'brand',
          'memory',
          'protection',
          'screen_diagonal',
          'screen_type',
          'battery',
        ]}
      >
        <AccordionItem value="brand">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-9 h-10 bg-muted/50 border-transparent"
              />
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Apple', count: 110, checked: true },
                { label: 'Samsung', count: 125 },
                { label: 'Xiaomi', count: 68 },
                { label: 'Poco', count: 44 },
                { label: 'OPPO', count: 36 },
                { label: 'Honor', count: 10 },
                { label: 'Motorola', count: 34 },
                { label: 'Nokia', count: 22 },
                { label: 'Realme', count: 35 },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox defaultChecked={item.checked} />
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="memory">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3">
            Built-in memory
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-9 h-10 bg-muted/50 border-transparent"
              />
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: '16GB', count: 65 },
                { label: '32GB', count: 123 },
                { label: '64GB', count: 48 },
                { label: '128GB', count: 50 },
                { label: '256GB', count: 24 },
                { label: '512GB', count: 8 },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox />
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="protection">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3">
            Protection class
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for protection class */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="screen_diagonal">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3">
            Screen diagonal
          </AccordionTrigger>
          <AccordionContent className="pt-2 px-0">
            {/* Content for screen diagonal */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="screen_type">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline px-0 py-3">
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
