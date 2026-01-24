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
  ChevronRight
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchProfile();
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
            <Card className="glass">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
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
                <TabsTrigger value="trips">My Trips</TabsTrigger>
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
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No saved trips</h3>
                    <p className="text-muted-foreground mb-4">
                      Plan and save your dream trips here
                    </p>
                    <Button onClick={() => navigate("/trip-planner")} className="bg-coral-gradient">
                      Create New Trip
                    </Button>
                  </CardContent>
                </Card>
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