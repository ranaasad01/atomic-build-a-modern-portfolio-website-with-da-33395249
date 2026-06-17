"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: BRAND.github, label: "GitHub" },
    { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${BRAND.email}`, label: "Email" },
  ];

  return (
    <footer className="relative bg-[#0f172a] border-t border-white/5">
      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                AM
              </div>
              <span className="font-semibold text-[#f8fafc] text-lg tracking-tight">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {BRAND.tagline}. Building beautiful, performant web experiences
              with modern technologies.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-indigo-500 transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Get In Touch
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Open to new opportunities and interesting projects. Let&apos;s
              build something great together.
            </p>
            <motion.a
              href={`mailto:${BRAND.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-600/20 to-violet-600/20 hover:from-indigo-600/30 hover:to-violet-600/30 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 hover:text-indigo-200 rounded-lg transition-all duration-200"
            >
              <Mail size={14} />
              {BRAND.email}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} {BRAND.name}. Made with{" "}
            <Heart size={12} className="text-indigo-400 fill-indigo-400" /> in
            San Francisco.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-400 transition-colors duration-200 group"
          >
            Back to top
            <span className="w-6 h-6 rounded-md bg-white/5 hover:bg-indigo-500/20 border border-white/5 flex items-center justify-center transition-colors">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}