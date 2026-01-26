import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Minus, Plus, Baby, User, BedDouble } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestRoomSelectorProps {
  adults: number;
  children: number;
  infants: number;
  rooms: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  className?: string;
}

export function GuestRoomSelector({
  adults,
  children,
  infants,
  rooms,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
  onRoomsChange,
  className,
}: GuestRoomSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalGuests = adults + children + infants;

  const increment = (current: number, setter: (v: number) => void, max: number) => {
    if (current < max) setter(current + 1);
  };

  const decrement = (current: number, setter: (v: number) => void, min: number) => {
    if (current > min) setter(current - 1);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-12 justify-start text-left font-normal",
            className
          )}
        >
          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>
            {totalGuests} Guest{totalGuests > 1 ? "s" : ""}, {rooms} Room{rooms > 1 ? "s" : ""}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Guests & Rooms</h4>

          {/* Rooms */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BedDouble className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Rooms</p>
                <p className="text-xs text-muted-foreground">Max 8 rooms</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => decrement(rooms, onRoomsChange, 1)}
                disabled={rooms <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{rooms}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => increment(rooms, onRoomsChange, 8)}
                disabled={rooms >= 8}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Adults */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-xs text-muted-foreground">Age 12+</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => decrement(adults, onAdultsChange, 1)}
                disabled={adults <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => increment(adults, onAdultsChange, 10)}
                disabled={adults >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-medium">Children</p>
                <p className="text-xs text-muted-foreground">Age 2-11</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => decrement(children, onChildrenChange, 0)}
                disabled={children <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{children}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => increment(children, onChildrenChange, 6)}
                disabled={children >= 6}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Baby className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Infants</p>
                <p className="text-xs text-muted-foreground">Under 2</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => decrement(infants, onInfantsChange, 0)}
                disabled={infants <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-semibold">{infants}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => increment(infants, onInfantsChange, 4)}
                disabled={infants >= 4}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Apply Button */}
          <Button 
            className="w-full bg-coral-gradient"
            onClick={() => setIsOpen(false)}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
