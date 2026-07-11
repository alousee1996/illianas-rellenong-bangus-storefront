import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { ProductCard } from "@/components/ProductCard";
import { Story } from "@/components/Story";
import { Newsletter } from "@/components/Newsletter";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch bestsellers and featured products
  const bestsellers = await db
    .select()
    .from(products)
    .where(
      (await import("drizzle-orm")).eq(products.bestseller, true)
    )
    .limit(4);

  const featured = await db
    .select()
    .from(products)
    .where(
      (await import("drizzle-orm")).eq(products.featured, true)
    )
    .orderBy(desc(products.createdAt))
    .limit(3);

  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedCollections />

      {/* Bestsellers */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
                Crowd Favorites
              </span>
              <h2 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
                The Bestsellers
              </h2>
              <p className="mt-3 max-w-md text-stone">
                The dishes our families order again and again. If you&apos;re
                new here, start with these.
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-gold"
            >
              See all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured spotlight */}
      {featured.length > 0 && (
        <section className="bg-cream-dark py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <img
                    src={featured[0].image}
                    alt={featured[0].name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
                  This Week&apos;s Spotlight
                </span>
                <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
                  {featured[0].name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-stone">
                  {featured[0].tagline}
                </p>
                <p className="mt-4 leading-relaxed text-stone">
                  {featured[0].description}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={`/product/${featured[0].slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="font-display text-2xl text-charcoal">
                    ₱{featured[0].price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Story />
      <Newsletter />
    </>
  );
}
