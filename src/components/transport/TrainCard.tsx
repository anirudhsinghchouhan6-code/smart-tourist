import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Train, Zap, Wifi, Coffee, Utensils, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainCardProps {
  train: {
    id: number;
    name: string;
    number: string;
    departure: string;
    arrival: string;
    from: string;
    to: string;
    duration: string;
    classes: { name: string; price: number; available: number; waitlist?: number }[];
    amenities: string[];
    daysOfOperation: string[];
    distance: string;
  };
  index: number;
  onSelectSeat: (train: TrainCardProps["train"]) => void;
}

export function TrainCard({ train, index, onSelectSeat }: TrainCardProps) {
  const getAvailabilityBadge = (cls: { available: number; waitlist?: number }) => {
    if (cls.available > 20) {
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">AVL {cls.available}</Badge>;
    } else if (cls.available > 0) {
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">AVL {cls.available}</Badge>;
    } else if (cls.waitlist) {
      return <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">WL {cls.waitlist}</Badge>;
    }
    return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Not Available</Badge>;
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-3 h-3" />;
      case "food":
        return <Utensils className="w-3 h-3" />;
      case "pantry":
        return <Coffee className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const lowestPrice = Math.min(...train.classes.map(c => c.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Train Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Train className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{train.name}</p>
                    <Badge variant="outline" className="text-xs">#{train.number}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{train.distance} • {train.daysOfOperation.join(", ")}</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-2">
                {train.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs"
                    title={amenity}
                  >
                    {getAmenityIcon(amenity)}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Info */}
            <div className="flex items-center justify-between gap-4 py-4 border-y border-border/50">
              <div className="text-center">
                <p className="text-3xl font-bold">{train.departure}</p>
                <p className="text-sm text-muted-foreground">{train.from}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center relative px-4">
                <p className="text-xs text-muted-foreground mb-1">{train.duration}</p>
                <div className="w-full h-0.5 bg-gradient-to-r from-primary via-primary to-teal relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                  <Zap className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Non-Stop</p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold">{train.arrival}</p>
                <p className="text-sm text-muted-foreground">{train.to}</p>
              </div>
            </div>

            {/* Classes and Pricing */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {train.classes.map((cls) => (
                <div
                  key={cls.name}
                  className={cn(
                    "p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer",
                    cls.available === 0 && !cls.waitlist && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{cls.name}</span>
                    {getAvailabilityBadge(cls)}
                  </div>
                  <p className="text-lg font-bold text-primary">₹{cls.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Prices are per person, taxes included</span>
              </div>
              <Button 
                className="bg-coral-gradient"
                onClick={() => onSelectSeat(train)}
              >
                Select Seats • ₹{lowestPrice.toLocaleString()}+
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
