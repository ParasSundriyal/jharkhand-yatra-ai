-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('tourist', 'transport_provider', 'shop_owner', 'hotel_owner', 'tour_guide', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create transport_services table
CREATE TABLE public.transport_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL, -- car, bike, auto, bus, etc.
  description TEXT,
  price_per_km NUMERIC,
  fixed_price NUMERIC,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  available_locations TEXT[], -- areas they serve
  vehicle_images TEXT[], -- image URLs
  is_active BOOLEAN DEFAULT true,
  rating NUMERIC(2,1) DEFAULT 0,
  total_rides INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create shop_items table
CREATE TABLE public.shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  shop_name TEXT NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL, -- handicrafts, clothing, food, souvenirs, etc.
  description TEXT,
  price NUMERIC NOT NULL,
  item_images TEXT[], -- image URLs
  shop_address TEXT NOT NULL,
  shop_phone TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  is_available BOOLEAN DEFAULT true,
  rating NUMERIC(2,1) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tour_packages table
CREATE TABLE public.tour_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  package_name TEXT NOT NULL,
  description TEXT,
  duration_hours INTEGER NOT NULL,
  max_people INTEGER DEFAULT 10,
  price_per_person NUMERIC NOT NULL,
  included_features TEXT[],
  meeting_point TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  package_images TEXT[],
  is_active BOOLEAN DEFAULT true,
  rating NUMERIC(2,1) DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS app_role[]
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ARRAY(
    SELECT role
    FROM public.user_roles
    WHERE user_id = _user_id
  );
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for transport_services
CREATE POLICY "Transport services are viewable by everyone"
ON public.transport_services
FOR SELECT
USING (true);

CREATE POLICY "Transport providers can manage their services"
ON public.transport_services
FOR ALL
USING (auth.uid() = provider_id)
WITH CHECK (auth.uid() = provider_id AND public.has_role(auth.uid(), 'transport_provider'));

-- RLS Policies for shop_items
CREATE POLICY "Shop items are viewable by everyone"
ON public.shop_items
FOR SELECT
USING (true);

CREATE POLICY "Shop owners can manage their items"
ON public.shop_items
FOR ALL
USING (auth.uid() = shop_owner_id)
WITH CHECK (auth.uid() = shop_owner_id AND public.has_role(auth.uid(), 'shop_owner'));

-- RLS Policies for tour_packages
CREATE POLICY "Tour packages are viewable by everyone"
ON public.tour_packages
FOR SELECT
USING (true);

CREATE POLICY "Tour guides can manage their packages"
ON public.tour_packages
FOR ALL
USING (auth.uid() = guide_id)
WITH CHECK (auth.uid() = guide_id AND public.has_role(auth.uid(), 'tour_guide'));

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_transport_services_updated_at
BEFORE UPDATE ON public.transport_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_items_updated_at
BEFORE UPDATE ON public.shop_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_packages_updated_at
BEFORE UPDATE ON public.tour_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();