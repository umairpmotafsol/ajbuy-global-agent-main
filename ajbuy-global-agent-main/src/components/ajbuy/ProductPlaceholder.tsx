import { ShoppingBag } from "lucide-react";

export function ProductPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-muted text-muted-foreground rounded-lg ${className}`}>
      <ShoppingBag className="w-1/3 h-1/3" />
    </div>
  );
}
