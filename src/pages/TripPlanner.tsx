import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  CalendarIcon,
  Users,
  MapPin,
  DollarSign,
  Heart,
  Mountain,
  Utensils,
  Camera,
  Waves,
  Building,
  TreePine,
} from "lucide-react";
import { format } from "date-fns";

const interests = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "beaches", label: "Beaches", icon: Waves },
  { id: "culture", label: "Culture", icon: Building },
  { id: "food", label: "Food", icon: Utensils },
  { id: "nature", label: "Nature", icon: TreePine },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "romantic", label: "Romantic", icon: Heart },
];

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const [budget, setBudget] = useState([2000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    destination: "",
    travelers: "2",
    notes: "",
  });

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Plan Your <span className="text-gradient-coral bg-coral-gradient">Dream Trip</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your travel preferences and let our AI create the
              perfect itinerary for you.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 rounded ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            {step === 1 && (
              <div className="bg-card rounded-2xl p-8 shadow-lg border space-y-6">
                <h2 className="text-2xl font-display font-bold">
                  Where & When
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="e.g., Bali, Thailand, Europe..."
                        className="pl-10"
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({ ...formData, destination: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dates.from
                              ? format(dates.from, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dates.from}
                            onSelect={(date) =>
                              setDates({ ...dates, from: date })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dates.to ? format(dates.to, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dates.to}
                            onSelect={(date) => setDates({ ...dates, to: date })}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Travelers</Label>
                    <Select
                      value={formData.travelers}
                      onValueChange={(value) =>
                        setFormData({ ...formData, travelers: value })
                      }
                    >
                      <SelectTrigger>
                        <Users className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Traveler (Solo)</SelectItem>
                        <SelectItem value="2">2 Travelers (Couple)</SelectItem>
                        <SelectItem value="3">3 Travelers</SelectItem>
                        <SelectItem value="4">4 Travelers</SelectItem>
                        <SelectItem value="5+">5+ Travelers (Group)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-coral-gradient hover:opacity-90"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card rounded-2xl p-8 shadow-lg border space-y-6">
                <h2 className="text-2xl font-display font-bold">
                  Budget & Interests
                </h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Budget per Person</Label>
                      <span className="text-2xl font-bold text-primary">
                        ${budget[0].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      min={500}
                      max={10000}
                      step={100}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$500</span>
                      <span>$10,000+</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>What are you interested in?</Label>
                    <div className="flex flex-wrap gap-3">
                      {interests.map((interest) => (
                        <Badge
                          key={interest.id}
                          variant={
                            selectedInterests.includes(interest.id)
                              ? "default"
                              : "outline"
                          }
                          className={`cursor-pointer py-2 px-4 text-sm ${
                            selectedInterests.includes(interest.id)
                              ? "bg-primary"
                              : ""
                          }`}
                          onClick={() => toggleInterest(interest.id)}
                        >
                          <interest.icon className="w-4 h-4 mr-2" />
                          {interest.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-coral-gradient hover:opacity-90"
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card rounded-2xl p-8 shadow-lg border space-y-6">
                <h2 className="text-2xl font-display font-bold">
                  Any Special Requests?
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Additional Notes (Optional)</Label>
                    <Textarea
                      placeholder="Tell us more about your preferences... dietary restrictions, accessibility needs, must-see attractions, pace of travel..."
                      rows={6}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-muted rounded-xl p-4 space-y-2">
                    <h3 className="font-medium">Trip Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {formData.destination || "Not specified"}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {formData.travelers} travelers
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />$
                        {budget[0].toLocaleString()} budget
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        {dates.from && dates.to
                          ? `${format(dates.from, "MMM d")} - ${format(
                              dates.to,
                              "MMM d"
                            )}`
                          : "Dates TBD"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-coral-gradient hover:opacity-90 shadow-glow">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate My Itinerary
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}
