import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  Users,
  Plane,
  Hotel,
  Train,
  Camera,
  Utensils,
  Umbrella,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Info
} from "lucide-react";

import goaImg from "@/assets/destination-goa.jpg";
import jaipurImg from "@/assets/destination-jaipur.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import varanasiImg from "@/assets/destination-varanasi.jpg";
import manaliImg from "@/assets/destination-manali.jpg";
import andamanImg from "@/assets/destination-andaman.jpg";
import udaipurImg from "@/assets/destination-udaipur.jpg";

const destinationsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Goa",
    state: "Goa",
    country: "India",
    image: goaImg,
    category: "beach",
    rating: 4.8,
    reviewCount: 12500,
    bestTime: "November - February",
    duration: "3-5 Days",
    startingPrice: 8999,
    highlights: ["Beach Parties", "Water Sports", "Portuguese Architecture", "Nightlife", "Seafood", "Flea Markets"],
    description: "India's beach paradise with golden sands, vibrant nightlife, and Portuguese heritage. Goa offers the perfect blend of relaxation and adventure with its stunning beaches, historic churches, and delicious seafood.",
    overview: "Goa, located on the western coast of India, is renowned for its pristine beaches, vibrant nightlife, and unique blend of Indian and Portuguese cultures. From the lively shores of Baga and Calangute in North Goa to the serene beaches of Palolem and Agonda in South Goa, there's something for every traveler.",
    activities: [
      { name: "Beach Hopping", icon: Umbrella, description: "Explore famous beaches like Baga, Calangute, Anjuna, and Palolem" },
      { name: "Water Sports", icon: Camera, description: "Parasailing, jet skiing, banana boat rides, and scuba diving" },
      { name: "Heritage Tours", icon: Camera, description: "Visit Old Goa churches, Fort Aguada, and Fontainhas" },
      { name: "Nightlife", icon: Camera, description: "Experience beach shacks, clubs, and the famous Goan party scene" },
    ],
    packages: [
      { name: "Budget Beach Escape", duration: "3N/4D", price: 8999, includes: ["Stay", "Breakfast", "Transfers"] },
      { name: "Goa Explorer", duration: "4N/5D", price: 14999, includes: ["Stay", "All Meals", "Sightseeing", "Water Sports"] },
      { name: "Luxury Retreat", duration: "5N/6D", price: 29999, includes: ["5-Star Stay", "All Meals", "Spa", "Private Tours"] },
    ],
    howToReach: {
      byAir: "Dabolim Airport (GOI) - 30 km from Panaji",
      byTrain: "Madgaon Junction (MAO) and Thivim Station (THVM)",
      byRoad: "Well connected via NH66 from Mumbai and Bangalore",
    },
    weather: {
      summer: "30-35°C (Hot & Humid)",
      monsoon: "25-30°C (Heavy Rainfall)",
      winter: "20-32°C (Pleasant & Ideal)",
    }
  },
  "2": {
    id: 2,
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    image: jaipurImg,
    category: "heritage",
    rating: 4.9,
    reviewCount: 18200,
    bestTime: "October - March",
    duration: "2-4 Days",
    startingPrice: 7499,
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Local Bazaars", "Jantar Mantar", "Nahargarh Fort"],
    description: "The Pink City showcasing royal Rajasthani heritage and magnificent palaces. Jaipur is a vibrant blend of ancient history and modern culture.",
    overview: "Jaipur, the capital of Rajasthan, is famously known as the Pink City due to the terracotta pink color of its old buildings. Founded in 1727 by Maharaja Sawai Jai Singh II, it's one of India's first planned cities and a UNESCO World Heritage Site.",
    activities: [
      { name: "Fort Exploration", icon: Camera, description: "Visit Amber Fort, Nahargarh Fort, and Jaigarh Fort" },
      { name: "Palace Tours", icon: Camera, description: "Explore City Palace, Hawa Mahal, and Jal Mahal" },
      { name: "Shopping", icon: Camera, description: "Shop for jewelry, textiles, and handicrafts at Johari Bazaar" },
      { name: "Cultural Shows", icon: Camera, description: "Enjoy traditional Rajasthani folk performances" },
    ],
    packages: [
      { name: "Heritage Walk", duration: "2N/3D", price: 7499, includes: ["Stay", "Breakfast", "Guided Tours"] },
      { name: "Royal Rajasthan", duration: "3N/4D", price: 12999, includes: ["Stay", "All Meals", "Fort Tours", "Shopping"] },
      { name: "Palace Experience", duration: "4N/5D", price: 24999, includes: ["Heritage Stay", "All Meals", "Private Guide", "Elephant Ride"] },
    ],
    howToReach: {
      byAir: "Jaipur International Airport (JAI) - 13 km from city center",
      byTrain: "Jaipur Junction (JP) - Major railway hub",
      byRoad: "Well connected via NH48 from Delhi (280 km)",
    },
    weather: {
      summer: "35-45°C (Very Hot)",
      monsoon: "25-35°C (Moderate Rainfall)",
      winter: "8-22°C (Cool & Ideal)",
    }
  },
  "3": {
    id: 3,
    name: "Kerala",
    state: "Kerala",
    country: "India",
    image: keralaImg,
    category: "nature",
    rating: 4.9,
    reviewCount: 15800,
    bestTime: "September - March",
    duration: "5-7 Days",
    startingPrice: 12999,
    highlights: ["Backwaters", "Ayurveda", "Tea Gardens", "Wildlife", "Houseboats", "Beaches"],
    description: "God's Own Country with serene backwaters, lush hills, and ancient Ayurvedic traditions. Kerala offers a unique tropical experience unlike anywhere else in India.",
    overview: "Kerala, on India's tropical Malabar Coast, is known for its palm-lined beaches, backwaters, and hill stations. The state is famous for its Ayurvedic treatments, spice plantations, and wildlife sanctuaries.",
    activities: [
      { name: "Houseboat Stay", icon: Camera, description: "Cruise through Alleppey backwaters in traditional kettuvallam" },
      { name: "Ayurveda Retreat", icon: Camera, description: "Experience traditional healing at authentic Ayurvedic centers" },
      { name: "Tea Garden Tours", icon: Camera, description: "Visit Munnar's sprawling tea estates and spice plantations" },
      { name: "Wildlife Safari", icon: Camera, description: "Spot elephants at Periyar and Wayanad wildlife sanctuaries" },
    ],
    packages: [
      { name: "Backwater Bliss", duration: "4N/5D", price: 12999, includes: ["Stay", "Houseboat", "Meals", "Transfers"] },
      { name: "Kerala Complete", duration: "6N/7D", price: 22999, includes: ["Multi-city Stay", "All Meals", "Tours", "Ayurveda"] },
      { name: "Luxury Kerala", duration: "7N/8D", price: 45999, includes: ["Premium Stays", "All Inclusive", "Spa", "Private Tours"] },
    ],
    howToReach: {
      byAir: "Cochin (COK), Trivandrum (TRV), Calicut (CCJ) airports",
      byTrain: "Ernakulam, Trivandrum, Kozhikode major junctions",
      byRoad: "Well connected via NH66 along the coast",
    },
    weather: {
      summer: "28-35°C (Hot & Humid)",
      monsoon: "24-30°C (Heavy Rainfall - Scenic)",
      winter: "22-32°C (Pleasant & Ideal)",
    }
  },
  "4": {
    id: 4,
    name: "Ladakh",
    state: "Ladakh",
    country: "India",
    image: ladakhImg,
    category: "adventure",
    rating: 4.8,
    reviewCount: 9200,
    bestTime: "May - September",
    duration: "7-10 Days",
    startingPrice: 18999,
    highlights: ["Pangong Lake", "Nubra Valley", "Monasteries", "Mountain Passes", "Magnetic Hill", "Khardung La"],
    description: "The Land of High Passes offering breathtaking landscapes and Buddhist monasteries. Ladakh is a paradise for adventure seekers and spiritual travelers alike.",
    overview: "Ladakh, meaning 'Land of High Passes', is a high-altitude desert region in the Himalayas. Known for its remote mountain beauty, Buddhist monasteries, and stark landscapes, it offers one of the most unique travel experiences in India.",
    activities: [
      { name: "Bike Expedition", icon: Camera, description: "Ride through world's highest motorable passes" },
      { name: "Monastery Visits", icon: Camera, description: "Explore ancient Buddhist monasteries in Leh, Hemis, Thiksey" },
      { name: "Camping", icon: Camera, description: "Camp under stars at Pangong Lake and Nubra Valley" },
      { name: "River Rafting", icon: Camera, description: "White water rafting on the Zanskar River" },
    ],
    packages: [
      { name: "Ladakh Essential", duration: "5N/6D", price: 18999, includes: ["Stay", "Meals", "Permits", "Sightseeing"] },
      { name: "Complete Ladakh", duration: "7N/8D", price: 28999, includes: ["All Stays", "All Meals", "Bike/Vehicle", "Camping"] },
      { name: "Luxury Ladakh", duration: "9N/10D", price: 55999, includes: ["Premium Camps", "All Inclusive", "Private Tours", "Helicopter Ride"] },
    ],
    howToReach: {
      byAir: "Kushok Bakula Rimpochee Airport, Leh (IXL)",
      byRoad: "Manali-Leh Highway (474 km) or Srinagar-Leh Highway (434 km)",
      byTrain: "Nearest station Jammu Tawi, then by road",
    },
    weather: {
      summer: "15-30°C (Best Time)",
      monsoon: "10-25°C (Landslides possible)",
      winter: "-15 to 5°C (Extreme Cold, Roads Closed)",
    }
  },
  "5": {
    id: 5,
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    image: varanasiImg,
    category: "spiritual",
    rating: 4.7,
    reviewCount: 11500,
    bestTime: "October - March",
    duration: "2-3 Days",
    startingPrice: 5999,
    highlights: ["Ganga Aarti", "Ancient Temples", "Boat Rides", "Silk Weaving", "Ghats", "Sarnath"],
    description: "One of the world's oldest living cities, the spiritual capital of India. Varanasi offers a profound glimpse into Hindu spirituality and ancient traditions.",
    overview: "Varanasi, also known as Kashi or Banaras, is one of the oldest continuously inhabited cities in the world. Situated on the banks of the Ganges, it's the holiest city for Hindus and a center of learning and civilization for over 3000 years.",
    activities: [
      { name: "Ganga Aarti", icon: Camera, description: "Witness the spectacular evening prayer ceremony at Dashashwamedh Ghat" },
      { name: "Boat Ride", icon: Camera, description: "Sunrise boat ride along the ghats of River Ganges" },
      { name: "Temple Tours", icon: Camera, description: "Visit Kashi Vishwanath Temple, Sankat Mochan, and more" },
      { name: "Sarnath Visit", icon: Camera, description: "Explore where Buddha gave his first sermon" },
    ],
    packages: [
      { name: "Spiritual Escape", duration: "2N/3D", price: 5999, includes: ["Stay", "Breakfast", "Aarti", "Boat Ride"] },
      { name: "Kashi Darshan", duration: "3N/4D", price: 9999, includes: ["Stay", "All Meals", "Temple Tours", "Sarnath"] },
      { name: "Heritage Varanasi", duration: "4N/5D", price: 18999, includes: ["Heritage Stay", "All Inclusive", "Private Guide", "Silk Tour"] },
    ],
    howToReach: {
      byAir: "Lal Bahadur Shastri Airport (VNS) - 25 km from city",
      byTrain: "Varanasi Junction (BSB) and Varanasi City (BCY)",
      byRoad: "Well connected to Lucknow (300 km), Patna (250 km)",
    },
    weather: {
      summer: "32-45°C (Very Hot)",
      monsoon: "26-35°C (Humid)",
      winter: "5-20°C (Cool & Ideal)",
    }
  },
  "6": {
    id: 6,
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    image: manaliImg,
    category: "adventure",
    rating: 4.8,
    reviewCount: 14300,
    bestTime: "March - June, October - February",
    duration: "4-6 Days",
    startingPrice: 9999,
    highlights: ["Rohtang Pass", "Solang Valley", "River Rafting", "Skiing", "Old Manali", "Hadimba Temple"],
    description: "A Himalayan resort town known for adventure sports and stunning mountain views. Manali is perfect for honeymooners, adventure enthusiasts, and nature lovers.",
    overview: "Manali, nestled in the mountains of Himachal Pradesh at an altitude of 2,050 meters, is a popular hill station known for its scenic beauty, adventure activities, and as a gateway to the high Himalayas and ancient Buddhist centers.",
    activities: [
      { name: "Adventure Sports", icon: Camera, description: "Paragliding, river rafting, zorbing, and skiing in Solang Valley" },
      { name: "Rohtang Pass", icon: Camera, description: "Drive to the snow-covered pass at 13,050 feet" },
      { name: "Trekking", icon: Camera, description: "Trek to Bhrigu Lake, Hampta Pass, or Beas Kund" },
      { name: "Temple Visits", icon: Camera, description: "Explore Hadimba Temple and Manu Temple" },
    ],
    packages: [
      { name: "Mountain Escape", duration: "3N/4D", price: 9999, includes: ["Stay", "Breakfast", "Sightseeing"] },
      { name: "Adventure Special", duration: "5N/6D", price: 17999, includes: ["Stay", "All Meals", "Activities", "Rohtang Permit"] },
      { name: "Honeymoon Package", duration: "5N/6D", price: 24999, includes: ["Premium Stay", "All Meals", "Candlelight Dinner", "Private Tours"] },
    ],
    howToReach: {
      byAir: "Kullu-Manali Airport (KUU) - 50 km, or Chandigarh (310 km)",
      byTrain: "Nearest station Joginder Nagar (165 km) or Chandigarh",
      byRoad: "Well connected from Delhi (540 km) and Chandigarh (310 km)",
    },
    weather: {
      summer: "10-25°C (Pleasant)",
      monsoon: "10-20°C (Landslides possible)",
      winter: "-5 to 10°C (Snowfall, Ideal for Snow Activities)",
    }
  },
  "7": {
    id: 7,
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    country: "India",
    image: andamanImg,
    category: "beach",
    rating: 4.9,
    reviewCount: 8700,
    bestTime: "October - May",
    duration: "5-7 Days",
    startingPrice: 22999,
    highlights: ["Radhanagar Beach", "Scuba Diving", "Cellular Jail", "Island Hopping", "Snorkeling", "Sea Walking"],
    description: "Pristine islands with crystal-clear waters and world-class diving spots. The Andaman Islands offer untouched natural beauty and rich history.",
    overview: "The Andaman Islands are an archipelago of over 500 islands in the Bay of Bengal, known for their pristine beaches, turquoise waters, and rich marine life. The islands also hold historical significance with the Cellular Jail, a reminder of India's freedom struggle.",
    activities: [
      { name: "Scuba Diving", icon: Camera, description: "Dive into crystal-clear waters at Havelock and Neil Islands" },
      { name: "Island Hopping", icon: Camera, description: "Explore Havelock, Neil, Ross, and North Bay Islands" },
      { name: "Beach Activities", icon: Camera, description: "Snorkeling, sea walking, and glass-bottom boat rides" },
      { name: "History Tour", icon: Camera, description: "Visit Cellular Jail and attend the Light & Sound Show" },
    ],
    packages: [
      { name: "Island Intro", duration: "4N/5D", price: 22999, includes: ["Stay", "Meals", "Ferry", "Snorkeling"] },
      { name: "Andaman Explorer", duration: "6N/7D", price: 34999, includes: ["Multi-Island Stay", "All Meals", "Scuba", "All Activities"] },
      { name: "Luxury Island", duration: "7N/8D", price: 59999, includes: ["Beach Resort", "All Inclusive", "Private Speed Boat", "Premium Diving"] },
    ],
    howToReach: {
      byAir: "Veer Savarkar International Airport, Port Blair (IXZ)",
      bySea: "Ship from Chennai (3 days) or Kolkata (4 days)",
      interIsland: "Government ferries and private speedboats",
    },
    weather: {
      summer: "24-35°C (Humid)",
      monsoon: "24-30°C (Heavy Rainfall, Not Ideal)",
      winter: "23-30°C (Pleasant & Ideal)",
    }
  },
  "8": {
    id: 8,
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    image: udaipurImg,
    category: "heritage",
    rating: 4.8,
    reviewCount: 10400,
    bestTime: "September - March",
    duration: "2-4 Days",
    startingPrice: 8499,
    highlights: ["Lake Pichola", "City Palace", "Sunset Views", "Heritage Hotels", "Jagmandir Island", "Monsoon Palace"],
    description: "The City of Lakes featuring romantic settings and royal Mewar heritage. Udaipur is often called the most romantic city in India.",
    overview: "Udaipur, founded in 1559 by Maharana Udai Singh II, is known as the 'Venice of the East' for its beautiful lakes and palaces. The city's romantic charm, coupled with its rich Mewar history, makes it one of India's most beloved destinations.",
    activities: [
      { name: "Lake Boat Ride", icon: Camera, description: "Sunset boat ride on Lake Pichola to Jag Mandir" },
      { name: "Palace Tour", icon: Camera, description: "Explore the magnificent City Palace complex" },
      { name: "Cultural Evening", icon: Camera, description: "Watch traditional Rajasthani dance at Bagore Ki Haveli" },
      { name: "Heritage Walk", icon: Camera, description: "Walk through the old city's narrow lanes and markets" },
    ],
    packages: [
      { name: "Lake City Escape", duration: "2N/3D", price: 8499, includes: ["Stay", "Breakfast", "Boat Ride", "Sightseeing"] },
      { name: "Royal Udaipur", duration: "3N/4D", price: 15999, includes: ["Heritage Stay", "All Meals", "Palace Tour", "Cultural Show"] },
      { name: "Maharaja Experience", duration: "4N/5D", price: 35999, includes: ["Palace Hotel", "All Inclusive", "Private Tours", "Dinner Cruise"] },
    ],
    howToReach: {
      byAir: "Maharana Pratap Airport (UDR) - 22 km from city",
      byTrain: "Udaipur City Railway Station (UDZ)",
      byRoad: "Well connected to Jaipur (400 km), Ahmedabad (260 km)",
    },
    weather: {
      summer: "30-42°C (Hot)",
      monsoon: "25-35°C (Scenic, Lakes Full)",
      winter: "10-25°C (Pleasant & Ideal)",
    }
  },
};

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinationsData[id || "1"];

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Button onClick={() => navigate("/destinations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Destinations
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Back Button */}
          <Button
            variant="ghost"
            className="absolute top-20 left-4 text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
            onClick={() => navigate("/destinations")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Actions */}
          <div className="absolute top-20 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
                {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {destination.state}, {destination.country}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {destination.rating} ({destination.reviewCount.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {destination.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Best: {destination.bestTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Booking Bar */}
        <section className="sticky top-16 z-40 bg-card border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold text-primary">₹{destination.startingPrice.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate("/flights")}>
                  <Plane className="w-4 h-4 mr-2" />
                  Flights
                </Button>
                <Button variant="outline" onClick={() => navigate("/hotels")}>
                  <Hotel className="w-4 h-4 mr-2" />
                  Hotels
                </Button>
                <Button variant="outline" onClick={() => navigate("/transport")}>
                  <Train className="w-4 h-4 mr-2" />
                  Transport
                </Button>
                <Button className="bg-coral-gradient" onClick={() => navigate("/trip-planner")}>
                  Plan Full Trip
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Things To Do</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="travel">How To Reach</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About {destination.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {destination.overview}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight: string) => (
                            <Badge key={highlight} variant="secondary" className="text-sm py-1 px-3">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Weather Guide
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Summer</span>
                          <span className="font-medium">{destination.weather.summer}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Monsoon</span>
                          <span className="font-medium">{destination.weather.monsoon}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Winter</span>
                          <span className="font-medium">{destination.weather.winter}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium mb-1">Best Time to Visit</p>
                            <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.activities.map((activity: any, index: number) => (
                    <motion.div
                      key={activity.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Camera className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{activity.name}</h3>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="packages">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {destination.packages.map((pkg: any, index: number) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-teal/10">
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <p className="text-3xl font-bold text-primary">
                              ₹{pkg.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">per person</p>
                          </div>
                          <div className="space-y-2 mb-6">
                            {pkg.includes.map((item: string) => (
                              <div key={item} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              {item}
                            </div>
                          ))}
                        </div>
                          <Button className="w-full bg-coral-gradient">
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="travel">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="w-5 h-5" />
                        By Air
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{destination.howToReach.byAir}</p>
                      <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/flights")}>
                        Search Flights
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Train className="w-5 h-5" />
                        By Train
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{destination.howToReach.byTrain || destination.howToReach.bySea}</p>
                      <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/transport")}>
                        Search Trains
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        By Road
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{destination.howToReach.byRoad || destination.howToReach.interIsland}</p>
                      <Button className="mt-4 w-full" variant="outline" onClick={() => navigate("/transport")}>
                        Search Buses
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}
