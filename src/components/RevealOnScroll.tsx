import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

const RevealOnScroll = ({ children, delay = 0, direction = "up", className }: Props) => {
  const initial: Record<string, unknown> = { opacity: 0 };
  const animate: Record<string, unknown> = { opacity: 1 };

  if (direction === "up") { initial.y = 40; animate.y = 0; }
  if (direction === "left") { initial.x = -40; animate.x = 0; }
  if (direction === "right") { initial.x = 40; animate.x = 0; }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
