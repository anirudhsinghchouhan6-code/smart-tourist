import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useBooking } from "@/hooks/useBooking";
import { format, addDays } from "date-fns";

interface SeatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transportType: "train" | "bus";
  transportInfo: {
    name: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: number;
  };
}

type SeatStatus = "available" | "selected" | "booked" | "ladies" | "unavailable";

interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
  price: number;
  type: "lower" | "upper" | "middle" | "side-lower" | "side-upper" | "seater";
}

export function SeatSelectionModal({
  isOpen,
  onClose,
  transportType,
  transportInfo,
}: SeatSelectionModalProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showUpperDeck, setShowUpperDeck] = useState(true);
  const { createBooking, isBooking } = useBooking();

  const handleBookTransport = async () => {
    const travelDate = addDays(new Date(), 3); // Default to 3 days from now
    
    const result = await createBooking({
      booking_type: "transport",
      travel_date: format(travelDate, "yyyy-MM-dd"),
      travelers_count: selectedSeats.length,
      total_amount: totalPrice,
      details: {
        transport_type: transportType,
        transport_name: transportInfo.name,
        from: transportInfo.from,
        to: transportInfo.to,
        departure: transportInfo.departure,
        arrival: transportInfo.arrival,
        selected_seats: selectedSeats,
        price_per_seat: transportInfo.price,
      },
    });

    if (result) {
      setSelectedSeats([]);
      onClose();
    }
  };

  // Generate mock seats
  const generateSeats = (): { lower: Seat[][]; upper: Seat[][] } => {
    const createSeat = (id: string, num: string, type: Seat["type"], row: number): Seat => {
      const randomStatus: SeatStatus[] = ["available", "available", "available", "booked", "ladies", "unavailable"];
      const status = randomStatus[Math.floor(Math.random() * randomStatus.length)];
      return {
        id,
        number: num,
        status: selectedSeats.includes(id) ? "selected" : status,
        price: transportInfo.price + (type === "lower" ? 200 : type === "upper" ? 0 : 100),
        type,
      };
    };

    const lower: Seat[][] = [];
    const upper: Seat[][] = [];

    for (let row = 0; row < 8; row++) {
      const lowerRow: Seat[] = [
        createSeat(`L${row}A`, `L${row + 1}`, "lower", row),
        createSeat(`L${row}B`, `L${row + 1}`, "lower", row),
        createSeat(`L${row}C`, `SL${row + 1}`, "side-lower", row),
      ];
      
      const upperRow: Seat[] = [
        createSeat(`U${row}A`, `U${row + 1}`, "upper", row),
        createSeat(`U${row}B`, `U${row + 1}`, "upper", row),
        createSeat(`U${row}C`, `SU${row + 1}`, "side-upper", row),
      ];
      
      lower.push(lowerRow);
      upper.push(upperRow);
    }

    return { lower, upper };
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string, status: SeatStatus) => {
    if (status === "booked" || status === "unavailable") return;
    
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-600";
      case "selected":
        return "bg-primary border-primary text-primary-foreground";
      case "booked":
        return "bg-muted border-border text-muted-foreground cursor-not-allowed";
      case "ladies":
        return "bg-pink-500/20 border-pink-500/50 hover:bg-pink-500/30 text-pink-600";
      case "unavailable":
        return "bg-muted/50 border-border/50 text-muted-foreground cursor-not-allowed opacity-50";
      default:
        return "";
    }
  };

  const totalPrice = selectedSeats.length * transportInfo.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Select Your Seats</span>
            <div className="text-sm font-normal text-muted-foreground">
              {transportInfo.name} • {transportInfo.from} → {transportInfo.to}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 overflow-y-auto">
          {/* Seat Map */}
          <div className="flex-1">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted border border-border" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-pink-500/20 border border-pink-500/50" />
                <span>Ladies</span>
              </div>
            </div>

            {/* Lower Deck */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Lower Deck</h4>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="flex gap-2">
                  {/* Main berths */}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {seats.lower.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex gap-1">
                        {row.slice(0, 2).map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id, seat.status)}
                            className={cn(
                              "w-12 h-8 rounded text-xs font-medium border transition-all",
                              getSeatColor(selectedSeats.includes(seat.id) ? "selected" : seat.status)
                            )}
                            disabled={seat.status === "booked" || seat.status === "unavailable"}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Aisle */}
                  <div className="w-8 flex items-center justify-center text-xs text-muted-foreground">
                    Aisle
                  </div>
                  
                  {/* Side berths */}
                  <div className="grid grid-cols-1 gap-2">
                    {seats.lower.map((row, rowIdx) => (
                      <button
                        key={row[2].id}
                        onClick={() => handleSeatClick(row[2].id, row[2].status)}
                        className={cn(
                          "w-12 h-8 rounded text-xs font-medium border transition-all",
                          getSeatColor(selectedSeats.includes(row[2].id) ? "selected" : row[2].status)
                        )}
                        disabled={row[2].status === "booked" || row[2].status === "unavailable"}
                      >
                        {row[2].number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upper Deck Toggle */}
            <button
              onClick={() => setShowUpperDeck(!showUpperDeck)}
              className="flex items-center gap-2 text-sm font-semibold mb-2 text-primary"
            >
              Upper Deck
              {showUpperDeck ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showUpperDeck && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex gap-2">
                      {/* Main berths */}
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        {seats.upper.map((row, rowIdx) => (
                          <div key={rowIdx} className="flex gap-1">
                            {row.slice(0, 2).map((seat) => (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat.id, seat.status)}
                                className={cn(
                                  "w-12 h-8 rounded text-xs font-medium border transition-all",
                                  getSeatColor(selectedSeats.includes(seat.id) ? "selected" : seat.status)
                                )}
                                disabled={seat.status === "booked" || seat.status === "unavailable"}
                              >
                                {seat.number}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      {/* Aisle */}
                      <div className="w-8 flex items-center justify-center text-xs text-muted-foreground">
                        Aisle
                      </div>
                      
                      {/* Side berths */}
                      <div className="grid grid-cols-1 gap-2">
                        {seats.upper.map((row, rowIdx) => (
                          <button
                            key={row[2].id}
                            onClick={() => handleSeatClick(row[2].id, row[2].status)}
                            className={cn(
                              "w-12 h-8 rounded text-xs font-medium border transition-all",
                              getSeatColor(selectedSeats.includes(row[2].id) ? "selected" : row[2].status)
                            )}
                            disabled={row[2].status === "booked" || row[2].status === "unavailable"}
                          >
                            {row[2].number}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary */}
          <div className="w-full md:w-72 bg-muted/30 rounded-lg p-4 border border-border/50">
            <h4 className="font-semibold mb-4">Booking Summary</h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Departure</span>
                <span className="font-medium">{transportInfo.departure}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Arrival</span>
                <span className="font-medium">{transportInfo.arrival}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Route</span>
                <span className="font-medium">{transportInfo.from} → {transportInfo.to}</span>
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 mb-4">
              <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Selected Seats ({selectedSeats.length})
              </h5>
              
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seatId) => (
                    <Badge key={seatId} variant="secondary" className="gap-1">
                      {seatId}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => setSelectedSeats(prev => prev.filter(id => id !== seatId))}
                      />
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No seats selected</p>
              )}
            </div>

            <div className="border-t border-border/50 pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
              
              <Button 
                className="w-full bg-coral-gradient"
                disabled={selectedSeats.length === 0 || isBooking}
                onClick={handleBookTransport}
              >
                {isBooking ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
