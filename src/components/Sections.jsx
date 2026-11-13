import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronLeft, ChevronRight,
  FileText, HeartHandshake, Home, Landmark, MapPin, Scale, ShieldCheck, Sparkles, UsersRound, X,
} from "lucide-react";
import Reveal from "./Reveal.jsx";

const icons = {
  book: BookOpen,
  scale: Scale,
  landmark: Landmark,
  users: UsersRound,
  shield: ShieldCheck,
  home: Home,
  briefcase: BriefcaseBusiness,
  file: FileText,
  scroll: FileText,
  sparkles: Sparkles,
  integrity: ShieldCheck,
  knowledge: BookOpen,
  dedication: HeartHandshake,
  responsibility: Scale,
};

function SectionHeading({ eyebrow, title, intro, light = false, className = "" }) {
  return (
    <Reveal className={`section-heading ${light ? "section-heading-light" : ""} ${className}`}>
      <div><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2></div>
      {intro && <p className="section-lead">{intro}</p>}
    </Reveal>
  );
}

export function HeroSection({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero-backdrop" style={{ y: reduceMotion ? 0 : imageY, backgroundImage: `url(${content.background})` }} aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-grid shell">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.12 }}><span />{content.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>{content.title[0]}<br /><em>{content.title[1]}</em></motion.h1>
          <motion.div className="gold-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.85, delay: 0.55 }} />
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.42 }}>{content.subtitle}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>
            <a className="button button-gold" href="#journey">{content.primaryCta}<ArrowRight size={15} /></a>
            <a className="button button-outline" href="#advocates">{content.secondaryCta}</a>
          </motion.div>
          <div className="hero-promise"><Scale size={17} strokeWidth={1.4} /><span>{content.trustLine}</span></div>
        </div>
      </div>
      <a className="hero-scroll" href="#about"><span>Scroll to explore</span><ArrowDown size={14} /></a>
    </section>
  );
}

export function IntroductionSection({ content }) {
  return (
    <section className="intro-section section-pad" id="about">
      <div className="shell intro-layout">
        <Reveal className="intro-image"><img src={content.image} alt={content.imageAlt} loading="lazy" /><div className="image-stamp"><span>SK</span><small>HYDERABAD<br />TELANGANA</small></div></Reveal>
        <Reveal className="intro-copy" delay={0.12}>
          <p className="eyebrow eyebrow-dark"><span />{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p className="intro-lead">{content.lead}</p><p>{content.body}</p>
          <div className="intro-facts">{content.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <p className="source-note">{content.note}</p>
          <a className="text-arrow" href="#advocates">Meet the legal professionals <ArrowRight size={15} /></a>
        </Reveal>
      </div>
    </section>
  );
}

export function AdvocatesSection({ content }) {
  return (
    <section className="advocates-section section-pad" id="advocates">
      <div className="shell">
        <SectionHeading eyebrow="The people behind the practice" title={content.title} intro={content.intro} light />
        <div className="advocate-grid">
          {content.people.map((person, index) => (
            <Reveal className="advocate-reveal" delay={index * 0.1} key={person.name}>
              <motion.article className="advocate-card" whileHover={{ y: -7 }} transition={{ duration: 0.25 }}>
                <div className="advocate-photo"><img src={person.image} alt={person.imageAlt} loading="lazy" /><span className="advocate-counter">0{index + 1}</span>{!person.verified && <span className="placeholder-tag">Profile details needed</span>}</div>
                <div className="advocate-info"><p className="gold-kicker">{person.designation}</p><h3>{person.name}</h3><p className="advocate-bio">{person.biography}</p>
                  <div className="advocate-meta"><p><MapPin size={13} /><span>{person.location}</span></p><p><BookOpen size={13} /><span>{person.education}</span></p></div>
                  <a className="profile-link" href="#contact">View profile <ArrowUpRight size={14} /></a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection({ content }) {
  return (
    <section className="journey-section section-pad" id="journey">
      <div className="shell">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
        <div className="timeline">
          {content.milestones.map((item, index) => {
            const Icon = icons[item.icon] || Scale;
            return <Reveal className="timeline-item" delay={index * 0.08} key={item.number}>
              <span className="timeline-number">{item.number}</span><span className="timeline-node"><Icon size={19} /></span>
              <div className="timeline-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

export function PracticeSection({ content }) {
  return (
    <section className="practice-section section-pad" id="practice">
      <div className="shell"><SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
        <p className="proposed-note"><span />{content.proposedLabel}</p>
        <div className="practice-grid">
          {content.areas.map(([name, icon], index) => {
            const Icon = icons[icon] || Scale;
            return <Reveal className="practice-reveal" delay={index * 0.045} key={name}>
              <motion.article className="practice-card" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Icon className="practice-icon" size={27} strokeWidth={1.35} /><span className="practice-num">0{index + 1}</span>
                <h3>{name}</h3><span className="practice-more">Learn more <ArrowRight size={13} /></span>
              </motion.article>
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

export function CourtsSection({ content }) {
  return (
    <section className="courts-section section-pad">
      <div className="courts-photo" style={{ backgroundImage: `url(${content.image})` }} role="img" aria-label={content.imageAlt} />
      <div className="courts-overlay" />
      <div className="shell courts-content">
        <Reveal><p className="eyebrow"><span />{content.eyebrow}</p><h2>{content.title}</h2><p className="courts-intro">{content.intro}</p><span className="jurisdiction-pill"><MapPin size={14} />{content.jurisdiction}</span></Reveal>
        <div className="court-list">{content.list.map((court, index) => <Reveal className="court-card" delay={index * 0.12} key={court}><Landmark size={22} /><span><small>0{index + 1} · COURT</small><strong>{court}</strong></span><ArrowUpRight size={16} /></Reveal>)}</div>
      </div>
    </section>
  );
}

export function GallerySection({ content }) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (active === null) return undefined;
    const handle = (event) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [active]);
  const change = (offset) => setActive((current) => (current + offset + content.images.length) % content.images.length);
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="shell"><SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
        <div className="gallery-grid">
          {content.images.map((image, index) => <Reveal className={`gallery-item gallery-item-${index + 1}`} delay={index * 0.05} key={image.src}>
            <button className="gallery-button" onClick={() => setActive(index)} aria-label={`Open image: ${image.caption}`}><img src={image.src} alt={image.alt} loading="lazy" /><span className="gallery-caption">{image.caption}<ArrowUpRight size={15} /></span></button>
          </Reveal>)}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
          <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close photo viewer"><X size={22} /></button>
          <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); change(-1); }} aria-label="Previous image"><ChevronLeft size={25} /></button>
          <motion.figure key={content.images[active].src} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(event) => event.stopPropagation()}>
            <img src={content.images[active].src} alt={content.images[active].alt} /><figcaption>{content.images[active].caption}</figcaption>
          </motion.figure>
          <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); change(1); }} aria-label="Next image"><ChevronRight size={25} /></button>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}

export function ValuesSection({ content }) {
  return (
    <section className="values-section section-pad"><div className="shell"><SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="values-grid">{content.items.map(([title, text, key], index) => { const Icon = icons[key] || Sparkles; return <Reveal delay={index * 0.08} key={title}><article className="value-card"><span className="value-icon"><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article></Reveal>; })}</div>
    </div></section>
  );
}

export function ContactSection({ content, links }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="contact-section section-pad" id="contact"><div className="shell contact-layout">
      <Reveal className="contact-copy"><p className="eyebrow"><span />{content.eyebrow}</p><h2>{content.title}</h2><p className="contact-lead">{content.intro}</p>
        <div className="contact-details"><div><span>Location</span><strong>{content.address}</strong></div><div><span>Phone</span><strong>{content.phone}</strong></div><div><span>Email</span><strong>{content.email}</strong></div></div>
        <a className="map-placeholder" href={links.map} target="_blank" rel="noreferrer"><span className="map-grid" /><MapPin size={27} /><strong>{content.mapLabel}</strong><small>Office location to be confirmed</small><span className="map-link">Open map <ArrowUpRight size={13} /></span></a>
      </Reveal>
      <Reveal className="contact-form-wrap" delay={0.12}><form className="enquiry-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}>
        <p className="form-eyebrow">ENQUIRY FORM DEMO</p><h3>How can we assist?</h3><p className="form-note">{content.formDemoNote}</p>
        <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <div className="form-row"><label>Email<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" placeholder="Your number" /></label></div>
        <label>Area of interest<select name="practice" defaultValue=""><option value="" disabled>Select an area</option><option>General consultation</option><option>Practice area to be confirmed</option></select></label>
        <label>Message<textarea name="message" rows="3" placeholder="Briefly describe how we can help" /></label>
        <button className="button button-gold form-submit" type="submit">{content.submit}<ArrowRight size={15} /></button>
        {submitted && <p className="form-status" role="status"><Check size={15} />{content.success}</p>}
      </form></Reveal>
    </div></section>
  );
}
