import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  IndianRupee,
  Heart,
  Mountain,
  Utensils,
  Camera,
  Waves,
  Building,
  TreePine,
  Download,
  Share2,
  Plane,
  Hotel,
} from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const [budget, setBudget] = useState([50000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    destination: "",
    travelers: "2",
    notes: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<string>("");

  const generateItinerary = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to generate itineraries",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!formData.destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination for your trip",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setItinerary("");
    setStep(4);

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error("No active session");
      }

      const ITINERARY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`;

      const resp = await fetch(ITINERARY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
        body: JSON.stringify({
          destination: formData.destination,
          startDate: dates.from ? format(dates.from, "yyyy-MM-dd") : null,
          endDate: dates.to ? format(dates.to, "yyyy-MM-dd") : null,
          travelers: formData.travelers,
          budget: budget[0],
          interests: selectedInterests,
          notes: formData.notes,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Failed to generate itinerary");
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream");
      }

      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              setItinerary((prev) => prev + content);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      toast({
        title: "Itinerary Generated! 🎉",
        description: "Your personalized travel plan is ready",
      });
    } catch (error: any) {
      console.error("Itinerary generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

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
            className={step === 4 ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto"}
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
                        placeholder="e.g., Goa, Ladakh, Kerala..."
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
                        ₹{budget[0].toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      min={10000}
                      max={500000}
                      step={5000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹10,000</span>
                      <span>₹5,00,000+</span>
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
                        <IndianRupee className="w-4 h-4" />₹
                        {budget[0].toLocaleString('en-IN')} budget
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
                  <Button
                    className="flex-1 bg-coral-gradient hover:opacity-90 shadow-glow"
                    onClick={generateItinerary}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                    )}
                    Generate My Itinerary
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                {/* Itinerary Header Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-coral/10 to-teal/10 p-8 border shadow-lg"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                          Your Dream Itinerary
                        </h2>
                      </div>
                      <p className="text-muted-foreground">
                        {formData.destination} • {formData.travelers} travelers • ₹{budget[0].toLocaleString('en-IN')} budget
                      </p>
                    </div>
                    {isGenerating && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">Generating...</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Itinerary Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 md:p-10 shadow-lg border"
                >
                  {itinerary ? (
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border prose-h3:text-xl prose-h3:text-primary prose-h3:mt-6 prose-strong:text-foreground prose-table:border prose-table:border-border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-border prose-th:border prose-th:border-border prose-hr:border-border prose-li:marker:text-primary prose-a:text-primary">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {itinerary}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-teal" />
                        </div>
                      </div>
                      <p className="text-lg font-medium text-foreground mb-1">Crafting your perfect trip...</p>
                      <p className="text-sm">Our AI is curating personalized recommendations just for you</p>
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                {!isGenerating && itinerary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-3"
                  >
                    <Button
                      variant="outline"
                      className="h-14 rounded-xl"
                      onClick={() => setStep(1)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Plan Another Trip
                    </Button>
                    <Button
                      className="h-14 rounded-xl bg-coral-gradient hover:opacity-90"
                      onClick={() => navigate("/flights")}
                    >
                      <Plane className="w-4 h-4 mr-2" />
                      Book Flights
                    </Button>
                    <Button
                      className="h-14 rounded-xl bg-teal text-white hover:bg-teal/90"
                      onClick={() => navigate("/hotels")}
                    >
                      <Hotel className="w-4 h-4 mr-2" />
                      Find Hotels
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 rounded-xl"
                      onClick={() => {
                        navigator.clipboard.writeText(itinerary);
                        toast({ title: "Copied!", description: "Itinerary copied to clipboard" });
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Copy Itinerary
                    </Button>
                  </motion.div>
                )}
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
