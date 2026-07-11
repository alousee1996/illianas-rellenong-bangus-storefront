import { pgTable, serial, text, numeric, integer, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    tagline: text("tagline"),
    description: text("description").notNull(),
    story: text("story"),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
    image: text("image").notNull(),
    gallery: jsonb("gallery").$type<string[]>().default([]),
    category: text("category").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    featured: boolean("featured").default(false).notNull(),
    bestseller: boolean("bestseller").default(false).notNull(),
    stock: integer("stock").default(0).notNull(),
    servings: text("servings"),
    weight: text("weight"),
    shelfLife: text("shelf_life"),
    spiceLevel: integer("spice_level").default(0).notNull(),
    rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
    reviewsCount: integer("reviews_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index("products_category_idx").on(table.category),
    slugIdx: index("products_slug_idx").on(table.slug),
  })
);

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    author: text("author").notNull(),
    location: text("location"),
    rating: integer("rating").notNull(),
    title: text("title"),
    body: text("body").notNull(),
    verified: boolean("verified").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    productIdx: index("reviews_product_idx").on(table.productId),
  })
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  shippingAddress: text("shipping_address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").default("Philippines").notNull(),
  notes: text("notes"),
  items: jsonb("items").$type<{ productId: number; name: string; price: string; quantity: number; image: string }[]>().notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending").notNull(),
  paymentMethod: text("payment_method").default("cod").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
