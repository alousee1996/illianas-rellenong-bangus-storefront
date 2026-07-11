"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { ChevronDown, X } from "lucide-react";

const CATEGORIES = ["All Products", "Whole Fish", "Lumpia & Snacks", "Gift Sets"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { label: "Under ₱500", min: 0, max: 500 },
  { label: "₱500 – ₱800", min: 500, max: 800 },
  { label: "₱800 – ₱1,500", min: 800, max: 1500 },
  { label: "Over ₱1,500", min: 1500, max: 999999 },
];

const TAGS = ["Bestseller", "Spicy", "Premium", "Gift", "Family Recipe", "No Preservatives"];

export function ShopFilters({
  categories,
  resultCount,
}: {
  categories: string[];
  resultCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "" || value === "All Products") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, searchParams]
  );

  const activeCategory = searchParams.get("category") ?? "All Products";
  const activeSort = searchParams.get("sort") ?? "featured";
  const activePrice = searchParams.get("price") ?? "";
  const activeTags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
  const bestsellerOnly = searchParams.get("bestseller") === "true";

  const toggleTag = (tag: string) => {
    const current = new Set(activeTags);
    if (current.has(tag)) current.delete(tag);
    else current.add(tag);
    const next = Array.from(current);
    updateParam("tags", next.length ? next.join(",") : null);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    activeCategory !== "All Products" ||
    activeSort !== "featured" ||
    activePrice !== "" ||
    activeTags.length > 0 ||
    bestsellerOnly;

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile sort + filter row */}
      <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
        <div className="relative flex-1">
          <select
            value={activeSort}
            onChange={(e) => updateParam("sort", e.target.value === "featured" ? null : e.target.value)}
            className="w-full appearance-none rounded-full border border-bone bg-white py-2.5 pl-4 pr-10 text-sm outline-none focus:border-forest"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
        </div>
      </div>

      <div className="rounded-2xl border border-bone bg-white/60 p-5 lg:p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-charcoal">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-stone underline-offset-2 transition-colors hover:text-forest hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
            Category
          </h4>
          <ul className="mt-2 space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => updateParam("category", cat === "All Products" ? null : cat)}
                  className={`text-sm transition-colors ${
                    activeCategory === cat
                      ? "font-medium text-forest"
                      : "text-stone hover:text-charcoal"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
            Price Range
          </h4>
          <ul className="mt-2 space-y-1.5">
            {PRICE_RANGES.map((range) => {
              const key = `${range.min}-${range.max}`;
              return (
                <li key={key}>
                  <button
                    onClick={() => updateParam("price", activePrice === key ? null : key)}
                    className={`text-sm transition-colors ${
                      activePrice === key
                        ? "font-medium text-forest"
                        : "text-stone hover:text-charcoal"
                    }`}
                  >
                    {range.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
            Attributes
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  activeTags.includes(tag)
                    ? "border-forest bg-forest text-cream"
                    : "border-bone bg-white text-stone hover:border-forest hover:text-forest"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller toggle */}
        <div className="mt-6">
          <button
            onClick={() => updateParam("bestseller", bestsellerOnly ? null : "true")}
            className={`flex w-full items-center justify-between rounded-full border px-4 py-2.5 text-sm transition-colors ${
              bestsellerOnly
                ? "border-forest bg-forest text-cream"
                : "border-bone bg-white text-stone hover:border-forest hover:text-forest"
            }`}
          >
            Bestsellers only
            <span className={`h-2 w-2 rounded-full ${bestsellerOnly ? "bg-gold" : "bg-bone"}`} />
          </button>
        </div>
      </div>

      {/* Result count */}
      <p className="mt-4 px-1 text-xs text-stone">
        Showing {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {activeCategory !== "All Products" && (
            <FilterChip label={activeCategory} onRemove={() => updateParam("category", null)} />
          )}
          {activePrice && (
            <FilterChip
              label={PRICE_RANGES.find((r) => `${r.min}-${r.max}` === activePrice)?.label ?? activePrice}
              onRemove={() => updateParam("price", null)}
            />
          )}
          {activeTags.map((tag) => (
            <FilterChip key={tag} label={tag} onRemove={() => toggleTag(tag)} />
          ))}
          {bestsellerOnly && (
            <FilterChip label="Bestsellers only" onRemove={() => updateParam("bestseller", null)} />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-forest/8 px-2.5 py-1 text-xs text-forest">
      {label}
      <button onClick={onRemove} className="hover:text-forest-dark">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") ?? "featured";

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <label className="text-sm text-stone">Sort by:</label>
      <div className="relative">
        <select
          value={activeSort}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value === "featured") params.delete("sort");
            else params.set("sort", e.target.value);
            const qs = params.toString();
            router.push(qs ? `${pathname}?${qs}` : pathname);
          }}
          className="appearance-none rounded-full border border-bone bg-white py-2 pl-4 pr-10 text-sm outline-none focus:border-forest"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
      </div>
    </div>
  );
}
