import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Plane, Train } from "lucide-react";

const cities = [
  // India
  { name: "New Delhi", code: "DEL", country: "India", popular: true },
  { name: "Mumbai", code: "BOM", country: "India", popular: true },
  { name: "Bangalore", code: "BLR", country: "India", popular: true },
  { name: "Chennai", code: "MAA", country: "India", popular: true },
  { name: "Kolkata", code: "CCU", country: "India", popular: true },
  { name: "Hyderabad", code: "HYD", country: "India", popular: true },
  { name: "Ahmedabad", code: "AMD", country: "India", popular: true },
  { name: "Pune", code: "PNQ", country: "India", popular: true },
  { name: "Jaipur", code: "JAI", country: "India", popular: true },
  { name: "Goa", code: "GOI", country: "India", popular: true },
  { name: "Ratlam", code: "RTM", country: "India", popular: true },
  { name: "Indore", code: "IDR", country: "India", popular: false },
  { name: "Bhopal", code: "BHO", country: "India", popular: false },
  { name: "Lucknow", code: "LKO", country: "India", popular: false },
  { name: "Agra", code: "AGR", country: "India", popular: false },
  { name: "Udaipur", code: "UDR", country: "India", popular: false },
  { name: "Varanasi", code: "VNS", country: "India", popular: false },
  { name: "Amritsar", code: "ATQ", country: "India", popular: false },
  { name: "Kochi", code: "COK", country: "India", popular: false },
  { name: "Thiruvananthapuram", code: "TRV", country: "India", popular: false },
  // International
  { name: "Dubai", code: "DXB", country: "UAE", popular: true },
  { name: "Singapore", code: "SIN", country: "Singapore", popular: true },
  { name: "Bangkok", code: "BKK", country: "Thailand", popular: true },
  { name: "Paris", code: "CDG", country: "France", popular: true },
  { name: "London", code: "LHR", country: "UK", popular: true },
  { name: "New York", code: "JFK", country: "USA", popular: true },
  { name: "Bali", code: "DPS", country: "Indonesia", popular: true },
  { name: "Maldives", code: "MLE", country: "Maldives", popular: true },
  { name: "Tokyo", code: "NRT", country: "Japan", popular: false },
  { name: "Sydney", code: "SYD", country: "Australia", popular: false },
  { name: "Hong Kong", code: "HKG", country: "Hong Kong", popular: false },
  { name: "Kuala Lumpur", code: "KUL", country: "Malaysia", popular: false },
];

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: "plane" | "map" | "train";
  iconColor?: string;
  className?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  placeholder = "Select city",
  icon = "map",
  iconColor = "text-primary",
  className,
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.code.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())
  );

  const popularCities = filteredCities.filter((c) => c.popular);
  const otherCities = filteredCities.filter((c) => !c.popular);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setSearch(cityName);
    setIsOpen(false);
  };

  const IconComponent = icon === "plane" ? Plane : icon === "train" ? Train : MapPin;

  return (
    <div className="relative">
      <IconComponent
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
          iconColor
        )}
      />
      <Input
        ref={inputRef}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className={cn("pl-10 h-12", className)}
        placeholder={placeholder}
      />

      {isOpen && filteredCities.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto"
        >
          {popularCities.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50">
                Popular Destinations
              </div>
              {popularCities.map((city) => (
                <button
                  key={city.code}
                  className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                  onClick={() => handleSelect(city.name)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{city.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {city.code} • {city.country}
                    </p>
                  </div>
                </button>
              ))}
            </>
          )}

          {otherCities.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50">
                Other Cities
              </div>
              {otherCities.map((city) => (
                <button
                  key={city.code}
                  className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                  onClick={() => handleSelect(city.name)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{city.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {city.code} • {city.country}
                    </p>
                  </div>
                </button>
              ))}
            </>
          )}

          {filteredCities.length === 0 && (
            <div className="px-3 py-4 text-center text-muted-foreground">
              No cities found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
