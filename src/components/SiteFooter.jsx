import { Facebook, Instagram, MessageCircle, Phone, Youtube } from "lucide-react";

const socialItems = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "whatsapp", label: "WhatsApp", Icon: null },
];

function SocialIcon({ item, href }) {
  const content = item.Icon
    ? <item.Icon size={18} strokeWidth={1.7} />
    : <span className="whatsapp-mark"><MessageCircle size={19} strokeWidth={1.7} /><Phone size={9} strokeWidth={2.2} /></span>;

  return href
    ? <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>{content}</a>
    : <span className="social-link social-link-pending" aria-label={`${item.label} link to be provided`} title={`${item.label} link to be provided`}>{content}</span>;
}

export default function SiteFooter({ brand, navigation, footer, links, previewVisits }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">{brand.mark}</span>
          <span className="brand-name"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
        </a>
        <div className="footer-nav"><strong>Explore</strong>{navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
        <div className="footer-contact"><strong>Office</strong><span>{brand.location}</span><div className="social-links" aria-label="Social media links">{socialItems.map(item => <SocialIcon key={item.key} item={item} href={links[item.key]} />)}</div></div>
        <div className="footer-notes"><strong>Important information</strong><p>{footer.disclaimer}</p><p>{footer.privacy}</p></div>
      </div>
      <div className="footer-bottom"><div className="shell footer-bottom-inner"><span>{footer.copyright}</span><span className="footer-credit">{footer.creditPrefix} <a href={footer.creditUrl} target="_blank" rel="noreferrer">{footer.creditName}</a></span><span className="footer-visit-count" aria-live="polite">Preview visits: <strong>{previewVisits ?? "—"}</strong></span><a href="#home">Back to top ↑</a></div></div>
    </footer>
  );
}
