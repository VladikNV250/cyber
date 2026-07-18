import * as React from 'react';
import { Search } from 'lucide-react';
import { Input, Checkbox } from '@/shared/ui';

export interface FilterItem {
  label: string;
  count?: number;
  checked?: boolean;
}

interface FilterCheckboxListProps {
  items: FilterItem[];
  showSearch?: boolean;
}

export function FilterCheckboxList({
  items,
  showSearch,
}: FilterCheckboxListProps) {
  return (
    <>
      {showSearch && (
        <div className="relative mb-4 pr-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#989898]" />
          <Input
            placeholder="Search"
            className="pl-12 py-3 pr-2 h-10 w-full bg-[#F5F5F5] border-transparent rounded-[8px] font-medium text-sm placeholder:text-[#656565] placeholder:opacity-50 focus-visible:bg-background"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px] pr-6 custom-scrollbar">
        {items.map((item) => (
          <Checkbox
            key={item.label}
            defaultChecked={item.checked}
            label={
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-medium text-foreground leading-none group-hover:underline underline-offset-4">
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="text-xs text-[#929292] leading-none">
                    {item.count}
                  </span>
                )}
              </div>
            }
          />
        ))}
      </div>
    </>
  );
}
