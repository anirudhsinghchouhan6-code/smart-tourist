import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plane, 
  Calendar as CalendarIcon, 
  Users, 
  ArrowRightLeft, 
  Search,
  Clock,
  Luggage,
  Star,
  Loader2
} from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import heroFlights from "@/assets/hero-flights.jpg";
import { useBooking } from "@/hooks/useBooking";


const mockFlights = [
  {
    id: 1,
    airline: "IndiGo",
    logo: "🛫",
    departure: "06:00",
    arrival: "08:30",
    from: "DEL",
    to: "BOM",
    duration: "2h 30m",
    stops: "Non-stop",
    price: 4599,
    originalPrice: 5999,
    rating: 4.5,
  },
  {
    id: 2,
    airline: "Air India",
    logo: "✈️",
    departure: "09:15",
    arrival: "11:45",
    from: "DEL",
    to: "BOM",
    duration: "2h 30m",
    stops: "Non-stop",
    price: 5299,
    originalPrice: 6499,
    rating: 4.3,
  },
  {
    id: 3,
    airline: "SpiceJet",
    logo: "🔴",
    departure: "14:30",
    arrival: "17:15",
    from: "DEL",
    to: "BOM",
    duration: "2h 45m",
    stops: "1 Stop",
    price: 3899,
    originalPrice: 4999,
    rating: 4.0,
  },
  {
    id: 4,
    airline: "Vistara",
    logo: "💜",
    departure: "18:00",
    arrival: "20:30",
    from: "DEL",
    to: "BOM",
    duration: "2h 30m",
    stops: "Non-stop",
    price: 6299,
    originalPrice: 7999,
    rating: 4.7,
  },
];

export default function Flights() {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Mumbai");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [searched, setSearched] = useState(false);
  const { createBooking, isBooking } = useBooking();

  const handleSearch = () => {
    setSearched(true);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleBookFlight = async (flight: typeof mockFlights[0]) => {
    const travelDate = departureDate || addDays(new Date(), 7);
    
    await createBooking({
      booking_type: "flight",
      travel_date: format(travelDate, "yyyy-MM-dd"),
      travelers_count: passengers,
      total_amount: flight.price * passengers,
      details: {
        airline: flight.airline,
        from: from,
        to: to,
        departure: flight.departure,
        arrival: flight.arrival,
        duration: flight.duration,
        stops: flight.stops,
        price_per_person: flight.price,
      },
    });
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
              src={heroFlights} 
              alt="Multiple flight destinations" 
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
                Delhi • Mumbai • Paris • Singapore • Bali • Maldives • Dubai
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                Book <span className="text-gradient">Flights</span> at Best Prices
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fly to multiple destinations worldwide — compare 100+ airlines for the best deals
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
                  {/* Trip Type Tabs */}
                  <Tabs value={tripType} onValueChange={setTripType} className="mb-6">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                      <TabsTrigger value="one-way">One Way</TabsTrigger>
                      <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                      <TabsTrigger value="multi-city">Multi City</TabsTrigger>
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
                        icon="plane"
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
                        icon="plane"
                        iconColor="text-teal"
                      />
                    </div>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <Label className="text-sm text-muted-foreground mb-2 block">Departure</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !departureDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {departureDate ? format(departureDate, "MMM dd") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={departureDate}
                            onSelect={setDepartureDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Passengers */}
                    <div className="md:col-span-1">
                      <Label className="text-sm text-muted-foreground mb-2 block">Passengers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="number"
                          min={1}
                          max={9}
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
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Search Results */}
        {searched && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  {mockFlights.length} Flights Found
                </h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Cheapest First</Badge>
                  <Badge variant="outline">Fastest</Badge>
                </div>
              </div>

              <div className="space-y-4">
                {mockFlights.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          {/* Airline Info */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                              {flight.logo}
                            </div>
                            <div>
                              <p className="font-semibold">{flight.airline}</p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {flight.rating}
                              </div>
                            </div>
                          </div>

                          {/* Flight Times */}
                          <div className="flex items-center gap-8 text-center">
                            <div>
                              <p className="text-2xl font-bold">{flight.departure}</p>
                              <p className="text-sm text-muted-foreground">{flight.from}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-xs text-muted-foreground">{flight.duration}</p>
                              <div className="w-24 h-0.5 bg-muted relative my-2">
                                <Plane className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                              <p className="text-xs text-muted-foreground">{flight.stops}</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{flight.arrival}</p>
                              <p className="text-sm text-muted-foreground">{flight.to}</p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Luggage className="w-4 h-4" />
                              <span className="text-sm">15kg</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{flight.duration}</span>
                            </div>
                          </div>

                          {/* Price & Book */}
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{flight.originalPrice.toLocaleString()}
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              ₹{flight.price.toLocaleString()}
                            </p>
                            <Button 
                              className="mt-2 bg-coral-gradient"
                              onClick={() => handleBookFlight(flight)}
                              disabled={isBooking}
                            >
                              {isBooking ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              ) : null}
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}