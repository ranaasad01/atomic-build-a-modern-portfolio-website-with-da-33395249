"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline Data ──────────────────────────────────────────────────────────────

const blogPosts = [
  {
    id: "1",
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Next.js Applications in 2024",
    excerpt:
      "A deep dive into architecture patterns, data fetching strategies, and performance optimizations that keep large Next.js apps maintainable and fast.",
    date: "December 12, 2024",
    readTime: "8 min read",
    tags: ["Next.js", "Architecture", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics: From Basics to Advanced Patterns",
    excerpt:
      "Unlock the full power of TypeScript generics with practical examples covering utility types, conditional types, and real-world use cases.",
    date: "November 28, 2024",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Tutorial"],
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    slug: "css-glassmorphism-guide",
    title: "The Complete Guide to Glassmorphism in CSS",
    excerpt:
      "Everything you need to know about creating stunning glassmorphism effects with backdrop-filter, gradients, and subtle borders.",
    date: "November 10, 2024",
    readTime: "6 min read",
    tags: ["CSS", "Design", "UI"],
    coverImage:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
    featured: false,
  },
  {
    id: "4",
    slug: "react-server-components-explained",
    title: "React Server Components Explained: When and Why to Use Them",
    excerpt:
      "Cut through the confusion around RSC. Learn the mental model, performance benefits, and practical patterns for adopting server components today.",
    date: "October 22, 2024",
    readTime: "10 min read",
    tags: ["React", "Next.js", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    featured: false,
  },
  {
    id: "5",
    slug: "designing-with-framer-motion",
    title: "Designing Delightful Animations with Framer Motion",
    excerpt:
      "From micro-interactions to page transitions — a practical guide to adding meaningful motion to your React applications without sacrificing performance.",
    date: "October 5, 2024",
    readTime: "7 min read",
    tags: ["Animation", "React", "Design"],
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    featured: false,
  },
  {
    id: "6",
    slug: "postgresql-performance-tips",
    title: "10 PostgreSQL Performance Tips Every Developer Should Know",
    excerpt:
      "Indexing strategies, query optimization, connection pooling, and EXPLAIN ANALYZE — practical tips to make your Postgres queries fly.",
    date: "September 18, 2024",
    readTime: "9 min read",
    tags: ["PostgreSQL", "Backend", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    featured: false,
  },
];

const allTags = [
  "All",
  "Next.js",
  "TypeScript",
  "React",
  "CSS",
  "Design",
  "Performance",
  "Backend",
  "Tutorial",
  "Animation",
];

// Tag color map for variety
const tagColors: Record<string, string> = {
  "Next.js": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  TypeScript: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  React: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  CSS: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Design: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Performance: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Backend: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Tutorial: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Animation: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Architecture: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  JavaScript: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  UI: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  PostgreSQL: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

function getTagColor(tag: string): string {
  return tagColors[tag] ?? "bg-slate-500/20 text-slate-300 border-slate-500/30";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag =
      activeTag === "All" || post.tags.includes(activeTag);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  const showFeatured = activeTag === "All" && !searchQuery;
  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const gridPosts = showFeatured
    ? filteredPosts.filter((p) => !p.featured)
    : filteredPosts;

  const sectionHeading = () => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (activeTag !== "All") return `Tagged: ${activeTag}`;
    return "All Articles";
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Label pill */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                <BookOpen size={15} />
                The Blog
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              Thoughts, Tutorials &{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Deep Dives
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 max-w-2xl leading-relaxed"
            >
              Exploring modern web development, design systems, and the craft of
              building great software. New articles every few weeks.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                { label: "6 Articles" },
                { label: "8 min avg read" },
                { label: "Weekly updates" },
              ].map((stat) => (
                <span
                  key={stat.label}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium"
                >
                  {stat.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TAG FILTER BAR ── */}
      <div className="sticky top-20 z-10 bg-[#0f172a]/80 backdrop-blur py-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
          {/* Tags — horizontally scrollable */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeTag === tag
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tag !== "All" && <Tag size={11} />}
                {tag}
              </button>
            ))}
          </div>

          {/* Search — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 min-w-[220px]">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* ── FEATURED POSTS ── */}
        {showFeatured && featuredPosts.length > 0 && (
          <section>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 text-white"
            >
              Featured Articles
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 group flex flex-col"
                >
                  {/* Cover image */}
                  <div className="overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full aspect-video object-cover rounded-xl mb-0 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Featured badge + tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wide">
                        Featured
                      </span>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                      >
                        Read Article
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ── ALL / FILTERED POSTS GRID ── */}
        <section>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 text-white"
          >
            {sectionHeading()}
          </motion.h2>

          {gridPosts.length === 0 ? (
            // Empty state
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <BookOpen size={28} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-300 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Try a different tag or clear your search to see all articles.
              </p>
              <button
                onClick={() => {
                  setActiveTag("All");
                  setSearchQuery("");
                }}
                className="mt-6 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {gridPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={scaleIn}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 group flex flex-col"
                >
                  {/* Cover image wrapper */}
                  <div className="overflow-hidden h-48">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded-full border text-xs font-medium ${getTagColor(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* ── NEWSLETTER CTA ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 rounded-3xl p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={22} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Never miss an article
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Get new posts delivered straight to your inbox. No spam, unsubscribe
              any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors"
              />
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
