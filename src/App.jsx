import { site } from "./content/siteContent.js";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import {
  AdvocatesSection, ContactSection, CourtsSection, HeroSection,
  IntroductionSection, JourneySection, PracticeSection, ValuesSection,
} from "./components/Sections.jsx";

export default function App() {
  return (
    <>
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
      <SiteFooter brand={site.brand} navigation={site.navigation} footer={site.footer} links={site.links} />
    </>
  );
}
