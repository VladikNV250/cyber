import { PaginationMeta } from '@/shared/model';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui';

type Props = Pick<PaginationMeta, 'page' | 'totalPages'> & {
  buildPageUrl: (page: number) => string;
};

export function CatalogPagination({ page, totalPages, buildPageUrl }: Props) {
  if (totalPages <= 0) return null;

  let startPage = page === 1 ? 1 : page - 1;
  if (startPage + 2 > totalPages && totalPages > 3) {
    startPage = totalPages - 2;
  }

  const visiblePages = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    visiblePages.push(startPage, startPage + 1, startPage + 2);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={page > 1 ? buildPageUrl(page - 1) : '#'} />
        </PaginationItem>
        {visiblePages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href={buildPageUrl(p)} isActive={page === p}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 3 &&
          visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

        {totalPages > 3 &&
          visiblePages[visiblePages.length - 1] < totalPages && (
            <PaginationItem>
              <PaginationLink
                href={buildPageUrl(totalPages)}
                isActive={page === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? buildPageUrl(page + 1) : '#'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
