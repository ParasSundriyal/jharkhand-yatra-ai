-- Create events table for local tourism events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  category TEXT NOT NULL DEFAULT 'cultural',
  image_url TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  price DECIMAL(10,2) DEFAULT 0,
  organizer TEXT,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to events
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

-- Create photos table for tourist submissions
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  category TEXT NOT NULL DEFAULT 'general',
  likes_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Create policies for photos
CREATE POLICY "Photos are viewable by everyone" 
ON public.photos 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own photos" 
ON public.photos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos" 
ON public.photos 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos" 
ON public.photos 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create weather_locations table for tracking weather data
CREATE TABLE public.weather_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  is_tourist_spot BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.weather_locations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to weather locations
CREATE POLICY "Weather locations are viewable by everyone" 
ON public.weather_locations 
FOR SELECT 
USING (true);

-- Add trigger for automatic timestamp updates on events
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for automatic timestamp updates on photos
CREATE TRIGGER update_photos_updated_at
BEFORE UPDATE ON public.photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample events data
INSERT INTO public.events (title, description, location, event_date, event_time, category, latitude, longitude, organizer) VALUES
('Sarhul Festival', 'Traditional tribal spring festival celebrating nature and harvest', 'Ranchi', '2025-03-15', '09:00:00', 'cultural', 23.3441, 85.3096, 'Jharkhand Tourism Board'),
('Karma Festival', 'Festival of youth and love celebrated by tribal communities', 'Chaibasa', '2025-08-20', '18:00:00', 'cultural', 22.5551, 85.8001, 'Local Cultural Committee'),
('Tusu Festival', 'Harvest festival celebrated during winter months', 'Jamshedpur', '2025-01-14', '10:00:00', 'cultural', 22.8046, 86.2029, 'Cultural Society'),
('Netarhat Sunrise Festival', 'Annual celebration of the famous Netarhat sunrise', 'Netarhat', '2025-04-14', '05:30:00', 'nature', 23.4675, 84.2631, 'Netarhat Tourism Committee'),
('Betla Wildlife Photography Workshop', 'Learn wildlife photography at Betla National Park', 'Betla National Park', '2025-02-28', '07:00:00', 'adventure', 23.8671, 84.1944, 'Wildlife Photographers Association');

-- Insert sample weather locations
INSERT INTO public.weather_locations (name, latitude, longitude) VALUES
('Ranchi', 23.3441, 85.3096),
('Jamshedpur', 22.8046, 86.2029),
('Dhanbad', 23.7957, 86.4304),
('Bokaro', 23.6693, 85.9590),
('Deoghar', 24.4844, 86.6997),
('Hazaribagh', 24.0067, 85.3647),
('Giridih', 24.1854, 86.3002),
('Chaibasa', 22.5551, 85.8001),
('Netarhat', 23.4675, 84.2631),
('Betla National Park', 23.8671, 84.1944);