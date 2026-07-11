import { notFound } from "next/navigation";
import Link from "next/link";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { Flame, Users, Scale, Clock, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)
    .then((rows) => rows[0]);

  if (!product) {
    notFound();
  }

  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, product.id))
    .orderBy(desc(reviews.createdAt));

  // Related products (same category, excluding current)
  const related = await db
    .select()
    .from(products)
    .where(eq(products.category, product.category))
    .limit(4);

  const relatedProducts = related
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // If not enough in same category, fill with bestsellers
  if (relatedProducts.length < 3) {
    const fillers = await db
      .select()
      .from(products)
      .where(eq(products.bestseller, true))
      .limit(3 - relatedProducts.length + 1);
    for (const f of fillers) {
      if (f.id !== product.id && !relatedProducts.find((r) => r.id === f.id)) {
        relatedProducts.push(f);
      }
    }
  }

  const rating = parseFloat(product.rating ?? "0");
  const gallery = (product.gallery as string[]) ?? [product.image];

  const details = [
    product.servings && { icon: Users, label: "Servings", value: product.servings },
    product.weight && { icon: Scale, label: "Weight", value: product.weight },
    product.shelfLife && { icon: Clock, label: "Shelf Life", value: product.shelfLife },
    product.spiceLevel > 0 && {
      icon: Flame,
      label: "Spice Level",
      value: "🌶️".repeat(product.spiceLevel) || "Mild",
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="border-b border-bone">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone">
            <Link href="/" className="transition-colors hover:text-forest">Home</Link>
            <span>/</span>
            <Link href="/shop" className="transition-colors hover:text-forest">Shop</Link>
            <span>/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="transition-colors hover:text-forest"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={gallery} alt={product.name} />

          {/* Info */}
          <div>
            <span className="font-serif text-sm tracking-[0.2em] text-gold uppercase">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg italic text-stone">
              {product.tagline}
            </p>

            {/* Rating */}
            {rating > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <StarRating rating={rating} size="md" showNumber />
                <span className="text-sm text-stone">
                  ({product.reviewsCount} {product.reviewsCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Tags */}
            {product.tags && (product.tags as string[]).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(product.tags as string[]).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-forest/8 px-3 py-1 text-xs font-medium text-forest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <AddToCart product={product} />
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-bone pt-6">
              <h2 className="font-display text-lg text-charcoal">About This Dish</h2>
              <p className="mt-3 leading-relaxed text-stone">
                {product.description}
              </p>
            </div>

            {/* Details */}
            {details.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-bone pt-6">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/8 text-forest">
                      <d.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-stone">{d.label}</div>
                      <div className="text-sm font-medium text-charcoal">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* What's included */}
            <div className="mt-6 rounded-2xl bg-cream-dark p-5">
              <h3 className="font-display text-sm text-charcoal">What You Get</h3>
              <ul className="mt-3 space-y-2">
                {[
                  "Hand-deboned milkfish, skin intact",
                  "House sofrito stuffing (ground pork, carrots, raisins)",
                  "Pan-fried to golden perfection",
                  "Vacuum-sealed for freshness",
                  "Comes with spiced vinegar dipping sauce",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Story callout */}
      {product.story && (
        <section className="border-t border-bone bg-cream-dark">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
              The Story Behind This Dish
            </span>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-charcoal sm:text-2xl">
              &ldquo;{product.story}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* Reviews */}
      <ReviewsSection product={product} reviews={productReviews} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-bone bg-cream py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
              You Might Also Like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
