import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Compass, 
  Mountain, 
  TreePine, 
  Landmark, 
  Waves, 
  Sun,
  Search,
  MapPin,
  Star,
  Clock,
  Users,
  Calendar,
  ArrowRight,
  Heart
} from "lucide-react";

import goaImg from "@/assets/destination-goa.jpg";
import jaipurImg from "@/assets/destination-jaipur.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import varanasiImg from "@/assets/destination-varanasi.jpg";
import manaliImg from "@/assets/destination-manali.jpg";
import andamanImg from "@/assets/destination-andaman.jpg";
import udaipurImg from "@/assets/destination-udaipur.jpg";

const categories = [
  { id: "all", name: "All Destinations", icon: Compass },
  { id: "adventure", name: "Adventure", icon: Mountain },
  { id: "nature", name: "Nature & Wildlife", icon: TreePine },
  { id: "heritage", name: "Heritage & Culture", icon: Landmark },
  { id: "beach", name: "Beach & Islands", icon: Waves },
  { id: "spiritual", name: "Spiritual & Wellness", icon: Sun },
];

const destinations = [
  {
    id: 1,
    name: "Goa",
    state: "Goa",
    country: "India",
    image: goaImg,
    category: "beach",
    rating: 4.8,
    reviewCount: 12500,
    bestTime: "Nov - Feb",
    duration: "3-5 Days",
    startingPrice: 8999,
    highlights: ["Beach Parties", "Water Sports", "Portuguese Architecture", "Nightlife"],
    description: "India's beach paradise with golden sands, vibrant nightlife, and Portuguese heritage.",
  },
  {
    id: 2,
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    image: jaipurImg,
    category: "heritage",
    rating: 4.9,
    reviewCount: 18200,
    bestTime: "Oct - Mar",
    duration: "2-4 Days",
    startingPrice: 7499,
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Local Bazaars"],
    description: "The Pink City showcasing royal Rajasthani heritage and magnificent palaces.",
  },
  {
    id: 3,
    name: "Kerala",
    state: "Kerala",
    country: "India",
    image: keralaImg,
    category: "nature",
    rating: 4.9,
    reviewCount: 15800,
    bestTime: "Sep - Mar",
    duration: "5-7 Days",
    startingPrice: 12999,
    highlights: ["Backwaters", "Ayurveda", "Tea Gardens", "Wildlife"],
    description: "God's Own Country with serene backwaters, lush hills, and ancient Ayurvedic traditions.",
  },
  {
    id: 4,
    name: "Ladakh",
    state: "Ladakh",
    country: "India",
    image: ladakhImg,
    category: "adventure",
    rating: 4.8,
    reviewCount: 9200,
    bestTime: "May - Sep",
    duration: "7-10 Days",
    startingPrice: 18999,
    highlights: ["Pangong Lake", "Nubra Valley", "Monasteries", "Mountain Passes"],
    description: "The Land of High Passes offering breathtaking landscapes and Buddhist monasteries.",
  },
  {
    id: 5,
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    image: varanasiImg,
    category: "spiritual",
    rating: 4.7,
    reviewCount: 11500,
    bestTime: "Oct - Mar",
    duration: "2-3 Days",
    startingPrice: 5999,
    highlights: ["Ganga Aarti", "Ancient Temples", "Boat Rides", "Silk Weaving"],
    description: "One of the world's oldest living cities, the spiritual capital of India.",
  },
  {
    id: 6,
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    image: manaliImg,
    category: "adventure",
    rating: 4.8,
    reviewCount: 14300,
    bestTime: "Mar - Jun, Oct - Feb",
    duration: "4-6 Days",
    startingPrice: 9999,
    highlights: ["Rohtang Pass", "Solang Valley", "River Rafting", "Skiing"],
    description: "A Himalayan resort town known for adventure sports and stunning mountain views.",
  },
  {
    id: 7,
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    country: "India",
    image: andamanImg,
    category: "beach",
    rating: 4.9,
    reviewCount: 8700,
    bestTime: "Oct - May",
    duration: "5-7 Days",
    startingPrice: 22999,
    highlights: ["Radhanagar Beach", "Scuba Diving", "Cellular Jail", "Island Hopping"],
    description: "Pristine islands with crystal-clear waters and world-class diving spots.",
  },
  {
    id: 8,
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    image: udaipurImg,
    category: "heritage",
    rating: 4.8,
    reviewCount: 10400,
    bestTime: "Sep - Mar",
    duration: "2-4 Days",
    startingPrice: 8499,
    highlights: ["Lake Pichola", "City Palace", "Sunset Views", "Heritage Hotels"],
    description: "The City of Lakes featuring romantic settings and royal Mewar heritage.",
  },
];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedDestinations, setSavedDestinations] = useState<number[]>([]);
  const navigate = useNavigate();

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = activeCategory === "all" || dest.category === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-teal/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                <MapPin className="w-3 h-3 mr-1" />
                Explore Incredible India
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Discover Your Next <span className="text-gradient">Adventure</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                From the snow-capped Himalayas to tropical beaches, ancient temples to vibrant cities — 
                find the perfect destination for your dream vacation.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, states..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full border-2 focus:border-primary"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b bg-card/50 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
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
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold">
                  {activeCategory === "all" ? "All Destinations" : categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {filteredDestinations.length} destinations found
                </p>
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
                    onClick={() => navigate(`/destination/${destination.id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Save Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
                        onClick={(e) => toggleSave(destination.id, e)}
                      >
                        <Heart 
                          className={`w-5 h-5 ${savedDestinations.includes(destination.id) ? 'fill-destructive text-destructive' : ''}`} 
                        />
                      </Button>

                      {/* Category Badge */}
                      <Badge className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white border-0">
                        {categories.find(c => c.id === destination.category)?.name}
                      </Badge>

                      {/* Location & Rating */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                          <p className="text-white/80 text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {destination.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-semibold">{destination.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {destination.description}
                      </p>

                      {/* Info Row */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {destination.bestTime}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{destination.highlights.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className="text-lg font-bold text-primary">
                            ₹{destination.startingPrice.toLocaleString()}
                          </p>
                        </div>
                        <Button size="sm" className="bg-coral-gradient">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-16">
                <Compass className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-teal/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Can't decide? Let AI plan your perfect trip!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Tell us your preferences and our AI will create a personalized itinerary just for you.
            </p>
            <Button 
              size="lg" 
              className="bg-coral-gradient"
              onClick={() => navigate("/trip-planner")}
            >
              Start AI Trip Planner
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}
