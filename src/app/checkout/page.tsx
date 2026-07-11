"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Truck,
  CreditCard,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatPriceRaw } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SHIPPING_FEE = 150;
const FREE_SHIPPING_THRESHOLD = 1500;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: formatPriceRaw(i.price).toString(),
            quantity: i.quantity,
            image: i.image,
          })),
          subtotal: formatPriceRaw(subtotal).toString(),
          shipping: shipping.toString(),
          total: total.toString(),
          paymentMethod,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderNumber(data.orderNumber);
        setOrderComplete(true);
        clearCart();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  // Empty cart state
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bone/40">
          <Truck className="h-8 w-8 text-stone" />
        </div>
        <h1 className="mt-5 font-display text-2xl text-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-2 text-stone">
          Add some rellenong bangus before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  // Order complete state
  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="rounded-2xl border border-bone bg-white/60 p-8 text-center sm:p-12 animate-scale-in">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-charcoal sm:text-4xl">
            Salamat, {form.customerName.split(" ")[0]}!
          </h1>
          <p className="mt-3 text-stone">
            Your order has been received and is being prepared with love.
          </p>

          <div className="mt-8 rounded-xl bg-cream-dark p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone">Order Number</span>
              <span className="font-display text-lg text-charcoal">{orderNumber}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-bone pt-3">
              <span className="text-sm text-stone">Payment Method</span>
              <span className="text-sm font-medium text-charcoal capitalize">
                {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "gcash" ? "GCash" : "Bank Transfer"}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-bone pt-3">
              <span className="text-sm text-stone">Estimated Delivery</span>
              <span className="text-sm font-medium text-charcoal">2–3 business days</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-stone">
            A confirmation email has been sent to{" "}
            <span className="font-medium text-charcoal">{form.email}</span>. We&apos;ll
            text you when your order ships.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
          Checkout
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <fieldset className="rounded-2xl border border-bone bg-white/60 p-5 sm:p-6">
              <legend className="px-2 font-display text-lg text-charcoal">
                Contact Information
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-stone">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                    placeholder="juan@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-stone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                    placeholder="+63 917 123 4567"
                  />
                </div>
              </div>
            </fieldset>

            {/* Shipping */}
            <fieldset className="rounded-2xl border border-bone bg-white/60 p-5 sm:p-6">
              <legend className="px-2 font-display text-lg text-charcoal">
                Shipping Address
              </legend>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-stone">
                    Street Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.shippingAddress}
                    onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                    placeholder="123 Rizal Street, Brgy. San Roque"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-stone">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                      placeholder="Quezon City"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-stone">
                      Postal Code *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                      placeholder="1100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-stone">
                    Order Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="mt-1 w-full resize-none rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                    placeholder="Delivery instructions, gift message, etc."
                  />
                </div>
              </div>
            </fieldset>

            {/* Payment method */}
            <fieldset className="rounded-2xl border border-bone bg-white/60 p-5 sm:p-6">
              <legend className="px-2 font-display text-lg text-charcoal">
                Payment Method
              </legend>
              <div className="mt-4 space-y-3">
                {[
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: Truck },
                  { id: "gcash", label: "GCash", desc: "We'll send a payment link to your phone", icon: Wallet },
                  { id: "bank", label: "Bank Transfer", desc: "BDO, BPI, or Metrobank", icon: CreditCard },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                      paymentMethod === method.id
                        ? "border-forest bg-forest/5"
                        : "border-bone hover:border-forest/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                        paymentMethod === method.id
                          ? "border-forest bg-forest"
                          : "border-bone"
                      )}
                    >
                      {paymentMethod === method.id && (
                        <div className="h-2 w-2 rounded-full bg-cream" />
                      )}
                    </div>
                    <method.icon className="h-5 w-5 text-forest" />
                    <div>
                      <div className="text-sm font-medium text-charcoal">{method.label}</div>
                      <div className="text-xs text-stone">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Submit (mobile) */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-forest px-6 py-4 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:opacity-50 lg:hidden"
            >
              {submitting ? "Placing order..." : `Place Order · ${formatPrice(total)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-bone bg-white/60 p-5 sm:p-6">
              <h2 className="font-display text-lg text-charcoal">Order Summary</h2>

              {/* Items */}
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bone">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[10px] font-bold text-cream">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-charcoal">{item.name}</span>
                      <span className="text-xs text-stone">
                        {formatPrice(item.price)} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-display text-sm text-charcoal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="mt-5 space-y-2 border-t border-bone pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone">Subtotal</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone">Shipping</span>
                  <span className="text-charcoal">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && subtotal > 0 && (
                  <p className="text-xs text-green-700">
                    ✓ Free delivery unlocked!
                  </p>
                )}
                <div className="flex justify-between border-t border-bone pt-2">
                  <span className="font-display text-base text-charcoal">Total</span>
                  <span className="font-display text-xl text-charcoal">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Submit (desktop) */}
              <button
                type="submit"
                form=""
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.querySelector("form");
                  if (formEl) {
                    formEl.requestSubmit();
                  }
                }}
                disabled={submitting}
                className="mt-5 hidden w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:opacity-50 lg:flex"
              >
                <ShieldCheck className="h-4 w-4" />
                {submitting ? "Placing order..." : "Place Order"}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure checkout · Your data is protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
