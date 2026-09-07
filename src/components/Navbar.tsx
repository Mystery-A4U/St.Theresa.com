"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-ink/10 bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <div className="container-school flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-lg font-serif text-white">
            ST
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-semibold text-ink md:text-base">
              St. Theresa Matric Hr Sec School
            </span>
            <span className="block text-xs text-slate">Sendurai, Tamil Nadu</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? "text-maroon" : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-maroon" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-maroon px-5 py-2.5 text-sm font-medium text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-maroon-light"
          >
            Enquire Now
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-ink transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[1.5px] w-full bg-ink transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-white md:hidden">
          <nav className="container-school flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink/80 hover:bg-mist hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-maroon px-5 py-3 text-center text-sm font-medium text-white"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
