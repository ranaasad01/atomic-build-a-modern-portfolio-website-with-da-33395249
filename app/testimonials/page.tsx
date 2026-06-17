"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, Users, Award, Heart } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "@/lib/motion";

// ─── Inline Data ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "Luminary Labs",
    avatar: "SC",
    avatarColor: "from-pink-500 to-rose-600",
    quote:
      "Alex delivered our analytics dashboard ahead of schedule and exceeded every expectation. The code quality was exceptional — clean, well-documented, and built to scale. Our team was able to onboard and extend the codebase immediately.",
    rating: 5,
    featured: true,
    relationship: "Client",
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Lead Engineer",
    company: "Stripe",
    avatar: "MW",
    avatarColor: "from-indigo-500 to-violet-600",
    quote:
      "Working alongside Alex on the Orbit design system was a masterclass in component architecture. Their attention to accessibility, performance, and developer experience set a new standard for our team. Truly one of the best engineers I have collaborated with.",
    rating: 5,
    featured: true,
    relationship: "Colleague",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Product Manager",
    company: "Verdant Co.",
    avatar: "PP",
    avatarColor: "from-emerald-500 to-teal-600",
    quote:
      "Alex translated our complex product requirements into an elegant, intuitive interface. The e-commerce platform they built handles thousands of daily transactions flawlessly. Communication was clear, timelines were met, and the final product was beautiful.",
    rating: 5,
    featured: false,
    relationship: "Client",
  },
  {
    id: "4",
    name: "James O'Brien",
    role: "Senior Designer",
    company: "Figma",
    avatar: "JO",
    avatarColor: "from-orange-500 to-amber-600",
    quote:
      "Alex has a rare gift for bridging design and engineering. They understand visual hierarchy, spacing, and motion in a way most developers simply do not. Our collaboration on the design system was seamless — they pushed back thoughtfully and always improved the final result.",
    rating: 5,
    featured: false,
    relationship: "Colleague",
  },
  {
    id: "5",
    name: "Elena Vasquez",
    role: "Founder & CEO",
    company: "NovaSpark",
    avatar: "EV",
    avatarColor: "from-cyan-500 to-blue-600",
    quote:
      "We hired Alex to rebuild our entire frontend from scratch in three months. Not only did they deliver on time, but the new site improved our conversion rate by 34%. Their technical expertise combined with genuine business understanding made all the difference.",
    rating: 5,
    featured: true,
    relationship: "Client",
  },
  {
    id: "6",
    name: "David Kim",
    role: "Engineering Manager",
    company: "Vercel",
    avatar: "DK",
    avatarColor: "from-violet-500 to-purple-600",
    quote:
      "Alex contributed significantly to our open-source tooling and consistently demonstrated deep knowledge of the Next.js ecosystem. Their pull requests were always well-reasoned, thoroughly tested, and a pleasure to review. A genuine asset to any team.",
    rating: 5,
    featured: false,
    relationship: "Colleague",
  },
];

const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "5.0", label: "Average Rating" },
  { value: "8yr", label: "Experience" },
];

const featuredTestimonials = testimonials.filter((t) => t.featured);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

function RelationshipBadge({ relationship }: { relationship: string }) {
  const isClient = relationship === "Client";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isClient
          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
          : "bg-violet-500/15 text-violet-300 border border-violet-500/20"
      }`}
    >
      {isClient ? <Award size={10} /> : <Users size={10} />}
      {relationship}
    </span>
  );
}

function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: (typeof testimonials)[0];
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative bg-white/5 border border-white/10 rounded-2xl ${
        compact ? "p-5" : "p-6"
      } hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4`}
    >
      {/* Large quote icon */}
      <Quote
        size={compact ? 36 : 48}
        className="text-indigo-500/25 flex-shrink-0"
        strokeWidth={1.5}
      />

      {/* Quote text */}
      <p className="italic text-slate-300 leading-relaxed text-sm flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-start justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}
          >
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{testimonial.name}</p>
            <p className="text-slate-400 text-xs">
              {testimonial.role}{" "}
              <span className="text-slate-500">@</span>{" "}
              {testimonial.company}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StarRating rating={testimonial.rating} />
          <RelationshipBadge relationship={testimonial.relationship} />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6"
          >
            {/* Label pill */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                <Quote size={14} />
                Testimonials
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              What{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                People
              </span>{" "}
              Are Saying
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Kind words from clients, colleagues, and collaborators I have had
              the pleasure of working with over the years.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 flex flex-col items-center gap-1 backdrop-blur-sm"
                >
                  <span className="text-3xl font-bold text-indigo-400">
                    {stat.value}
                  </span>
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Featured Reviews
            </h2>
            <div className="mt-2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {featuredTestimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={scaleIn}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ALL TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              All Testimonials
            </h2>
            <div className="mt-2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={scaleIn}>
                <TestimonialCard testimonial={testimonial} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 text-center backdrop-blur-sm overflow-hidden"
          >
            {/* Decorative gradient blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-violet-600/10 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex justify-center">
                <Heart
                  size={36}
                  className="text-indigo-400"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Work Together?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                I am currently available for freelance projects and full-time
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  View My Work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
