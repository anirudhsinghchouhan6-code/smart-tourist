import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./DestinationCard";
import { Compass, Mountain, TreePine, Landmark, Sparkles, Waves, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import goaImg from "@/assets/destination-goa.jpg";
import jaipurImg from "@/assets/destination-jaipur.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import varanasiImg from "@/assets/destination-varanasi.jpg";
import manaliImg from "@/assets/destination-manali.jpg";
import andamanImg from "@/assets/destination-andaman.jpg";
import udaipurImg from "@/assets/destination-udaipur.jpg";

const categories = [
  { id: "all", name: "All", icon: Compass },
  { id: "adventure", name: "Adventure", icon: Mountain },
  { id: "nature", name: "Nature", icon: TreePine },
  { id: "heritage", name: "Heritage", icon: Landmark },
  { id: "beach", name: "Beach", icon: Waves },
  { id: "spiritual", name: "Spiritual", icon: Sun },
];

const destinations = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    image: goaImg,
    category: "beach",
    rating: 4.8,
    state: "Goa",
  },
  {
    id: 2,
    name: "Jaipur",
    country: "India",
    image: jaipurImg,
    category: "heritage",
    rating: 4.9,
    state: "Rajasthan",
  },
  {
    id: 3,
    name: "Kerala",
    country: "India",
    image: keralaImg,
    category: "nature",
    rating: 4.9,
    state: "Kerala",
  },
  {
    id: 4,
    name: "Ladakh",
    country: "India",
    image: ladakhImg,
    category: "adventure",
    rating: 4.8,
    state: "Ladakh",
  },
  {
    id: 5,
    name: "Varanasi",
    country: "India",
    image: varanasiImg,
    category: "spiritual",
    rating: 4.7,
    state: "Uttar Pradesh",
  },
  {
    id: 6,
    name: "Manali",
    country: "India",
    image: manaliImg,
    category: "adventure",
    rating: 4.8,
    state: "Himachal Pradesh",
  },
  {
    id: 7,
    name: "Andaman",
    country: "India",
    image: andamanImg,
    category: "beach",
    rating: 4.9,
    state: "Andaman & Nicobar",
  },
  {
    id: 8,
    name: "Udaipur",
    country: "India",
    image: udaipurImg,
    category: "heritage",
    rating: 4.8,
    state: "Rajasthan",
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
            Explore Incredible India
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the snow-capped Himalayas to tropical beaches, ancient temples to vibrant cities — 
            discover the diverse beauty of India's most stunning destinations.
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                name={destination.name}
                country={destination.state ? `${destination.state}, ${destination.country}` : destination.country}
                image={destination.image}
                category={destination.category}
                rating={destination.rating}
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
            Plan Your India Trip Now!
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
