import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  category: string;
  rating?: number;
  onClick?: () => void;
}

export function DestinationCard({
  name,
  country,
  image,
  category,
  rating = 4.5,
  onClick,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category Badge */}
      <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary text-primary-foreground">
        {category}
      </Badge>

      {/* Rating */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
        <Star className="w-3 h-3 text-gold fill-gold" />
        <span className="text-xs text-white font-medium">{rating}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-display font-bold text-white mb-1">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-white/70">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{country}</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
    </motion.div>
  );
}
