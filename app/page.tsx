"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, Mail, Star, CheckCircle, ExternalLink, Code, Layout, Sparkles, Terminal, Activity, GitBranch } from 'lucide-react';
import { useTranslations } from "next-intl";
import { APP_NAME, APP_TAGLINE, APP_EMAIL, CTA_LABEL, CTA_HREF } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useState } from "react";

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: "1",
    title: "Luminary Design System",
    description: "A comprehensive component library built for scale. Tokens, primitives, and patterns that power products used by 40k+ developers.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    url: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Orbit Analytics Dashboard",
    description: "Real-time data visualization platform for SaaS metrics. Custom chart primitives, live WebSocket feeds, and a dark-first UI.",
    tags: ["Next.js", "D3.js", "WebSockets", "Tailwind"],
    image: "https://i.ytimg.com/vi/glCQ5z3yMno/maxresdefault.jpg",
    url: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Pulse Mobile App",
    description: "Cross-platform fitness tracking app with adaptive workout plans, motion-based gesture controls, and offline-first sync.",
    tags: ["React Native", "Expo", "SQLite", "Node.js"],
    image: "https://play-lh.googleusercontent.com/3gvSC902Etqh70J9zBlwpPYNu9C79LAu_Y1ebPuCQ2wVw-qdxg_uelAZo0GzMJAVgh2PIKnRo9Iymm8NOlXZmjE",
    url: "#",
    featured: false,
  },
  {
    id: "4",
    title: "Forge CMS Platform",
    description: "Headless content management system with a visual block editor, multi-tenant architecture, and a GraphQL API layer.",
    tags: ["GraphQL", "PostgreSQL", "Next.js", "Redis"],
    image: "https://cdn.getforge.com/getforge.com/1777196951/images/forge-hero@2x.png",
    url: "#",
    featured: false,
  },
];

const skills = [
  { name: "React & Next.js", category: "Frontend", icon: Layout },
  { name: "TypeScript", category: "Language", icon: Code },
  { name: "Node.js & APIs", category: "Backend", icon: Terminal },
  { name: "UI/UX Design", category: "Design", icon: Sparkles },
  { name: "Performance", category: "Optimization", icon: Activity },
  { name: "DevOps & CI/CD", category: "Infrastructure", icon: GitBranch },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://media.licdn.com/dms/image/v2/C5612AQER1b2FrAZVBw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1541433525757?e=2147483647&v=beta&t=GFHCIInVndHPdgzNZ58L8W6A8qyjpFKPy2_Ywb3J3-4",
    quote: "Alex rebuilt our entire frontend in 8 weeks. The code quality, attention to detail, and communication were exceptional. Our performance scores went from 54 to 98.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Orbit",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    quote: "Working with Alex felt like having a senior engineer and a designer in one. The dashboard shipped on time and our users love the experience.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Product Lead at Forge",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote: "Alex has a rare ability to translate complex requirements into clean, maintainable code. The CMS platform has scaled to 200+ tenants without a single incident.",
    stars: 5,
  },
];

const stats = [
  { value: "7+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "98", label: "Avg Lighthouse score" },
  { value: "100%", label: "Client satisfaction" },
];

const services = [
  {
    id: "s1",
    title: "Frontend Engineering",
    description: "Pixel-perfect, performant interfaces built with React and Next.js. From design systems to complex SPAs.",
    icon: Layout,
  },
  {
    id: "s2",
    title: "Full-Stack Development",
    description: "End-to-end product development. REST and GraphQL APIs, database design, auth, and deployment pipelines.",
    icon: Terminal,
  },
  {
    id: "s3",
    title: "Performance Audits",
    description: "Deep-dive audits that identify bottlenecks and deliver measurable improvements to Core Web Vitals.",
    icon: Activity,
  },
  {
    id: "s4",
    title: "Design Engineering",
    description: "Bridging design and code. Motion design, component architecture, and design-token-driven systems.",
    icon: Sparkles,
  },
];

// ─── Reusable card hover variant ────────────────────────────────────────────

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const motionProps = (variants: Variants) =>
    shouldReduceMotion ? {} : { variants };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-800/8 rounded-full blur-[80px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div {...motionProps(fadeIn)}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  {t("hero.available")}
                </span>
              </motion.div>

              <motion.h1
                {...motionProps(fadeInUp)}
                className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance"
              >
                {t("hero.greeting")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  {APP_NAME}
                </span>
              </motion.h1>

              <motion.p
                {...motionProps(fadeInUp)}
                className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg text-pretty"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                {...motionProps(fadeInUp)}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href={CTA_HREF}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:-translate-y-0.5"
                >
                  {CTA_LABEL}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("hero.contact")}
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                {...motionProps(fadeInUp)}
                className="flex flex-wrap gap-8 pt-4 border-t border-white/5"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-syne text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: visual */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden md:block"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-purple-500/8 animate-[spin_15s_linear_infinite_reverse]" />
                {/* Photo */}
                <div className="absolute inset-12 rounded-full overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
                  <img
                    src="https://www.shutterstock.com/shutterstock/videos/1104559591/thumb/2.jpg?ip=x480"
                    alt={APP_NAME}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-8 -left-4 bg-[#161616] border border-white/10 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <p className="text-xs text-white/40 mb-0.5">{t("hero.badge_role")}</p>
                  <p className="text-sm font-semibold text-white">{APP_TAGLINE}</p>
                </div>
                <div className="absolute top-10 -right-4 bg-[#161616] border border-white/10 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <p className="text-xs text-white/40 mb-0.5">{t("hero.badge_exp")}</p>
                  <p className="text-sm font-semibold text-purple-400">7+ Years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5605AQFcWADj3FmtRA/videocover-low/videocover-low/0/1702659980506?e=2147483647&v=beta&t=RRhMQpiFCc1xrAgEbf4zk821Ntce49iKA4XyygQPYng"
                  alt="Alex working at desk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl border border-purple-500/20 bg-purple-500/5 -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-white/5 -z-10" />
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.p
                {...motionProps(fadeIn)}
                className="text-xs font-semibold uppercase tracking-widest text-purple-400"
              >
                {t("about.label")}
              </motion.p>
              <motion.h2
                {...motionProps(fadeInUp)}
                className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
              >
                {t("about.heading")}
              </motion.h2>
              <motion.p
                {...motionProps(fadeInUp)}
                className="text-white/50 leading-relaxed text-pretty"
              >
                {t("about.body1")}
              </motion.p>
              <motion.p
                {...motionProps(fadeInUp)}
                className="text-white/50 leading-relaxed text-pretty"
              >
                {t("about.body2")}
              </motion.p>
              <motion.ul
                {...motionProps(staggerContainer)}
                className="space-y-3 pt-2"
              >
                {[
                  t("about.check1"),
                  t("about.check2"),
                  t("about.check3"),
                ].map((item) => (
                  <motion.li
                    key={item}
                    {...motionProps(fadeInUp)}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div {...motionProps(fadeInUp)}>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
                >
                  {t("about.resume")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16 space-y-4"
          >
            <motion.p
              {...motionProps(fadeIn)}
              className="text-xs font-semibold uppercase tracking-widest text-purple-400"
            >
              {t("services.label")}
            </motion.p>
            <motion.h2
              {...motionProps(fadeInUp)}
              className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
            >
              {t("services.heading")}
            </motion.h2>
            <motion.p
              {...motionProps(fadeInUp)}
              className="text-white/50 max-w-xl mx-auto leading-relaxed text-pretty"
            >
              {t("services.subheading")}
            </motion.p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              const isWide = i === 0 || i === 3;
              return (
                <motion.div
                  key={service.id}
                  variants={scaleIn}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  // @ts-ignore
                  custom={cardHover}
                  className={`group relative rounded-2xl border border-white/5 bg-[#111111] p-6 hover:border-purple-500/20 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] ${isWide ? "lg:col-span-2" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="space-y-4">
              <motion.p
                {...motionProps(fadeIn)}
                className="text-xs font-semibold uppercase tracking-widest text-purple-400"
              >
                {t("projects.label")}
              </motion.p>
              <motion.h2
                {...motionProps(fadeInUp)}
                className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
              >
                {t("projects.heading")}
              </motion.h2>
            </div>
            <motion.p
              {...motionProps(fadeIn)}
              className="text-white/40 max-w-xs text-sm leading-relaxed text-pretty"
            >
              {t("projects.subheading")}
            </motion.p>
          </motion.div>

          {/* Featured projects — asymmetric layout */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            {/* Row 1: large + small */}
            <div className="grid md:grid-cols-5 gap-6">
              {projects.slice(0, 1).map((project) => (
                <motion.a
                  key={project.id}
                  href={project.url ?? "#"}
                  variants={scaleIn}
                  whileHover={{ scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="md:col-span-3 group relative rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/20 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] block"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-syne font-bold text-xl text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.a>
              ))}

              {projects.slice(1, 2).map((project) => (
                <motion.a
                  key={project.id}
                  href={project.url ?? "#"}
                  variants={scaleIn}
                  whileHover={{ scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/20 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] block"
                >
                  <div className="h-full min-h-[280px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(project.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-syne font-bold text-lg text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-white/50 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Row 2: two equal */}
            <div className="grid md:grid-cols-2 gap-6">
              {projects.slice(2, 4).map((project) => (
                <motion.a
                  key={project.id}
                  href={project.url ?? "#"}
                  variants={scaleIn}
                  whileHover={{ scale: 1.01, y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/20 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] block"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-syne font-bold text-lg text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-white/50 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.p
                {...motionProps(fadeIn)}
                className="text-xs font-semibold uppercase tracking-widest text-purple-400"
              >
                {t("skills.label")}
              </motion.p>
              <motion.h2
                {...motionProps(fadeInUp)}
                className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
              >
                {t("skills.heading")}
              </motion.h2>
              <motion.p
                {...motionProps(fadeInUp)}
                className="text-white/50 leading-relaxed text-pretty"
              >
                {t("skills.body")}
              </motion.p>
              <motion.div
                {...motionProps(fadeInUp)}
                className="flex flex-wrap gap-2 pt-2"
              >
                {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Figma", "Tailwind CSS", "GraphQL", "AWS", "Vercel"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/8 bg-white/4 text-white/60 hover:border-purple-500/30 hover:text-purple-300 transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Skill cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    variants={scaleIn}
                    whileHover={{ scale: 1.04, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="rounded-2xl border border-white/5 bg-[#111111] p-5 hover:border-purple-500/20 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="font-syne font-semibold text-sm text-white mb-0.5">{skill.name}</p>
                    <p className="text-xs text-white/35">{skill.category}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16 space-y-4"
          >
            <motion.p
              {...motionProps(fadeIn)}
              className="text-xs font-semibold uppercase tracking-widest text-purple-400"
            >
              {t("testimonials.label")}
            </motion.p>
            <motion.h2
              {...motionProps(fadeInUp)}
              className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
            >
              {t("testimonials.heading")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                className="rounded-2xl border border-white/5 bg-[#111111] p-6 hover:border-purple-500/15 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1 text-pretty">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/35">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: copy + links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.p
                {...motionProps(fadeIn)}
                className="text-xs font-semibold uppercase tracking-widest text-purple-400"
              >
                {t("contact.label")}
              </motion.p>
              <motion.h2
                {...motionProps(fadeInUp)}
                className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance"
              >
                {t("contact.heading")}
              </motion.h2>
              <motion.p
                {...motionProps(fadeInUp)}
                className="text-white/50 leading-relaxed text-pretty"
              >
                {t("contact.body")}
              </motion.p>

              <motion.div {...motionProps(fadeInUp)} className="space-y-4 pt-2">
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  {APP_EMAIL}
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-300">
                    <Github className="w-4 h-4 text-purple-400" />
                  </div>
                  github.com/alexmercer
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-300">
                    <Linkedin className="w-4 h-4 text-purple-400" />
                  </div>
                  linkedin.com/in/alexmercer
                </a>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {submitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white">{t("contact.success_title")}</h3>
                  <p className="text-sm text-white/50">{t("contact.success_body")}</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder={t("contact.name_placeholder")}
                      required
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-purple-500/40 focus:bg-white/6 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder={t("contact.email_placeholder")}
                      required
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-purple-500/40 focus:bg-white/6 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                      {t("contact.message")}
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder={t("contact.message_placeholder")}
                      required
                      rows={5}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-purple-500/40 focus:bg-white/6 transition-all duration-300 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)]"
                  >
                    {t("contact.send")}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/8 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            <motion.h2
              {...motionProps(fadeInUp)}
              className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-balance"
            >
              {t("cta.heading")}
            </motion.h2>
            <motion.p
              {...motionProps(fadeInUp)}
              className="text-white/50 text-lg leading-relaxed text-pretty"
            >
              {t("cta.body")}
            </motion.p>
            <motion.div
              {...motionProps(fadeInUp)}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-all duration-300 shadow-[0_0_32px_rgba(168,85,247,0.4)] hover:shadow-[0_0_48px_rgba(168,85,247,0.6)] hover:-translate-y-0.5"
              >
                {t("cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${APP_EMAIL}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                {t("cta.email")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}