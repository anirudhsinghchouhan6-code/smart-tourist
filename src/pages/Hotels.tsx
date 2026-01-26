import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { CityAutocomplete } from "@/components/CityAutocomplete";
import { GuestRoomSelector } from "@/components/hotels/GuestRoomSelector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Calendar as CalendarIcon, 
  Search,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Waves,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroHotels from "@/assets/hero-hotels.jpg";

const mockHotels = [
  {
    id: 1,
    name: "Hotel Ajanta Palace",
    location: "Ratlam, Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    rating: 4.5,
    reviews: 2847,
    price: 3499,
    originalPrice: 4999,
    amenities: ["wifi", "parking", "breakfast", "pool"],
    stars: 4,
  },
  {
    id: 2,
    name: "The Oberoi Amarvilas",
    location: "Agra, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
    rating: 4.9,
    reviews: 5621,
    price: 25999,
    originalPrice: 32999,
    amenities: ["wifi", "parking", "breakfast", "pool"],
    stars: 5,
  },
  {
    id: 3,
    name: "Taj Falaknuma Palace",
    location: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    rating: 4.8,
    reviews: 3892,
    price: 42999,
    originalPrice: 55000,
    amenities: ["wifi", "parking", "breakfast", "pool"],
    stars: 5,
  },
  {
    id: 4,
    name: "ITC Grand Chola",
    location: "Chennai, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    rating: 4.6,
    reviews: 4102,
    price: 12999,
    originalPrice: 16999,
    amenities: ["wifi", "parking", "breakfast"],
    stars: 5,
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  breakfast: <Coffee className="w-4 h-4" />,
  pool: <Waves className="w-4 h-4" />,
};

export default function Hotels() {
  const [destination, setDestination] = useState("Ratlam");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searched, setSearched] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number[]>([3, 4, 5]);

  const handleSearch = () => {
    setSearched(true);
  };

  const toggleStar = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
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
              src={heroHotels} 
              alt="Multiple hotel destinations" 
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
              <Badge className="mb-4 bg-teal/20 text-teal border-teal/30">
                Ratlam • Agra • Hyderabad • Chennai • Jaipur • Udaipur • Goa
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                Find Perfect <span className="text-gradient">Hotels</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover handpicked hotels across multiple destinations — from luxury palaces to boutique stays
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
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    {/* Destination */}
                    <div className="md:col-span-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">Destination</Label>
                      <CityAutocomplete
                        value={destination}
                        onChange={setDestination}
                        placeholder="Where are you going?"
                        icon="map"
                        iconColor="text-primary"
                      />
                    </div>

                    {/* Check In */}
                    <div className="md:col-span-2">
                      <Label className="text-sm text-muted-foreground mb-2 block">Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !checkIn && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "MMM dd") : "Add date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Check Out */}
                    <div className="md:col-span-2">
                      <Label className="text-sm text-muted-foreground mb-2 block">Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !checkOut && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "MMM dd") : "Add date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Guests & Rooms */}
                    <div className="md:col-span-3">
                      <Label className="text-sm text-muted-foreground mb-2 block">Guests & Rooms</Label>
                      <GuestRoomSelector
                        adults={adults}
                        children={children}
                        infants={infants}
                        rooms={rooms}
                        onAdultsChange={setAdults}
                        onChildrenChange={setChildren}
                        onInfantsChange={setInfants}
                        onRoomsChange={setRooms}
                      />
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
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full lg:w-72 space-y-6"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Filters</h3>
                      </div>

                      {/* Price Range */}
                      <div className="mb-6">
                        <Label className="text-sm mb-3 block">Price per night</Label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={50000}
                          step={1000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₹{priceRange[0].toLocaleString()}</span>
                          <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div>
                        <Label className="text-sm mb-3 block">Hotel Type</Label>
                        <div className="space-y-2">
                          {[3, 4, 5].map((star) => (
                            <Button
                              key={star}
                              variant={selectedStars.includes(star) ? "default" : "outline"}
                              size="sm"
                              className="mr-2"
                              onClick={() => toggleStar(star)}
                            >
                              {star}-Star
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hotels Grid */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">
                      {mockHotels.length} Hotels Found
                    </h2>
                    <Badge variant="outline">Price: Low to High</Badge>
                  </div>

                  <div className="space-y-4">
                    {mockHotels.map((hotel, index) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <div className="md:w-72 h-48 md:h-auto relative">
                                <img 
                                  src={hotel.image} 
                                  alt={hotel.name}
                                  className="w-full h-full object-cover"
                                />
                                <Badge className="absolute top-3 left-3 bg-primary">
                                  {hotel.stars}-Star
                                </Badge>
                              </div>

                              {/* Details */}
                              <div className="flex-1 p-6 flex flex-col md:flex-row justify-between">
                                <div>
                                  <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{hotel.location}</span>
                                  </div>
                                  
                                  {/* Rating */}
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1 bg-teal/10 text-teal px-2 py-1 rounded">
                                      <Star className="w-4 h-4 fill-current" />
                                      <span className="font-semibold">{hotel.rating}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      ({hotel.reviews.toLocaleString()} reviews)
                                    </span>
                                  </div>

                                  {/* Amenities */}
                                  <div className="flex gap-3">
                                    {hotel.amenities.map((amenity) => (
                                      <div 
                                        key={amenity}
                                        className="flex items-center gap-1 text-muted-foreground"
                                        title={amenity}
                                      >
                                        {amenityIcons[amenity]}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Price & Book */}
                                <div className="text-right mt-4 md:mt-0">
                                  <p className="text-sm text-muted-foreground line-through">
                                    ₹{hotel.originalPrice.toLocaleString()}
                                  </p>
                                  <p className="text-2xl font-bold text-primary">
                                    ₹{hotel.price.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-3">per night</p>
                                  <Button className="bg-coral-gradient">
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
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