import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = "sm",
  showNumber = false,
  className,
}: {
  rating: number;
  size?: "xs" | "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}) {
  const sizes = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <Star
              key={i}
              className={cn(
                sizes[size],
                isFull || isHalf
                  ? "fill-gold text-gold"
                  : "fill-transparent text-bone"
              )}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-stone">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
