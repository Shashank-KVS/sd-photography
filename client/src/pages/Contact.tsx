/* ============================================================
   SD Photography — Contact Page
   Design: Cinematic Dark Editorial
   Layout: Split form + info panel
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Instagram, Clock, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitContactLead } from "@/lib/contact";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663527075271/JzHnEoAS8a4pY86PzDQ7hL/sd-hero-ZUjmdmVbLFe2SyTeP9YaK2.webp";

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

function ContactForm() {
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
        source: "contact-page",
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
      <div className="text-center py-16">
        <Camera size={48} className="mx-auto mb-5" style={{ color: "var(--gold)" }} />
        <h3
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Message Received!
        </h3>
        <p className="text-white/55 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Thank you for reaching out. I'll review your details and get back to you within 24 hours to confirm your shoot.
        </p>
        <button
          className="btn-gold mt-8"
          onClick={() => {
            setSubmitted(false);
            setErrorMessage("");
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-white/40 text-xs tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Your Name *
          </label>
          <input
            className="form-input"
            placeholder="First & Last Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label
            className="block text-white/40 text-xs tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Email Address *
          </label>
          <input
            type="email"
            className="form-input"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-white/40 text-xs tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Type of Shoot *
          </label>
          <select
            className="form-input"
            value={form.shootType}
            onChange={(e) => setForm({ ...form, shootType: e.target.value })}
            required
          >
            <option value="" disabled>Select a service</option>
            <option value="portrait">Portrait Photography</option>
            <option value="couple">Couple Shoot</option>
            <option value="street">Street / Lifestyle</option>
            <option value="event">Event Photography</option>
            <option value="branding">Personal Branding</option>
            <option value="other">Other / Custom</option>
          </select>
        </div>
        <div>
          <label
            className="block text-white/40 text-xs tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Preferred Date
          </label>
          <input
            type="date"
            className="form-input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-white/40 text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Tell Me About Your Vision
        </label>
        <textarea
          className="form-input resize-none"
          rows={5}
          placeholder="Describe your shoot idea, preferred locations, mood, or anything else you'd like me to know..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {errorMessage ? (
        <p className="text-red-300 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" className="btn-gold w-full justify-center" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Book Your Shoot"}
      </button>
    </form>
  );
}

export default function Contact() {
  const ref = useFadeIn();

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      {/* Page Header with background */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.15)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/50 to-[#0d0d0d]" />
        <div className="container relative z-10">
          <p className="section-label mb-3">Get In Touch</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's Capture
            <br />
            <em className="italic font-normal" style={{ color: "var(--gold)" }}>Your Story</em>
          </h1>
          <p className="text-white/50 max-w-md" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Not posed. Not forced. Just real moments — beautifully captured.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section ref={ref} className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — wider */}
            <div className="fade-in-up lg:col-span-3">
              <h2
                className="text-2xl font-bold text-white mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Book Your Shoot
              </h2>
              <ContactForm />
            </div>

            {/* Info panel */}
            <div className="fade-in-up lg:col-span-2" style={{ transitionDelay: "0.15s" }}>
              <h2
                className="text-2xl font-bold text-white mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Info
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <Mail size={15} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Email
                    </p>
                    <a
                      href="mailto:hello@sdphotography.ca"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      hello@sdphotography.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <Instagram size={15} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Instagram
                    </p>
                    <a
                      href="https://instagram.com/sdscapture_moments"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[#c9a84c] text-sm transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      @sdscapture_moments
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <MapPin size={15} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Location
                    </p>
                    <p className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Toronto, Ontario, Canada
                    </p>
                    <p className="text-white/35 text-xs mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Available across the GTA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <Clock size={15} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Response Time
                    </p>
                    <p className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Within 24 hours
                    </p>
                    <p className="text-white/35 text-xs mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Gallery delivery: 48–72 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="gold-divider my-8" />

              {/* Quote */}
              <blockquote
                className="testimonial-card"
              >
                <p
                  className="text-white/60 text-sm italic leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "Every photo is meant to feel like a memory, not just an image."
                </p>
                <p className="text-white/30 text-xs mt-3 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  — SD Photography
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
