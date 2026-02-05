 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
 };
 
 const systemPrompt = `You are an expert travel itinerary planner for Indian tourism. Create detailed, personalized travel itineraries based on user preferences.
 
 When generating itineraries:
 - Create a day-by-day breakdown with specific activities and timings
 - Include estimated costs in Indian Rupees (₹)
 - Suggest hotels in different budget ranges
 - Recommend local restaurants and must-try dishes
 - Add practical tips for each location
 - Consider travel time between attractions
 - Include entry fees and approximate spending
 
 Format your response with clear sections:
 📍 **Day X: [Title]**
 - Morning: [Activity] - ₹[Cost]
 - Afternoon: [Activity] - ₹[Cost]
 - Evening: [Activity] - ₹[Cost]
 🏨 Stay: [Hotel recommendation] - ₹[Cost per night]
 🍽️ Food: [Restaurant recommendations]
 💡 Tip: [Practical advice]
 
 At the end, provide:
 📊 **Estimated Total Budget**
 - Accommodation: ₹X
 - Food: ₹X
 - Activities: ₹X
 - Transport: ₹X
 - **Total: ₹X per person**`;
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     // Authentication check
     const authHeader = req.headers.get("Authorization");
     if (!authHeader?.startsWith("Bearer ")) {
       return new Response(
         JSON.stringify({ error: "Unauthorized: Please sign in to generate itineraries" }),
         {
           status: 401,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         }
       );
     }
 
     // Validate user session
     const supabaseClient = createClient(
       Deno.env.get("SUPABASE_URL")!,
       Deno.env.get("SUPABASE_ANON_KEY")!,
       { global: { headers: { Authorization: authHeader } } }
     );
 
     const token = authHeader.replace("Bearer ", "");
     const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
     
     if (claimsError || !claimsData?.claims) {
       return new Response(
         JSON.stringify({ error: "Unauthorized: Invalid session" }),
         {
           status: 401,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         }
       );
     }
 
     const userId = claimsData.claims.sub;
     console.log(`Itinerary generation request from user: ${userId}`);
 
     // Parse request body
     const { destination, startDate, endDate, travelers, budget, interests, notes } = await req.json();
 
     if (!destination) {
       return new Response(
         JSON.stringify({ error: "Destination is required" }),
         {
           status: 400,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         }
       );
     }
 
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     // Build the user prompt
     const userPrompt = `Create a detailed travel itinerary for:
 
 🎯 Destination: ${destination}
 📅 Dates: ${startDate || "Flexible"} to ${endDate || "Flexible"}
 👥 Travelers: ${travelers || 2} people
 💰 Budget: ₹${budget || 50000} per person
 ❤️ Interests: ${interests?.length > 0 ? interests.join(", ") : "General sightseeing"}
 ${notes ? `📝 Special requests: ${notes}` : ""}
 
 Please create a comprehensive day-by-day itinerary with specific recommendations, timings, and costs.`;
 
     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: userPrompt },
         ],
         stream: true,
       }),
     });
 
     if (!response.ok) {
       if (response.status === 429) {
         return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
           status: 429,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         });
       }
       if (response.status === 402) {
         return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
           status: 402,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
         });
       }
       const errorText = await response.text();
       console.error("AI gateway error:", response.status, errorText);
       return new Response(JSON.stringify({ error: "AI service unavailable" }), {
         status: 500,
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       });
     }
 
     return new Response(response.body, {
       headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
     });
   } catch (error) {
     console.error("Itinerary generation error:", error);
     return new Response(
       JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
       {
         status: 500,
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       }
     );
   }
 });