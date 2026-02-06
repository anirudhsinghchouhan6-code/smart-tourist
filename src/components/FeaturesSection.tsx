import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  IndianRupee,
  Shield,
  Headphones,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Trip Planning",
    description:
      "Our AI curates the best flights, stays & activities across India — from Ladakh to Kerala, Goa to Andaman.",
  },
  {
    icon: Headphones,
    title: "24×7 Travel Support",
    description:
      "WhatsApp concierge always ready. Missed a train, need a last-minute hotel? One message and it's sorted.",
  },
  {
    icon: Heart,
    title: "Local Experts, Real Insights",
    description:
      "Every trip is fine-tuned by on-ground experts who know the hidden gems, best chai stalls & secret viewpoints.",
  },
  {
    icon: Shield,
    title: "Trusted by 10,000+ Travelers",
    description:
      "Verified hosts, honest reviews & partnerships with top Indian hotels — only tried & tested experiences.",
  },
  {
    icon: IndianRupee,
    title: "Best Prices, No Hidden Fees",
    description:
      "Transparent pricing in ₹ — what you see is what you pay. EMI options available on all packages.",
  },
  {
    icon: RefreshCw,
    title: "Flexible & Stress-Free",
    description:
      "Plans change? We adapt. Easy modifications, quick refunds & alternative options ready before you ask.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Travel to Match{" "}
            <span className="text-gradient-coral bg-coral-gradient">
              Your Vibe
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Find a plan that feels just right — whether you're planning a honeymoon, 
            a road trip, or your next solo escape across incredible India.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-coral-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
