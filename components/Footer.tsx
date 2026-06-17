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
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
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
              Have a project in mind or just want to say hello? My inbox is
              always open.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
            >
              <Mail size={14} />
              <span className="group-hover:underline">{BRAND.email}</span>
            </a>
            <div className="pt-1">
              <a
                href={BRAND.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300 transition-all duration-200"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} {BRAND.name}. Made with
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            and lots of coffee.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-200 group"
          >
            <span>Back to top</span>
            <span className="w-7 h-7 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
