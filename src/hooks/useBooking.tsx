import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface BookingDetails {
  booking_type: "flight" | "hotel" | "transport" | "package";
  travel_date: string;
  travelers_count: number;
  total_amount: number;
  package_id?: string;
  details: Record<string, any>;
}

export function useBooking() {
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const createBooking = async (bookingData: BookingDetails) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book",
        variant: "destructive",
      });
      navigate("/auth");
      return null;
    }

    setIsBooking(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          booking_type: bookingData.booking_type,
          travel_date: bookingData.travel_date,
          travelers_count: bookingData.travelers_count,
          total_amount: bookingData.total_amount,
          package_id: bookingData.package_id || null,
          details: bookingData.details,
          status: "confirmed",
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Booking confirmed! 🎉",
        description: "Your booking has been saved. Check your dashboard for details.",
      });

      return data;
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsBooking(false);
    }
  };

  return {
    createBooking,
    isBooking,
    isAuthenticated: !!user,
  };
}
