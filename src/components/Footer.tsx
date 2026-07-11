import Link from "next/link";
import { Camera, Globe, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-bone bg-forest-dark text-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl text-cream">
                Illiana&apos;s
              </span>
              <span className="ml-2 font-serif text-sm tracking-[0.3em] text-gold uppercase">
                Rellenong Bangus
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Three generations of Filipino home cooking, hand-stuffed into every
              milkfish. Made fresh in Malabon, delivered with love.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold">
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/shop" className="transition-colors hover:text-gold">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Whole%20Fish" className="transition-colors hover:text-gold">
                  Whole Fish
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Lumpia%20%26%20Snacks" className="transition-colors hover:text-gold">
                  Lumpia & Snacks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gift%20Sets" className="transition-colors hover:text-gold">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?bestseller=true" className="transition-colors hover:text-gold">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold">
              Our Story
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#story" className="transition-colors hover:text-gold">
                  The Family Recipe
                </Link>
              </li>
              <li>
                <Link href="/#story" className="transition-colors hover:text-gold">
                  How It&apos;s Made
                </Link>
              </li>
              <li>
                <Link href="/#story" className="transition-colors hover:text-gold">
                  Sourcing
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors hover:text-gold">
                  Bulk & Corporate Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>27 Rizal St., Malabon, Metro Manila</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href="tel:+63285551234" className="transition-colors hover:text-gold">
                  +63 2 8555 1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:hello@illianas.ph" className="transition-colors hover:text-gold">
                  hello@illianas.ph
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Illiana&apos;s Rellenong Bangus. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-gold">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-gold">Terms</Link>
            <Link href="#" className="transition-colors hover:text-gold">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
