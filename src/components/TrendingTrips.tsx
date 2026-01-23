import { motion } from "framer-motion";
import { TripPackageCard } from "./TripPackageCard";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import singaporeImg from "@/assets/destination-singapore.jpg";
import maldivesImg from "@/assets/destination-maldives.jpg";
import georgiaImg from "@/assets/destination-georgia.jpg";

const trendingTrips = [
  {
    id: 1,
    title: "Magical Moments in Singapore",
    destinations: ["Singapore"],
    nights: 4,
    price: 1799,
    originalPrice: 2199,
    curator: "Bharath",
    image: singaporeImg,
    rating: 4.9,
    includes: ["Stays", "Transfers", "Flights", "Activities"],
  },
  {
    id: 2,
    title: "Romantic Honeymoon in Maldives",
    destinations: ["Malé", "Baa Atoll"],
    nights: 6,
    price: 3499,
    originalPrice: 4299,
    curator: "Aakansha",
    image: maldivesImg,
    rating: 4.9,
    includes: ["Stays", "Speedboat", "All-Inclusive", "Spa"],
  },
  {
    id: 3,
    title: "Adventure Getaway to Georgia",
    destinations: ["Tbilisi", "Stepantsminda", "Kazbegi"],
    nights: 10,
    price: 2199,
    curator: "TravelWise",
    image: georgiaImg,
    rating: 4.8,
    includes: ["Stays", "Transfers", "Tours", "Meals"],
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
              Trips Travelers Can't Stop Loving
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Created and loved by travelers like you. These itineraries are
              customized, bookable, and trending right now.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Trips
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
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
