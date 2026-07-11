"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-serif text-sm tracking-[0.3em] text-gold uppercase">
          Join the Family Table
        </span>
        <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
          Get 10% off your first order
        </h2>
        <p className="mt-4 text-stone">
          Fresh-batch alerts, family recipes, and the occasional secret code.
          No spam — just the good stuff.
        </p>

        {submitted ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-forest/8 px-6 py-3 text-forest">
            <Check className="h-5 w-5" />
            <span className="font-medium">
              You&apos;re in! Check your inbox for the code.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-bone bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-forest"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
