/* ============================================================
   SD Photography — About Page
   Design: Cinematic Dark Editorial
   Layout: Split image + text, values, CTA
   ============================================================ */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, Instagram, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-about-V5bbba6gshA754GgsADV3v.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-lifestyle-6ETtYmtnWNZrgc4myWrR48.webp";

const values = [
  {
    number: "01",
    title: "Authenticity First",
    desc: "No forced poses, no artificial setups. Every session is guided but never scripted — your real self is always the subject.",
  },
  {
    number: "02",
    title: "Cinematic Vision",
    desc: "Influenced by film photography and documentary storytelling, every image is edited to feel like a still from a movie.",
  },
  {
    number: "03",
    title: "Toronto Is My Studio",
    desc: "The city's streets, parks, and architecture are the backdrop. I know every golden-hour corner and every moody alley.",
  },
  {
    number: "04",
    title: "Fast & Reliable",
    desc: "Your gallery is delivered within 48–72 hours. No waiting weeks for memories that should feel immediate.",
  },
];

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

export default function About() {
  const ref1 = useFadeIn();
  const ref2 = useFadeIn();
  const ref3 = useFadeIn();

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-[#080808]">
        <div className="container">
          <p className="section-label mb-3">About</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Person Behind
            <br />
            <em className="italic font-normal" style={{ color: "var(--gold)" }}>the Lens</em>
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section ref={ref1} className="py-20 bg-[#0d0d0d]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="fade-in-up portfolio-item" style={{ aspectRatio: "3/4", maxHeight: "600px" }}>
              <img src={ABOUT_IMG} alt="SD Photography — Photographer at work" className="w-full h-full object-cover" />
            </div>

            {/* Text */}
            <div className="fade-in-up" style={{ transitionDelay: "0.15s" }}>
              <div className="flex items-center gap-2 mb-6">
                <Camera size={14} style={{ color: "var(--gold)" }} />
                <span className="section-label">SD Photography</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real moments.<br />
                <em className="italic font-normal">Unfiltered stories.</em>
              </h2>

              <div className="space-y-5 text-white/65 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <p>
                  I'm a Toronto-based photographer focused on capturing real, unfiltered moments — from the energy of the streets to personal portrait stories.
                </p>
                <p>
                  My approach is simple: no forced poses, no artificial setups — just real emotions and natural storytelling. Every photo is meant to feel like a memory, not just an image.
                </p>
                <p>
                  Whether you're looking for a cinematic portrait, a candid lifestyle session, or coverage of a meaningful event, I bring the same dedication to every frame: patience, intention, and a genuine love for the craft.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8 mb-8">
                {["📍 Toronto-based", "🏙 Street", "👤 Portrait", "🚗 Auto", "🌄 Landscapes"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs border border-white/10 text-white/50"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-4 mb-8">
                <a
                  href="https://instagram.com/sdscapture_moments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-[#c9a84c] transition-colors text-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Instagram size={16} />
                  @sdscapture_moments
                </a>
                <div className="flex items-center gap-2 text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <MapPin size={14} />
                  Toronto, Ontario
                </div>
              </div>

              <Link href="/contact">
                <button className="btn-gold">Book Your Shoot</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref2} className="py-20 bg-[#080808]">
        <div className="container">
          <div className="fade-in-up mb-12">
            <p className="section-label mb-3">Philosophy</p>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Drives Every Shot
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="fade-in-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span
                  className="text-5xl font-bold block mb-4"
                  style={{ color: "rgba(201,168,76,0.15)", fontFamily: "'Playfair Display', serif" }}
                >
                  {v.number}
                </span>
                <h3
                  className="text-white font-semibold text-lg mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section ref={ref3} className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${LIFESTYLE_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/60" />
        <div className="container relative z-10 text-center">
          <div className="fade-in-up">
            <p className="section-label mb-4">Let's Work Together</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Story Is Waiting
            </h2>
            <Link href="/contact">
              <button className="btn-gold">Book Your Shoot</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
