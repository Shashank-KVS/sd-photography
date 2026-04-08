/* ============================================================
   SD Photography — Services Page
   Design: Cinematic Dark Editorial
   Layout: Full-width service cards with pricing
   ============================================================ */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Clock, Image, CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-hero-ZUjmdmVbLFe2SyTeP9YaK2.webp";
const STREET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-street-Envm4SuCf4AqFtbAnmVpC9.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-lifestyle-6ETtYmtnWNZrgc4myWrR48.webp";

const services = [
  {
    title: "Portrait Photography",
    subtitle: "Individual & Couples",
    description:
      "Whether it's a solo portrait or a couple's shoot, I create a relaxed environment where your personality shines through. No stiff poses — just you, the city, and real moments.",
    duration: "1–2 hours",
    deliverables: "15 edited high-resolution images",
    price: "$149",
    includes: [
      "Pre-shoot consultation",
      "Location scouting in Toronto",
      "Natural light & guided posing",
      "Professional retouching",
      "Online gallery delivery",
      "48–72 hour turnaround",
    ],
    image: HERO_IMG,
    featured: true,
  },
  {
    title: "Street Lifestyle Shoot",
    subtitle: "Candid Storytelling",
    description:
      "Toronto's streets are a living backdrop. This session captures you in motion — walking, laughing, being yourself — in the city's most cinematic locations.",
    duration: "1.5 hours",
    deliverables: "12 edited images",
    price: "$129",
    includes: [
      "Urban location selection",
      "Candid & documentary style",
      "Natural interactions",
      "Film-inspired editing",
      "Online gallery delivery",
      "48–72 hour turnaround",
    ],
    image: STREET_IMG,
    featured: false,
  },
  {
    title: "Event Photography",
    subtitle: "Small Events & Cultural Moments",
    description:
      "From intimate gatherings to cultural celebrations, I document the energy and emotion of your event with a documentary eye — so every detail is preserved.",
    duration: "2–4 hours",
    deliverables: "30–50 edited images",
    price: "$249",
    includes: [
      "Full event coverage",
      "Documentary-style approach",
      "Candid & posed moments",
      "Quick preview delivery",
      "Full gallery within 5 days",
      "Print-ready resolution",
    ],
    image: LIFESTYLE_IMG,
    featured: false,
  },
  {
    title: "Personal Branding",
    subtitle: "Instagram & Content Creation",
    description:
      "Build a cohesive visual identity for your personal brand or social media presence. Curated looks, intentional locations, and a consistent aesthetic throughout.",
    duration: "2 hours",
    deliverables: "20 edited images",
    price: "$199",
    includes: [
      "Brand mood board consultation",
      "Multiple outfit changes",
      "Variety of locations",
      "Social-media optimized crops",
      "Online gallery delivery",
      "48–72 hour turnaround",
    ],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    featured: false,
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

export default function Services() {
  const ref = useFadeIn();

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-[#080808]">
        <div className="container">
          <p className="section-label mb-3">Services & Pricing</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every Story Deserves
            <br />
            <em className="italic font-normal" style={{ color: "var(--gold)" }}>a Perfect Frame</em>
          </h1>
          <p className="text-white/50 max-w-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transparent pricing. Real value. Cinematic results.
          </p>
        </div>
      </section>

      {/* Services */}
      <section ref={ref} className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <div className="flex flex-col gap-16">
            {services.map((service, i) => (
              <div
                key={i}
                className="fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div
                  className={`portfolio-item overflow-hidden relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover" />
                  {service.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="px-3 py-1 text-[0.65rem] tracking-widest uppercase"
                        style={{
                          background: "var(--gold)",
                          color: "#0d0d0d",
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <p className="section-label mb-3">{service.subtitle}</p>
                  <h2
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {service.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} style={{ color: "var(--gold)" }} />
                      <span className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image size={14} style={{ color: "var(--gold)" }} />
                      <span className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {service.deliverables}
                      </span>
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {service.includes.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />
                        <span className="text-white/55 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-white/30 text-xs tracking-wider uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Starting from
                      </p>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "var(--gold)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        {service.price}
                      </p>
                    </div>
                    <Link href="/contact">
                      <button className="btn-gold">
                        Book Your Shoot
                        <ChevronRight size={15} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Note */}
      <section className="py-16 bg-[#080808]">
        <div className="container max-w-2xl mx-auto text-center">
          <p className="section-label mb-4">Good to Know</p>
          <h2
            className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Custom packages available
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Need something different? I'm happy to build a custom package around your vision. Whether it's a longer session, additional locations, or a unique concept — let's talk.
          </p>
          <Link href="/contact">
            <button className="btn-gold">Book Your Shoot</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
