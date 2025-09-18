import { Calendar, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventsCalendar from "@/components/EventsCalendar";
import WeatherWidget from "@/components/WeatherWidget";
import { useAuth } from "@/contexts/AuthContext";

const Events = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-cultural py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <Calendar className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading">
              Events & Festivals
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto font-body">
              Discover the vibrant cultural celebrations, traditional festivals, and exciting events happening across Jharkhand
            </p>
            
            {user && (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Plus className="h-5 w-5 mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events Calendar */}
            <div className="lg:col-span-2">
              <EventsCalendar showFilter={true} />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <WeatherWidget city="Ranchi" />
              
              {/* Quick Info */}
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Event Locations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ranchi</span>
                    <span className="font-medium">15 events</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Netarhat</span>
                    <span className="font-medium">8 events</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deoghar</span>
                    <span className="font-medium">12 events</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Betla</span>
                    <span className="font-medium">5 events</span>
                  </div>
                </div>
              </div>
              
              {/* Featured Event */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-semibold mb-2">Featured Event</h3>
                <h4 className="font-medium text-primary mb-2">Sarhul Festival 2025</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Experience the most significant tribal festival celebrating nature, harvest, and community bonding.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  March 15, 2025
                </div>
                <Button size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;