import { AvailableUnitsPreview } from "@/components/sections/AvailableUnitsPreview";
import { HomepageViewEvent } from "@/components/analytics/AnalyticsEvents";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FacilityOverviewSection } from "@/components/sections/FacilityOverviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { KingsMountainFacilityHighlight } from "@/components/sections/KingsMountainFacilityHighlight";
import { LocalFacilitySection } from "@/components/sections/LocalFacilitySection";
import { StorageBenefits } from "@/components/sections/StorageBenefits";
import { StorableRentalSection } from "@/components/sections/StorableRentalSection";
import { TestimonialsPlaceholder } from "@/components/sections/TestimonialsPlaceholder";

export default function HomePage() {
  return (
    <>
      <HomepageViewEvent />
      <HeroSection />
      <KingsMountainFacilityHighlight />
      <FacilityOverviewSection />
      <AvailableUnitsPreview />
      <StorableRentalSection />
      <TestimonialsPlaceholder />
      <LocalFacilitySection />
      <StorageBenefits />
      <HowItWorks />
      <FAQSection preview />
      <ContactCTA />
    </>
  );
}
