"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Download, ExternalLink, Code2, Layers, Zap, Star, CheckCircle, Sparkles, Terminal, Layout, Activity } from 'lucide-react';
import { BRAND, primaryCTA } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ──────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    id: "1",
    title: "Luminary Dashboard",
    description:
      "A real-time analytics platform for SaaS companies. Built with Next.js, Prisma, and PostgreSQL — featuring live charts, team collaboration, and role-based access control.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    image: "https://i.vimeocdn.com/video/2070296830-ceeecfbc9625686542679222c41f1ccfabdc4dfc4fe6ebaa3a484e1427ba6773-d?f=webp",
    liveUrl: "https://luminary.demo",
    githubUrl: "https://github.com/alexmorgan/luminary",
    color: "from-indigo-500 to-violet-600",
  },
  {
    id: "2",
    title: "Verdant E-Commerce",
    description:
      "A sustainable goods marketplace with Stripe payments, inventory management, and a custom CMS. Achieved 98 Lighthouse performance score with edge-rendered product pages.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    image: "https://cdn.shopify.com/theme-store/inrup6g21zzikhu0s9anhpw8vfvc.jpg",
    liveUrl: "https://verdant.demo",
    githubUrl: "https://github.com/alexmorgan/verdant",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "Orbit Design System",
    description:
      "A comprehensive component library and design system used across 4 production apps. Includes 60+ accessible components, Storybook docs, and automated visual regression tests.",
    tags: ["React", "Storybook", "Figma", "Radix UI"],
    image: "https://s3-alpha.figma.com/hub/file/2243587999456758553/75e4372a-8462-487a-9eef-232cbcde11ad-cover.png",
    liveUrl: "https://orbit.demo",
    githubUrl: "https://github.com/alexmorgan/orbit",
    color: "from-orange-500 to-rose-600",
  },
];

const skills = [
  { name: "React & Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js & Express", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "GraphQL", level: 78, category: "backend" },
  { name: "Figma & Design", level: 82, category: "design" },
  { name: "Docker & CI/CD", level: 75, category: "tools" },
];

const services = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect UIs built with React and Next.js. I obsess over performance, accessibility, and delightful micro-interactions that keep users engaged.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: Terminal,
    title: "Backend & APIs",
    description:
      "Scalable REST and GraphQL APIs with Node.js, Prisma, and PostgreSQL. From auth flows to real-time features — I build the full stack.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Layers,
    title: "System Architecture",
    description:
      "Thoughtful architecture decisions that scale. I design systems that are maintainable, observable, and ready for growth from day one.",
    accent: "from-orange-500 to-amber-500",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Turning slow apps into fast ones. Core Web Vitals audits, bundle analysis, edge caching, and database query optimization.",
    accent: "from-rose-500 to-pink-500",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote:
      "Alex delivered a production-ready dashboard in 6 weeks that our team had estimated at 4 months. The code quality and attention to UX detail was exceptional — our users noticed immediately.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Verdant",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/JMarcus_Webb.JPG/960px-JMarcus_Webb.JPG",
    quote:
      "Working with Alex felt like having a senior engineer and a product designer in one. He pushed back on bad ideas, proposed better solutions, and shipped on time every sprint.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Lead Designer at Orbit",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Alex built our entire design system from scratch. The component API is so clean that our engineers actually enjoy using it. Rare to find someone who bridges design and engineering this well.",
    stars: 5,
  },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "98", label: "Avg Lighthouse Score" },
  { value: "12", label: "Happy Clients" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradientOrb({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className ?? ""}`}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeIn}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4"
    >
      <Sparkles size={12} />
      {children}
    </motion.div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: false }
    : {};

  const filteredSkills =
    activeSkillCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const skillCategories = [
    { key: "all", label: "All" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "design", label: "Design" },
    { key: "tools", label: "Tools" },
  ];

  return (
    <main className="bg-[#0f172a] text-[#f8fafc] overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16"
      >
        {/* Background orbs */}
        <GradientOrb className="w-[600px] h-[600px] bg-indigo-600 -top-32 -left-48" />
        <GradientOrb className="w-[400px] h-[400px] bg-violet-600 top-1/2 -right-32" />
        <GradientOrb className="w-[300px] h-[300px] bg-blue-600 bottom-0 left-1/3" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Alex Morgan
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {BRAND.tagline} — I craft fast, beautiful web experiences that
              users love and businesses rely on.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <motion.a
                href={primaryCTA.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/25 transition-all duration-200"
              >
                {primaryCTA.label}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>
              <motion.a
                href={BRAND.resumeUrl}
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 pt-2"
            >
              {[
                { icon: Github, href: BRAND.github, label: "GitHub" },
                { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
                {
                  icon: Mail,
                  href: `mailto:${BRAND.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative py-24 md:py-32">
        <GradientOrb className="w-[500px] h-[500px] bg-violet-700 top-0 right-0 opacity-10" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQE-oMdEA4-lZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516522176575?e=2147483647&v=beta&t=NNza9NbD-soKscrNPIBTk-qTQ2z583NAZI6yUgYwXZ0"
                  alt="Alex Morgan — Full-Stack Developer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-violet-800/60 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
                    AM
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 lg:right-8 bg-[#1e293b] border border-white/10 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Open to Work
                    </div>
                    <div className="text-xs text-slate-400">
                      Remote & Hybrid
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={fadeIn}>
                <SectionLabel>About Me</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Turning ideas into{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  exceptional
                </span>{" "}
                digital products
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-300 text-lg leading-relaxed"
              >
                I'm a full-stack developer with 5+ years of experience building
                products that sit at the intersection of engineering excellence
                and thoughtful design. I've worked with early-stage startups and
                Series B companies alike — shipping features that move metrics
                and code that teams are proud to maintain.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed"
              >
                When I'm not writing TypeScript, I'm contributing to open
                source, mentoring junior developers, or exploring the latest in
                web performance. I believe the best products are built by people
                who care deeply about both the user and the craft.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-3 pt-2"
              >
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "Figma",
                  "Docker",
                  "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="flex gap-4 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href={BRAND.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  <Github size={18} />
                  GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative py-24 md:py-32 bg-white/[0.01]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <SectionLabel>What I Do</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              Services I offer
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto"
            >
              From pixel-perfect frontends to robust backend systems — I bring
              the full stack to every engagement.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-violet-600/0 group-hover:from-indigo-600/5 group-hover:to-violet-600/5 transition-all duration-500" />
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="relative py-24 md:py-32">
        <GradientOrb className="w-[400px] h-[400px] bg-indigo-700 bottom-0 left-0 opacity-10" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <SectionLabel>Expertise</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              Skills & Technologies
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg mt-4 max-w-xl mx-auto"
            >
              A curated set of tools I use to build production-grade
              applications.
            </motion.p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveSkillCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSkillCategory === cat.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-sm text-indigo-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="relative py-24 md:py-32 bg-white/[0.01]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <SectionLabel>Portfolio</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto"
            >
              A selection of work I'm proud of — spanning SaaS platforms,
              e-commerce, and developer tooling.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
              >
                <div
                  className={`grid grid-cols-1 ${index % 2 === 0 ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"} gap-0`}
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-video lg:aspect-auto min-h-[240px] overflow-hidden ${index % 2 !== 0 ? "lg:order-2" : ""}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`p-8 md:p-10 flex flex-col justify-center ${index % 2 !== 0 ? "lg:order-1" : ""}`}
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200"
                        >
                          <ExternalLink size={15} />
                          Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                        >
                          <Github size={15} />
                          Source
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative py-24 md:py-32">
        <GradientOrb className="w-[500px] h-[500px] bg-violet-700 top-0 right-0 opacity-10" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <SectionLabel>Testimonials</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              What clients say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg mt-4 max-w-xl mx-auto"
            >
              Don't take my word for it — here's what the people I've worked
              with have to say.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="relative p-7 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <StarRating count={t.stars} />
                </div>
                <blockquote className="text-slate-300 leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(t.name ?? "").charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="relative py-24 md:py-32 bg-white/[0.01]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
        <GradientOrb className="w-[400px] h-[400px] bg-indigo-600 bottom-0 right-0 opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <SectionLabel>Contact</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-2"
            >
              Let's build something{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                great together
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg mt-4 max-w-xl mx-auto"
            >
              Have a project in mind or just want to chat? I'm always open to
              new opportunities and interesting conversations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-3xl bg-white/[0.03] border border-white/5 p-8 md:p-12"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message sent!
                </h3>
                <p className="text-slate-400">
                  Thanks for reaching out. I'll get back to you within 24
                  hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    Or email me directly at{" "}
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/25 transition-all duration-200 whitespace-nowrap"
                  >
                    Send Message
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Quick contact cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: BRAND.email,
                href: `mailto:${BRAND.email}`,
              },
              {
                icon: Github,
                label: "GitHub",
                value: "alexmorgan",
                href: BRAND.github,
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "alexmorgan",
                href: BRAND.linkedin,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  variants={scaleIn}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                    <div className="text-sm font-medium text-white">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}