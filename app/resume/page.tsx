"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, Code2, MapPin, Mail, Globe, Calendar, Star } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, fadeIn } from "@/lib/motion";

// ─── Inline Data ─────────────────────────────────────────────────────────────

const experience = [
  {
    id: "1",
    role: "Senior Full-Stack Engineer",
    company: "Luminary Labs",
    location: "San Francisco, CA (Remote)",
    period: "Jan 2022 — Present",
    description:
      "Lead engineer on a real-time SaaS analytics platform serving 10,000+ users. Architected the frontend with Next.js 14 and designed a scalable GraphQL API layer.",
    achievements: [
      "Reduced page load time by 60% through RSC migration and edge caching",
      "Built a real-time collaboration feature used by 3,000+ daily active teams",
      "Mentored 4 junior engineers and established frontend code review standards",
      "Shipped 40+ features across 18 months with zero critical production incidents",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Redis"],
  },
  {
    id: "2",
    role: "Full-Stack Developer",
    company: "Verdant Co.",
    location: "New York, NY",
    period: "Mar 2020 — Dec 2021",
    description:
      "Built and maintained a sustainable e-commerce marketplace from the ground up. Owned the full stack from database schema to pixel-perfect UI.",
    achievements: [
      "Launched platform from 0 to $2M ARR within 12 months",
      "Integrated Stripe payments processing $500K+ monthly transactions",
      "Achieved 98 Lighthouse performance score on all product pages",
      "Implemented automated testing suite with 85% code coverage",
    ],
    tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  },
  {
    id: "3",
    role: "Frontend Developer",
    company: "Pixel & Co.",
    location: "Austin, TX",
    period: "Jun 2018 — Feb 2020",
    description:
      "Developed responsive web applications and design systems for a portfolio of 15+ client brands across fintech, healthcare, and retail verticals.",
    achievements: [
      "Delivered 12 client projects on time and within budget",
      "Built a reusable component library reducing dev time by 40%",
      "Collaborated directly with designers to implement pixel-perfect UIs",
      "Introduced TypeScript to the team, improving code reliability",
    ],
    tech: ["React", "TypeScript", "Sass", "Figma", "Storybook"],
  },
];

const education = [
  {
    id: "1",
    degree: "B.S. Computer Science",
    institution: "University of Texas at Austin",
    period: "2014 — 2018",
    gpa: "3.8 / 4.0",
    highlights: [
      "Dean's List — 6 semesters",
      'Senior thesis: "Optimizing React Rendering with Concurrent Mode"',
      "President, Web Development Club",
    ],
  },
];

const certifications = [
  {
    id: "1",
    name: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    date: "March 2023",
    credentialId: "AWS-DEV-2023-AM",
  },
  {
    id: "2",
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "November 2022",
    credentialId: "GCP-DEV-2022-AM",
  },
  {
    id: "3",
    name: "Meta Frontend Developer Certificate",
    issuer: "Meta / Coursera",
    date: "January 2022",
    credentialId: "META-FE-2022-AM",
  },
];

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools & Cloud",
    skills: ["AWS", "Docker", "GitHub Actions", "Vercel", "Figma", "Storybook"],
  },
  {
    category: "Practices",
    skills: ["TDD", "Agile/Scrum", "Code Review", "System Design", "Accessibility", "Performance"],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ResumePage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#0f172a] print:bg-white print:text-black"
    >
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── 1. HERO / HEADER ─────────────────────────────────────────────── */}
        <section className="pt-32 pb-8 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="md:flex justify-between items-start gap-8">
              {/* Left: Identity */}
              <motion.div variants={fadeInUp} className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-[#f8fafc] tracking-tight">
                    {BRAND.name}
                  </h1>
                  <p className="text-indigo-400 text-xl font-medium mt-1">
                    {BRAND.tagline}
                  </p>
                </div>

                {/* Contact info row */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                  <span className="flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin size={14} className="text-indigo-400 shrink-0" />
                    San Francisco, CA
                  </span>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <Mail size={14} className="text-indigo-400 shrink-0" />
                    {BRAND.email}
                  </a>
                  <a
                    href="https://alexmorgan.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <Globe size={14} className="text-indigo-400 shrink-0" />
                    alexmorgan.dev
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-indigo-500/40 via-violet-500/20 to-transparent mt-2" />
              </motion.div>

              {/* Right: Action buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-row md:flex-col gap-3 mt-6 md:mt-0 shrink-0"
              >
                <a
                  href={BRAND.resumeUrl}
                  download
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-indigo-500/25"
                >
                  <Download size={16} />
                  Download PDF
                </a>
                <button
                  onClick={() => window.print()}
                  className="bg-white/5 border border-white/10 text-slate-300 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/10 hover:text-white transition backdrop-blur-sm"
                >
                  <Star size={16} />
                  Print
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── 2. EXPERIENCE ────────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            {/* Section heading */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Briefcase size={18} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#f8fafc]">Work Experience</h2>
            </motion.div>

            {/* Experience cards */}
            <div className="space-y-4">
              {experience.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-indigo-500/20 transition-colors"
                >
                  {/* Card header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#f8fafc]">{job.role}</h3>
                      <p className="text-indigo-400 font-semibold">{job.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Calendar size={13} className="text-indigo-400" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <MapPin size={13} className="text-indigo-400" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-1.5 mb-4">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 3. EDUCATION ─────────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            {/* Section heading */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <GraduationCap size={18} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#f8fafc]">Education</h2>
            </motion.div>

            {/* Education cards */}
            <div className="space-y-4">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-indigo-500/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#f8fafc]">{edu.degree}</h3>
                      <p className="text-indigo-400 font-semibold">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Calendar size={13} className="text-indigo-400" />
                        {edu.period}
                      </span>
                      <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-sm font-medium">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 4. CERTIFICATIONS ────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            {/* Section heading */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Award size={18} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#f8fafc]">Certifications</h2>
            </motion.div>

            {/* Cert grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-indigo-500/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center mb-3">
                    <Award size={15} className="text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-sm text-[#f8fafc] leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-indigo-400 text-sm font-medium mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Calendar size={11} />
                    {cert.date}
                  </div>
                  <p className="text-slate-500 text-xs font-mono">{cert.credentialId}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 5. SKILLS ────────────────────────────────────────────────────── */}
        <section className="py-10 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            {/* Section heading */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Code2 size={18} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#f8fafc]">Skills</h2>
            </motion.div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.category}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-indigo-500/20 transition-colors"
                >
                  <h3 className="text-indigo-400 font-semibold mb-3">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 6. BOTTOM CTA ────────────────────────────────────────────────── */}
        <section className="py-16 px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-3xl p-10 text-center backdrop-blur-sm"
            >
              {/* Decorative star */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Star size={22} className="text-white" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#f8fafc] mb-3">
                Interested in working together?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                I&apos;m currently open to new opportunities. Let&apos;s build something great.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-500/25"
                >
                  Send a Message
                </Link>
                <Link
                  href="/#projects"
                  className="bg-white/5 border border-white/10 text-slate-300 px-8 py-3 rounded-xl font-semibold hover:bg-white/10 hover:text-white transition backdrop-blur-sm"
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
