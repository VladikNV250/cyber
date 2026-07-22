export function CatalogGridSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center mb-6 h-10">
        <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-64 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-10">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-center justify-between rounded-lg bg-card px-4 py-6 h-108 border border-border/50"
          >
            <div className="absolute right-4 top-4 size-8 bg-muted animate-pulse rounded-full" />

            <div className="flex-1 flex items-center justify-center w-full mt-4 mb-4 relative min-h-40">
              <div className="h-40 w-40 bg-muted animate-pulse rounded-md" />
            </div>

            <div className="mt-auto flex flex-col items-center w-full gap-4">
              <div className="w-full flex flex-col items-center gap-2 min-h-12 justify-center">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              </div>

              <div className="h-8 w-2/5 bg-muted animate-pulse rounded" />

              <div className="mt-2 h-11 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
