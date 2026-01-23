import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DestinationsSection } from "@/components/DestinationsSection";
import { TrendingTrips } from "@/components/TrendingTrips";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <DestinationsSection />
      <TrendingTrips />
      <FeaturesSection />
      <CTASection />
      <Footer />
      <AIChatWidget />
    </div>
  );
}
