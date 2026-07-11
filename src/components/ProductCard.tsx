"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/db/schema";
import { StarRating } from "./StarRating";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatPriceRaw, discountPercent, cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.compareAtPrice);
  const priceNum = formatPriceRaw(product.price);
  const rating = parseFloat(product.rating ?? "0");

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: priceNum,
        image: product.image,
      },
      1
    );
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:shadow-forest/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bone">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="rounded-full bg-forest px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
              Bestseller
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-forest-dark">
              −{discount}%
            </span>
          )}
        </div>
        {/* Quick add button */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium backdrop-blur-md transition-colors",
              product.stock <= 0
                ? "cursor-not-allowed bg-stone/40 text-cream"
                : "bg-cream/90 text-forest hover:bg-forest hover:text-cream"
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            {product.stock <= 0 ? "Sold Out" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-gold">
            {product.category}
          </span>
          {rating > 0 && (
            <StarRating rating={rating} size="xs" showNumber />
          )}
        </div>
        <h3 className="mt-1.5 font-display text-base leading-snug text-charcoal transition-colors group-hover:text-forest">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-stone">
          {product.tagline}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-stone line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
