"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-ink/10 bg-mist">
      <div className="container-school grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon font-serif text-lg text-white">
              ST
            </span>
            <span className="font-serif text-base font-semibold text-ink">
              St. Theresa Matriculation
              <br />
              Higher Secondary School
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
            Forming minds and character in Sendurai, Tamil Nadu — with a legacy of
            disciplined, values-based education.
          </p>
        </div>

        <div>
          <h3 className="section-label mb-4">Explore</h3>
          <ul className="space-y-2.5 text-sm text-slate">
            <li><Link href="/about" className="hover:text-maroon">About Us</Link></li>
            <li><Link href="/academics" className="hover:text-maroon">Academics</Link></li>
            <li><Link href="/facilities" className="hover:text-maroon">Facilities</Link></li>
            <li><Link href="/events" className="hover:text-maroon">Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="section-label mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-slate">
            <li><Link href="/contact" className="hover:text-maroon">Contact Us</Link></li>
            <li><Link href="/admin/login" className="hover:text-maroon">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="section-label mb-4">Reach Us</h3>
          <address className="space-y-2 text-sm not-italic leading-relaxed text-slate">
            <p>Sendurai, Ariyalur District,<br />Tamil Nadu, India</p>
            <p>
              <a href="tel:+914329000000" className="hover:text-maroon">+91 43290 00000</a>
            </p>
            <p>
              <a href="mailto:info@sttheresasendurai.edu.in" className="hover:text-maroon">
                info@sttheresasendurai.edu.in
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-school flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate md:flex-row">
          <p>© {new Date().getFullYear()} St. Theresa Matriculation Higher Secondary School, Sendurai. All rights reserved.</p>
          <p>Crafted with care for our school community.</p>
        </div>
      </div>
    </footer>
  );
}
