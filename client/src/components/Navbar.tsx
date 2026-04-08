/* ============================================================
   SD Photography — Navbar Component
   Design: Transparent → solid dark on scroll, gold CTA
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex flex-col leading-none select-none">
            <span
              className="text-white font-bold tracking-widest text-lg"
              style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.2em" }}
            >
              SD
            </span>
            <span
              className="text-[0.55rem] tracking-[0.35em] uppercase"
              style={{ color: "var(--gold)", fontFamily: "'Outfit', sans-serif" }}
            >
              Photography
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`nav-link ${location === link.href ? "active" : ""}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="btn-gold text-xs py-3 px-6">Book Your Shoot</button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d]/98 border-t border-white/5">
          <div className="container py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block text-sm font-medium tracking-widest uppercase transition-colors ${
                    location === link.href ? "text-[#c9a84c]" : "text-white/80 hover:text-white"
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <button className="btn-gold w-full justify-center mt-2">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
