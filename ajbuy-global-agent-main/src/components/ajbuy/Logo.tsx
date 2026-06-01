import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/ajbuy-logo.png";

type Size = "sm" | "md" | "lg" | "xl";
const sizes: Record<Size, string> = {
  sm: "h-8 md:h-9",
  md: "h-12 md:h-13",
  lg: "h-14 md:h-16",
  xl: "h-20 md:h-24",
};

export function Logo({ className = "", size = "md", asLink = true }: { className?: string; size?: Size; asLink?: boolean }) {
  const img = (
    <img
      src={logoUrl}
      alt="AJBUY — Shop Like a Millionaire"
      className={`${sizes[size]} w-auto object-contain select-none`}
      draggable={false}
    />
  );
  if (!asLink) return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="AJBUY home">
      {img}
    </Link>
  );
}
