-- Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create destinations table
CREATE TABLE public.destinations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'adventure',
    rating DECIMAL(2,1) DEFAULT 4.5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on destinations (public read)
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view destinations" ON public.destinations FOR SELECT USING (true);

-- Create trip_packages table
CREATE TABLE public.trip_packages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    destinations TEXT[] NOT NULL,
    duration_nights INTEGER NOT NULL,
    price_per_person DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    includes TEXT[],
    image_url TEXT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    reviews_count INTEGER DEFAULT 0,
    curator_name TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on trip_packages (public read)
ALTER TABLE public.trip_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view packages" ON public.trip_packages FOR SELECT USING (true);

-- Create saved_trips table for user bookmarks
CREATE TABLE public.saved_trips (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    package_id UUID REFERENCES public.trip_packages(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on saved_trips
ALTER TABLE public.saved_trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own saved trips" ON public.saved_trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save trips" ON public.saved_trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete saved trips" ON public.saved_trips FOR DELETE USING (auth.uid() = user_id);

-- Create chat_conversations table for AI assistant
CREATE TABLE public.chat_conversations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on chat_conversations
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create conversations" ON public.chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own conversations" ON public.chat_conversations FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view messages from their conversation" ON public.chat_messages FOR SELECT USING (true);

-- Create bookings table
CREATE TABLE public.bookings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    package_id UUID REFERENCES public.trip_packages(id),
    booking_type TEXT NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'package', 'bus', 'train')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    travel_date DATE NOT NULL,
    travelers_count INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();