import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Plane, Train, Clock, TrendingUp } from "lucide-react";

const cities = [
  // India - Major Cities
  { name: "New Delhi", code: "DEL", country: "India", popular: true, state: "Delhi" },
  { name: "Mumbai", code: "BOM", country: "India", popular: true, state: "Maharashtra" },
  { name: "Bangalore", code: "BLR", country: "India", popular: true, state: "Karnataka" },
  { name: "Chennai", code: "MAA", country: "India", popular: true, state: "Tamil Nadu" },
  { name: "Kolkata", code: "CCU", country: "India", popular: true, state: "West Bengal" },
  { name: "Hyderabad", code: "HYD", country: "India", popular: true, state: "Telangana" },
  { name: "Ahmedabad", code: "AMD", country: "India", popular: true, state: "Gujarat" },
  { name: "Pune", code: "PNQ", country: "India", popular: true, state: "Maharashtra" },
  { name: "Jaipur", code: "JAI", country: "India", popular: true, state: "Rajasthan" },
  { name: "Goa", code: "GOI", country: "India", popular: true, state: "Goa" },
  
  // India - Tier 2 Cities
  { name: "Ratlam", code: "RTM", country: "India", popular: true, state: "Madhya Pradesh" },
  { name: "Indore", code: "IDR", country: "India", popular: true, state: "Madhya Pradesh" },
  { name: "Bhopal", code: "BHO", country: "India", popular: true, state: "Madhya Pradesh" },
  { name: "Lucknow", code: "LKO", country: "India", popular: true, state: "Uttar Pradesh" },
  { name: "Agra", code: "AGR", country: "India", popular: false, state: "Uttar Pradesh" },
  { name: "Udaipur", code: "UDR", country: "India", popular: false, state: "Rajasthan" },
  { name: "Varanasi", code: "VNS", country: "India", popular: false, state: "Uttar Pradesh" },
  { name: "Amritsar", code: "ATQ", country: "India", popular: false, state: "Punjab" },
  { name: "Kochi", code: "COK", country: "India", popular: false, state: "Kerala" },
  { name: "Thiruvananthapuram", code: "TRV", country: "India", popular: false, state: "Kerala" },
  
  // India - Additional Cities
  { name: "Surat", code: "STV", country: "India", popular: false, state: "Gujarat" },
  { name: "Vadodara", code: "BDQ", country: "India", popular: false, state: "Gujarat" },
  { name: "Rajkot", code: "RAJ", country: "India", popular: false, state: "Gujarat" },
  { name: "Nagpur", code: "NAG", country: "India", popular: false, state: "Maharashtra" },
  { name: "Nashik", code: "ISK", country: "India", popular: false, state: "Maharashtra" },
  { name: "Aurangabad", code: "IXU", country: "India", popular: false, state: "Maharashtra" },
  { name: "Gwalior", code: "GWL", country: "India", popular: false, state: "Madhya Pradesh" },
  { name: "Jabalpur", code: "JLR", country: "India", popular: false, state: "Madhya Pradesh" },
  { name: "Ujjain", code: "UJN", country: "India", popular: false, state: "Madhya Pradesh" },
  { name: "Kanpur", code: "KNU", country: "India", popular: false, state: "Uttar Pradesh" },
  { name: "Allahabad", code: "IXD", country: "India", popular: false, state: "Uttar Pradesh" },
  { name: "Patna", code: "PAT", country: "India", popular: false, state: "Bihar" },
  { name: "Ranchi", code: "IXR", country: "India", popular: false, state: "Jharkhand" },
  { name: "Bhubaneswar", code: "BBI", country: "India", popular: false, state: "Odisha" },
  { name: "Visakhapatnam", code: "VTZ", country: "India", popular: false, state: "Andhra Pradesh" },
  { name: "Vijayawada", code: "VGA", country: "India", popular: false, state: "Andhra Pradesh" },
  { name: "Coimbatore", code: "CJB", country: "India", popular: false, state: "Tamil Nadu" },
  { name: "Madurai", code: "IXM", country: "India", popular: false, state: "Tamil Nadu" },
  { name: "Mysore", code: "MYQ", country: "India", popular: false, state: "Karnataka" },
  { name: "Mangalore", code: "IXE", country: "India", popular: false, state: "Karnataka" },
  { name: "Chandigarh", code: "IXC", country: "India", popular: false, state: "Chandigarh" },
  { name: "Dehradun", code: "DED", country: "India", popular: false, state: "Uttarakhand" },
  { name: "Shimla", code: "SLV", country: "India", popular: false, state: "Himachal Pradesh" },
  { name: "Jodhpur", code: "JDH", country: "India", popular: false, state: "Rajasthan" },
  { name: "Bikaner", code: "BKB", country: "India", popular: false, state: "Rajasthan" },
  { name: "Ajmer", code: "AJM", country: "India", popular: false, state: "Rajasthan" },
  { name: "Kota", code: "KOT", country: "India", popular: false, state: "Rajasthan" },
  { name: "Guwahati", code: "GAU", country: "India", popular: false, state: "Assam" },
  { name: "Jammu", code: "IXJ", country: "India", popular: false, state: "Jammu & Kashmir" },
  { name: "Srinagar", code: "SXR", country: "India", popular: false, state: "Jammu & Kashmir" },
  
  // International - Popular
  { name: "Dubai", code: "DXB", country: "UAE", popular: true },
  { name: "Singapore", code: "SIN", country: "Singapore", popular: true },
  { name: "Bangkok", code: "BKK", country: "Thailand", popular: true },
  { name: "Paris", code: "CDG", country: "France", popular: true },
  { name: "London", code: "LHR", country: "UK", popular: true },
  { name: "New York", code: "JFK", country: "USA", popular: true },
  { name: "Bali", code: "DPS", country: "Indonesia", popular: true },
  { name: "Maldives", code: "MLE", country: "Maldives", popular: true },
  
  // International - Asia
  { name: "Tokyo", code: "NRT", country: "Japan", popular: false },
  { name: "Hong Kong", code: "HKG", country: "Hong Kong", popular: false },
  { name: "Kuala Lumpur", code: "KUL", country: "Malaysia", popular: false },
  { name: "Phuket", code: "HKT", country: "Thailand", popular: false },
  { name: "Seoul", code: "ICN", country: "South Korea", popular: false },
  { name: "Kathmandu", code: "KTM", country: "Nepal", popular: false },
  { name: "Colombo", code: "CMB", country: "Sri Lanka", popular: false },
  { name: "Dhaka", code: "DAC", country: "Bangladesh", popular: false },
  { name: "Abu Dhabi", code: "AUH", country: "UAE", popular: false },
  { name: "Doha", code: "DOH", country: "Qatar", popular: false },
  { name: "Riyadh", code: "RUH", country: "Saudi Arabia", popular: false },
  { name: "Muscat", code: "MCT", country: "Oman", popular: false },
  
  // International - Europe
  { name: "Amsterdam", code: "AMS", country: "Netherlands", popular: false },
  { name: "Frankfurt", code: "FRA", country: "Germany", popular: false },
  { name: "Zurich", code: "ZRH", country: "Switzerland", popular: false },
  { name: "Rome", code: "FCO", country: "Italy", popular: false },
  { name: "Barcelona", code: "BCN", country: "Spain", popular: false },
  { name: "Moscow", code: "SVO", country: "Russia", popular: false },
  
  // International - Americas & Oceania
  { name: "Sydney", code: "SYD", country: "Australia", popular: false },
  { name: "Melbourne", code: "MEL", country: "Australia", popular: false },
  { name: "Los Angeles", code: "LAX", country: "USA", popular: false },
  { name: "San Francisco", code: "SFO", country: "USA", popular: false },
  { name: "Toronto", code: "YYZ", country: "Canada", popular: false },
  { name: "Vancouver", code: "YVR", country: "Canada", popular: false },
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
  const [recentSearches] = useState<string[]>(["New Delhi", "Mumbai", "Ratlam"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.code.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase()) ||
      (city.state && city.state.toLowerCase().includes(search.toLowerCase()))
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

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {/* Recent Searches */}
          {search.length === 0 && recentSearches.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Recent Searches
              </div>
              {recentSearches.map((cityName) => {
                const city = cities.find(c => c.name === cityName);
                return (
                  <button
                    key={cityName}
                    className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                    onClick={() => handleSelect(cityName)}
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{cityName}</p>
                      <p className="text-xs text-muted-foreground">
                        {city?.code} • {city?.country}
                      </p>
                    </div>
                  </button>
                );
              })}
            </>
          )}

          {/* Popular Destinations */}
          {popularCities.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Popular Destinations
              </div>
              {popularCities.map((city) => (
                <button
                  key={city.code}
                  className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-3 transition-colors"
                  onClick={() => handleSelect(city.name)}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{city.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {city.code} • {city.state ? `${city.state}, ` : ""}{city.country}
                    </p>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* Other Cities */}
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
                      {city.code} • {city.state ? `${city.state}, ` : ""}{city.country}
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
