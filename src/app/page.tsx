"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
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
  accent:
    | "html"
    | "css"
    | "js"
    | "react"
    | "tailwind"
    | "figma"
    | "default";
};

const SKILLS: Skill[] = [
  { id: "html", label: "HTML", value: 95, Icon: SiHtml5, accent: "html" },
  { id: "css", label: "CSS", value: 94, Icon: SiCss3, accent: "css" },
  { id: "javascript", label: "JavaScript", value: 92, Icon: SiJavascript, accent: "js" },
  { id: "react", label: "React", value: 91, Icon: SiReact, accent: "react" },
  { id: "tailwind", label: "TailwindCSS", value: 93, Icon: SiTailwindcss, accent: "tailwind" },
  { id: "web-dev", label: "Web Development", value: 96, Icon: SiHtml5, accent: "default" },
  { id: "uiux", label: "UI/UX Design", value: 94, Icon: SiFigma, accent: "figma" },
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
    href:
      "https://www.linkedin.com/in/deekshith-g-594b8434b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
            transition={{ duration: 0.45, delay: 0.4 + index * 0.06, ease: [0.22, 0.74, 0.41, 0.96] }}
            whileHover={{ y: -6, scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="social-icon-ring" />
            <span className="social-icon-core">
              <Icon className="social-icon-svg" aria-hidden="true" focusable="false" />
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [showContactIcons, setShowContactIcons] = useState(false);
  const contactIconsRef = useRef<HTMLDivElement | null>(null);

  // mouse-follow parallax for hero and background aura
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const heroRotateX = useTransform(tiltY, [-0.5, 0.5], [8, -8]);
  const heroRotateY = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);
  const orbitTranslateX = useTransform(tiltX, [-0.5, 0.5], [-10, 10]);
  const orbitTranslateY = useTransform(tiltY, [-0.5, 0.5], [10, -10]);

  // scroll-based parallax for whole UI
  const { scrollYProgress } = useScroll();
  const mainParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const backgroundParallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // 0-1
    const y = (event.clientY - rect.top) / rect.height; // 0-1

    // center around 0
    tiltX.set(x - 0.5);
    tiltY.set(y - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleContactCtaClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowContactIcons(true);

    // Wait for state to apply, then scroll to the icons row
    requestAnimationFrame(() => {
      if (contactIconsRef.current) {
        contactIconsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon background orbits */}
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
        className="mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-4 py-8 pb-28 sm:px-6 sm:py-10 sm:gap-24 md:px-10 lg:px-16 lg:gap-32"
        style={{ y: mainParallaxY }}
      >
        {/* Top nav / identity */}
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 shadow-[0_0_40px_rgba(56,189,248,0.75)]" />
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                Portfolio
              </p>
              <p className="text-sm text-slate-400">High-end cinematic presentation</p>
            </div>
          </div>

          <nav className="hidden gap-6 text-xs font-medium uppercase tracking-[0.24em] text-slate-400 md:flex">
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
          </nav>
        </header>

        {/* Intro / hero */}
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
                A modern, neon-lit portfolio for a 2nd year BE student focused on
                front-end development and UI/UX design — fast-paced motion, bold type, and
                clean layouts built for the web.
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
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Focus</p>
                <p className="text-sm font-semibold text-slate-100">Cinematic UX</p>
              </div>
              <div className="stat-pill">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                  Motion
                </p>
                <p className="text-sm font-semibold text-slate-100">Parallax • Zoom • Glitch</p>
              </div>
              <div className="stat-pill sm:col-span-1">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Style</p>
                <p className="text-sm font-semibold text-slate-100">Dark • Neon • Minimal</p>
              </div>
            </div>
          </div>

          {/* Hero motion frame */}
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
                        <li>• Design: Mockups with animated overlays &amp; neon accents</li>
                        <li>• Video: Cinematic cuts, captions &amp; glitch transitions</li>
                        <li>• Development: Animated UI previews, code &amp; 3D elements</li>
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

        {/* Projects */}
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
              Each project tile is treated like a cinematic shot — layered depth,
              parallax hover states, and smooth zoom-ins that keep the experience
              fast-paced yet legible.
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
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.2, 0.7, 0.4, 1] }}
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

        {/* Skills / capabilities */}
        <RevealSection id="skills" className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">
                Skills
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                Frontend &amp; UI/UX Stack
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-400">
              Core web skills visualised as neon, high-precision meters — ideal for a
              fast-moving, cinematic portfolio.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.3fr,1fr]">
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
                      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.2, 0.7, 0.4, 1] }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`skill-icon-wrap skill-icon-wrap-${skill.accent}`}>
                            <Icon className="skill-icon" aria-hidden="true" focusable="false" />
                          </span>
                          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-300">
                            {skill.label}
                          </span>
                        </div>
                        <span className="text-[0.7rem] text-slate-200">{skill.value}%</span>
                      </div>
                      <div className="skill-meter">
                        <div
                          className="skill-meter-fill"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="rounded-2xl border border-fuchsia-500/40 bg-slate-950/70 p-4 shadow-[0_0_24px_rgba(236,72,153,0.6)]">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  Profile
                </p>
                <p className="mt-2 text-slate-200">
                  2nd year BE student building cinematic, responsive web experiences with
                  a focus on clean UI, strong typography, and smooth motion.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/70 p-4 shadow-[0_0_24px_rgba(34,211,238,0.6)]">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  Focus Areas
                </p>
                <p className="mt-2 text-slate-200">
                  Modern front-end stacks (React, TailwindCSS), portfolio experiences,
                  and UI/UX design that feels like a high-end digital product.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Contact / outro */}
        <RevealSection id="contact" className="pb-10">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-[1px]">
            <motion.div
              className="relative flex flex-col gap-6 rounded-[1.4rem] bg-slate-950/90 px-6 py-8 backdrop-blur md:flex-row md:items-center md:justify-between md:px-10"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: [0.2, 0.7, 0.4, 1] }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">
                  Next Sequence
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
                  Ready to turn this into your personal portfolio?
                </h2>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-400">
                  Plug in your own projects, replace the copy with your story, and this
                  layout becomes a cinematic portfolio tailored to design, video, or
                  development work.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs md:items-end">
                <a
                  href="#contact-icons"
                  onClick={handleContactCtaClick}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-400 via-rose-500 to-sky-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-950 shadow-[0_0_40px_rgba(248,113,113,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Contact Me
                  <span className="inline-block h-[3px] w-6 rounded-full bg-slate-900/80" />
                </a>
                <p className="text-[0.65rem] text-slate-500">
                  Tap the button to reveal direct social links.
                </p>
              </div>

              <div
                id="contact-icons"
                ref={contactIconsRef}
                className="mt-6 w-full"
              >
                {showContactIcons && (
                  <motion.div
                    className="contact-icons-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.2, 0.7, 0.4, 1] }}
                  >
                    {SOCIAL_LINKS.map((link) => {
                      const Icon = link.Icon;
                      return (
                        <a
                          key={`contact-${link.id}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`contact-social-icon contact-social-icon-${link.accent}`}
                          aria-label={link.label}
                        >
                          <Icon
                            className="contact-social-icon-svg"
                            aria-hidden="true"
                            focusable="false"
                          />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/40 via-sky-400/20 to-transparent blur-3xl" />
            </motion.div>
          </div>
        </RevealSection>
      </motion.main>

      <SocialRail />
    </motion.div>
  );
}
