/* ============================================================
   SD Photography — Portfolio Page
   Design: Cinematic Dark Editorial
   Layout: Filterable masonry grid with lightbox
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PORTRAIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-portrait-CRgHVxi4RA3u57a8RqaqBP.webp";
const STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-street-Envm4SuCf4AqFtbAnmVpC9.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-lifestyle-6ETtYmtnWNZrgc4myWrR48.webp";

type Category = "All" | "Street" | "Portrait" | "Lifestyle" | "Events";

const images: { src: string; cat: Category; label: string }[] = [
  { src: PORTRAIT_IMG, cat: "Portrait", label: "Alley Portrait" },
  { src: STREET_IMG, cat: "Street", label: "City Motion" },
  { src: LIFESTYLE_IMG, cat: "Lifestyle", label: "Candid Joy" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", cat: "Portrait", label: "Urban Portrait" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", cat: "Lifestyle", label: "Golden Hour" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", cat: "Events", label: "Together" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", cat: "Portrait", label: "Natural Light" },
  { src: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&q=80", cat: "Street", label: "Street Glow" },
  { src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80", cat: "Lifestyle", label: "Casual Vibes" },
];

const CATEGORIES: Category[] = ["All", "Street", "Portrait", "Lifestyle", "Events"];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".fade-in-up").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useFadeIn();

  const filtered = activeCategory === "All" ? images : images.filter((img) => img.cat === activeCategory);

  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightbox((prev) => (prev !== null ? (prev + 1) % filtered.length : null));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    if (lightbox !== null) {
      document.body.classList.add("lightbox-open");
    } else {
      document.body.classList.remove("lightbox-open");
    }
    return () => document.body.classList.remove("lightbox-open");
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-[#080808]">
        <div className="container">
          <p className="section-label mb-3">Portfolio</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Stories Worth Telling
          </h1>
          <p className="text-white/50 max-w-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Every frame is a real moment — unscripted, unforced, and beautifully human.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-[#0d0d0d] border-b border-white/5 sticky top-[60px] z-40 backdrop-blur-md">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase transition-all border ${
                  activeCategory === cat
                    ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="py-12 bg-[#0d0d0d]">
        <div className="container">
          <div className="masonry-grid">
            {filtered.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="fade-in-up portfolio-item masonry-item cursor-pointer"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full"
                  style={{ display: "block" }}
                />
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

          <div className="mt-14 text-center">
            <Link href="/contact">
              <button className="btn-gold">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={28} />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].label}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="section-label text-[0.6rem]">{filtered[lightbox].cat}</p>
            <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {filtered[lightbox].label}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
