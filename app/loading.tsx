//**Skeleton loader */
function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--border)] ${className}`}
      aria-hidden
    />
  );
}

function ProductCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <article
      className={`bg-[var(--bg-card)] border-2 border-[var(--border)] overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative bg-[var(--border)] ${
          featured ? "aspect-[4/3]" : "aspect-square"
        }`}
      >
        <div className="absolute inset-0 animate-pulse bg-[color-mix(in_srgb,var(--border)_85%,var(--bg-card))]" />
      </div>
      <div className="p-4 space-y-3">
        <Pulse className={`h-5 ${featured ? "w-2/3" : "w-4/5"}`} />
        <Pulse className="h-4 w-full" />
        {!featured && <Pulse className="h-4 w-5/6" />}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Pulse className="h-6 w-20" />
          <Pulse className="h-4 w-10" />
        </div>
        <div className="flex items-start justify-between gap-2 pt-1">
          <div className="flex gap-1">
            <Pulse className="h-6 w-14" />
            <Pulse className="h-6 w-12" />
          </div>
          <Pulse className="h-8 w-24 shrink-0" />
        </div>
      </div>
    </article>
  );
}

export function HomeLoading() {
  return (
    <>
      <section className="border-b-2 border-[var(--border)] bg-[var(--bg-card)]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Pulse className="h-9 w-48" />
          <Pulse className="mt-3 h-5 w-64 max-w-full" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12" aria-busy="true">
        <Pulse className="h-8 w-40 mb-8 rounded-sm" />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Pulse className="h-10 w-full sm:flex-1" />
          <Pulse className="h-10 w-full sm:w-40 shrink-0" />
        </div>

        <Pulse className="mb-8 h-4 w-48" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCardSkeleton featured />
          {Array.from({ length: 7 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomeLoading;
