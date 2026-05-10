import { HomepageViewEvent } from "@/components/analytics/AnalyticsEvents";
import { ContactCardsSection } from "@/components/sections/ContactCardsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FacilityOverviewSection } from "@/components/sections/FacilityOverviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LocalFacilitySection } from "@/components/sections/LocalFacilitySection";
import { StorageBenefits } from "@/components/sections/StorageBenefits";
import { StorableRentalSection } from "@/components/sections/StorableRentalSection";
import { TestimonialsPlaceholder } from "@/components/sections/TestimonialsPlaceholder";
import { UnitSizeGuide } from "@/components/sections/UnitSizeGuide";

export default function HomePage() {
  return (
    <>
      <HomepageViewEvent />
      <HeroSection />
      <FacilityOverviewSection />
      <UnitSizeGuide />
      <StorableRentalSection />
      <TestimonialsPlaceholder />
      <LocalFacilitySection />
      <StorageBenefits />
      <HowItWorks />
      <FAQSection preview />
      <ContactCardsSection intro />
      <ContactCTA />
    </>
  );
}
