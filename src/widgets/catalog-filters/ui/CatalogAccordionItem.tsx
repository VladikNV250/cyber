import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui';
import { ReactNode } from 'react';

interface Props {
  value: string;
  title: string;
  children: ReactNode;
}

export function CatalogAccordionItem({ value, title, children }: Props) {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline border-b border-border mb-6 capitalize">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 pt-0 px-0">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
