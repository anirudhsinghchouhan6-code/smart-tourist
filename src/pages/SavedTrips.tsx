import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Users,
  Star,
  Trash2,
  ExternalLink
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type SavedTrip = Tables<"saved_trips"> & {
  trip_packages?: Tables<"trip_packages"> | null;
  destinations?: Tables<"destinations"> | null;
};

export default function SavedTrips() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSavedTrips();
    }
  }, [user]);

  const fetchSavedTrips = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const removeSavedTrip = async (id: string) => {
    const { error } = await supabase
      .from("saved_trips")
      .delete()
      .eq("id", id);
    
    if (!error) {
      setSavedTrips(savedTrips.filter(trip => trip.id !== id));
    }
  };

  if (loading || isLoading) {
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Saved <span className="text-gradient">Trips</span>
            </h1>
            <p className="text-muted-foreground">
              Your favorite destinations and packages saved for later
            </p>
          </motion.div>

          {/* Saved Trips Grid */}
          {savedTrips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No saved trips yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start exploring destinations and packages, then save your favorites to plan your perfect trip later.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate("/")} variant="outline">
                      Explore Destinations
                    </Button>
                    <Button onClick={() => navigate("/trip-planner")} className="bg-coral-gradient">
                      Plan a Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-red-500 hover:text-white"
                          onClick={() => removeSavedTrip(trip.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* Rating */}
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
                          
                          <Button size="sm" className="bg-coral-gradient">
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
        </div>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}