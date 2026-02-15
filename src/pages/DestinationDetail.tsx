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
  Info,
  Loader2
} from "lucide-react";
import { useBooking } from "@/hooks/useBooking";
import { format, addDays } from "date-fns";
import { useState, useEffect } from "react";

import goaImg from "@/assets/destination-goa.jpg";
import jaipurImg from "@/assets/destination-jaipur.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import varanasiImg from "@/assets/destination-varanasi.jpg";
import manaliImg from "@/assets/destination-manali.jpg";
import andamanImg from "@/assets/destination-andaman.jpg";
import udaipurImg from "@/assets/destination-udaipur.jpg";
import shimlaImg from "@/assets/destination-shimla.jpg";
import rishikeshImg from "@/assets/destination-rishikesh.jpg";
import darjeelingImg from "@/assets/destination-darjeeling.jpg";
import agraImg from "@/assets/destination-agra.jpg";
import mumbaiImg from "@/assets/destination-mumbai.jpg";
import { DestinationMap } from "@/components/DestinationMap";

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
    },
    coordinates: { latitude: 15.2993, longitude: 74.1240 }
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
    },
    coordinates: { latitude: 26.9124, longitude: 75.7873 }
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
    },
    coordinates: { latitude: 10.8505, longitude: 76.2711 }
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
    },
    coordinates: { latitude: 34.1526, longitude: 77.5771 }
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
    },
    coordinates: { latitude: 25.3176, longitude: 82.9739 }
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
    },
    coordinates: { latitude: 32.2396, longitude: 77.1887 }
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
    },
    coordinates: { latitude: 11.7401, longitude: 92.6586 }
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
    },
    coordinates: { latitude: 24.5854, longitude: 73.7125 }
  },
  "9": {
    id: 9,
    name: "Shimla",
    state: "Himachal Pradesh",
    country: "India",
    image: shimlaImg,
    category: "hill-station",
    rating: 4.7,
    reviewCount: 11800,
    bestTime: "March - June, December - February",
    duration: "3-5 Days",
    startingPrice: 8999,
    highlights: ["Mall Road", "Ridge", "Jakhu Temple", "Toy Train", "Colonial Architecture", "Kufri"],
    description: "The Queen of Hill Stations with stunning colonial architecture and panoramic Himalayan views. Shimla offers the perfect escape from summer heat.",
    overview: "Shimla, the capital of Himachal Pradesh, was the summer capital of British India. Known for its Victorian architecture, pleasant weather, and stunning views of snow-capped mountains, it's one of India's most popular hill stations.",
    activities: [
      { name: "Mall Road Walk", icon: Camera, description: "Stroll along the pedestrian-only shopping street lined with colonial buildings" },
      { name: "Toy Train Ride", icon: Camera, description: "Experience the UNESCO heritage Kalka-Shimla Railway" },
      { name: "Jakhu Temple Trek", icon: Camera, description: "Climb to the famous Hanuman temple with panoramic city views" },
      { name: "Kufri Adventure", icon: Camera, description: "Horse riding, skiing in winter, and adventure activities" },
    ],
    packages: [
      { name: "Hill Station Escape", duration: "3N/4D", price: 8999, includes: ["Stay", "Breakfast", "Sightseeing"] },
      { name: "Shimla Complete", duration: "4N/5D", price: 14999, includes: ["Stay", "All Meals", "Toy Train", "Kufri Trip"] },
      { name: "Luxury Hills", duration: "5N/6D", price: 28999, includes: ["Heritage Hotel", "All Inclusive", "Private Guide", "Spa"] },
    ],
    howToReach: {
      byAir: "Shimla Airport (SLV) - 23 km from city, or Chandigarh (117 km)",
      byTrain: "Kalka Junction, then Toy Train to Shimla (96 km scenic journey)",
      byRoad: "Well connected to Delhi (350 km), Chandigarh (117 km)",
    },
    weather: {
      summer: "15-25°C (Pleasant)",
      monsoon: "12-20°C (Moderate Rainfall)",
      winter: "0-10°C (Cold, Snowfall)",
    },
    coordinates: { latitude: 31.1048, longitude: 77.1734 }
  },
  "10": {
    id: 10,
    name: "Rishikesh",
    state: "Uttarakhand",
    country: "India",
    image: rishikeshImg,
    category: "spiritual",
    rating: 4.8,
    reviewCount: 14200,
    bestTime: "September - May",
    duration: "3-5 Days",
    startingPrice: 6999,
    highlights: ["Laxman Jhula", "Ganga Aarti", "River Rafting", "Yoga & Meditation", "Beatles Ashram", "Bungee Jumping"],
    description: "The Yoga Capital of the World nestled in the foothills of the Himalayas. Rishikesh offers spirituality and adventure in perfect harmony.",
    overview: "Rishikesh, located on the banks of the holy Ganges, is a spiritual hub and adventure destination. Known as the birthplace of yoga, it attracts seekers from around the world while offering thrilling activities like white water rafting.",
    activities: [
      { name: "River Rafting", icon: Camera, description: "White water rafting on the Ganges from Grade I to IV rapids" },
      { name: "Yoga & Meditation", icon: Camera, description: "Join authentic yoga sessions at ashrams along the riverbank" },
      { name: "Ganga Aarti", icon: Camera, description: "Witness the mesmerizing evening prayer ceremony at Triveni Ghat" },
      { name: "Adventure Sports", icon: Camera, description: "Bungee jumping, cliff jumping, and flying fox" },
    ],
    packages: [
      { name: "Spiritual Retreat", duration: "3N/4D", price: 6999, includes: ["Ashram Stay", "Yoga Sessions", "Aarti", "Rafting"] },
      { name: "Adventure & Soul", duration: "4N/5D", price: 12999, includes: ["Stay", "All Meals", "Rafting", "Bungee", "Camping"] },
      { name: "Wellness Escape", duration: "6N/7D", price: 24999, includes: ["Luxury Resort", "Spa", "Yoga Teacher Training", "All Inclusive"] },
    ],
    howToReach: {
      byAir: "Dehradun Airport (DED) - 35 km from Rishikesh",
      byTrain: "Rishikesh Railway Station or Haridwar Junction (25 km)",
      byRoad: "Well connected to Delhi (240 km), Haridwar (25 km)",
    },
    weather: {
      summer: "25-35°C (Hot)",
      monsoon: "20-30°C (Heavy Rainfall, Rafting Closed)",
      winter: "10-20°C (Pleasant & Ideal)",
    },
    coordinates: { latitude: 30.0869, longitude: 78.2676 }
  },
  "11": {
    id: 11,
    name: "Darjeeling",
    state: "West Bengal",
    country: "India",
    image: darjeelingImg,
    category: "hill-station",
    rating: 4.8,
    reviewCount: 9600,
    bestTime: "March - May, October - December",
    duration: "3-5 Days",
    startingPrice: 9999,
    highlights: ["Tea Gardens", "Toy Train", "Tiger Hill Sunrise", "Kanchenjunga Views", "Batasia Loop", "Monasteries"],
    description: "The Queen of the Hills famous for world-renowned tea, stunning Himalayan views, and the charming heritage toy train.",
    overview: "Darjeeling, perched at 2,042 meters in the Eastern Himalayas, is renowned for its tea plantations, the Darjeeling Himalayan Railway, and spectacular views of Mount Kanchenjunga. The colonial-era hill station retains its old-world charm.",
    activities: [
      { name: "Tea Garden Tours", icon: Camera, description: "Visit famous tea estates and learn about tea processing" },
      { name: "Toy Train Journey", icon: Camera, description: "Ride the UNESCO World Heritage Darjeeling Himalayan Railway" },
      { name: "Tiger Hill Sunrise", icon: Camera, description: "Witness spectacular sunrise over Kanchenjunga peak" },
      { name: "Monastery Visits", icon: Camera, description: "Explore Ghoom Monastery and Peace Pagoda" },
    ],
    packages: [
      { name: "Tea Trails", duration: "3N/4D", price: 9999, includes: ["Stay", "Breakfast", "Tea Tour", "Toy Train"] },
      { name: "Darjeeling Discovery", duration: "4N/5D", price: 16999, includes: ["Stay", "All Meals", "Tiger Hill", "Full Sightseeing"] },
      { name: "Heritage Experience", duration: "5N/6D", price: 32999, includes: ["Heritage Hotel", "All Inclusive", "Private Tours", "Tea Tasting"] },
    ],
    howToReach: {
      byAir: "Bagdogra Airport (IXB) - 90 km from Darjeeling",
      byTrain: "New Jalpaiguri (NJP) - 88 km, then by road or toy train",
      byRoad: "Well connected to Siliguri (80 km), Gangtok (100 km)",
    },
    weather: {
      summer: "12-18°C (Pleasant)",
      monsoon: "15-20°C (Heavy Rainfall)",
      winter: "2-10°C (Cold, Clear Views)",
    },
    coordinates: { latitude: 27.0410, longitude: 88.2663 }
  },
  "12": {
    id: 12,
    name: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    image: agraImg,
    category: "heritage",
    rating: 4.9,
    reviewCount: 25000,
    bestTime: "October - March",
    duration: "2-3 Days",
    startingPrice: 5999,
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh", "Local Cuisine", "Marble Crafts"],
    description: "Home to the iconic Taj Mahal, one of the Seven Wonders of the World. Agra is a must-visit for its Mughal heritage and architectural marvels.",
    overview: "Agra, once the capital of the Mughal Empire, is home to three UNESCO World Heritage Sites. The city is synonymous with the Taj Mahal, built by Emperor Shah Jahan as a symbol of eternal love. Beyond the Taj, Agra offers rich history and craftsmanship.",
    activities: [
      { name: "Taj Mahal Visit", icon: Camera, description: "Explore the iconic monument at sunrise or sunset" },
      { name: "Agra Fort Tour", icon: Camera, description: "Discover the massive red sandstone fortress of the Mughals" },
      { name: "Fatehpur Sikri", icon: Camera, description: "Visit the abandoned Mughal capital city (40 km)" },
      { name: "Marble Shopping", icon: Camera, description: "See artisans create intricate marble inlay work (pietra dura)" },
    ],
    packages: [
      { name: "Taj Express", duration: "1N/2D", price: 5999, includes: ["Stay", "Breakfast", "Taj Mahal", "Fort Tour"] },
      { name: "Mughal Heritage", duration: "2N/3D", price: 9999, includes: ["Stay", "All Meals", "Full Sightseeing", "Fatehpur Sikri"] },
      { name: "Luxury Taj Experience", duration: "2N/3D", price: 24999, includes: ["Taj View Hotel", "All Inclusive", "Private Guide", "Sunset Dinner"] },
    ],
    howToReach: {
      byAir: "Agra Airport (AGR) - limited flights, or Delhi (200 km)",
      byTrain: "Agra Cantt (AGC) - well connected by Shatabdi, Gatimaan Express",
      byRoad: "Yamuna Expressway from Delhi (200 km, 3 hours)",
    },
    weather: {
      summer: "35-45°C (Very Hot)",
      monsoon: "28-35°C (Humid)",
      winter: "8-22°C (Pleasant & Ideal)",
    },
    coordinates: { latitude: 27.1767, longitude: 78.0081 }
  },
  "13": {
    id: 13,
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    image: mumbaiImg,
    category: "urban",
    rating: 4.6,
    reviewCount: 18500,
    bestTime: "November - February",
    duration: "3-5 Days",
    startingPrice: 7999,
    highlights: ["Gateway of India", "Marine Drive", "Bollywood Tours", "Street Food", "Elephanta Caves", "Nightlife"],
    description: "The City of Dreams - India's financial capital, home to Bollywood, and a melting pot of cultures, cuisines, and endless energy.",
    overview: "Mumbai, formerly Bombay, is India's largest city and commercial hub. From the iconic Gateway of India to the glittering Marine Drive, from street food to fine dining, and from ancient caves to modern skyscrapers, Mumbai offers an unforgettable urban experience.",
    activities: [
      { name: "Heritage Walk", icon: Camera, description: "Explore Gateway of India, Taj Palace Hotel, and CST Station" },
      { name: "Marine Drive Evening", icon: Camera, description: "Walk along the Queen's Necklace at sunset" },
      { name: "Bollywood Studio Tour", icon: Camera, description: "Visit Film City and see behind the scenes of Indian cinema" },
      { name: "Street Food Trail", icon: Camera, description: "Taste vada pav, pav bhaji, and other Mumbai specialties" },
    ],
    packages: [
      { name: "Mumbai Essentials", duration: "2N/3D", price: 7999, includes: ["Stay", "Breakfast", "Sightseeing", "Street Food Tour"] },
      { name: "Mumbai Explorer", duration: "3N/4D", price: 14999, includes: ["Stay", "All Meals", "Elephanta Caves", "Bollywood Tour"] },
      { name: "Luxury Mumbai", duration: "4N/5D", price: 35999, includes: ["5-Star Stay", "All Inclusive", "Private Tours", "Fine Dining"] },
    ],
    howToReach: {
      byAir: "Chhatrapati Shivaji International Airport (BOM) - India's busiest airport",
      byTrain: "Mumbai Central (MMCT), CST, Dadar - major railway junctions",
      byRoad: "Well connected via Mumbai-Pune Expressway, NH48",
    },
    weather: {
      summer: "30-35°C (Hot & Humid)",
      monsoon: "25-30°C (Heavy Rainfall)",
      winter: "20-32°C (Pleasant & Ideal)",
    },
    coordinates: { latitude: 18.9220, longitude: 72.8347 }
  },
};

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinationsData[id || "1"];
  const { createBooking, isBooking } = useBooking();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const detectLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Your Location";
          setUserLocation({ lat: latitude, lng: longitude, name: city });
        } catch {
          setUserLocation({ lat: latitude, lng: longitude, name: "Your Location" });
        }
        setLocationLoading(false);
      },
      () => {
        setLocationError("Location access denied. Please allow location access.");
        setLocationLoading(false);
      }
    );
  };

  const getDirectionsUrl = () => {
    if (!userLocation || !destination?.coordinates) return "#";
    return `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination.coordinates.latitude},${destination.coordinates.longitude}`;
  };

  const getDistanceApprox = () => {
    if (!userLocation || !destination?.coordinates) return null;
    const R = 6371;
    const dLat = ((destination.coordinates.latitude - userLocation.lat) * Math.PI) / 180;
    const dLon = ((destination.coordinates.longitude - userLocation.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((userLocation.lat * Math.PI) / 180) * Math.cos((destination.coordinates.latitude * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const handleBookPackage = async (pkg: { name: string; duration: string; price: number; includes: string[] }) => {
    const travelDate = addDays(new Date(), 14); // Default to 2 weeks from now
    const durationMatch = pkg.duration.match(/(\d+)N/);
    const nights = durationMatch ? parseInt(durationMatch[1]) : 3;
    
    await createBooking({
      booking_type: "package",
      travel_date: format(travelDate, "yyyy-MM-dd"),
      travelers_count: 1,
      total_amount: pkg.price,
      details: {
        package_name: pkg.name,
        destination: destination.name,
        state: destination.state,
        duration: pkg.duration,
        nights,
        includes: pkg.includes,
        price_per_person: pkg.price,
      },
    });
  };

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
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Umbrella className="w-5 h-5" />
                          Weather & Climate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Best Time Highlight */}
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">Best Time to Visit</span>
                          </div>
                          <p className="text-sm text-foreground ml-6">{destination.bestTime}</p>
                        </div>

                        {/* Seasonal Weather */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-base">☀️</span>
                              <span className="text-sm font-medium">Summer (Mar-Jun)</span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {destination.weather.summer}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-base">🌧️</span>
                              <span className="text-sm font-medium">Monsoon (Jul-Oct)</span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {destination.weather.monsoon}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-base">❄️</span>
                              <span className="text-sm font-medium">Winter (Nov-Feb)</span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {destination.weather.winter}
                            </span>
                          </div>
                        </div>

                        {/* Pro Tip */}
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            💡 <span className="font-medium">Pro tip:</span> Book 2-3 months in advance for peak season visits during {destination.bestTime}.
                          </p>
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

                    {destination.coordinates && (
                      <DestinationMap
                        name={destination.name}
                        state={destination.state}
                        country={destination.country}
                        latitude={destination.coordinates.latitude}
                        longitude={destination.coordinates.longitude}
                      />
                    )}
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
                          <Button 
                            className="w-full bg-coral-gradient"
                            onClick={() => handleBookPackage(pkg)}
                            disabled={isBooking}
                          >
                            {isBooking ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="travel">
                {/* Current Location Card */}
                <Card className="mb-6 border-primary/30 bg-primary/5">
                  <CardContent className="pt-6">
                    {!userLocation && !locationLoading && (
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">Get directions from your location</p>
                            <p className="text-sm text-muted-foreground">
                              {locationError || "Allow location access to see distance & route to " + destination.name}
                            </p>
                          </div>
                        </div>
                        <Button onClick={detectLocation} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          Detect My Location
                        </Button>
                      </div>
                    )}
                    {locationLoading && (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="text-muted-foreground">Detecting your location...</span>
                      </div>
                    )}
                    {userLocation && (
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{userLocation.name} → {destination.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ~{getDistanceApprox()} km (straight line distance)
                            </p>
                          </div>
                        </div>
                        <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-coral-gradient">
                            <MapPin className="w-4 h-4 mr-2" />
                            Get Directions
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

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
