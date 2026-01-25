import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bus, Star, Wifi, Plug, Snowflake, Tv, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusCardProps {
  bus: {
    id: number;
    operator: string;
    type: string;
    departure: string;
    arrival: string;
    from: string;
    to: string;
    duration: string;
    price: number;
    rating: number;
    reviewCount: number;
    seats: number;
    amenities: string[];
    boardingPoints: string[];
    droppingPoints: string[];
    busType: "sleeper" | "seater" | "semi-sleeper";
  };
  index: number;
  onSelectSeat: (bus: BusCardProps["bus"]) => void;
}

export function BusCard({ bus, index, onSelectSeat }: BusCardProps) {
  const getSeatsColor = () => {
    if (bus.seats > 20) return "text-green-600";
    if (bus.seats > 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-3 h-3" />;
      case "charging":
        return <Plug className="w-3 h-3" />;
      case "ac":
        return <Snowflake className="w-3 h-3" />;
      case "entertainment":
        return <Tv className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getBusTypeColor = () => {
    switch (bus.busType) {
      case "sleeper":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30";
      case "semi-sleeper":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "seater":
        return "bg-teal/20 text-teal border-teal/30";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-teal/30">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Bus Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center">
                  <Bus className="w-7 h-7 text-teal" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{bus.operator}</p>
                    <Badge className={cn("text-xs", getBusTypeColor())}>
                      {bus.busType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{bus.type}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{bus.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({bus.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap items-center gap-2">
                {bus.amenities.map((amenity) => (
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
                <p className="text-3xl font-bold">{bus.departure}</p>
                <p className="text-sm text-muted-foreground">{bus.from}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center relative px-4">
                <p className="text-xs text-muted-foreground mb-1">{bus.duration}</p>
                <div className="w-full h-0.5 bg-gradient-to-r from-teal via-teal to-primary relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal" />
                  <Bus className="w-5 h-5 text-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold">{bus.arrival}</p>
                <p className="text-sm text-muted-foreground">{bus.to}</p>
              </div>
            </div>

            {/* Boarding/Dropping Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Boarding Points
                </p>
                <div className="flex flex-wrap gap-1">
                  {bus.boardingPoints.slice(0, 3).map((point) => (
                    <Badge key={point} variant="outline" className="text-xs">{point}</Badge>
                  ))}
                  {bus.boardingPoints.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{bus.boardingPoints.length - 3} more</Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Dropping Points
                </p>
                <div className="flex flex-wrap gap-1">
                  {bus.droppingPoints.slice(0, 3).map((point) => (
                    <Badge key={point} variant="outline" className="text-xs">{point}</Badge>
                  ))}
                  {bus.droppingPoints.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{bus.droppingPoints.length - 3} more</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <p className={cn("text-sm font-medium", getSeatsColor())}>
                  {bus.seats} seats available
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">₹{bus.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per seat</p>
                </div>
                <Button 
                  className="bg-coral-gradient"
                  onClick={() => onSelectSeat(bus)}
                >
                  Select Seats
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
