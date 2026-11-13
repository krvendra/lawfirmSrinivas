import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function SiteHeader({ brand, navigation }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#home" onClick={close} aria-label={`${brand.name} home`}>
          <span className="brand-mark">{brand.mark}</span>
          <span className="brand-name"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
        </a>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
          <a className="nav-cta" href="#contact">Book consultation <ArrowUpRight size={14} /></a>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {navigation.map(([label, id]) => <a href={`#${id}`} onClick={close} key={id}>{label}</a>)}
              <a href="#contact" onClick={close}>Book consultation <ArrowUpRight size={14} /></a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
