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
import heroTransport from "@/assets/hero-transport.jpg";

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
              src={heroTransport} 
              alt="Buses and trains to multiple destinations" 
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
