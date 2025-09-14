import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Navigation, 
  Camera, 
  Mountain, 
  Trees, 
  Building2, 
  Search,
  Layers,
  Route,
  Eye,
  Play
} from "lucide-react";

const Maps = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapView, setMapView] = useState("satellite");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const touristSpots = [
    {
      id: 1,
      name: "Netarhat Hill Station",
      category: "Hill Station",
      rating: 4.8,
      coordinates: [23.4691, 84.2617],
      description: "Queen of Chotanagpur plateau, famous for sunrise and sunset views",
      highlights: ["Sunrise Point", "Sunset Point", "Tribal Villages"],
      difficulty: "Easy",
      timeRequired: "1-2 days",
      bestTime: "October to March"
    },
    {
      id: 2,
      name: "Betla National Park",
      category: "Wildlife",
      rating: 4.6,
      coordinates: [23.8644, 84.1922],
      description: "Tiger reserve and wildlife sanctuary with diverse flora and fauna",
      highlights: ["Tiger Safari", "Palamau Fort", "Bird Watching"],
      difficulty: "Moderate",
      timeRequired: "1 day",
      bestTime: "November to April"
    },
    {
      id: 3,
      name: "Hundru Falls",
      category: "Waterfall",
      rating: 4.5,
      coordinates: [23.4255, 85.5897],
      description: "Beautiful 320-foot waterfall near Ranchi",
      highlights: ["Photography", "Trekking", "Swimming"],
      difficulty: "Easy",
      timeRequired: "Half day",
      bestTime: "July to November"
    },
    {
      id: 4,
      name: "Tribal Cultural Center",
      category: "Cultural",
      rating: 4.7,
      coordinates: [23.3441, 85.3096],
      description: "Museum showcasing rich tribal heritage and traditions",
      highlights: ["Artifacts", "Folk Dance", "Handicrafts"],
      difficulty: "Easy",
      timeRequired: "2-3 hours",
      bestTime: "Year round"
    }
  ];

  const transportRoutes = [
    {
      id: 1,
      from: "Ranchi",
      to: "Netarhat",
      mode: "Bus",
      duration: "4.5 hours",
      frequency: "Every 2 hours",
      cost: "₹180"
    },
    {
      id: 2,
      from: "Ranchi",
      to: "Betla National Park",
      mode: "Taxi",
      duration: "3 hours",
      frequency: "On demand",
      cost: "₹2500"
    },
    {
      id: 3,
      from: "Ranchi",
      to: "Hundru Falls",
      mode: "Local Bus",
      duration: "1.5 hours",
      frequency: "Every hour",
      cost: "₹45"
    }
  ];

  const categories = [
    { value: "all", label: "All Places", icon: MapPin },
    { value: "Hill Station", label: "Hill Stations", icon: Mountain },
    { value: "Wildlife", label: "Wildlife", icon: Trees },
    { value: "Waterfall", label: "Waterfalls", icon: Camera },
    { value: "Cultural", label: "Cultural Sites", icon: Building2 }
  ];

  const filteredSpots = selectedCategory === "all" 
    ? touristSpots 
    : touristSpots.filter(spot => spot.category === selectedCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Interactive Maps & Virtual Experiences</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore Jharkhand through interactive maps, AR previews, and virtual reality experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Controls & Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Map Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Map View</label>
                  <Select value={mapView} onValueChange={setMapView}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satellite">Satellite View</SelectItem>
                      <SelectItem value="terrain">Terrain View</SelectItem>
                      <SelectItem value="street">Street View</SelectItem>
                      <SelectItem value="hybrid">Hybrid View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search places..." className="pl-10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Transport Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transportRoutes.map((route) => (
                    <div key={route.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{route.from} → {route.to}</span>
                        <Badge variant="secondary">{route.mode}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Duration: {route.duration}</div>
                        <div>Cost: {route.cost}</div>
                        <div>Frequency: {route.frequency}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Map & Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">
                        Explore tourist spots, routes, and real-time information
                      </p>
                      <div className="space-y-2">
                        <Badge className="mr-2">🗺️ {mapView} View</Badge>
                        <Badge variant="outline">{filteredSpots.length} places shown</Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simulated Map Pins */}
                  {filteredSpots.map((spot, index) => (
                    <div
                      key={spot.id}
                      className={`absolute bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:scale-110 transition-transform`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`
                      }}
                      onClick={() => setSelectedDestination(spot)}
                    >
                      <MapPin className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AR/VR Experiences */}
            <Tabs defaultValue="places" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="places">Tourist Places</TabsTrigger>
                <TabsTrigger value="ar">AR Preview</TabsTrigger>
                <TabsTrigger value="vr">VR Experiences</TabsTrigger>
              </TabsList>

              <TabsContent value="places" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpots.map((spot) => (
                    <Card key={spot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{spot.name}</CardTitle>
                          <Badge variant="outline">{spot.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(spot.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{spot.rating}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">{spot.description}</CardDescription>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time Required:</span>
                            <span>{spot.timeRequired}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Difficulty:</span>
                            <Badge variant="secondary" className="text-xs">{spot.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Best Time:</span>
                            <span>{spot.bestTime}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {spot.highlights.map((highlight, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ar" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpots.map((spot) => (
                    <Card key={spot.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          AR Preview: {spot.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <Camera className="h-12 w-12 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium">AR Experience</p>
                            <p className="text-xs text-muted-foreground">Interactive 360° view</p>
                          </div>
                        </div>
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Launch AR Preview
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vr" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Virtual Tribal Village Tour", duration: "15 min", type: "Cultural" },
                    { name: "Netarhat Sunrise Experience", duration: "8 min", type: "Nature" },
                    { name: "Wildlife Safari VR", duration: "20 min", type: "Adventure" },
                    { name: "Waterfall Trek Simulation", duration: "12 min", type: "Adventure" }
                  ].map((experience, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{experience.name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{experience.type}</Badge>
                          <Badge variant="outline">{experience.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <Eye className="h-10 w-10 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium">VR Experience</p>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-hero hover:opacity-90">
                          <Play className="h-4 w-4 mr-2" />
                          Start VR Experience
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;