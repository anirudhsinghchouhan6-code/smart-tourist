import { motion } from "framer-motion";
import { Star, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TripPackageCardProps {
  title: string;
  destinations: string[];
  nights: number;
  price: number;
  originalPrice?: number;
  curator: string;
  image: string;
  rating: number;
  includes: string[];
  onViewDetails?: () => void;
}

export function TripPackageCard({
  title,
  destinations,
  nights,
  price,
  originalPrice,
  curator,
  image,
  rating,
  includes,
  onViewDetails,
}: TripPackageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg card-hover border"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-navy/90 text-white">
          {nights} Nights
        </Badge>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{destinations.join(" • ")}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{nights + 1} Days</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Curated by {curator}</span>
          </div>
        </div>

        {/* Includes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {includes.slice(0, 3).map((item) => (
            <Badge key={item} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-4 border-t">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                ${price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
          <Button size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
