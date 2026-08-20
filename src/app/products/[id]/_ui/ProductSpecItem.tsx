'use client';

import { Layers } from 'lucide-react';
import { Tooltip } from 'radix-ui';

interface Props {
  specKey: string;
  specValue: string;
}

export function ProductSpecItem({ specKey, specValue }: Props) {
  const content = (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md overflow-hidden h-full w-full">
      <div className="text-gray-400 shrink-0">
        <Layers className="size-5" />
      </div>
      <div className="flex flex-col min-w-0 text-left">
        <span className="text-xs text-gray-400 capitalize truncate w-full block">
          {specKey}
        </span>
        <span className="text-sm font-medium truncate w-full block">
          {specValue}
        </span>
      </div>
    </div>
  );

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <button className="text-left w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
            {content}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-50 text-black text-xs px-3 py-2 rounded-md shadow-lg max-w-xs z-50 wrap-break-word"
            sideOffset={5}
          >
            {specValue}
            <Tooltip.Arrow className="fill-gray-50" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
