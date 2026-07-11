"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Whole%20Fish", label: "Whole Fish" },
  { href: "/shop?category=Gift%20Sets", label: "Gift Sets" },
  { href: "/#story", label: "Our Story" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  function isLinkActive(
    href: string,
    path: string,
    params: ReturnType<typeof useSearchParams>
  ): boolean {
    if (href === "/") return path === "/";
    if (href.startsWith("/#")) return false; // hash links — never highlight

    const [linkPath, linkQuery] = href.split("?");
    if (path !== linkPath) return false;

    // Link has no query string — active only if no category filter is applied
    if (!linkQuery) return !params.get("category");

    // Link has query string — every param must match
    const linkParams = new URLSearchParams(linkQuery);
    for (const [key, value] of linkParams.entries()) {
      if (params.get(key) !== value) return false;
    }
    return true;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/95 shadow-[0_1px_0_rgba(28,25,23,0.08)] backdrop-blur-md"
          : "bg-cream/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-charcoal lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center lg:items-start">
            <span className="font-display text-xl leading-none text-forest lg:text-2xl">
              Illiana&apos;s
            </span>
            <span className="font-serif text-[10px] tracking-[0.25em] text-gold uppercase lg:text-xs">
              Rellenong Bangus
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href, pathname, searchParams);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-forest"
                      : "text-stone hover:text-forest"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center text-charcoal transition-colors hover:text-forest"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-charcoal transition-colors hover:text-forest"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[10px] font-bold text-cream">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-bone pb-4 pt-3 animate-fade-in">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for rellenong bangus, lumpia, gift sets..."
                className="w-full rounded-full border border-bone bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-forest"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-bone bg-cream animate-fade-in">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-bone/50 py-3 text-sm font-medium text-charcoal transition-colors hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
