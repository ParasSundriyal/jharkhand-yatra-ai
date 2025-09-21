import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Phone, ShoppingBag, Car, Hotel, MapIcon, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TransportService {
  id: string;
  service_name: string;
  vehicle_type: string;
  description: string;
  price_per_km: number;
  fixed_price: number;
  contact_phone: string;
  available_locations: string[];
  rating: number;
  total_rides: number;
}

interface ShopItem {
  id: string;
  shop_name: string;
  item_name: string;
  category: string;
  description: string;
  price: number;
  shop_address: string;
  shop_phone: string;
  rating: number;
  total_orders: number;
}

interface TourPackage {
  id: string;
  package_name: string;
  description: string;
  duration_hours: number;
  max_people: number;
  price_per_person: number;
  meeting_point: string;
  contact_phone: string;
  rating: number;
  total_bookings: number;
}

const NewMarketplace = () => {
  const [transportServices, setTransportServices] = useState<TransportService[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      setLoading(true);

      // Fetch transport services
      const { data: transport, error: transportError } = await supabase
        .from('transport_services')
        .select('*')
        .eq('is_active', true);

      if (transportError) throw transportError;

      // Fetch shop items
      const { data: shops, error: shopsError } = await supabase
        .from('shop_items')
        .select('*')
        .eq('is_available', true);

      if (shopsError) throw shopsError;

      // Fetch tour packages
      const { data: tours, error: toursError } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('is_active', true);

      if (toursError) throw toursError;

      setTransportServices(transport || []);
      setShopItems(shops || []);
      setTourPackages(tours || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error Loading Services",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTransportServices = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {transportServices
        .filter(service => 
          service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.vehicle_type.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-green-600" />
                  <Badge variant="secondary">{service.vehicle_type}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{service.rating || 'New'}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{service.service_name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {service.price_per_km && (
                  <div className="text-lg font-semibold text-green-600">
                    ₹{service.price_per_km}/km
                  </div>
                )}
                {service.fixed_price && (
                  <div className="text-lg font-semibold text-green-600">
                    ₹{service.fixed_price} (Fixed)
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  {service.total_rides} rides completed
                </div>
              </div>
              
              {service.available_locations.length > 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium">Available in:</div>
                  <div className="flex flex-wrap gap-1">
                    {service.available_locations.slice(0, 3).map((location, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                    {service.available_locations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.available_locations.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <Button className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact: {service.contact_phone}
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderShopItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shopItems
        .filter(item => 
          item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{item.rating || 'New'}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{item.item_name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xl font-bold text-purple-600">
                  ₹{item.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.total_orders} orders completed
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">Shop: {item.shop_name}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {item.shop_address}
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact: {item.shop_phone}
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const renderTourPackages = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tourPackages
        .filter(tour => 
          tour.package_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.meeting_point.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-teal-600" />
                  <Badge variant="secondary">{tour.duration_hours}h tour</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{tour.rating || 'New'}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{tour.package_name}</CardTitle>
              <CardDescription>{tour.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xl font-bold text-teal-600">
                  ₹{tour.price_per_person}/person
                </div>
                <div className="text-sm text-muted-foreground">
                  Max {tour.max_people} people • {tour.total_bookings} bookings
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  Meeting point: {tour.meeting_point}
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact: {tour.contact_phone}
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Local Services Marketplace</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover authentic local services, transportation, and unique products from Jharkhand's finest providers
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services, shops, tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services Tabs */}
      <Tabs defaultValue="transport" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transport" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Transport ({transportServices.length})
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Shopping ({shopItems.length})
          </TabsTrigger>
          <TabsTrigger value="tours" className="flex items-center gap-2">
            <MapIcon className="h-4 w-4" />
            Tours ({tourPackages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transport" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Transportation Services</h2>
            <p className="text-muted-foreground">Reliable transport options across Jharkhand</p>
          </div>
          {transportServices.length > 0 ? renderTransportServices() : (
            <div className="text-center py-12">
              <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No transport services available yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shopping" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Local Products</h2>
            <p className="text-muted-foreground">Authentic handicrafts and local specialties</p>
          </div>
          {shopItems.length > 0 ? renderShopItems() : (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No products available yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tours" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Tour Packages</h2>
            <p className="text-muted-foreground">Expert-guided experiences across Jharkhand</p>
          </div>
          {tourPackages.length > 0 ? renderTourPackages() : (
            <div className="text-center py-12">
              <MapIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No tour packages available yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <div className="text-center bg-muted rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold">Are you a local service provider?</h2>
        <p className="text-muted-foreground">
          Join our marketplace and connect with tourists visiting Jharkhand
        </p>
        <Button size="lg">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Register Your Business
        </Button>
      </div>
    </div>
  );
};

export default NewMarketplace;