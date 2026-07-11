import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Whole Fish",
    description: "The classic. Deboned, stuffed, and pan-fried to order.",
    image: "/images/classic.jpg",
    href: "/shop?category=Whole%20Fish",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Lumpia & Snacks",
    description: "Crispy, dippable, gone in minutes.",
    image: "/images/lumpia.jpg",
    href: "/shop?category=Lumpia%20%26%20Snacks",
    span: "",
  },
  {
    title: "Gift Sets",
    description: "The complete collection, beautifully boxed.",
    image: "/images/giftset.jpg",
    href: "/shop?category=Gift%20Sets",
    span: "",
  },
];

export function FeaturedCollections() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
              Explore the Kitchen
            </span>
            <h2 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-gold"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:h-[580px]">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className={`group relative overflow-hidden rounded-2xl bg-forest-dark ${col.span}`}
            >
              <div className="relative h-64 w-full lg:h-full min-h-[260px]">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="font-display text-2xl text-cream lg:text-3xl">
                  {col.title}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-cream/70">
                  {col.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold">
                  Shop now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
