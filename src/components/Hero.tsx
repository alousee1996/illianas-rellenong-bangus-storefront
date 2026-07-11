import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { StarRating } from "./StarRating";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-dark">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Rellenong Bangus beautifully plated"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/60 to-forest-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-forest-dark/40 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium tracking-wider text-gold uppercase">
              Family recipe since 1962
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            The rellenong bangus
            <br />
            <span className="italic text-gold">worth passing down.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
            Hand-deboned milkfish, stuffed with three generations of
            Filipino know-how, pan-fried to golden perfection. Made fresh
            every Tuesday and Friday in Malabon. Delivered to your door.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest-dark transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#story"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Our Story
            </Link>
          </div>

          {/* Rating row */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["M", "J", "P", "R"].map((letter, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-forest-dark bg-forest text-xs font-semibold text-cream"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <StarRating rating={4.9} size="sm" />
              <p className="mt-0.5 text-xs text-cream/60">
                Loved by 3,200+ Filipino families
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,40 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            className="fill-cream"
          />
        </svg>
      </div>
    </section>
  );
}
