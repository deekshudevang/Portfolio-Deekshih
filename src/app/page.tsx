"use client";

import React, { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiCss3,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

import { projects } from "@/config/portfolio";

function RevealSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const base = "reveal";
  const composed = className ? `${base} ${className}` : base;

  return (
    <section id={id} ref={ref} className={composed}>
      {children}
    </section>
  );
}

function projectAccentClass(accent: "teal" | "pink" | "blue") {
  switch (accent) {
    case "teal":
      return "project-glow project-glow-teal";
    case "pink":
      return "project-glow project-glow-pink";
    case "blue":
    default:
      return "project-glow project-glow-blue";
  }
}

type Skill = {
  id: string;
  label: string;
  value: number;
  Icon: IconType;
  accent: "html" | "css" | "js" | "react" | "tailwind" | "figma" | "default";
};

const SKILLS: Skill[] = [
  { id: "html", label: "HTML", value: 95, Icon: SiHtml5, accent: "html" },
  { id: "css", label: "CSS", value: 94, Icon: SiCss3, accent: "css" },
  {
    id: "javascript",
    label: "JavaScript",
    value: 92,
    Icon: SiJavascript,
    accent: "js",
  },
  { id: "react", label: "React", value: 91, Icon: SiReact, accent: "react" },
  {
    id: "tailwind",
    label: "TailwindCSS",
    value: 93,
    Icon: SiTailwindcss,
    accent: "tailwind",
  },
  {
    id: "web-dev",
    label: "Web Development",
    value: 96,
    Icon: SiHtml5,
    accent: "default",
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    value: 94,
    Icon: SiFigma,
    accent: "figma",
  },
];

type SocialAccent = "blue" | "pink" | "teal" | "green";

type SocialLink = {
  id: "linkedin" | "instagram" | "github" | "whatsapp";
  label: string;
  href: string;
  accent: SocialAccent;
  Icon: IconType;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deekshith-g-594b8434b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    accent: "blue",
    Icon: FaLinkedinIn,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/deekshu_devang?igsh=czVmcjN4c2pidDJp",
    accent: "pink",
    Icon: FaInstagram,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/deekshudevang",
    accent: "teal",
    Icon: FaGithub,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919449668850",
    accent: "green",
    Icon: FaWhatsapp,
  },
];

function SocialRail() {
  return (
    <div className="social-rail">
      {SOCIAL_LINKS.map((link, index) => {
        const Icon = link.Icon;
        return (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon social-icon-${link.accent}`}
            aria-label={link.label}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.4 + index * 0.06,
              ease: [0.22, 0.74, 0.41, 0.96],
            }}
            whileHover={{ y: -6, scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="social-icon-ring" />
            <span className="social-icon-core">
              <Icon
                className="social-icon-svg"
                aria-hidden="true"
                focusable="false"
              />
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

function TopNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.74, 0.41, 0.96] }}
    >
      <motion.div
        className="flex w-full max-w-xl translate-x-4 items-center justify-between rounded-2xl border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-300 backdrop-blur transition-all duration-300"
        animate={{
          borderColor: scrolled
            ? "rgba(34, 211, 238, 0.4)"
            : "rgba(30, 41, 59, 0.8)",
          backgroundColor: scrolled
            ? "rgba(2, 6, 23, 0.9)"
            : "rgba(2, 6, 23, 0.7)",
          boxShadow: scrolled
            ? "0 14px 40px rgba(15,23,42,0.9), 0 0 30px rgba(34,211,238,0.2)"
            : "0 14px 40px rgba(15,23,42,0.9)",
        }}
      >
        <span className="text-[0.7rem] font-semibold tracking-[0.26em] text-slate-100">
          DEEKSHITH G
        </span>
        <div className="ml-4 flex flex-1 items-center justify-end gap-4 sm:gap-6">
          <a href="#intro" className="nav-link">
            Intro
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const heroRotateX = useTransform(tiltY, [-0.5, 0.5], [8, -8]);
  const heroRotateY = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);
  const orbitTranslateX = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);
  const orbitTranslateY = useTransform(tiltY, [-0.5, 0.5], [10, -10]);

  const { scrollYProgress } = useScroll();
  const mainParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const backgroundParallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    tiltX.set(x - 0.5);
    tiltY.set(y - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Open Typeform with pre-filled data
    const typeformUrl = `https://form.typeform.com/to/BvIYBW81#name=${encodeURIComponent(
      formData.name
    )}&email=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(
      formData.subject
    )}&message=${encodeURIComponent(formData.message)}`;

    window.open(typeformUrl, "_blank");

    // Show success message
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-sky-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <TopNav />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          x: orbitTranslateX,
          y: orbitTranslateY,
          translateY: backgroundParallaxY,
        }}
      >
        <div className="neon-orbit neon-orbit-teal" />
        <div className="neon-orbit neon-orbit-pink" />
        <div className="neon-orbit neon-orbit-blue" />
        <div className="noise-overlay" />
      </motion.div>

      <motion.main
        className="mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-4 pt-28 pb-28 sm:px-6 sm:pt-32 sm:pb-28 sm:gap-24 md:px-10 lg:px-16 lg:gap-32"
        style={{ y: mainParallaxY }}
      >
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 shadow-[0_0_40px_rgba(56,189,248,0.75)]" />
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                Portfolio
              </p>
              <p className="text-sm text-slate-400">
                High-end cinematic presentation
              </p>
            </div>
          </div>
        </header>

        <RevealSection id="intro" className="section-grid">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-900/60 px-4 py-1 text-[0.7rem] font-medium tracking-[0.25em] text-cyan-200/80 backdrop-blur">
              <span className="inline-block h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              LIVE PORTFOLIO • 2025 EDIT
            </p>

            <div className="flex items-center gap-4 pt-1">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-cyan-400/60 bg-slate-900/80 shadow-[0_0_30px_rgba(34,211,238,0.7)]">
                <Image
                  src="/profile.jpg"
                  alt="Profile picture"
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
                  Portfolio of
                </p>
                <p className="text-sm font-medium text-slate-100 sm:text-base">
                  Deekshith G
                </p>
                <p className="text-[0.7rem] text-slate-400">
                  2nd Year BE Student · Frontend &amp; UI/UX
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h1
                className="glitch text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
                data-text="Futuristic Portfolio of Deekshith G"
              >
                Futuristic Portfolio of Deekshith G
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                A modern, neon-lit portfolio for a 2nd year BE student focused
                on front-end development and UI/UX design — fast-paced motion,
                bold type, and clean layouts built for the web.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Projects
                <span className="inline-block h-1 w-6 origin-left scale-x-100 rounded-full bg-slate-900/80 transition group-hover:scale-x-125" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 backdrop-blur transition-colors hover:border-slate-500 hover:text-slate-50"
              >
                Contact
              </a>
            </div>

            <div className="mt-4 grid max-w-xl grid-cols-2 gap-4 text-xs text-slate-400 sm:grid-cols-3">
              <div className="stat-pill">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                  Focus
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  Cinematic UX
                </p>
              </div>
              <div className="stat-pill">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                  Motion
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  Parallax • Zoom • Glitch
                </p>
              </div>
              <div className="stat-pill sm:col-span-1">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                  Style
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  Dark • Neon • Minimal
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="relative mt-10 flex items-center justify-center md:mt-0"
            style={{ rotateX: heroRotateX, rotateY: heroRotateY }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.4, 1] }}
          >
            <div className="motion-frame">
              <div className="motion-layer motion-layer-back" />
              <div className="motion-layer motion-layer-mid" />
              <div className="motion-layer motion-layer-front">
                <div className="flex h-full w-full flex-col justify-between gap-4 p-5 md:grid md:grid-cols-[1.1fr,0.9fr]">
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.25em] text-slate-400">
                      <span>Portfolio Timeline</span>
                      <span>00:00 — 01:00</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-cyan-200">
                        Adaptive Portfolio Modes
                      </p>
                      <ul className="space-y-1 text-[0.65rem] text-slate-300">
                        <li>
                          • Design: Mockups with animated overlays &amp; neon
                          accents
                        </li>
                        <li>
                          • Video: Cinematic cuts, captions &amp; glitch
                          transitions
                        </li>
                        <li>
                          • Development: Animated UI previews, code &amp; 3D
                          elements
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-1/2 animate-timeline bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-sky-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="hero-orbit-box">
                      <div className="hero-orbit-core">
                        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
                          Now Playing
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-50">
                          Deekshith G • Portfolio
                        </p>
                        <p className="mt-1 text-[0.65rem] text-slate-400">
                          Cinematic UI • Frontend • UI/UX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </RevealSection>

        <RevealSection id="projects" className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-300/80">
                Feature Sequence
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                Projects in Motion
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-400">
              Each project tile is treated like a cinematic shot — layered
              depth, parallax hover states, and smooth zoom-ins that keep the
              experience fast-paced yet legible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.2, 0.7, 0.4, 1],
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={projectAccentClass(project.accent)} />
                <div className="project-body">
                  <p className="project-kicker">{project.category}</p>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-copy">{project.description}</p>
                  <p className="project-tag">{project.tagline}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="skills" className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">
                Skills
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                Frontend &amp; UI/UX Stack - Core Skills
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-400">
              Core web skills visualised as neon, high-precision meters — ideal
              for a fast-moving, cinematic portfolio.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                Core Skills
              </h3>
              <ul className="mt-4 grid gap-3 text-xs text-slate-200 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {SKILLS.map((skill, index) => {
                  const Icon = skill.Icon;
                  return (
                    <motion.li
                      key={skill.id}
                      className="skill-card"
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.06,
                        ease: [0.2, 0.7, 0.4, 1],
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex h-full flex-col items-center justify-between gap-3 text-center">
                        <span
                          className={`skill-icon-wrap skill-icon-wrap-${skill.accent}`}
                        >
                          <Icon
                            className="skill-icon"
                            aria-hidden="true"
                            focusable="false"
                          />
                        </span>
                        <p className="skill-percentage">{skill.value}%</p>
                        <div className="skill-meter w-full max-w-[7.5rem]">
                          <div
                            className="skill-meter-fill"
                            style={{ width: `${skill.value}%` }}
                          />
                        </div>
                        <p className="skill-label">{skill.label}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="contact" className="pb-12">
          <div className="mb-10 flex justify-center">
            <div className="h-px w-32 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-pulse" />
          </div>

          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Get in Touch
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              Let&apos;s Connect
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              className="cyber-glass-card space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="cyber-heading">CONTACT INFO</h3>

              <div className="space-y-4">
                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <svg
                      className="contact-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">EMAIL</p>
                    <a
                      href="mailto:deekshudevang@gmail.com"
                      className="contact-value"
                    >
                      deekshudevang@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <svg
                      className="contact-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">PHONE</p>
                    <a href="tel:+919449668850" className="contact-value">
                      +91 94496 68850
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrapper">
                    <svg
                      className="contact-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">WEBSITE</p>
                    <a
                      href="https://www.deekshudevang.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-value"
                    >
                      www.deekshudevang.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4">
                <p className="text-xs text-cyan-300/70">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400 mr-2" />
                  I reply within 24–48 hours.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Connect on Social
                </h4>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.Icon;
                    return (
                      <a
                        key={`contact-social-${link.id}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`contact-social-link contact-social-link-${link.accent}`}
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="cyber-glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="cyber-heading mb-6">SEND MESSAGE</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="YOUR NAME"
                    className={`cyber-input ${
                      formErrors.name ? "cyber-input-error" : ""
                    }`}
                  />
                  {formErrors.name && (
                    <p className="cyber-error">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="YOUR EMAIL"
                    className={`cyber-input ${
                      formErrors.email ? "cyber-input-error" : ""
                    }`}
                  />
                  {formErrors.email && (
                    <p className="cyber-error">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="SUBJECT"
                    className={`cyber-input ${
                      formErrors.subject ? "cyber-input-error" : ""
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="cyber-error">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="YOUR MESSAGE"
                    rows={5}
                    className={`cyber-input resize-none ${
                      formErrors.message ? "cyber-input-error" : ""
                    }`}
                  />
                  {formErrors.message && (
                    <p className="cyber-error">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`cyber-button ${
                    submitStatus === "success"
                      ? "cyber-button-success"
                      : submitStatus === "error"
                      ? "cyber-button-error"
                      : ""
                  }`}
                >
                  {submitStatus === "success"
                    ? "OPENING TYPEFORM..."
                    : submitStatus === "error"
                    ? "ERROR — TRY AGAIN"
                    : "SEND MESSAGE"}
                </button>
              </form>
            </motion.div>
          </div>
        </RevealSection>
      </motion.main>

      <SocialRail />

      <motion.button
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] md:bottom-8 md:right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg
          className="h-5 w-5 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
