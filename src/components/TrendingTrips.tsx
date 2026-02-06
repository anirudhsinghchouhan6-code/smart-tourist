import { motion } from "framer-motion";
import { TripPackageCard } from "./TripPackageCard";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import goaImg from "@/assets/destination-goa.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import jaipurImg from "@/assets/destination-jaipur.jpg";
import andamanImg from "@/assets/destination-andaman.jpg";
import manaliImg from "@/assets/destination-manali.jpg";

const trendingTrips = [
  // Himalayan Thrills - North India
  {
    id: 1,
    title: "Himalayan Adventure in Ladakh",
    destinations: ["Leh", "Nubra Valley", "Pangong Lake"],
    nights: 7,
    price: 45999,
    originalPrice: 55999,
    curator: "Wanderlust India",
    image: ladakhImg,
    rating: 4.9,
    includes: ["Stays", "Transfers", "Flights", "Permits"],
    region: "North India",
  },
  {
    id: 2,
    title: "Magical Manali & Spiti Valley",
    destinations: ["Manali", "Spiti", "Kaza", "Key Monastery"],
    nights: 8,
    price: 35999,
    originalPrice: 42999,
    curator: "Mountain Trails",
    image: manaliImg,
    rating: 4.8,
    includes: ["Stays", "4x4 Transfers", "Meals", "Guide"],
    region: "North India",
  },
  // Coastal & Island Adventures - West & South India
  {
    id: 3,
    title: "Tropical Escape to Goa",
    destinations: ["North Goa", "South Goa", "Dudhsagar"],
    nights: 5,
    price: 18999,
    originalPrice: 24999,
    curator: "Beach Lovers",
    image: goaImg,
    rating: 4.7,
    includes: ["Stays", "Transfers", "Water Sports", "Parties"],
    region: "West India",
  },
  {
    id: 4,
    title: "Andaman Island Hopping",
    destinations: ["Port Blair", "Havelock", "Neil Island"],
    nights: 6,
    price: 42999,
    originalPrice: 52999,
    curator: "Island Explorers",
    image: andamanImg,
    rating: 4.9,
    includes: ["Stays", "Ferry", "Scuba Diving", "Snorkeling"],
    region: "Islands",
  },
  // Southern Adventures - Karnataka & Kerala
  {
    id: 5,
    title: "Kerala Backwaters & Beyond",
    destinations: ["Kochi", "Munnar", "Alleppey", "Kovalam"],
    nights: 7,
    price: 32999,
    originalPrice: 39999,
    curator: "Kerala Tourism",
    image: keralaImg,
    rating: 4.9,
    includes: ["Stays", "Houseboat", "Ayurveda Spa", "Meals"],
    region: "South India",
  },
  {
    id: 6,
    title: "Royal Rajasthan Heritage Tour",
    destinations: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
    nights: 9,
    price: 48999,
    originalPrice: 59999,
    curator: "Heritage Walks",
    image: jaipurImg,
    rating: 4.8,
    includes: ["Palace Stays", "Desert Safari", "Cultural Shows", "Meals"],
    region: "North India",
  },
];

export function TrendingTrips() {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Places You'll Brag About Forever
            </h2>
            <p className="text-muted-foreground max-w-xl">
              From jaw-dropping landmarks to hidden gems — these are the kind of spots 
              that turn into stories, selfies, and serious travel envy.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Trips
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Region Labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              🏔️ Himalayan Thrills
            </span>
            <span className="px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium">
              🏖️ Coastal Adventures
            </span>
            <span className="px-4 py-2 rounded-full bg-coral/10 text-coral text-sm font-medium">
              🌴 Southern Escapes
            </span>
            <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium">
              🏰 Royal Heritage
            </span>
          </div>
        </motion.div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TripPackageCard
                {...trip}
                onViewDetails={() => navigate(`/package/${trip.id}`)}
              />
            </motion.div>
          ))}
        </div>

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
