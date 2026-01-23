import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Shield, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bali.jpg";

export function Hero() {
  const navigate = useNavigate();

  const badges = [
    { icon: Star, text: "4.8+ Rated" },
    { icon: Shield, text: "All Taxes Included" },
    { icon: Headphones, text: "24/7 Support" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Trip Planning
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            Your Trip, <br />
            <span className="text-gradient-coral bg-coral-gradient">Your Vibe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
          >
            Solo? Couple? Group? We plan like it's just for you — because it is. 
            Let our AI travel assistant craft your perfect journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-coral-gradient hover:opacity-90 transition-opacity shadow-glow animate-pulse-glow"
              onClick={() => navigate("/trip-planner")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Plan My Trip with AI
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => navigate("/destinations")}
            >
              Explore Destinations
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            {badges.map((badge, index) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-white/70"
              >
                <badge.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
