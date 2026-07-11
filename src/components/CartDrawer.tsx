"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 1500;

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bone px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-forest" />
            <h2 className="font-display text-lg text-charcoal">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="text-sm text-stone">({totalItems})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone transition-colors hover:bg-bone/50 hover:text-charcoal"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bone/40">
              <ShoppingBag className="h-8 w-8 text-stone" />
            </div>
            <h3 className="mt-5 font-display text-xl text-charcoal">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm text-stone">
              Looks like you haven&apos;t added any rellenong bangus yet. Let&apos;s fix that.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
            >
              Browse the Shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-bone px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs text-stone">
                  Add <span className="font-semibold text-forest">{formatPrice(remaining)}</span> more for free delivery in Metro Manila
                </p>
              ) : (
                <p className="text-xs font-medium text-forest">
                  ✓ You&apos;ve unlocked free delivery!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bone/60">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-3 animate-fade-in"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bone"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm leading-tight text-charcoal hover:text-forest"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-stone transition-colors hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-stone">{formatPrice(item.price)} each</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-bone bg-white">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-forest"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-forest"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-sm text-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-bone px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone">Subtotal</span>
                <span className="font-display text-xl text-charcoal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full text-center text-xs text-stone underline-offset-2 transition-colors hover:text-forest hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
