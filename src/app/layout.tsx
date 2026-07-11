import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Illiana's Rellenong Bangus — A Family Recipe Since 1962",
    template: "%s · Illiana's Rellenong Bangus",
  },
  description:
    "Hand-stuffed, deboned milkfish made the way Illiana's grandmother taught her. Three generations of Filipino flavor, delivered to your door.",
  openGraph: {
    title: "Illiana's Rellenong Bangus",
    description:
      "Hand-stuffed, deboned milkfish made the way Illiana's grandmother taught her. Three generations of Filipino flavor, delivered to your door.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3d3e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
