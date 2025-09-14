import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus,
  Train,
  Car,
  MapPin,
  Clock,
  Navigation,
  Smartphone,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Route
} from "lucide-react";

const Transport = () => {
  const [currentLocation, setCurrentLocation] = useState("Detecting...");
  const [selectedRoute, setSelectedRoute] = useState(null);

  const busRoutes = [
    {
      id: 1,
      route: "Ranchi - Netarhat",
      operator: "JRTC",
      departure: "06:00 AM",
      arrival: "10:30 AM",
      duration: "4h 30m",
      fare: "₹180",
      status: "On Time",
      seats: "Available",
      type: "Express"
    },
    {
      id: 2,
      route: "Ranchi - Jamshedpur",
      operator: "Private",
      departure: "07:15 AM",
      arrival: "10:45 AM",
      duration: "3h 30m",
      fare: "₹220",
      status: "Delayed 20 min",
      seats: "Few Left",
      type: "AC"
    },
    {
      id: 3,
      route: "Ranchi - Hazaribagh",
      operator: "JRTC",
      departure: "08:30 AM",
      arrival: "11:00 AM",
      duration: "2h 30m",
      fare: "₹150",
      status: "On Time",
      seats: "Available",
      type: "Regular"
    }
  ];

  const trainRoutes = [
    {
      id: 1,
      train: "Ranchi Express",
      number: "12875",
      departure: "06:45 AM",
      arrival: "02:30 PM",
      from: "Ranchi",
      to: "Howrah",
      status: "Running Late",
      delay: "45 min",
      platform: "2"
    },
    {
      id: 2,
      train: "Jharkhand Express",
      number: "13512",
      departure: "11:20 AM",
      arrival: "07:45 PM",
      from: "Ranchi",
      to: "Delhi",
      status: "On Time",
      delay: null,
      platform: "1"
    }
  ];

  const nearbyPlaces = [
    {
      name: "Ranchi Railway Station",
      distance: "2.5 km",
      type: "Railway",
      eta: "8 min",
      transportOptions: ["Bus", "Auto", "Taxi"]
    },
    {
      name: "Birsa Munda Airport",
      distance: "7.2 km",
      type: "Airport",
      eta: "18 min",
      transportOptions: ["Taxi", "Bus", "Private Car"]
    },
    {
      name: "Main Bus Stand",
      distance: "1.8 km",
      type: "Bus Terminal",
      eta: "6 min",
      transportOptions: ["Auto", "Walking", "Local Bus"]
    }
  ];

  const getStatusColor = (status: string) => {
    if (status.includes("On Time")) return "text-green-600 bg-green-50";
    if (status.includes("Delayed") || status.includes("Late")) return "text-orange-600 bg-orange-50";
    return "text-gray-600 bg-gray-50";
  };

  const getCurrentLocation = () => {
    setCurrentLocation("Getting location...");
    // Simulate location detection
    setTimeout(() => {
      setCurrentLocation("Ranchi, Main Road");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Transport & Location Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time transport information, route guidance, and location-based services
          </p>
        </div>

        {/* Current Location & Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Your Location & Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">Current Location:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currentLocation}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={getCurrentLocation}
                    className="h-8"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-gradient-hero hover:opacity-90">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Enable Live Tracking
                </Button>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Route className="h-4 w-4 mr-2" />
                  Plan Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transport Options */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="bus" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bus" className="flex items-center gap-2">
                  <Bus className="h-4 w-4" />
                  Buses
                </TabsTrigger>
                <TabsTrigger value="train" className="flex items-center gap-2">
                  <Train className="h-4 w-4" />
                  Trains
                </TabsTrigger>
                <TabsTrigger value="taxi" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Taxi/Private
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bus" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bus Services</CardTitle>
                    <CardDescription>Real-time bus schedules and availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {busRoutes.map((bus) => (
                        <div key={bus.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{bus.route}</h3>
                              <p className="text-sm text-muted-foreground">{bus.operator}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">{bus.fare}</div>
                              <Badge variant="outline">{bus.type}</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Departure:</span>
                              <div className="font-medium">{bus.departure}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Arrival:</span>
                              <div className="font-medium">{bus.arrival}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <div className="font-medium flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {bus.duration}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Seats:</span>
                              <div className={`font-medium ${bus.seats === 'Available' ? 'text-green-600' : 'text-orange-600'}`}>
                                {bus.seats}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <Badge className={getStatusColor(bus.status)}>
                              {bus.status.includes("On Time") ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                              {bus.status}
                            </Badge>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Track Live</Button>
                              <Button size="sm" className="bg-gradient-hero hover:opacity-90">Book Now</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="train" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Train Services</CardTitle>
                    <CardDescription>Live train status and bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainRoutes.map((train) => (
                        <div key={train.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{train.train}</h3>
                              <p className="text-sm text-muted-foreground">#{train.number}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(train.status)}>
                                {train.status}
                              </Badge>
                              {train.delay && (
                                <p className="text-sm text-orange-600 mt-1">+{train.delay}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">From:</span>
                              <div className="font-medium">{train.from}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">To:</span>
                              <div className="font-medium">{train.to}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Departure:</span>
                              <div className="font-medium">{train.departure}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Platform:</span>
                              <div className="font-medium">#{train.platform}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Train className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                Expected: {train.arrival}
                              </span>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Live Status</Button>
                              <Button size="sm" className="bg-gradient-hero hover:opacity-90">Book Ticket</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="taxi" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Taxi & Private Transport</CardTitle>
                    <CardDescription>Book cars, autos, and private vehicles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">From</label>
                          <Input placeholder="Current location" value={currentLocation} readOnly />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">To</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="netarhat">Netarhat</SelectItem>
                              <SelectItem value="betla">Betla National Park</SelectItem>
                              <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
                              <SelectItem value="jamshedpur">Jamshedpur</SelectItem>
                              <SelectItem value="airport">Birsa Munda Airport</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { type: "Auto Rickshaw", fare: "₹15/km", eta: "5 min", icon: "🛺" },
                          { type: "Taxi (Local)", fare: "₹20/km", eta: "8 min", icon: "🚗" },
                          { type: "SUV", fare: "₹35/km", eta: "12 min", icon: "🚙" }
                        ].map((vehicle, index) => (
                          <Card key={index} className="border-2 hover:border-primary cursor-pointer transition-colors">
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl mb-2">{vehicle.icon}</div>
                              <h3 className="font-semibold">{vehicle.type}</h3>
                              <p className="text-sm text-muted-foreground">{vehicle.fare}</p>
                              <p className="text-xs text-green-600">ETA: {vehicle.eta}</p>
                              <Button size="sm" className="w-full mt-3">
                                Book Now
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Nearby Places & Services */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Nearby Transport Hubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyPlaces.map((place, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{place.name}</h4>
                        <Badge variant="outline" className="text-xs">{place.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{place.distance}</span>
                        <span className="text-green-600">🚗 {place.eta}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {place.transportOptions.map((option, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200">
                    🚨 Emergency Helpline: 112
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🚑 Medical Emergency: 108
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🚓 Police: 100
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ℹ️ Tourist Helpline: 1363
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;