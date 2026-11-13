import { motion, useReducedMotion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      variants={revealVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
