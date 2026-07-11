import { db } from "@/db";
import { sql } from "drizzle-orm";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);

    // Auto-seed if the database is empty (e.g., fresh sandbox bootstrap)
    try {
      const rows = await db.select({ id: products.id }).from(products).limit(1);
      if (rows.length === 0) {
        console.log("[health] Database empty — running seed...");
        await seedDatabase();
        console.log("[health] Seed complete.");
      }
    } catch (seedErr) {
      console.error("[health] Seed check failed:", seedErr);
      // Don't fail the health check if seeding fails
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
