import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Plane, Train, Clock, TrendingUp } from "lucide-react";

const cities = [
  // Himalayan Thrills - North India
  { name: "New Delhi", code: "DEL", country: "India", popular: true, state: "Delhi", region: "North India" },
  { name: "Leh", code: "IXL", country: "India", popular: true, state: "Ladakh", region: "Himalayan" },
  { name: "Srinagar", code: "SXR", country: "India", popular: true, state: "Jammu & Kashmir", region: "Himalayan" },
  { name: "Manali", code: "KUU", country: "India", popular: true, state: "Himachal Pradesh", region: "Himalayan" },
  { name: "Shimla", code: "SLV", country: "India", popular: true, state: "Himachal Pradesh", region: "Himalayan" },
  { name: "Dharamshala", code: "DHM", country: "India", popular: false, state: "Himachal Pradesh", region: "Himalayan" },
  { name: "Rishikesh", code: "DED", country: "India", popular: true, state: "Uttarakhand", region: "Himalayan" },
  { name: "Dehradun", code: "DED", country: "India", popular: false, state: "Uttarakhand", region: "Himalayan" },
  { name: "Nainital", code: "NNT", country: "India", popular: false, state: "Uttarakhand", region: "Himalayan" },
  { name: "Mussoorie", code: "MSR", country: "India", popular: false, state: "Uttarakhand", region: "Himalayan" },
  { name: "Haridwar", code: "HWR", country: "India", popular: false, state: "Uttarakhand", region: "Himalayan" },
  { name: "Auli", code: "AUL", country: "India", popular: false, state: "Uttarakhand", region: "Himalayan" },
  { name: "Chandigarh", code: "IXC", country: "India", popular: false, state: "Chandigarh", region: "North India" },
  { name: "Amritsar", code: "ATQ", country: "India", popular: true, state: "Punjab", region: "North India" },
  { name: "Jammu", code: "IXJ", country: "India", popular: false, state: "Jammu & Kashmir", region: "North India" },
  { name: "Pahalgam", code: "PAH", country: "India", popular: false, state: "Jammu & Kashmir", region: "Himalayan" },
  { name: "Gulmarg", code: "GUL", country: "India", popular: false, state: "Jammu & Kashmir", region: "Himalayan" },
  { name: "Gangtok", code: "GTK", country: "India", popular: false, state: "Sikkim", region: "Himalayan" },
  { name: "Darjeeling", code: "DAR", country: "India", popular: true, state: "West Bengal", region: "Himalayan" },
  
  // Coastal & Island Adventures - West & South India
  { name: "Goa", code: "GOI", country: "India", popular: true, state: "Goa", region: "Coastal" },
  { name: "Mumbai", code: "BOM", country: "India", popular: true, state: "Maharashtra", region: "West India" },
  { name: "Port Blair", code: "IXZ", country: "India", popular: true, state: "Andaman & Nicobar", region: "Islands" },
  { name: "Havelock Island", code: "HAV", country: "India", popular: false, state: "Andaman & Nicobar", region: "Islands" },
  { name: "Neil Island", code: "NEI", country: "India", popular: false, state: "Andaman & Nicobar", region: "Islands" },
  { name: "Lakshadweep", code: "AGX", country: "India", popular: false, state: "Lakshadweep", region: "Islands" },
  { name: "Daman", code: "DAM", country: "India", popular: false, state: "Daman & Diu", region: "Coastal" },
  { name: "Diu", code: "DIU", country: "India", popular: false, state: "Daman & Diu", region: "Coastal" },
  { name: "Alibag", code: "ALB", country: "India", popular: false, state: "Maharashtra", region: "Coastal" },
  { name: "Tarkarli", code: "TRK", country: "India", popular: false, state: "Maharashtra", region: "Coastal" },
  { name: "Gokarna", code: "GOK", country: "India", popular: false, state: "Karnataka", region: "Coastal" },
  { name: "Pondicherry", code: "PNY", country: "India", popular: true, state: "Puducherry", region: "Coastal" },
  { name: "Mahabalipuram", code: "MAB", country: "India", popular: false, state: "Tamil Nadu", region: "Coastal" },
  { name: "Rameswaram", code: "RMD", country: "India", popular: false, state: "Tamil Nadu", region: "Coastal" },
  { name: "Kanyakumari", code: "KNY", country: "India", popular: false, state: "Tamil Nadu", region: "Coastal" },
  
  // Southern Adventures - Karnataka & Kerala
  { name: "Bangalore", code: "BLR", country: "India", popular: true, state: "Karnataka", region: "South India" },
  { name: "Mysore", code: "MYQ", country: "India", popular: true, state: "Karnataka", region: "South India" },
  { name: "Coorg", code: "CRG", country: "India", popular: true, state: "Karnataka", region: "South India" },
  { name: "Hampi", code: "HMP", country: "India", popular: true, state: "Karnataka", region: "South India" },
  { name: "Mangalore", code: "IXE", country: "India", popular: false, state: "Karnataka", region: "Coastal" },
  { name: "Udupi", code: "UDP", country: "India", popular: false, state: "Karnataka", region: "Coastal" },
  { name: "Badami", code: "BDM", country: "India", popular: false, state: "Karnataka", region: "South India" },
  { name: "Kochi", code: "COK", country: "India", popular: true, state: "Kerala", region: "South India" },
  { name: "Thiruvananthapuram", code: "TRV", country: "India", popular: true, state: "Kerala", region: "South India" },
  { name: "Munnar", code: "MNR", country: "India", popular: true, state: "Kerala", region: "South India" },
  { name: "Alleppey", code: "ALP", country: "India", popular: true, state: "Kerala", region: "South India" },
  { name: "Kumarakom", code: "KMK", country: "India", popular: false, state: "Kerala", region: "South India" },
  { name: "Thekkady", code: "TKD", country: "India", popular: false, state: "Kerala", region: "South India" },
  { name: "Wayanad", code: "WYD", country: "India", popular: false, state: "Kerala", region: "South India" },
  { name: "Kovalam", code: "KVL", country: "India", popular: false, state: "Kerala", region: "Coastal" },
  { name: "Varkala", code: "VRK", country: "India", popular: false, state: "Kerala", region: "Coastal" },
  { name: "Chennai", code: "MAA", country: "India", popular: true, state: "Tamil Nadu", region: "South India" },
  { name: "Ooty", code: "OTY", country: "India", popular: true, state: "Tamil Nadu", region: "South India" },
  { name: "Kodaikanal", code: "KDK", country: "India", popular: false, state: "Tamil Nadu", region: "South India" },
  { name: "Madurai", code: "IXM", country: "India", popular: false, state: "Tamil Nadu", region: "South India" },
  { name: "Coimbatore", code: "CJB", country: "India", popular: false, state: "Tamil Nadu", region: "South India" },
  { name: "Hyderabad", code: "HYD", country: "India", popular: true, state: "Telangana", region: "South India" },
  
  // Heritage & Culture - Rajasthan & Central India
  { name: "Jaipur", code: "JAI", country: "India", popular: true, state: "Rajasthan", region: "North India" },
  { name: "Udaipur", code: "UDR", country: "India", popular: true, state: "Rajasthan", region: "North India" },
  { name: "Jodhpur", code: "JDH", country: "India", popular: true, state: "Rajasthan", region: "North India" },
  { name: "Jaisalmer", code: "JSA", country: "India", popular: true, state: "Rajasthan", region: "North India" },
  { name: "Pushkar", code: "PSK", country: "India", popular: false, state: "Rajasthan", region: "North India" },
  { name: "Bikaner", code: "BKB", country: "India", popular: false, state: "Rajasthan", region: "North India" },
  { name: "Ajmer", code: "AJM", country: "India", popular: false, state: "Rajasthan", region: "North India" },
  { name: "Mount Abu", code: "MAU", country: "India", popular: false, state: "Rajasthan", region: "North India" },
  { name: "Agra", code: "AGR", country: "India", popular: true, state: "Uttar Pradesh", region: "North India" },
  { name: "Varanasi", code: "VNS", country: "India", popular: true, state: "Uttar Pradesh", region: "North India" },
  { name: "Lucknow", code: "LKO", country: "India", popular: true, state: "Uttar Pradesh", region: "North India" },
  { name: "Allahabad", code: "IXD", country: "India", popular: false, state: "Uttar Pradesh", region: "North India" },
  { name: "Mathura", code: "MTR", country: "India", popular: false, state: "Uttar Pradesh", region: "North India" },
  { name: "Vrindavan", code: "VRN", country: "India", popular: false, state: "Uttar Pradesh", region: "North India" },
  
  // Central & West India
  { name: "Ratlam", code: "RTM", country: "India", popular: true, state: "Madhya Pradesh", region: "Central India" },
  { name: "Indore", code: "IDR", country: "India", popular: true, state: "Madhya Pradesh", region: "Central India" },
  { name: "Bhopal", code: "BHO", country: "India", popular: true, state: "Madhya Pradesh", region: "Central India" },
  { name: "Ujjain", code: "UJN", country: "India", popular: false, state: "Madhya Pradesh", region: "Central India" },
  { name: "Gwalior", code: "GWL", country: "India", popular: false, state: "Madhya Pradesh", region: "Central India" },
  { name: "Jabalpur", code: "JLR", country: "India", popular: false, state: "Madhya Pradesh", region: "Central India" },
  { name: "Khajuraho", code: "HJR", country: "India", popular: true, state: "Madhya Pradesh", region: "Central India" },
  { name: "Orchha", code: "ORC", country: "India", popular: false, state: "Madhya Pradesh", region: "Central India" },
  { name: "Ahmedabad", code: "AMD", country: "India", popular: true, state: "Gujarat", region: "West India" },
  { name: "Vadodara", code: "BDQ", country: "India", popular: false, state: "Gujarat", region: "West India" },
  { name: "Surat", code: "STV", country: "India", popular: false, state: "Gujarat", region: "West India" },
  { name: "Rajkot", code: "RAJ", country: "India", popular: false, state: "Gujarat", region: "West India" },
  { name: "Dwarka", code: "DWK", country: "India", popular: false, state: "Gujarat", region: "West India" },
  { name: "Somnath", code: "SOM", country: "India", popular: false, state: "Gujarat", region: "West India" },
  { name: "Kutch", code: "BHJ", country: "India", popular: true, state: "Gujarat", region: "West India" },
  { name: "Pune", code: "PNQ", country: "India", popular: true, state: "Maharashtra", region: "West India" },
  { name: "Nagpur", code: "NAG", country: "India", popular: false, state: "Maharashtra", region: "Central India" },
  { name: "Nashik", code: "ISK", country: "India", popular: false, state: "Maharashtra", region: "West India" },
  { name: "Aurangabad", code: "IXU", country: "India", popular: false, state: "Maharashtra", region: "West India" },
  { name: "Shirdi", code: "SAG", country: "India", popular: false, state: "Maharashtra", region: "West India" },
  { name: "Lonavala", code: "LNV", country: "India", popular: false, state: "Maharashtra", region: "West India" },
  { name: "Mahabaleshwar", code: "MBL", country: "India", popular: false, state: "Maharashtra", region: "West India" },
  
  // East & Northeast India
  { name: "Kolkata", code: "CCU", country: "India", popular: true, state: "West Bengal", region: "East India" },
  { name: "Guwahati", code: "GAU", country: "India", popular: true, state: "Assam", region: "Northeast" },
  { name: "Shillong", code: "SHL", country: "India", popular: true, state: "Meghalaya", region: "Northeast" },
  { name: "Cherrapunji", code: "CHR", country: "India", popular: false, state: "Meghalaya", region: "Northeast" },
  { name: "Kaziranga", code: "KZR", country: "India", popular: false, state: "Assam", region: "Northeast" },
  { name: "Tawang", code: "TWG", country: "India", popular: false, state: "Arunachal Pradesh", region: "Northeast" },
  { name: "Imphal", code: "IMF", country: "India", popular: false, state: "Manipur", region: "Northeast" },
  { name: "Kohima", code: "KOM", country: "India", popular: false, state: "Nagaland", region: "Northeast" },
  { name: "Agartala", code: "IXA", country: "India", popular: false, state: "Tripura", region: "Northeast" },
  { name: "Aizawl", code: "AJL", country: "India", popular: false, state: "Mizoram", region: "Northeast" },
  { name: "Patna", code: "PAT", country: "India", popular: false, state: "Bihar", region: "East India" },
  { name: "Bodh Gaya", code: "GAY", country: "India", popular: true, state: "Bihar", region: "East India" },
  { name: "Ranchi", code: "IXR", country: "India", popular: false, state: "Jharkhand", region: "East India" },
  { name: "Bhubaneswar", code: "BBI", country: "India", popular: false, state: "Odisha", region: "East India" },
  { name: "Puri", code: "PUI", country: "India", popular: true, state: "Odisha", region: "Coastal" },
  { name: "Konark", code: "KNK", country: "India", popular: false, state: "Odisha", region: "East India" },
  
  // International Destinations
  { name: "Dubai", code: "DXB", country: "UAE", popular: true },
  { name: "Singapore", code: "SIN", country: "Singapore", popular: true },
  { name: "Bangkok", code: "BKK", country: "Thailand", popular: true },
  { name: "Phuket", code: "HKT", country: "Thailand", popular: true },
  { name: "Bali", code: "DPS", country: "Indonesia", popular: true },
  { name: "Maldives", code: "MLE", country: "Maldives", popular: true },
  { name: "Colombo", code: "CMB", country: "Sri Lanka", popular: true },
  { name: "Kathmandu", code: "KTM", country: "Nepal", popular: true },
  { name: "Bhutan", code: "PBH", country: "Bhutan", popular: false },
  { name: "Kuala Lumpur", code: "KUL", country: "Malaysia", popular: true },
  { name: "Hong Kong", code: "HKG", country: "Hong Kong", popular: false },
  { name: "Tokyo", code: "NRT", country: "Japan", popular: false },
  { name: "Seoul", code: "ICN", country: "South Korea", popular: false },
  { name: "Paris", code: "CDG", country: "France", popular: false },
  { name: "London", code: "LHR", country: "UK", popular: false },
  { name: "New York", code: "JFK", country: "USA", popular: false },
  { name: "Sydney", code: "SYD", country: "Australia", popular: false },
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
