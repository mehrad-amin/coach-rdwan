import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PartnerLogos from "@/components/sections/PartnerLogos";
import AboutCoach from "@/components/sections/AboutCoach";
import Qualifications from "@/components/sections/Qualifications";
import AthleteResults from "@/components/sections/AthleteResults";
import TrainingPrograms from "@/components/sections/TrainingPrograms";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import TVInterview from "@/components/sections/TVInterview";
import BottomCTA from "@/components/sections/BottomCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flow-root">
        <HeroSection />
        <PartnerLogos />
        <AboutCoach />
        <Qualifications />
        {/* Athlete Results / Competition Achievements Section */}
        <AthleteResults />
        <TrainingPrograms />
        <Testimonials />
        <FAQSection />
        <TVInterview />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
