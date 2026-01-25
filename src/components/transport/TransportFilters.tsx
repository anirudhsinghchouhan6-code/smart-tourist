import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TransportFiltersProps {
  transportType: "trains" | "buses";
  filters: {
    departureTime: string[];
    priceRange: [number, number];
    trainClasses: string[];
    busTypes: string[];
    amenities: string[];
  };
  onFiltersChange: (filters: TransportFiltersProps["filters"]) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

const DEPARTURE_TIMES = [
  { id: "early", label: "Early Morning", time: "00:00 - 06:00" },
  { id: "morning", label: "Morning", time: "06:00 - 12:00" },
  { id: "afternoon", label: "Afternoon", time: "12:00 - 18:00" },
  { id: "evening", label: "Evening", time: "18:00 - 24:00" },
];

const TRAIN_CLASSES = ["1A", "2A", "3A", "SL", "CC", "EC", "2S"];
const BUS_TYPES = ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Non-AC Seater", "Volvo", "Mercedes"];
const AMENITIES = ["WiFi", "Charging", "Food", "Entertainment", "Blanket", "Water Bottle"];

const SORT_OPTIONS = {
  trains: [
    { id: "departure_asc", label: "Departure: Earliest" },
    { id: "departure_desc", label: "Departure: Latest" },
    { id: "duration_asc", label: "Duration: Shortest" },
    { id: "price_asc", label: "Price: Low to High" },
    { id: "price_desc", label: "Price: High to Low" },
  ],
  buses: [
    { id: "departure_asc", label: "Departure: Earliest" },
    { id: "price_asc", label: "Price: Low to High" },
    { id: "price_desc", label: "Price: High to Low" },
    { id: "rating_desc", label: "Rating: High to Low" },
    { id: "seats_desc", label: "Seats: Most Available" },
  ],
};

export function TransportFilters({
  transportType,
  filters,
  onFiltersChange,
  onSortChange,
  currentSort,
}: TransportFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFiltersCount = 
    filters.departureTime.length + 
    filters.amenities.length + 
    (filters.trainClasses?.length || 0) + 
    (filters.busTypes?.length || 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Departure Time */}
      <div>
        <h4 className="font-semibold mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2">
          {DEPARTURE_TIMES.map((time) => (
            <button
              key={time.id}
              onClick={() => {
                const newTimes = filters.departureTime.includes(time.id)
                  ? filters.departureTime.filter((t) => t !== time.id)
                  : [...filters.departureTime, time.id];
                onFiltersChange({ ...filters, departureTime: newTimes });
              }}
              className={cn(
                "p-2 rounded-lg border text-left transition-all text-sm",
                filters.departureTime.includes(time.id)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <p className="font-medium">{time.label}</p>
              <p className="text-xs text-muted-foreground">{time.time}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, priceRange: value as [number, number] })
            }
            max={5000}
            min={0}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Train Classes or Bus Types */}
      {transportType === "trains" ? (
        <div>
          <h4 className="font-semibold mb-3">Train Class</h4>
          <div className="flex flex-wrap gap-2">
            {TRAIN_CLASSES.map((cls) => (
              <button
                key={cls}
                onClick={() => {
                  const classes = filters.trainClasses || [];
                  const newClasses = classes.includes(cls)
                    ? classes.filter((c) => c !== cls)
                    : [...classes, cls];
                  onFiltersChange({ ...filters, trainClasses: newClasses });
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-sm transition-all",
                  (filters.trainClasses || []).includes(cls)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h4 className="font-semibold mb-3">Bus Type</h4>
          <div className="space-y-2">
            {BUS_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={(filters.busTypes || []).includes(type)}
                  onCheckedChange={(checked) => {
                    const types = filters.busTypes || [];
                    const newTypes = checked
                      ? [...types, type]
                      : types.filter((t) => t !== type);
                    onFiltersChange({ ...filters, busTypes: newTypes });
                  }}
                />
                <Label htmlFor={type} className="text-sm cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      <div>
        <h4 className="font-semibold mb-3">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity}
              onClick={() => {
                const newAmenities = filters.amenities.includes(amenity)
                  ? filters.amenities.filter((a) => a !== amenity)
                  : [...filters.amenities, amenity];
                onFiltersChange({ ...filters, amenities: newAmenities });
              }}
              className={cn(
                "px-3 py-1.5 rounded-full border text-sm transition-all",
                filters.amenities.includes(amenity)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            onFiltersChange({
              departureTime: [],
              priceRange: [0, 5000],
              trainClasses: [],
              busTypes: [],
              amenities: [],
            })
          }
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Sort Options */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
        {SORT_OPTIONS[transportType].map((option) => (
          <Badge
            key={option.id}
            variant={currentSort === option.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer whitespace-nowrap transition-all",
              currentSort === option.id && "bg-primary"
            )}
            onClick={() => onSortChange(option.id)}
          >
            {option.label}
          </Badge>
        ))}
      </div>

      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 md:hidden">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 bg-primary">{activeFiltersCount}</Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filter Button */}
      <div className="hidden md:block">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 bg-primary">{activeFiltersCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
