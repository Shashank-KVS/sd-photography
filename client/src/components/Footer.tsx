/* ============================================================
   SD Photography — Footer Component
   Design: Dark minimal, gold accents, single CTA
   ============================================================ */
import { Link } from "wouter";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                className="text-white font-bold tracking-widest text-xl block"
                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.2em" }}
              >
                SD
              </span>
              <span
                className="text-[0.6rem] tracking-[0.35em] uppercase"
                style={{ color: "var(--gold)", fontFamily: "'Outfit', sans-serif" }}
              >
                Photography
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Real stories. Real people. Cinematic moments captured in the streets of Toronto.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <MapPin size={12} className="text-[#c9a84c]" />
              <span className="text-white/40 text-xs tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Toronto, Ontario
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-white/50 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA + Social */}
          <div>
            <p className="section-label mb-5">Ready to Shoot?</p>
            <p className="text-white/50 text-sm mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Let's turn your moments into stories.
            </p>
            <Link href="/contact">
              <button className="btn-gold mb-6">Book Your Shoot</button>
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com/sdscapture_moments"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-[#c9a84c] transition-colors text-xs"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Instagram size={14} />
                @sdscapture_moments
              </a>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <a
                href="mailto:hello@sdphotography.ca"
                className="flex items-center gap-2 text-white/40 hover:text-[#c9a84c] transition-colors text-xs"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Mail size={14} />
                hello@sdphotography.ca
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            © {new Date().getFullYear()} SD Photography. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-white/25 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              🏙 Street
            </span>
            <span className="text-white/15 mx-2">·</span>
            <span className="text-white/25 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              👤 Portrait
            </span>
            <span className="text-white/15 mx-2">·</span>
            <span className="text-white/25 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              🌄 Landscapes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
