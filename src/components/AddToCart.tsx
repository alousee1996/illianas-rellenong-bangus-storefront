"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Truck, Shield, Leaf } from "lucide-react";
import type { Product } from "@/db/schema";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatPriceRaw } from "@/lib/utils";

export function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const priceNum = formatPriceRaw(product.price);
  const inStock = product.stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: priceNum,
        image: product.image,
      },
      quantity
    );
  };

  return (
    <div>
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl text-charcoal">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-lg text-stone line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Stock status */}
      <div className="mt-3 flex items-center gap-2">
        {inStock ? (
          <>
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-700">
              In stock — ships in 2–3 days
            </span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm text-red-700">Currently sold out</span>
          </>
        )}
      </div>

      {/* Quantity + Add */}
      <div className="mt-6 flex gap-3">
        <div className="flex items-center rounded-full border border-bone bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center text-stone transition-colors hover:text-forest"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center text-stone transition-colors hover:text-forest"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          {inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>

      {/* Trust badges */}
      <div className="mt-8 grid grid-cols-1 gap-3 border-t border-bone pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-gold" />
          <span className="text-xs text-stone">Cold-chain delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gold" />
          <span className="text-xs text-stone">Freshness guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-gold" />
          <span className="text-xs text-stone">No preservatives</span>
        </div>
      </div>
    </div>
  );
}
