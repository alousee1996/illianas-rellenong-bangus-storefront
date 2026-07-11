"use client";

import { useState, useEffect } from "react";

const messages = [
  "Free delivery within Metro Manila on orders over ₱1,500",
  "Hand-packed fresh every Tuesday and Friday",
  "Now shipping nationwide via cold-chain courier",
  "Use code FAMILY10 for 10% off your first order",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-forest-dark text-cream/90 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2.5 text-center">
        <p key={index} className="animate-fade-in tracking-wide">
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
