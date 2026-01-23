import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  DollarSign,
  Shield,
  Headphones,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smarter Than Any Search Engine",
    description:
      "AI pulls the best flights, stays & activities from 1100+ platforms — so you don't waste hours comparing.",
  },
  {
    icon: Headphones,
    title: "Always a Human Behind the Screen",
    description:
      "24×7 WhatsApp concierge. Got stuck, missed a flight, or want a table with a view? One ping and it's done.",
  },
  {
    icon: Heart,
    title: "Locals + Experts, On Your Side",
    description:
      "AI builds, humans perfect. Every trip is fine-tuned by on-ground experts & travel curators who know the real deal.",
  },
  {
    icon: Shield,
    title: "Zero Guesswork, All Trust",
    description:
      "Backed by 10,000+ reviews, global partners, and verified local hosts — you only get tried & trusted experiences.",
  },
  {
    icon: DollarSign,
    title: "Plans That Actually Flow",
    description:
      "No awkward gaps or wasted days — from airport pickups to late-night food tours, your itinerary just works.",
  },
  {
    icon: RefreshCw,
    title: "No Stress, Just Plan B Ready",
    description:
      "Weather turned bad? Activity sold out? We'll swap in an equally amazing alternative before you even ask.",
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
            What Makes Us{" "}
            <span className="text-gradient-coral bg-coral-gradient">
              Wander-ful
            </span>
          </h2>
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
