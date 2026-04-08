/* ============================================================
   SD Photography — Home Page (High-Conversion)
   Design: Cinematic Dark Editorial
   Sections: Hero, Social Proof, Portfolio Preview,
             Differentiation, Services, Lead Capture, Final CTA
   ============================================================ */
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitContactLead } from "@/lib/contact";
import {
  MapPin, Instagram, Target, Film, Zap, Star, ChevronRight, Camera
} from "lucide-react";

// Cinematic photography images (CDN)
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-hero-ZUjmdmVbLFe2SyTeP9YaK2.webp";
const PORTRAIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-portrait-CRgHVxi4RA3u57a8RqaqBP.webp";
const STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-street-Envm4SuCf4AqFtbAnmVpC9.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-lifestyle-6ETtYmtnWNZrgc4myWrR48.webp";

// Unsplash portfolio grid images
const PORTFOLIO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", cat: "Portrait Vibes", label: "Urban Portrait" },
  { src: STREET_IMG, cat: "Street Stories", label: "City Motion" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", cat: "Lifestyle Moments", label: "Golden Hour" },
  { src: PORTRAIT_IMG, cat: "Portrait Vibes", label: "Alley Light" },
  { src: LIFESTYLE_IMG, cat: "Lifestyle Moments", label: "Candid Joy" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", cat: "City Life", label: "Together" },
];

const testimonials = [
  {
    quote: "Your photos feel like scenes from a movie. I've never seen myself look this real and this beautiful at the same time.",
    author: "Priya M.",
    role: "Portrait Client",
  },
  {
    quote: "I've never felt this natural in front of a camera. SD just has this way of making you forget there's a lens on you.",
    author: "James T.",
    role: "Lifestyle Shoot",
  },
  {
    quote: "Best photography experience I've had in Toronto. The turnaround was fast and every single photo was gallery-worthy.",
    author: "Aisha K.",
    role: "Couple Shoot",
  },
];

const differentiators = [
  { icon: Target, title: "No Awkward Posing", desc: "Natural, guided shoots that bring out your authentic self." },
  { icon: Film, title: "Cinematic Editing", desc: "Premium visual feel — every image tells a story." },
  { icon: Zap, title: "48–72 Hour Turnaround", desc: "Your memories delivered fast, without cutting corners." },
  { icon: MapPin, title: "Toronto Expertise", desc: "We know every corner of the city that makes a great shot." },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".fade-in-up").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", shootType: "", date: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await submitContactLead({
        ...form,
        source: "home-page",
      });

      setSubmitted(true);
      setForm({ name: "", email: "", shootType: "", date: "", message: "" });
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not send your request right now. Please try again in a minute.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <Camera size={40} className="mx-auto mb-4" style={{ color: "var(--gold)" }} />
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Message Received!
        </h3>
        <p className="text-white/60" style={{ fontFamily: "'Outfit', sans-serif" }}>
          I'll be in touch within 24 hours to confirm your shoot details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        className="form-input"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        className="form-input"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <select
        className="form-input"
        value={form.shootType}
        onChange={(e) => setForm({ ...form, shootType: e.target.value })}
        required
      >
        <option value="" disabled>Type of Shoot</option>
        <option value="portrait">Portrait</option>
        <option value="couple">Couple Shoot</option>
        <option value="street">Street / Lifestyle</option>
        <option value="event">Event</option>
        <option value="branding">Personal Branding</option>
      </select>
      <input
        type="date"
        className="form-input"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <textarea
        className="form-input sm:col-span-2 resize-none"
        rows={4}
        placeholder="Tell me about your vision..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {errorMessage ? (
        <p className="sm:col-span-2 text-red-300 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {errorMessage}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-gold w-full justify-center text-sm" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Book Your Shoot"}
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const proofRef = useFadeIn();
  const portfolioRef = useFadeIn();
  const diffRef = useFadeIn();
  const servicesRef = useFadeIn();
  const formRef = useFadeIn();

  // Hero parallax
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector(".hero-bg") as HTMLElement;
        if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
        {/* Background image with parallax */}
        <div
          className="hero-bg absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/85 via-[#0d0d0d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="container relative z-10 pt-20">
          <div className="max-w-xl">
            {/* Location tag */}
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={12} style={{ color: "var(--gold)" }} />
              <span className="section-label">Toronto-based</span>
              <span className="text-white/20 mx-1">·</span>
              <span className="section-label text-white/40">Street · Portrait · Auto · Landscapes</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Capture Moments
              <br />
              <em className="italic font-normal" style={{ color: "var(--gold)" }}>That Feel Real</em>
              <br />
              — Not Posed
            </h1>

            <p
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Toronto-based street, portrait &amp; lifestyle photography that tells your story.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/contact">
                <button className="btn-gold">
                  Book Your Shoot
                  <ChevronRight size={16} />
                </button>
              </Link>
              <Link href="/portfolio">
                <span
                  className="text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors border-b border-white/20 hover:border-white pb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  View Portfolio
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section ref={proofRef} className="py-24 bg-[#0d0d0d]">
        <div className="container">
          <div className="fade-in-up text-center mb-14">
            <p className="section-label mb-3">What Clients Say</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Stories Behind the Lens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="fade-in-up testimonial-card"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#c9a84c" className="text-[#c9a84c]" />
                  ))}
                </div>
                <p
                  className="text-white/75 text-base leading-relaxed mb-5 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.author}
                  </p>
                  <p className="text-white/40 text-xs tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram trust signal */}
          <div className="fade-in-up mt-12 flex justify-center">
            <a
              href="https://instagram.com/sdscapture_moments"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/40 hover:text-[#c9a84c] transition-colors group"
            >
              <Instagram size={18} />
              <span className="text-sm tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                @sdscapture_moments
              </span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section ref={portfolioRef} className="py-24 bg-[#080808]">
        <div className="container">
          <div className="fade-in-up mb-12">
            <p className="section-label mb-3">Selected Work</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Stories Worth Telling
              </h2>
              <Link href="/portfolio">
                <span
                  className="text-white/40 hover:text-[#c9a84c] text-xs tracking-widest uppercase transition-colors border-b border-white/10 hover:border-[#c9a84c] pb-0.5"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  View All Work →
                </span>
              </Link>
            </div>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {PORTFOLIO_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`fade-in-up portfolio-item overflow-hidden ${
                  i === 0 ? "row-span-2 col-span-1" : ""
                }`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  aspectRatio: i === 0 ? "3/4" : "4/3",
                }}
              >
                <img src={img.src} alt={img.label} loading="lazy" className="w-full h-full object-cover" />
                <div className="overlay">
                  <div>
                    <p className="section-label text-[0.6rem]">{img.cat}</p>
                    <p className="text-white text-sm font-medium mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {img.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-in-up mt-10 text-center">
            <Link href="/contact">
              <button className="btn-gold">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATION ── */}
      <section ref={diffRef} className="py-24 bg-[#0d0d0d]">
        <div className="container">
          <div className="fade-in-up text-center mb-14">
            <p className="section-label mb-3">Why SD Photography</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Difference Is in the Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="fade-in-up service-card p-7"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-5 border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3
                    className="text-white font-semibold text-base mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {d.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="fade-in-up mt-12 text-center">
            <Link href="/contact">
              <button className="btn-gold">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden">
        {/* Background image strip */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${LIFESTYLE_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/70" />

        <div className="container relative z-10">
          <div className="fade-in-up text-center mb-14">
            <p className="section-label mb-3">Services</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every Story Deserves a Frame
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Portrait Photography",
                desc: "Individual or couples. Natural light, real expressions.",
                detail: "1–2 hour session · 10–20 edited photos",
                price: "From $149",
              },
              {
                title: "Street Lifestyle Shoot",
                desc: "Candid storytelling in Toronto's best urban locations.",
                detail: "Natural interactions · Urban locations",
                price: "From $129",
              },
              {
                title: "Event Photography",
                desc: "Small events & cultural moments captured documentary-style.",
                detail: "Full coverage · Authentic moments",
                price: "From $249",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="fade-in-up service-card p-8 text-center"
                style={{ transitionDelay: `${i * 0.15}s`, background: "rgba(13,13,13,0.85)" }}
              >
                <h3
                  className="text-white font-bold text-xl mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {s.desc}
                </p>
                <p className="text-white/35 text-xs tracking-wider mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {s.detail}
                </p>
                <div className="gold-divider mx-auto mb-5" />
                <p
                  className="font-bold text-lg"
                  style={{ color: "var(--gold)", fontFamily: "'Outfit', sans-serif" }}
                >
                  {s.price}
                </p>
              </div>
            ))}
          </div>

          <div className="fade-in-up mt-10 text-center">
            <Link href="/contact">
              <button className="btn-gold">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section ref={formRef} className="py-24 bg-[#080808]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="fade-in-up text-center mb-10">
              <p className="section-label mb-3">Get In Touch</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Capture Your Story
              </h2>
              <p className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Not posed. Not forced. Just real moments — beautifully captured.
              </p>
            </div>
            <div className="fade-in-up">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${PORTRAIT_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            filter: "brightness(0.25)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/50" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Ready?</p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Turn Your Moments
            <br />
            <em className="italic font-normal" style={{ color: "var(--gold)" }}>Into Stories?</em>
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-md mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Toronto's streets are waiting. Your story is ready to be told.
          </p>
          <Link href="/contact">
            <button className="btn-gold text-sm px-10 py-4">Book Your Shoot</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
