import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./DestinationCard";
import { Compass, Mountain, TreePine, Landmark, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import thailandImg from "@/assets/destination-thailand.jpg";
import singaporeImg from "@/assets/destination-singapore.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import parisImg from "@/assets/destination-paris.jpg";
import georgiaImg from "@/assets/destination-georgia.jpg";

const categories = [
  { id: "all", name: "All", icon: Compass },
  { id: "adventure", name: "Adventure", icon: Mountain },
  { id: "nature", name: "Nature", icon: TreePine },
  { id: "heritage", name: "Heritage", icon: Landmark },
];

const destinations = [
  {
    id: 1,
    name: "Thailand",
    country: "Southeast Asia",
    image: thailandImg,
    category: "adventure",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Singapore",
    country: "Southeast Asia",
    image: singaporeImg,
    category: "adventure",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Maldives",
    country: "South Asia",
    image: maldivesImg,
    category: "nature",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    image: parisImg,
    category: "heritage",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Georgia",
    country: "Caucasus",
    image: georgiaImg,
    category: "adventure",
    rating: 4.8,
  },
];

export function DestinationsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const filteredDestinations =
    activeCategory === "all"
      ? destinations
      : destinations.filter((d) => d.category === activeCategory);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Places You'll Brag About Forever
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From jaw-dropping landmarks to hidden gems, these are the kind of
            spots that turn into stories, selfies, and serious travel envy.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <DestinationCard
                {...destination}
                onClick={() => navigate(`/destination/${destination.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-coral-gradient hover:opacity-90"
            onClick={() => navigate("/trip-planner")}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create a Trip Now!
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
