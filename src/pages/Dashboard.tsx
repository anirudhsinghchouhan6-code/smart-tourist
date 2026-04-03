import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Clock,
  Plane,
  Hotel,
  Train,
  Heart,
  Settings,
  ChevronRight,
  Star,
  Trash2,
  ExternalLink
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;
type SavedTrip = Tables<"saved_trips"> & {
  trip_packages?: Tables<"trip_packages"> | null;
  destinations?: Tables<"destinations"> | null;
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchProfile();
      fetchSavedTrips();
    }
  }, [user]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setBookings(data);
    }
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user?.id)
      .maybeSingle();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  const fetchSavedTrips = async () => {
    const { data, error } = await supabase
      .from("saved_trips")
      .select(`
        *,
        trip_packages(*),
        destinations(*)
      `)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setSavedTrips(data);
    }
  };

  const removeSavedTrip = async (id: string) => {
    const { error } = await supabase
      .from("saved_trips")
      .delete()
      .eq("id", id);
    
    if (!error) {
      setSavedTrips(savedTrips.filter(trip => trip.id !== id));
      toast({
        title: "Trip removed",
        description: "The trip has been removed from your saved list.",
      });
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="w-5 h-5" />;
      case "hotel":
        return <Hotel className="w-5 h-5" />;
      case "train":
      case "bus":
        return <Train className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome back, <span className="text-gradient">{profile?.full_name || "Traveler"}</span>!
            </h1>
            <p className="text-muted-foreground">
              Manage your trips, bookings, and travel preferences
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.filter(b => b.booking_type === "flight").length}</p>
                  <p className="text-sm text-muted-foreground">Flights</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.filter(b => b.booking_type === "hotel").length}</p>
                  <p className="text-sm text-muted-foreground">Hotels</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Train className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.filter(b => b.booking_type === "train" || b.booking_type === "bus").length}</p>
                  <p className="text-sm text-muted-foreground">Transfers</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/saved-trips")}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{savedTrips.length}</p>
                  <p className="text-sm text-muted-foreground">Saved</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="trips" className="relative">
                  Saved Trips
                  {savedTrips.length > 0 && (
                    <Badge className="ml-1.5 bg-red-500 text-white text-xs px-1.5 py-0 min-w-[18px] h-[18px]">
                      {savedTrips.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start planning your next adventure!
                      </p>
                      <Button onClick={() => navigate("/trip-planner")} className="bg-coral-gradient">
                        Plan a Trip
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                {getBookingIcon(booking.booking_type)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold capitalize">{booking.booking_type} Booking</h3>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(booking.travel_date).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {booking.travelers_count} traveler(s)
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary">
                                ₹{booking.total_amount.toLocaleString()}
                              </p>
                              <Button variant="ghost" size="sm" className="mt-2">
                                View Details
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="trips" className="space-y-4">
                {savedTrips.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No saved trips yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Explore destinations and save your favorites to plan later
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={() => navigate("/destinations")} variant="outline">
                          Explore Destinations
                        </Button>
                        <Button onClick={() => navigate("/trip-planner")} className="bg-coral-gradient">
                          Plan a Trip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedTrips.map((trip, index) => {
                      const pkg = trip.trip_packages;
                      const dest = trip.destinations;
                      const item = pkg || dest;

                      if (!item) return null;

                      return (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden group hover:shadow-xl transition-all">
                            <div className="relative h-48">
                              <img
                                src={item.image_url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"}
                                alt={'title' in item ? item.title : item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-red-500 hover:text-white"
                                onClick={() => removeSavedTrip(trip.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>

                              {item.rating && (
                                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-white text-sm font-medium">{item.rating}</span>
                                </div>
                              )}
                            </div>

                            <CardContent className="p-4">
                              <h3 className="font-semibold text-lg mb-2">
                                {'title' in item ? item.title : item.name}
                              </h3>
                              
                              {'destinations' in item && item.destinations && (
                                <div className="flex items-center gap-1 text-muted-foreground mb-3">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm">{item.destinations.join(" → ")}</span>
                                </div>
                              )}

                              {'country' in item && (
                                <div className="flex items-center gap-1 text-muted-foreground mb-3">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm">{item.country}</span>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                {'price_per_person' in item && (
                                  <div>
                                    <span className="text-2xl font-bold text-primary">
                                      ₹{item.price_per_person.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground">/person</span>
                                  </div>
                                )}
                                
                                <Button
                                  size="sm"
                                  className="bg-coral-gradient"
                                  onClick={() => {
                                    if ('title' in item && dest === null) {
                                      navigate("/trip-planner");
                                    } else if (dest) {
                                      navigate(`/destination/${dest.id}`);
                                    }
                                  }}
                                >
                                  View Details
                                  <ExternalLink className="w-4 h-4 ml-1" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {savedTrips.length > 0 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => navigate("/saved-trips")}>
                      View All Saved Trips
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{profile?.full_name || "Your Name"}</h3>
                        <p className="text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{profile?.phone || "Not provided"}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                        <p className="font-medium">
                          {profile?.created_at 
                            ? new Date(profile.created_at).toLocaleDateString() 
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}