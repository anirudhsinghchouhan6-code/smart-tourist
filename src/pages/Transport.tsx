import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Bus, 
  Calendar as CalendarIcon, 
  Users, 
  ArrowRightLeft, 
  Search,
  Clock,
  Zap,
  Star,
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    classes: ["3A", "2A", "1A"],
    price: 2145,
    availability: "Available",
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
    classes: ["CC", "EC"],
    price: 1385,
    availability: "WL 15",
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
    classes: ["3A", "2A", "1A"],
    price: 1895,
    availability: "Available",
  },
];

const mockBuses = [
  {
    id: 1,
    operator: "VRL Travels",
    type: "Volvo Multi-Axle A/C Sleeper",
    departure: "21:00",
    arrival: "07:30",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 1200,
    rating: 4.5,
    seats: 12,
  },
  {
    id: 2,
    operator: "SRS Travels",
    type: "Mercedes Benz Multi-Axle",
    departure: "22:30",
    arrival: "09:00",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 1450,
    rating: 4.7,
    seats: 8,
  },
  {
    id: 3,
    operator: "Kallada Travels",
    type: "Volvo A/C Semi Sleeper",
    departure: "20:00",
    arrival: "06:30",
    from: "Bangalore",
    to: "Hyderabad",
    duration: "10h 30m",
    price: 950,
    rating: 4.2,
    seats: 22,
  },
];

export default function Transport() {
  const [transportType, setTransportType] = useState("trains");
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Ratlam");
  const [travelDate, setTravelDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Search Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-teal/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Book <span className="text-gradient">Buses & Trains</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Travel smart with best prices on buses and trains
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <Input 
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="pl-10 h-12"
                          placeholder="Departure city"
                        />
                      </div>
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal" />
                        <Input 
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="pl-10 h-12"
                          placeholder="Arrival city"
                        />
                      </div>
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
              {transportType === "trains" ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">
                      {mockTrains.length} Trains Found
                    </h2>
                    <div className="flex gap-2">
                      <Badge variant="outline">Departure: Early</Badge>
                      <Badge variant="outline">Price: Low to High</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockTrains.map((train, index) => (
                      <motion.div
                        key={train.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                              {/* Train Info */}
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Train className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold">{train.name}</p>
                                  <p className="text-sm text-muted-foreground">#{train.number}</p>
                                </div>
                              </div>

                              {/* Times */}
                              <div className="flex items-center gap-8 text-center">
                                <div>
                                  <p className="text-2xl font-bold">{train.departure}</p>
                                  <p className="text-sm text-muted-foreground">{train.from}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <p className="text-xs text-muted-foreground">{train.duration}</p>
                                  <div className="w-24 h-0.5 bg-muted relative my-2">
                                    <Zap className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-2xl font-bold">{train.arrival}</p>
                                  <p className="text-sm text-muted-foreground">{train.to}</p>
                                </div>
                              </div>

                              {/* Classes */}
                              <div className="flex gap-2">
                                {train.classes.map((cls) => (
                                  <Badge key={cls} variant="outline">{cls}</Badge>
                                ))}
                              </div>

                              {/* Price & Book */}
                              <div className="text-right">
                                <Badge 
                                  className={cn(
                                    "mb-2",
                                    train.availability === "Available" 
                                      ? "bg-green-500" 
                                      : "bg-yellow-500"
                                  )}
                                >
                                  {train.availability}
                                </Badge>
                                <p className="text-2xl font-bold text-primary">
                                  ₹{train.price.toLocaleString()}
                                </p>
                                <Button className="mt-2 bg-coral-gradient">
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">
                      {mockBuses.length} Buses Found
                    </h2>
                    <div className="flex gap-2">
                      <Badge variant="outline">Rating: High to Low</Badge>
                      <Badge variant="outline">Price: Low to High</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockBuses.map((bus, index) => (
                      <motion.div
                        key={bus.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                              {/* Bus Info */}
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                                  <Bus className="w-6 h-6 text-teal" />
                                </div>
                                <div>
                                  <p className="font-semibold">{bus.operator}</p>
                                  <p className="text-sm text-muted-foreground">{bus.type}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{bus.rating}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Times */}
                              <div className="flex items-center gap-8 text-center">
                                <div>
                                  <p className="text-2xl font-bold">{bus.departure}</p>
                                  <p className="text-sm text-muted-foreground">{bus.from}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <p className="text-xs text-muted-foreground">{bus.duration}</p>
                                  <div className="w-24 h-0.5 bg-muted relative my-2">
                                    <Bus className="w-4 h-4 text-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-2xl font-bold">{bus.arrival}</p>
                                  <p className="text-sm text-muted-foreground">{bus.to}</p>
                                </div>
                              </div>

                              {/* Seats */}
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{bus.seats} seats left</span>
                              </div>

                              {/* Price & Book */}
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  ₹{bus.price.toLocaleString()}
                                </p>
                                <Button className="mt-2 bg-coral-gradient">
                                  Select Seats
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
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
    </div>
  );
}