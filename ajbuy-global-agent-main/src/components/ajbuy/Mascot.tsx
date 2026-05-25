import logoUrl from "@/assets/ajbuy-logo.png";

// Mascot was deprecated in favor of the AJBUY logo. Kept for backwards-compatible imports.
export function Mascot({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="AJBUY"
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
