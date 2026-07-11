"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : ["/images/classic.jpg"];

  return (
    <div className="lg:sticky lg:top-24">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-bone">
        <Image
          src={safeImages[active]}
          alt={alt}
          fill
          priority
          className="object-cover transition-all duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {safeImages.length > 1 && (
          <div className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-charcoal backdrop-blur-sm">
            {active + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-lg bg-bone transition-all",
                active === i
                  ? "ring-2 ring-forest ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${alt} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
