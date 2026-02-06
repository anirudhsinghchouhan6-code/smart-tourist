 import { MapPin } from "lucide-react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
 interface DestinationMapProps {
   name: string;
   state: string;
   country: string;
   latitude: number;
   longitude: number;
 }
 
 export function DestinationMap({ name, state, country, latitude, longitude }: DestinationMapProps) {
   // Use OpenStreetMap embed for the map
   const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.1}%2C${latitude - 0.1}%2C${longitude + 0.1}%2C${latitude + 0.1}&layer=mapnik&marker=${latitude}%2C${longitude}`;
   const fullMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;
 
   return (
     <Card className="overflow-hidden">
       <CardHeader className="pb-2">
         <CardTitle className="flex items-center gap-2 text-lg">
           <MapPin className="w-5 h-5 text-primary" />
           Location
         </CardTitle>
       </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-[16/10] w-full min-h-[400px]">
           <iframe
             src={mapUrl}
             className="w-full h-full border-0"
             title={`Map of ${name}`}
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
           />
         </div>
         <div className="p-4 bg-muted/30">
           <p className="text-sm text-muted-foreground mb-2">
             {name}, {state}, {country}
           </p>
           <a
             href={fullMapUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="text-sm text-primary hover:underline"
           >
             View larger map →
           </a>
         </div>
       </CardContent>
     </Card>
   );
 }