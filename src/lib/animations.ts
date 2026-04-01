import { Variants, Transition } from "framer-motion";

// ─── Shared easing & timing ───
const ease = [0.25, 0.1, 0.25, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

// ─── Reusable transition presets ───
export const smoothTransition: Transition = {
  duration: 0.8,
  ease: easeOut as unknown as number[],
};

export const slowTransition: Transition = {
  duration: 1.1,
  ease: easeOut as unknown as number[],
};

export const gentleTransition: Transition = {
  duration: 0.7,
  ease: ease as unknown as number[],
};

// ─── Variant factories ───

/** Fade up from below — the workhorse reveal */
export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...smoothTransition, delay },
  },
});

/** Soft fade — almost no movement, pure opacity */
export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: easeOut as unknown as number[], delay },
  },
});

/** Subtle scale-in for images/cards */
export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: easeOut as unknown as number[], delay },
  },
});

/** Slide from left */
export const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...slowTransition, delay },
  },
});

/** Slide from right */
export const slideRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...slowTransition, delay },
  },
});

/** Staggered container — children animate one after another */
export const staggerContainer = (staggerDelay = 0.12, startDelay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: startDelay,
    },
  },
});

/** Child item for stagger containers */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut as unknown as number[] },
  },
};

/** Hero-specific: slower, more dramatic */
export const heroText = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeOut as unknown as number[], delay },
  },
});

/** Very slow parallax drift for decorative elements */
export const parallaxDrift: Variants = {
  hidden: { y: 0 },
  visible: {
    y: -30,
    transition: { duration: 8, ease: "linear", repeat: Infinity, repeatType: "reverse" },
  },
};

/** Viewport settings for scroll-triggered animations */
export const viewportOnce = { once: true, margin: "-80px" as any };
export const viewportOnceNear = { once: true, margin: "-40px" as any };
