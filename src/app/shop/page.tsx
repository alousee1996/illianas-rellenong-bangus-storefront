import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";

export const dynamic = "force-dynamic";
import { ShopFilters, SortSelect } from "@/components/ShopFilters";
import { ProductCard } from "@/components/ProductCard";

type SearchParams = {
  category?: string;
  price?: string;
  tags?: string;
  bestseller?: string;
  sort?: string;
  q?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Build query conditions
  const conditions = [];

  if (params.category) {
    conditions.push(eq(products.category, params.category));
  }

  if (params.bestseller === "true") {
    conditions.push(eq(products.bestseller, true));
  }

  if (params.q) {
    const q = `%${params.q}%`;
    conditions.push(
      sql`(${products.name} ILIKE ${q} OR ${products.description} ILIKE ${q} OR ${products.tagline} ILIKE ${q})`
    );
  }

  if (params.tags) {
    const tagList = params.tags.split(",").filter(Boolean);
    if (tagList.length > 0) {
      const tagConditions = tagList.map((tag) =>
        sql`${products.tags} ? ${tag}`
      );
      conditions.push(and(...tagConditions));
    }
  }

  if (params.price) {
    const [min, max] = params.price.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      conditions.push(
        sql`CAST(${products.price} AS NUMERIC) >= ${min} AND CAST(${products.price} AS NUMERIC) <= ${max}`
      );
    }
  }

  // Fetch all products (we'll sort in JS for simplicity with mixed sort options)
  let allProducts = await db
    .select()
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  // Apply sorting
  const sort = params.sort ?? "featured";
  switch (sort) {
    case "price-asc":
      allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price-desc":
      allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "rating":
      allProducts.sort((a, b) => parseFloat(b.rating ?? "0") - parseFloat(a.rating ?? "0"));
      break;
    case "newest":
      allProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "bestseller":
      allProducts.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
      break;
    default:
      // featured first, then bestseller, then by created date
      allProducts.sort((a, b) => {
        if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
        if (a.bestseller !== b.bestseller) return Number(b.bestseller) - Number(a.bestseller);
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }

  // Get all categories for the filter sidebar
  const categoryRows = await db
    .selectDistinct({ category: products.category })
    .from(products);
  const categories = ["All Products", ...categoryRows.map((r) => r.category)];

  return (
    <div className="bg-cream">
      {/* Page header */}
      <div className="border-b border-bone bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
            The Shop
          </span>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
            {params.category || params.bestseller === "true"
              ? params.bestseller === "true"
                ? "Bestsellers"
                : params.category
              : "All Products"}
          </h1>
          <p className="mt-3 max-w-xl text-stone">
            Every product is hand-made to order. Browse our full collection,
            filter by what you&apos;re craving, and bring a piece of the
            family table home.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside>
            <ShopFilters
              categories={categories}
              resultCount={allProducts.length}
            />
          </aside>

          {/* Main */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <SortSelect />
            </div>

            {allProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-bone py-20 text-center">
                <h3 className="font-display text-xl text-charcoal">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-stone">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {allProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={i < 3}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
