import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Users, Star, Mountain, Trees, Camera, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/jharkhand-hero.jpg";
import tribalCrafts from "@/assets/tribal-crafts.jpg";

const Home = () => {
  const featuredDestinations = [
    {
      name: "Ranchi",
      description: "Capital city with rich tribal heritage",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      activities: ["Cultural Tours", "Museums", "Shopping"]
    },
    {
      name: "Netarhat",
      description: "Queen of Chotanagpur plateau",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      activities: ["Sunrise Views", "Trekking", "Photography"]
    },
    {
      name: "Betla National Park",
      description: "Wildlife sanctuary and tiger reserve",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      activities: ["Wildlife Safari", "Bird Watching", "Nature Walks"]
    }
  ];

  const quickActions = [
    { icon: Calendar, title: "Plan Itinerary", desc: "AI-powered trip planning", href: "/itinerary" },
    { icon: MapPin, title: "Explore Maps", desc: "Interactive tourist spots", href: "/maps" },
    { icon: Users, title: "AI Assistant", desc: "Multilingual chat support", href: "/chat" },
    { icon: Globe, title: "Book Transport", desc: "Buses, trains & more", href: "/transport" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the Heart of
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              Jharkhand
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in delay-200">
            Experience tribal culture, pristine forests, and ancient heritage with AI-powered guidance
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8 animate-fade-in delay-400">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search destinations, activities, or experiences..."
                className="pl-10 h-12 bg-white/10 backdrop-blur border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
              Explore Now
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in delay-600">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <action.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold text-white">{action.title}</h3>
                    <p className="text-sm text-white/80">{action.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most enchanting places in Jharkhand, from ancient forests to vibrant tribal villages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-cultural transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {destination.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${tribalCrafts})` }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Rich Tribal Heritage
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Immerse yourself in the authentic culture of Jharkhand's indigenous communities. 
                From traditional handicrafts to ancient festivals, experience the living heritage 
                that has been preserved for generations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Trees className="h-12 w-12 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">Eco Tourism</h3>
                  <p className="text-sm opacity-80">Sustainable forest experiences</p>
                </div>
                <div className="text-center">
                  <Mountain className="h-12 w-12 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">Adventure</h3>
                  <p className="text-sm opacity-80">Thrilling outdoor activities</p>
                </div>
                <div className="text-center">
                  <Camera className="h-12 w-12 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">Photography</h3>
                  <p className="text-sm opacity-80">Capture stunning landscapes</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">Cultural Tours</h3>
                  <p className="text-sm opacity-80">Meet local communities</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Marketplace</h3>
                  <p className="text-white/80 mb-4">
                    Shop authentic tribal handicrafts, stay in traditional homestays, and book cultural experiences.
                  </p>
                  <Link to="/marketplace">
                    <Button variant="secondary" className="w-full">
                      Visit Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">AI Travel Assistant</h3>
                  <p className="text-white/80 mb-4">
                    Get personalized recommendations and multilingual support for your journey.
                  </p>
                  <Link to="/chat">
                    <Button variant="secondary" className="w-full">
                      Start Chatting
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our AI-powered platform create the perfect itinerary for your Jharkhand adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/itinerary">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Plan My Trip
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline">
                Talk to AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;