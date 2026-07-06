import * as React from 'react';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui';

const mockProducts = [
  { id: '1', title: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', price: '$1437' },
  { id: '2', title: 'Apple iPhone 11 128GB White (MQ233)', price: '$510' },
  { id: '3', title: 'Apple iPhone 11 128GB White (MQ233)', price: '$550' },
  { id: '4', title: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)', price: '$1499' },
  { id: '5', title: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)', price: '$1399' },
  {
    id: '6',
    title: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    price: '$1600',
  },
  { id: '7', title: 'Apple iPhone 13 mini 128GB Pink (MLK23)', price: '$850' },
  {
    id: '8',
    title: 'Apple iPhone 14 Pro 256GB Space Black (MQ0T3)',
    price: '$1399',
  },
  {
    id: '9',
    title: 'Apple iPhone 14 Pro 256GB Silver (MQ103)',
    price: '$1399',
  },
];

export function CatalogGrid() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between mb-6">
        <div className="text-muted-foreground text-sm">
          Selected Products:{' '}
          <span className="text-foreground font-semibold text-xl ml-1">85</span>
        </div>

        <Select defaultValue="rating">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">By rating</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>

      <Pagination className="mb-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
