import { NextRequest } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      email,
      phone,
      shippingAddress,
      city,
      postalCode,
      country = "Philippines",
      notes,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod = "cod",
    } = body;

    // Basic validation
    if (!customerName || !email || !shippingAddress || !city || !postalCode || !items || !subtotal || !shipping || !total) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `ILL-${Date.now().toString(36).toUpperCase().slice(-8)}`;

    const inserted = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        email,
        phone: phone || null,
        shippingAddress,
        city,
        postalCode,
        country,
        notes: notes || null,
        items,
        subtotal: subtotal.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
        status: "pending",
        paymentMethod,
      })
      .returning();

    const order = inserted[0];

    return Response.json(
      {
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order POST error:", error);
    return Response.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
