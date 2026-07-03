"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE, APP_EMAIL } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: `mailto:${APP_EMAIL}`, label: "Email" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Link
              href="/"
              className="font-syne font-bold text-xl tracking-tight text-white hover:text-purple-400 transition-colors duration-300"
            >
              <span className="text-purple-400">A</span>
              {APP_NAME.slice(1)}
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              {t("footer.navigation")}
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {t(`nav.${link.label.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials + contact */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                {t("footer.connect")}
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-400/40 hover:bg-purple-400/5 transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="text-sm text-white/50 hover:text-purple-400 transition-colors duration-300"
            >
              {APP_EMAIL}
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            {t("footer.copyright", { name: APP_NAME })}
          </p>
          <p className="text-xs text-white/25">{t("footer.built")}</p>
        </motion.div>
      </div>
    </footer>
  );
}