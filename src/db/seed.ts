import { db } from "./index";
import { products, reviews } from "./schema";

const productData = [
  {
    name: "Classic Rellenong Bangus",
    slug: "classic-rellenong-bangus",
    tagline: "The original. The one that started it all.",
    description:
      "Our signature deboned milkfish, hand-stuffed with a savory blend of ground pork, carrots, raisins, and our family's secret sofrito. Slow-marinated for 24 hours, then gently pan-fried to golden perfection. This is the recipe Illiana's grandmother perfected in 1962 — unchanged, unreplicated, unforgettable.",
    story:
      "Three generations of women have guarded this recipe. Illiana learned it at her grandmother's elbow in a small kitchen in Malabon, where the smell of garlic and fried fish meant Sunday was coming. Today, she makes it the same way: by hand, with patience, with love.",
    price: "695.00",
    compareAtPrice: "795.00",
    image: "/images/classic.jpg",
    gallery: ["/images/classic.jpg", "/images/hero.jpg", "/images/story.jpg"],
    category: "Whole Fish",
    tags: ["Bestseller", "Family Recipe", "No Preservatives"],
    featured: true,
    bestseller: true,
    stock: 48,
    servings: "4–5 servings",
    weight: "800g",
    shelfLife: "5 days refrigerated, 3 months frozen",
    spiceLevel: 0,
  },
  {
    name: "Spicy Rellenong Bangus",
    tagline: "For those who like it hot.",
    slug: "spicy-rellenong-bangus",
    description:
      "Everything you love about our Classic, but with a fiery kick. We fold freshly crushed bird's eye chili (siling labuyo) into the stuffing, then glaze the fish in a chili-garlic oil before frying. The heat builds slowly — first on the lips, then in the chest. Not for the faint of heart.",
    story:
      "Illiana's cousin Mateo kept asking for 'something with a bite.' After seventeen attempts, this was the one that made him speechless. We've been making it for him — and now for you — ever since.",
    price: "745.00",
    image: "/images/spicy.jpg",
    gallery: ["/images/spicy.jpg", "/images/classic.jpg", "/images/story.jpg"],
    category: "Whole Fish",
    tags: ["Spicy", "Limited Batch"],
    featured: false,
    bestseller: false,
    stock: 24,
    servings: "4–5 servings",
    weight: "800g",
    shelfLife: "5 days refrigerated, 3 months frozen",
    spiceLevel: 3,
  },
  {
    name: "Rellenong Bangus con Queso",
    tagline: "Molten cheese meets savory fish.",
    slug: "rellenong-bangus-con-queso",
    description:
      "A luxurious twist on the classic. We stuff our milkfish with a blend of sharp cheddar and creamy quick-melt cheese alongside the traditional savory filling. When sliced, the cheese flows like lava. Best served warm, with rice that catches every drop.",
    story:
      "Inspired by the stuffed cheeses of Pampanga, this version was born on a rainy afternoon when Illiana ran out of pork and improvised with what was in the fridge. The result was so good, we never went back.",
    price: "795.00",
    image: "/images/queso.jpg",
    gallery: ["/images/queso.jpg", "/images/classic.jpg", "/images/story.jpg"],
    category: "Whole Fish",
    tags: ["Bestseller", "Cheese", "Family Favorite"],
    featured: true,
    bestseller: true,
    stock: 36,
    servings: "4–5 servings",
    weight: "850g",
    shelfLife: "5 days refrigerated, 3 months frozen",
    spiceLevel: 0,
  },
  {
    name: "Rellenong Bangus sa Hipon",
    tagline: "Surf meets stuffed.",
    slug: "rellenong-bangus-sa-hipon",
    description:
      "Plump, sweet tiger shrimp folded into our traditional milkfish stuffing. The shrimp stay tender and juicy inside the fish, releasing their briny sweetness into every bite. A celebration of the Philippine coast, on a plate.",
    story:
      "The shrimp come from a small co-op in Bais, Negros Oriental — the same waters Illiana's grandfather fished as a boy. We pay above market rate to keep that fishery alive and that community thriving.",
    price: "895.00",
    compareAtPrice: "995.00",
    image: "/images/hipon.jpg",
    gallery: ["/images/hipon.jpg", "/images/classic.jpg", "/images/story.jpg"],
    category: "Whole Fish",
    tags: ["Premium", "Seafood", "Sustainable"],
    featured: true,
    bestseller: false,
    stock: 18,
    servings: "4–5 servings",
    weight: "900g",
    shelfLife: "4 days refrigerated, 3 months frozen",
    spiceLevel: 0,
  },
  {
    name: "Rellenong Bangus Lumpia",
    tagline: "Crispy. Dippable. Dangerous.",
    slug: "rellenong-bangus-lumpia",
    description:
      "All the flavor of our classic rellenong bangus, wrapped in a delicate lumpia wrapper and fried to a shatter-crisp golden brown. Perfect for parties, merienda, or a midnight snack. Comes with our house-made sweet chili garlic dipping sauce.",
    story:
      "Illiana's kids wanted rellenong bangus 'to go.' So she rolled it. The lumpia version became an instant hit at every family gathering — and now, at every one of yours.",
    price: "495.00",
    image: "/images/lumpia.jpg",
    gallery: ["/images/lumpia.jpg", "/images/classic.jpg", "/images/story.jpg"],
    category: "Lumpia & Snacks",
    tags: ["Bestseller", "Party Favorite", "Kid-Approved"],
    featured: false,
    bestseller: true,
    stock: 60,
    servings: "12 pieces",
    weight: "500g",
    shelfLife: "5 days refrigerated, 4 months frozen",
    spiceLevel: 1,
  },
  {
    name: "The Illiana Gift Set",
    tagline: "A taste of home, beautifully boxed.",
    slug: "illiana-gift-set",
    description:
      "Our complete collection in one elegant box: one Classic Rellenong Bangus, one con Queso, one sa Hipon, and a dozen lumpia — paired with our house sweet chili sauce, spiced vinegar, and a jar of Illiana's signature calamansi concentrate. Wrapped in hand-tied abaca ribbon with a handwritten note.",
    story:
      "The gift set was our first product sold outside the family. Every box is still packed by hand, by Illiana herself. Each one leaves the kitchen with a small card: 'Salamat for supporting our family table.'",
    price: "2495.00",
    compareAtPrice: "2890.00",
    image: "/images/giftset.jpg",
    gallery: ["/images/giftset.jpg", "/images/classic.jpg", "/images/queso.jpg", "/images/hipon.jpg"],
    category: "Gift Sets",
    tags: ["Bestseller", "Gift", "Complete Collection"],
    featured: true,
    bestseller: true,
    stock: 12,
    servings: "12–15 servings",
    weight: "3.2kg",
    shelfLife: "5 days refrigerated, 3 months frozen",
    spiceLevel: 0,
  },
];

const reviewData = [
  // Classic
  {
    slug: "classic-rellenong-bangus",
    author: "Maricar Reyes",
    location: "Quezon City",
    rating: 5,
    title: "Tastes exactly like Lola's",
    body: "I cried when I took the first bite. It's been 12 years since my grandmother passed, and this tastes exactly like hers. The stuffing is perfectly seasoned and the fish stays moist. Worth every peso.",
    verified: true,
  },
  {
    slug: "classic-rellenong-bangus",
    author: "James Tan",
    location: "Makati",
    rating: 5,
    title: "Best rellenong bangus in Metro Manila",
    body: "I've tried every rellenong bangus in the city, from the famous ones in Binondo to the small carinderias. Nothing comes close to Illiana's. The balance of sweet and savory is perfect.",
    verified: true,
  },
  {
    slug: "classic-rellenong-bangus",
    author: "Patricia Lim",
    location: "Pasig",
    rating: 4,
    title: "Delicious but small portions",
    body: "Flavor is incredible — the sofrito really comes through. Wish the fish was a bit bigger for the price, but I understand the quality is there. Will order again.",
    verified: true,
  },
  {
    slug: "classic-rellenong-bangus",
    author: "Ricardo Santos",
    location: "Cavite",
    rating: 5,
    title: "Sunday lunch staple",
    body: "Been ordering every Sunday for six months. Never disappoints. Always arrives fresh, always beautifully packed. My kids fight over the last slice.",
    verified: true,
  },
  {
    slug: "classic-rellenong-bangus",
    author: "Anna Cruz",
    location: "BGC",
    rating: 5,
    title: "Perfect for Noche Buena",
    body: "Ordered three for Christmas Eve. The whole family was impressed. Illiana even included a handwritten card. This is what home cooking should feel like.",
    verified: true,
  },
  // Spicy
  {
    slug: "spicy-rellenong-bangus",
    author: "Mark Villanueva",
    location: "Manila",
    rating: 5,
    title: "Finally, some heat!",
    body: "I love spicy food and most Filipino dishes are too mild for me. This one hits perfectly — the labuyo gives a real kick without overwhelming the fish. Three pieces in and I'm sweating happily.",
    verified: true,
  },
  {
    slug: "spicy-rellenong-bangus",
    author: "Bea Mendoza",
    location: "San Juan",
    rating: 4,
    title: "Spicy but could be spicier",
    body: "Really enjoyed it, the chili flavor is great. For serious heat lovers like me, I wish it was even hotter. Maybe a level 4 or 5 option? Still, the quality of the fish and stuffing is top-notch.",
    verified: true,
  },
  {
    slug: "spicy-rellenong-bangus",
    author: "Carlos Aquino",
    location: "Mandaluyong",
    rating: 5,
    title: "The chili garlic oil glaze is genius",
    body: "That finishing glaze is what makes this. The chili oil soaks into the stuffing as it cooks. Best spicy rellenong bangus I've had, hands down.",
    verified: true,
  },
  // Queso
  {
    slug: "rellenong-bangus-con-queso",
    author: "Sophia Garcia",
    location: "Alabang",
    rating: 5,
    title: "The cheese pull is unreal",
    body: "I bought this for my kids and they lost their minds. The cheese oozes out when you slice it. We ate the whole thing in one sitting. Already ordered another.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-con-queso",
    author: "Diego Ramos",
    location: "Parañaque",
    rating: 5,
    title: "Decadent and worth it",
    body: "This is the rellenong bangus you serve at dinner parties. Looks impressive, tastes even better. The cheese doesn't overpower the fish — it complements it. Illiana, you've outdone yourself.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-con-queso",
    author: "Liezl Domingo",
    location: "Taguig",
    rating: 4,
    title: "Rich, maybe too rich",
    body: "Incredibly delicious but very filling — a little goes a long way. Perfect for sharing. The quality of cheese is clearly premium. Will order again for special occasions.",
    verified: true,
  },
  // Hipon
  {
    slug: "rellenong-bangus-sa-hipon",
    author: "Francis Co",
    location: "Makati",
    rating: 5,
    title: "Worth the splurge",
    body: "Yes it's pricey, but you can taste the quality. The shrimp are sweet and fresh, not rubbery. You can tell they're using real tiger shrimp, not the cheap stuff. A celebration dish.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-sa-hipon",
    author: "Mira Bautista",
    location: "Quezon City",
    rating: 5,
    title: "My birthday order",
    body: "Ordered this for my birthday dinner instead of cake. Best decision. The shrimp flavor permeates the whole stuffing. Illiana, you're a genius. Thank you for sourcing sustainably too.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-sa-hipon",
    author: "Tony Ocampo",
    location: "Pasay",
    rating: 5,
    title: "Restaurant quality at home",
    body: "I used to order rellenong bangus at fancy restaurants. Now I just order from Illiana. The hipon version is better than anything I've had at a restaurant, and it's a third of the price.",
    verified: true,
  },
  // Lumpia
  {
    slug: "rellenong-bangus-lumpia",
    author: "Rina Flores",
    location: "Manila",
    rating: 5,
    title: "Dangerous party snack",
    body: "Brought these to a party and they vanished in five minutes. The wrapper shatters when you bite into it, and the filling is so flavorful. The sweet chili dip is the perfect partner.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-lumpia",
    author: "Kevin Chua",
    location: "Makati",
    rating: 5,
    title: "My kids' new favorite",
    body: "Three kids, twelve lumpia, gone in one merienda. They don't even know they're eating fish. Brilliant way to get them to eat seafood. The texture is perfect — crispy outside, moist inside.",
    verified: true,
  },
  {
    slug: "rellenong-bangus-lumpia",
    author: "Gemma Torres",
    location: "Cainta",
    rating: 4,
    title: "Great but wish there were more",
    body: "Delicious, perfectly crispy, the dipping sauce is amazing. Only complaint: twelve pieces isn't enough for our family. Please sell a 24-piece pack!",
    verified: true,
  },
  {
    slug: "rellenong-bangus-lumpia",
    author: "Noah Villamor",
    location: "Antipolo",
    rating: 5,
    title: "Better than lumpiang shanghai",
    body: "Controversial take but I stand by it. The bangus filling is more flavorful than the usual pork shanghai. Crispier wrapper too. This is my new go-to potluck contribution.",
    verified: true,
  },
  // Gift Set
  {
    slug: "illiana-gift-set",
    author: "Josephine Ong",
    location: "Singapore",
    rating: 5,
    title: "Sent to my family abroad",
    body: "Shipped this to my mom in Singapore and she cried. The packaging was beautiful, the food arrived fresh, and the handwritten note from Illiana made her feel at home. Thank you for what you do.",
    verified: true,
  },
  {
    slug: "illiana-gift-set",
    author: "Ramon Aquino",
    location: "Davao",
    rating: 5,
    title: "Perfect corporate gift",
    body: "Ordered 15 for our top clients. Every single one sent a thank you message. The box is gorgeous, the food is exceptional, and the calamansi concentrate is now a staple in all their kitchens.",
    verified: true,
  },
  {
    slug: "illiana-gift-set",
    author: "Christine Uy",
    location: "Cebu",
    rating: 5,
    title: "A gift that keeps giving",
    body: "Bought this for my in-laws for their anniversary. They've been eating rellenong bangus for 40 years and said this was the best they've ever had. High praise from a tough crowd.",
    verified: true,
  },
];

export async function seedDatabase() {
  const existing = await db.select({ count: products.id }).from(products);
  if (existing.length > 0) {
    console.log(`[seed] Database already seeded with ${existing.length} products. Skipping.`);
    return;
  }

  console.log("[seed] Seeding database...");

  for (const p of productData) {
    await db.insert(products).values(p);
  }

  const allProducts = await db.select().from(products);
  const slugToId = new Map(allProducts.map((p) => [p.slug, p.id]));

  for (const r of reviewData) {
    const productId = slugToId.get(r.slug);
    if (!productId) continue;
    const { slug, ...rest } = r;
    await db.insert(reviews).values({ productId, ...rest });
  }

  // Recompute ratings and review counts
  for (const p of allProducts) {
    const productReviews = await db.select().from(reviews).where(
      (await import("drizzle-orm")).eq(reviews.productId, p.id)
    );
    if (productReviews.length > 0) {
      const avg =
        productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      await db
        .update(products)
        .set({
          rating: avg.toFixed(2),
          reviewsCount: productReviews.length,
        })
        .where((await import("drizzle-orm")).eq(products.id, p.id));
    }
  }

  console.log(`[seed] Done. ${productData.length} products and ${reviewData.length} reviews seeded.`);
}

// Re-export a runner for the scripts/seed.ts wrapper.
export async function runSeed() {
  await seedDatabase();
}
