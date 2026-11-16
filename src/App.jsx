import { useEffect, useState } from "react";
import { site } from "./content/siteContent.js";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import HomeVisitConsent from "./components/HomeVisitConsent.jsx";
import {
  AdvocatesSection, ContactSection, CourtsSection, HeroSection,
  IntroductionSection, JourneySection, PracticeSection, ValuesSection,
} from "./components/Sections.jsx";

export default function App() {
  const [showVisitConsent, setShowVisitConsent] = useState(true);
  const [previewVisits, setPreviewVisits] = useState(null);

  useEffect(() => {
    let active = true;
    fetch("/preview-link/count/total", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active && Number.isFinite(data?.visitCount)) setPreviewVisits(data.visitCount); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <>
      {showVisitConsent && <HomeVisitConsent onDismiss={() => setShowVisitConsent(false)} onCounted={setPreviewVisits} />}
      <SiteHeader brand={site.brand} navigation={site.navigation} />
      <main>
        <HeroSection content={site.hero} />
        <IntroductionSection content={site.introduction} />
        <AdvocatesSection content={site.advocates} />
        <JourneySection content={site.journey} />
        <PracticeSection content={site.practice} />
        <CourtsSection content={site.courts} />
        <ValuesSection content={site.values} />
        <ContactSection content={site.contact} links={site.links} />
      </main>
      <SiteFooter brand={site.brand} navigation={site.navigation} footer={site.footer} links={site.links} previewVisits={previewVisits} />
      <div className="preview-watermark" aria-label="Client preview by TechVedhaBees">
        <span aria-hidden="true">TVB</span>
        <span>Client Preview · TechVedhaBees</span>
      </div>
    </>
  );
}
