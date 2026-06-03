import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type CategoryCarouselItem = {
  name: string;
  emoji?: string;
  image?: string;
  highlight?: boolean;
};

type Props = {
  items: CategoryCarouselItem[];
};

export function CategoriesCarousel({ items }: Readonly<Props>) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("categories-carousel");
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === "left"
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full bg-background border hover:bg-muted transition-colors inline-flex items-center justify-center"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Carousel */}
      <div
        id="categories-carousel"
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {items.map((item) => (
          <Link
            key={item.name}
            to="/search"
            search={{ category: item.name }}
            className="group relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg w-32 h-40"
          >
            {/* Product image background */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/[0.02] flex items-center justify-center text-5xl relative overflow-hidden">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Category label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs font-bold">
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full bg-background border hover:bg-muted transition-colors inline-flex items-center justify-center"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
