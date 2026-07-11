"use client";

import { useState } from "react";
import { Star, Check, BadgeCheck } from "lucide-react";
import type { Product, Review } from "@/db/schema";
import { StarRating } from "./StarRating";

type ReviewInput = {
  author: string;
  rating: number;
  title: string;
  body: string;
};

export function ReviewsSection({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ReviewInput>({
    author: "",
    rating: 5,
    title: "",
    body: "",
  });

  const rating = parseFloat(product.rating ?? "0");
  const totalCount = localReviews.length;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = localReviews.filter((r) => r.rating === star).length;
    const pct = totalCount > 0 ? (count / totalCount) * 100 : 0;
    return { star, count, pct };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          ...form,
        }),
      });
      if (res.ok) {
        const newReview: Review = await res.json();
        setLocalReviews((prev) => [newReview, ...prev]);
        setSubmitted(true);
        setShowForm(false);
        setForm({ author: "", rating: 5, title: "", body: "" });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-t border-bone py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
              Customer Reviews
            </h2>
            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={rating} size="md" showNumber />
              <span className="text-sm text-stone">
                {totalCount} {totalCount === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Rating breakdown */}
        {totalCount > 0 && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[200px_1fr]">
            <div className="rounded-2xl bg-cream-dark p-5 text-center">
              <div className="font-display text-4xl text-charcoal">
                {rating.toFixed(1)}
              </div>
              <StarRating rating={rating} size="sm" className="mt-1 justify-center" />
              <p className="mt-1 text-xs text-stone">
                Based on {totalCount} reviews
              </p>
            </div>
            <div className="flex flex-col justify-center gap-1.5">
              {ratingBreakdown.map((r) => (
                <div key={r.star} className="flex items-center gap-3">
                  <div className="flex w-12 items-center gap-1 text-sm text-stone">
                    {r.star}
                    <Star className="h-3 w-3 fill-gold text-gold" />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-bone">
                    <div
                      className="h-full rounded-full bg-gold transition-all"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm text-stone">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-bone bg-white/60 p-6 animate-fade-in"
          >
            <h3 className="font-display text-lg text-charcoal">Share Your Experience</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-stone">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                  placeholder="Maria Santos"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-stone">
                  Rating
                </label>
                <div className="mt-1 flex h-[42px] items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= form.rating
                            ? "fill-gold text-gold"
                            : "fill-transparent text-bone"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-stone">
                Title
              </label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                placeholder="Tastes like Lola's"
              />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-stone">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="mt-1 w-full resize-none rounded-lg border border-bone bg-white px-3 py-2.5 text-sm outline-none focus:border-forest"
                placeholder="Tell us what you thought..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-dark disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {submitted && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            <Check className="h-4 w-4" />
            Thank you! Your review has been posted.
          </div>
        )}

        {/* Reviews list */}
        <div className="mt-10 grid gap-6">
          {localReviews.length === 0 ? (
            <p className="text-center text-stone py-10">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            localReviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-bone bg-white/50 p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm font-semibold text-cream">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-charcoal">{review.author}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                            <BadgeCheck className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      {review.location && (
                        <span className="text-xs text-stone">{review.location}</span>
                      )}
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                {review.title && (
                  <h4 className="mt-3 font-display text-base text-charcoal">
                    {review.title}
                  </h4>
                )}
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {review.body}
                </p>
                <p className="mt-3 text-xs text-stone/60">
                  {new Date(review.createdAt).toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
