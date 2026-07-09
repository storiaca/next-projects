import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-300 items-center gap-4 px-4">
        <Link
          href="/"
          className={
            "flex items-center gap-2 font-semibold tracking-tight text-foreground"
          }
        >
          <span
            className="flex size-8 items-center justify-center rounded-full bg-primary-hover text-sm font-bold text-primary-foreground"
            aria-hidden
          >
            T
          </span>
          <span className="text-lg">Threadly</span>
        </Link>
        <div className="">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
