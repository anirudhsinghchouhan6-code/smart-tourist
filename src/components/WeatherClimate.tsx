import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WeatherData {
  summer: string;
  monsoon: string;
  winter: string;
}

interface WeatherClimateProps {
  weather: WeatherData;
  bestTime: string;
  variant?: "full" | "compact" | "badge";
  className?: string;
}

const getSeasonIcon = (season: string) => {
  switch (season) {
    case "summer":
      return <Sun className="w-4 h-4 text-amber-500" />;
    case "monsoon":
      return <CloudRain className="w-4 h-4 text-blue-500" />;
    case "winter":
      return <Snowflake className="w-4 h-4 text-sky-400" />;
    default:
      return <Cloud className="w-4 h-4" />;
  }
};

const getCurrentSeason = (): "summer" | "monsoon" | "winter" => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 5) return "summer"; // Mar-Jun
  if (month >= 6 && month <= 9) return "monsoon"; // Jul-Oct
  return "winter"; // Nov-Feb
};

const getSeasonLabel = (season: string) => {
  switch (season) {
    case "summer":
      return "Summer (Mar-Jun)";
    case "monsoon":
      return "Monsoon (Jul-Oct)";
    case "winter":
      return "Winter (Nov-Feb)";
    default:
      return season;
  }
};

export function WeatherClimate({ weather, bestTime, variant = "full", className }: WeatherClimateProps) {
  const currentSeason = getCurrentSeason();

  if (variant === "badge") {
    return (
      <Badge 
        variant="secondary" 
        className={cn("flex items-center gap-1.5 bg-white/90 text-foreground backdrop-blur-sm", className)}
      >
        <Thermometer className="w-3 h-3" />
        <span className="text-xs">{weather[currentSeason].split("(")[0].trim()}</span>
      </Badge>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-4 text-sm", className)}>
        <div className="flex items-center gap-1.5">
          {getSeasonIcon(currentSeason)}
          <span className="text-muted-foreground">Now:</span>
          <span className="font-medium">{weather[currentSeason].split("(")[0].trim()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Best:</span>
          <span className="font-medium text-primary">{bestTime}</span>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Cloud className="w-5 h-5" />
          Weather & Climate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Best Time Highlight */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-semibold text-primary">Best Time to Visit</span>
          </div>
          <p className="text-sm text-foreground ml-6">{bestTime}</p>
        </div>

        {/* Seasonal Weather */}
        <div className="space-y-3">
          {(["summer", "monsoon", "winter"] as const).map((season) => (
            <div
              key={season}
              className={cn(
                "flex items-center justify-between p-2.5 rounded-lg transition-colors",
                currentSeason === season 
                  ? "bg-accent border border-primary/30" 
                  : "bg-muted/50 hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-2">
                {getSeasonIcon(season)}
                <span className="text-sm font-medium">{getSeasonLabel(season)}</span>
                {currentSeason === season && (
                  <Badge variant="outline" className="text-xs py-0 px-1.5 border-primary text-primary">
                    Now
                  </Badge>
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {weather[season]}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-medium">Pro tip:</span> Book 2-3 months in advance for peak season visits during {bestTime}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Mini badge for cards
export function WeatherBadge({ temperature, condition }: { temperature: string; condition?: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
      <Thermometer className="w-3 h-3 text-white" />
      <span className="text-xs text-white font-medium">{temperature}</span>
    </div>
  );
}
