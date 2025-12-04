type PortfolioProjectAccent = "teal" | "pink" | "blue";

type PortfolioProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  tagline: string;
  accent: PortfolioProjectAccent;
};

export const projects: PortfolioProject[] = [
  {
    id: "design-portfolio",
    category: "Design Portfolio",
    title: "Neon Frames Studio",
    description:
      "UI mockups with animated overlays, glassmorphism, and shifting gradient highlights.",
    tagline: "Parallax mockups · Overlay reveals",
    accent: "teal",
  },
  {
    id: "video-reel",
    category: "Video Reel",
    title: "Cinematic Cuts Lab",
    description:
      "Fast-cut sequences with kinetic captions, frame glitches, and smooth zoom transitions.",
    tagline: "Glitch effects · Caption choreography",
    accent: "pink",
  },
  {
    id: "developer-portfolio",
    category: "Developer Portfolio",
    title: "Code & Cosmos",
    description:
      "Animated code snippets, UI previews, and 3D-inspired panels with layered depth.",
    tagline: "Code motion · Layered depth",
    accent: "blue",
  },
];
