import { NextRequest } from "next/server";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, author, rating, title, body: reviewBody } = body;

    if (!productId || !author || !rating || !reviewBody) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Insert the review
    const inserted = await db
      .insert(reviews)
      .values({
        productId,
        author,
        rating,
        title: title || null,
        body: reviewBody,
        verified: false,
      })
      .returning();

    const newReview = inserted[0];

    // Recompute product rating and review count
    const allReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId));

    if (allReviews.length > 0) {
      const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await db
        .update(products)
        .set({
          rating: avg.toFixed(2),
          reviewsCount: allReviews.length,
        })
        .where(eq(products.id, productId));
    }

    return Response.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Review POST error:", error);
    return Response.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
