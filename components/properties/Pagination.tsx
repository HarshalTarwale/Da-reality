function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Page numbers with ellipses: always show first, last, current, and current's neighbours. */
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = [];
  const add = (n: number) => items.push(n);

  const window = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...window].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  let prev = 0;
  for (const n of sorted) {
    if (prev && n - prev > 1) items.push("ellipsis");
    add(n);
    prev = n;
  }
  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);
  const pageButtonBase =
    "flex h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${pageButtonBase} border border-stone text-onyx hover:bg-onyx hover:text-alabaster disabled:pointer-events-none disabled:opacity-30`}
      >
        <ChevronLeftIcon />
      </button>

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Go to page ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={`${pageButtonBase} ${
              item === currentPage
                ? "bg-gold text-onyx"
                : "border border-stone text-onyx hover:bg-onyx hover:text-alabaster"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${pageButtonBase} border border-stone text-onyx hover:bg-onyx hover:text-alabaster disabled:pointer-events-none disabled:opacity-30`}
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
