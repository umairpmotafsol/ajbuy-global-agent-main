import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export function NavSearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (q.trim()) void navigate({ to: "/search", search: { q: q.trim() } });
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 min-w-0">
      <div className="flex items-center rounded-full border-2 border-primary bg-background pl-4 pr-1.5 py-1 gap-2 focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] transition-shadow">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Please enter the product name/link"
          className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="h-8 w-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center shrink-0 hover:bg-primary-deep transition-colors"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
