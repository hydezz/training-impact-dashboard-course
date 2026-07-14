"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/course", label: "Khóa học" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workbook", label: "Workbook" },
  { href: "/prompt-library", label: "Prompt Library" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/certificate", label: "Certificate" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { coursePct, loaded } = useProgress();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold text-brand-800">
          <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-800 text-sm font-bold text-white">
            TI
          </span>
          <span className="hidden truncate sm:block">Training Impact Course</span>
        </Link>

        <nav aria-label="Chính" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-800" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {loaded && coursePct > 0 && (
            <span className="hidden rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 sm:block">
              Tiến độ: {coursePct}%
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Mở menu"
            className="rounded-md border border-slate-300 p-2 text-slate-600 lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Menu di động" className="border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-sm font-medium ${
                  active ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
