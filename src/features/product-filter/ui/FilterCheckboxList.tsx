'use client';
import { Checkbox, Input } from '@/shared/ui';
import { useDebounce } from '@reactuses/core';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FilterItem } from '../model/types';

interface Props {
  items: FilterItem[];
  selectedIds: string[];
  onToggle: (id: string, isChecked: boolean) => void;
}

export function FilterCheckboxList({ items, selectedIds, onToggle }: Props) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebounce(searchInput, 400);
  const visibleItems = useMemo(() => {
    return items.filter((item) => item.label.includes(debouncedSearchInput));
  }, [items, debouncedSearchInput]);

  return (
    <>
      <div className="relative mb-4 pr-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#989898]" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
          className="pl-12 py-3 pr-2 h-10 w-full bg-[#F5F5F5] border-transparent rounded-lg font-medium text-sm placeholder:text-[#656565] placeholder:opacity-50 focus-visible:bg-background"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-70 pr-6 custom-scrollbar">
        {visibleItems.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedIds.includes(item.id)}
            onCheckedChange={(checked) => onToggle(item.id, Boolean(checked))}
            label={
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-medium text-foreground leading-none group-hover:underline underline-offset-4">
                  {item.label}
                </span>
                {Boolean(item.count) && (
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
