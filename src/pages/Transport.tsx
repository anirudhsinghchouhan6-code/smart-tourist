import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { TrainCard } from "@/components/transport/TrainCard";
import { BusCard } from "@/components/transport/BusCard";
import { SeatSelectionModal } from "@/components/transport/SeatSelectionModal";
import { TransportFilters } from "@/components/transport/TransportFilters";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Train, 
  Bus, 
  Calendar as CalendarIcon, 
  Users, 
  ArrowRightLeft, 
  Search,
  Loader2,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroBus from "@/assets/hero-bus.jpg";
import heroTrain from "@/assets/hero-train.jpg";

const mockTrains = [
  {
    id: 1,
    name: "Rajdhani Express",
    number: "12952",
    departure: "16:55",
    arrival: "08:35",
    from: "New Delhi",
    to: "Mumbai Central",
    duration: "15h 40m",
    distance: "1384 km",
    classes: [
      { name: "3A", price: 2145, available: 45 },
      { name: "2A", price: 3250, available: 12 },
      { name: "1A", price: 5450, available: 0, waitlist: 8 },
    ],
    amenities: ["Food", "Pantry", "WiFi"],
    daysOfOperation: ["Mon", "Wed", "Fri", "Sun"],
  },
  {
    id: 2,
    name: "Shatabdi Express",
    number: "12009",
    departure: "06:00",
    arrival: "14:10",
    from: "New Delhi",
    to: "Bhopal Jn",
    duration: "8h 10m",
    distance: "702 km",
    classes: [
      { name: "CC", price: 1385, available: 28 },
      { name: "EC", price: 2650, available: 5 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Sun"],
  },
  {
    id: 3,
    name: "Duronto Express",
    number: "12267",
    departure: "23:00",
    arrival: "10:40",
    from: "New Delhi",
    to: "Mumbai Central",
    duration: "11h 40m",
    distance: "1384 km",
    classes: [
      { name: "3A", price: 1895, available: 68 },
      { name: "2A", price: 2850, available: 22 },
      { name: "1A", price: 4750, available: 8 },
    ],
    amenities: ["Food", "Pantry"],
    daysOfOperation: ["Tue", "Thu", "Sat"],
  },
  {
    id: 4,
    name: "Garib Rath Express",
    number: "12216",
    departure: "17:30",
    arrival: "09:15",
    from: "New Delhi",
    to: "Mumbai Bandra",
    duration: "15h 45m",
    distance: "1377 km",
    classes: [
      { name: "3A", price: 1250, available: 120 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Mon", "Thu"],
  },
  {
    id: 5,
    name: "Vande Bharat Express",
    number: "22436",
    departure: "06:00",
    arrival: "14:00",
    from: "New Delhi",
    to: "Varanasi Jn",
    duration: "8h 00m",
    distance: "759 km",
    classes: [
      { name: "CC", price: 1760, available: 35 },
      { name: "EC", price: 3310, available: 10 },
    ],
    amenities: ["Food", "WiFi", "Pantry"],
    daysOfOperation: ["Daily except Fri"],
  },
  {
    id: 6,
    name: "Tamil Nadu Express",
    number: "12622",
    departure: "22:30",
    arrival: "07:10",
    from: "New Delhi",
    to: "Chennai Central",
    duration: "32h 40m",
    distance: "2182 km",
    classes: [
      { name: "SL", price: 750, available: 200 },
      { name: "3A", price: 1950, available: 55 },
      { name: "2A", price: 2800, available: 18 },
      { name: "1A", price: 4700, available: 4 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 7,
    name: "Kerala Express",
    number: "12626",
    departure: "11:25",
    arrival: "03:15",
    from: "New Delhi",
    to: "Thiruvananthapuram",
    duration: "39h 50m",
    distance: "3054 km",
    classes: [
      { name: "SL", price: 890, available: 150 },
      { name: "3A", price: 2350, available: 40 },
      { name: "2A", price: 3400, available: 15 },
    ],
    amenities: ["Pantry", "Food"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 8,
    name: "Goa Express",
    number: "12780",
    departure: "15:00",
    arrival: "05:40",
    from: "New Delhi",
    to: "Vasco Da Gama",
    duration: "38h 40m",
    distance: "1907 km",
    classes: [
      { name: "SL", price: 695, available: 180 },
      { name: "3A", price: 1850, available: 60 },
      { name: "2A", price: 2650, available: 20 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 9,
    name: "Howrah Rajdhani",
    number: "12302",
    departure: "16:50",
    arrival: "09:55",
    from: "New Delhi",
    to: "Howrah (Kolkata)",
    duration: "17h 05m",
    distance: "1447 km",
    classes: [
      { name: "3A", price: 2260, available: 38 },
      { name: "2A", price: 3450, available: 14 },
      { name: "1A", price: 5800, available: 2 },
    ],
    amenities: ["Food", "Pantry", "WiFi"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 10,
    name: "Bangalore Rajdhani",
    number: "22692",
    departure: "20:50",
    arrival: "06:40",
    from: "New Delhi",
    to: "Bangalore City",
    duration: "33h 50m",
    distance: "2444 km",
    classes: [
      { name: "3A", price: 2595, available: 30 },
      { name: "2A", price: 3750, available: 10 },
      { name: "1A", price: 6200, available: 0, waitlist: 12 },
    ],
    amenities: ["Food", "Pantry", "WiFi"],
    daysOfOperation: ["Mon", "Tue", "Thu", "Sat"],
  },
  {
    id: 11,
    name: "Kalka Mail",
    number: "12312",
    departure: "21:35",
    arrival: "04:45",
    from: "Howrah (Kolkata)",
    to: "New Delhi",
    duration: "31h 10m",
    distance: "1447 km",
    classes: [
      { name: "SL", price: 550, available: 220 },
      { name: "3A", price: 1450, available: 75 },
      { name: "2A", price: 2100, available: 25 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 12,
    name: "Konkan Kanya Express",
    number: "10112",
    departure: "23:00",
    arrival: "11:25",
    from: "Mumbai CST",
    to: "Madgaon (Goa)",
    duration: "12h 25m",
    distance: "581 km",
    classes: [
      { name: "SL", price: 350, available: 140 },
      { name: "3A", price: 945, available: 50 },
      { name: "2A", price: 1350, available: 18 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 13,
    name: "Jaipur Shatabdi",
    number: "12015",
    departure: "06:05",
    arrival: "10:40",
    from: "New Delhi",
    to: "Jaipur Jn",
    duration: "4h 35m",
    distance: "308 km",
    classes: [
      { name: "CC", price: 890, available: 55 },
      { name: "EC", price: 1690, available: 12 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Sun"],
  },
  {
    id: 14,
    name: "Mysore Shatabdi",
    number: "12007",
    departure: "06:00",
    arrival: "08:20",
    from: "Chennai Central",
    to: "Mysore Jn",
    duration: "7h 20m",
    distance: "495 km",
    classes: [
      { name: "CC", price: 680, available: 42 },
      { name: "EC", price: 1420, available: 8 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Wed"],
  },
  {
    id: 15,
    name: "Deccan Queen",
    number: "12124",
    departure: "07:15",
    arrival: "10:25",
    from: "Mumbai CST",
    to: "Pune Jn",
    duration: "3h 10m",
    distance: "192 km",
    classes: [
      { name: "CC", price: 350, available: 80 },
      { name: "FC", price: 630, available: 15 },
    ],
    amenities: ["Food"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 16,
    name: "Udaipur Superfast",
    number: "12964",
    departure: "19:10",
    arrival: "06:35",
    from: "New Delhi",
    to: "Udaipur City",
    duration: "11h 25m",
    distance: "739 km",
    classes: [
      { name: "SL", price: 420, available: 160 },
      { name: "3A", price: 1150, available: 48 },
      { name: "2A", price: 1680, available: 16 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 17,
    name: "Kalka Shatabdi",
    number: "12011",
    departure: "07:40",
    arrival: "11:45",
    from: "New Delhi",
    to: "Kalka (Shimla)",
    duration: "4h 05m",
    distance: "268 km",
    classes: [
      { name: "CC", price: 780, available: 60 },
      { name: "EC", price: 1550, available: 10 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 18,
    name: "Darjeeling Mail",
    number: "12344",
    departure: "22:05",
    arrival: "08:15",
    from: "Howrah (Kolkata)",
    to: "New Jalpaiguri",
    duration: "10h 10m",
    distance: "564 km",
    classes: [
      { name: "SL", price: 340, available: 200 },
      { name: "3A", price: 895, available: 65 },
      { name: "2A", price: 1280, available: 20 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 19,
    name: "Andaman Express",
    number: "16032",
    departure: "13:30",
    arrival: "05:50",
    from: "Chennai Central",
    to: "Bangalore City",
    duration: "5h 20m",
    distance: "362 km",
    classes: [
      { name: "SL", price: 230, available: 180 },
      { name: "3A", price: 645, available: 70 },
      { name: "2A", price: 940, available: 22 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 20,
    name: "Rishikesh Express",
    number: "14042",
    departure: "21:20",
    arrival: "04:55",
    from: "New Delhi",
    to: "Haridwar Jn",
    duration: "7h 35m",
    distance: "238 km",
    classes: [
      { name: "SL", price: 195, available: 250 },
      { name: "3A", price: 560, available: 80 },
      { name: "2A", price: 820, available: 30 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 21,
    name: "Jammu Rajdhani",
    number: "12426",
    departure: "20:30",
    arrival: "06:00",
    from: "New Delhi",
    to: "Jammu Tawi",
    duration: "9h 30m",
    distance: "577 km",
    classes: [
      { name: "3A", price: 1550, available: 35 },
      { name: "2A", price: 2350, available: 12 },
      { name: "1A", price: 3950, available: 4 },
    ],
    amenities: ["Food", "Pantry", "WiFi"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 22,
    name: "Lucknow Shatabdi",
    number: "12003",
    departure: "06:15",
    arrival: "12:45",
    from: "New Delhi",
    to: "Lucknow Jn",
    duration: "6h 30m",
    distance: "511 km",
    classes: [
      { name: "CC", price: 1050, available: 40 },
      { name: "EC", price: 2100, available: 8 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Sun"],
  },
  {
    id: 23,
    name: "Coromandel Express",
    number: "12842",
    departure: "08:45",
    arrival: "11:50",
    from: "Howrah (Kolkata)",
    to: "Chennai Central",
    duration: "27h 05m",
    distance: "1662 km",
    classes: [
      { name: "SL", price: 620, available: 170 },
      { name: "3A", price: 1650, available: 50 },
      { name: "2A", price: 2400, available: 15 },
      { name: "1A", price: 4050, available: 3 },
    ],
    amenities: ["Pantry", "Food"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 24,
    name: "Mandovi Express",
    number: "10104",
    departure: "07:10",
    arrival: "19:25",
    from: "Mumbai CST",
    to: "Madgaon (Goa)",
    duration: "12h 15m",
    distance: "581 km",
    classes: [
      { name: "SL", price: 330, available: 130 },
      { name: "3A", price: 920, available: 45 },
      { name: "2A", price: 1310, available: 12 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 25,
    name: "Himsagar Express",
    number: "16318",
    departure: "14:30",
    arrival: "18:00",
    from: "Jammu Tawi",
    to: "Kanyakumari",
    duration: "67h 30m",
    distance: "3745 km",
    classes: [
      { name: "SL", price: 1150, available: 190 },
      { name: "3A", price: 2950, available: 55 },
      { name: "2A", price: 4250, available: 10 },
    ],
    amenities: ["Pantry", "Food"],
    daysOfOperation: ["Tue", "Sat"],
  },
  {
    id: 26,
    name: "Manali Volvo Express",
    number: "14096",
    departure: "21:25",
    arrival: "10:30",
    from: "New Delhi",
    to: "Chandigarh",
    duration: "13h 05m",
    distance: "310 km",
    classes: [
      { name: "SL", price: 310, available: 140 },
      { name: "3A", price: 850, available: 55 },
      { name: "2A", price: 1220, available: 18 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 27,
    name: "Agra Gatimaan Express",
    number: "12050",
    departure: "08:10",
    arrival: "09:50",
    from: "New Delhi",
    to: "Agra Cantt",
    duration: "1h 40m",
    distance: "195 km",
    classes: [
      { name: "CC", price: 990, available: 50 },
      { name: "EC", price: 1850, available: 15 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Fri"],
  },
  {
    id: 28,
    name: "Hyderabad Deccan Express",
    number: "17032",
    departure: "21:50",
    arrival: "07:40",
    from: "Mumbai CST",
    to: "Hyderabad Deccan",
    duration: "14h 50m",
    distance: "711 km",
    classes: [
      { name: "SL", price: 400, available: 160 },
      { name: "3A", price: 1080, available: 52 },
      { name: "2A", price: 1560, available: 18 },
    ],
    amenities: ["Pantry"],
    daysOfOperation: ["Daily"],
  },
  {
    id: 29,
    name: "Ahmedabad Shatabdi",
    number: "12010",
    departure: "06:25",
    arrival: "12:55",
    from: "Mumbai Central",
    to: "Ahmedabad Jn",
    duration: "6h 30m",
    distance: "493 km",
    classes: [
      { name: "CC", price: 820, available: 45 },
      { name: "EC", price: 1650, available: 10 },
    ],
    amenities: ["Food", "WiFi"],
    daysOfOperation: ["Daily except Sun"],
  },
  {
    id: 30,
    name: "Vivek Express",
    number: "15906",
    departure: "19:05",
    arrival: "08:35",
    from: "Dibrugarh",
    to: "Kanyakumari",
    duration: "82h 30m",
    distance: "4286 km",
    classes: [
      { name: "SL", price: 1320, available: 210 },
      { name: "3A", price: 3450, available: 60 },
      { name: "2A", price: 4950, available: 12 },
    ],
    amenities: ["Pantry", "Food"],
    daysOfOperation: ["Sat"],
  },
];

const mockBuses = [
  {
    id: 1,
    operator: "VRL Travels",
    type: "Volvo Multi-Axle A/C Sleeper (2+1)",
    departure: "21:00",
    arrival: "07:30",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 1200,
    rating: 4.5,
    reviewCount: 2456,
    seats: 12,
    amenities: ["WiFi", "Charging", "Entertainment", "AC"],
    boardingPoints: ["Majestic", "Silk Board", "Electronic City", "Marathahalli"],
    droppingPoints: ["KPHB", "Ameerpet", "Secunderabad", "LB Nagar"],
    busType: "sleeper" as const,
  },
  {
    id: 2,
    operator: "SRS Travels",
    type: "Mercedes Benz Multi-Axle (2+1)",
    departure: "22:30",
    arrival: "09:00",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 1450,
    rating: 4.7,
    reviewCount: 1823,
    seats: 8,
    amenities: ["WiFi", "Charging", "AC"],
    boardingPoints: ["Majestic", "Hebbal", "Yeshwanthpur"],
    droppingPoints: ["Miyapur", "KPHB", "Paradise"],
    busType: "sleeper" as const,
  },
  {
    id: 3,
    operator: "Kallada Travels",
    type: "Volvo A/C Semi Sleeper (2+2)",
    departure: "20:00",
    arrival: "06:30",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 950,
    rating: 4.2,
    reviewCount: 3102,
    seats: 22,
    amenities: ["Charging", "AC"],
    boardingPoints: ["Majestic", "Silk Board", "BTM Layout"],
    droppingPoints: ["Dilsukhnagar", "Secunderabad", "Uppal"],
    busType: "semi-sleeper" as const,
  },
  {
    id: 4,
    operator: "Orange Travels",
    type: "Volvo A/C Seater (2+2)",
    departure: "06:00",
    arrival: "16:30",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 750,
    rating: 4.0,
    reviewCount: 892,
    seats: 35,
    amenities: ["AC"],
    boardingPoints: ["Majestic", "Tin Factory"],
    droppingPoints: ["Secunderabad", "Jubilee Hills"],
    busType: "seater" as const,
  },
];

export default function Transport() {
  const [transportType, setTransportType] = useState("trains");
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Ratlam");
  const [travelDate, setTravelDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState("departure_asc");
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<{
    name: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: number;
  } | null>(null);
  
  const [filters, setFilters] = useState({
    departureTime: [] as string[],
    priceRange: [0, 5000] as [number, number],
    trainClasses: [] as string[],
    busTypes: [] as string[],
    amenities: [] as string[],
  });

  const handleSearch = () => {
    setIsLoading(true);
    setSearched(false);
    // Simulate API call
    setTimeout(() => {
      setSearched(true);
      setIsLoading(false);
    }, 1500);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSelectTrainSeat = (train: typeof mockTrains[0]) => {
    setSelectedTransport({
      name: train.name,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      price: Math.min(...train.classes.map(c => c.price)),
    });
    setShowSeatModal(true);
  };

  const handleSelectBusSeat = (bus: typeof mockBuses[0]) => {
    setSelectedTransport({
      name: bus.operator,
      from: bus.from,
      to: bus.to,
      departure: bus.departure,
      arrival: bus.arrival,
      price: bus.price,
    });
    setShowSeatModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Search Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={transportType === "trains" ? heroTrain : heroBus} 
              alt={transportType === "trains" ? "Indian trains" : "Luxury buses"} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Delhi • Ratlam • Mumbai • Bhopal • Jaipur • Ahmedabad • Indore
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                Book <span className="text-gradient">Buses & Trains</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Travel to multiple destinations — Rajdhani, Shatabdi, Volvo & premium buses at best prices
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="glass border-0 shadow-2xl">
                <CardContent className="p-6">
                  {/* Transport Type Tabs */}
                  <Tabs value={transportType} onValueChange={setTransportType} className="mb-6">
                    <TabsList className="grid w-full max-w-sm grid-cols-2">
                      <TabsTrigger value="trains" className="flex items-center gap-2">
                        <Train className="w-4 h-4" />
                        Trains
                      </TabsTrigger>
                      <TabsTrigger value="buses" className="flex items-center gap-2">
                        <Bus className="w-4 h-4" />
                        Buses
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Search Form */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    {/* From */}
                    <div className="md:col-span-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">From</Label>
                      <CityAutocomplete
                        value={from}
                        onChange={setFrom}
                        placeholder="Departure city"
                        icon="train"
                        iconColor="text-primary"
                      />
                    </div>

                    {/* Swap Button */}
                    <div className="md:col-span-1 flex justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full"
                        onClick={swapLocations}
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* To */}
                    <div className="md:col-span-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">To</Label>
                      <CityAutocomplete
                        value={to}
                        onChange={setTo}
                        placeholder="Arrival city"
                        icon="train"
                        iconColor="text-teal"
                      />
                    </div>

                    {/* Travel Date */}
                    <div className="md:col-span-2">
                      <Label className="text-sm text-muted-foreground mb-2 block">Travel Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !travelDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {travelDate ? format(travelDate, "MMM dd") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={travelDate}
                            onSelect={setTravelDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Passengers */}
                    <div className="md:col-span-1">
                      <Label className="text-sm text-muted-foreground mb-2 block">Travelers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="number"
                          min={1}
                          max={6}
                          value={passengers}
                          onChange={(e) => setPassengers(Number(e.target.value))}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-2">
                      <Button 
                        className="w-full h-12 bg-coral-gradient"
                        onClick={handleSearch}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Search className="w-5 h-5 mr-2" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted-foreground">
                  Searching for the best {transportType}...
                </span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-14 h-14 rounded-xl" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-48 mb-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search Results */}
        {searched && !isLoading && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              {transportType === "trains" ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-display font-bold">
                        {mockTrains.length} Trains Found
                      </h2>
                      <Button variant="ghost" size="sm" onClick={handleSearch}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                    <Badge variant="secondary" className="hidden md:flex">
                      Live availability • Updated just now
                    </Badge>
                  </div>

                  <TransportFilters
                    transportType="trains"
                    filters={filters}
                    onFiltersChange={setFilters}
                    onSortChange={setCurrentSort}
                    currentSort={currentSort}
                  />

                  <div className="space-y-4">
                    {mockTrains.map((train, index) => (
                      <TrainCard
                        key={train.id}
                        train={train}
                        index={index}
                        onSelectSeat={handleSelectTrainSeat}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-display font-bold">
                        {mockBuses.length} Buses Found
                      </h2>
                      <Button variant="ghost" size="sm" onClick={handleSearch}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                    <Badge variant="secondary" className="hidden md:flex">
                      Live availability • Updated just now
                    </Badge>
                  </div>

                  <TransportFilters
                    transportType="buses"
                    filters={filters}
                    onFiltersChange={setFilters}
                    onSortChange={setCurrentSort}
                    currentSort={currentSort}
                  />

                  <div className="space-y-4">
                    {mockBuses.map((bus, index) => (
                      <BusCard
                        key={bus.id}
                        bus={bus}
                        index={index}
                        onSelectSeat={handleSelectBusSeat}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <AIChatWidget />

      {/* Seat Selection Modal */}
      {selectedTransport && (
        <SeatSelectionModal
          isOpen={showSeatModal}
          onClose={() => setShowSeatModal(false)}
          transportType={transportType === "trains" ? "train" : "bus"}
          transportInfo={selectedTransport}
        />
      )}
    </div>
  );
}
