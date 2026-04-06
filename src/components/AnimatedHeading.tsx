import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}

const AnimatedHeading = ({ children, className, delay = 0, as: Tag = "h2" }: Props) => {
  return (
    <Tag className={className}>
      <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
        <motion.span
          style={{ display: "block" }}
          initial={{ y: "105%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
};

export default AnimatedHeading;
