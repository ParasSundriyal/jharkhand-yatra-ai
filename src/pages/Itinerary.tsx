import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Users, DollarSign, Clock, Sparkles, Download } from "lucide-react";

const Itinerary = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "",
    budget: "",
    interests: [] as string[],
    accommodation: "",
    transportation: "",
    specialRequests: ""
  });

  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    "Cultural Heritage", "Wildlife Safari", "Trekking", "Photography", 
    "Tribal Villages", "Waterfalls", "Adventure Sports", "Spiritual Sites",
    "Local Cuisine", "Handicraft Shopping", "Nature Walks", "Festivals"
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedItinerary({
        title: `${formData.travelers} Day Jharkhand Cultural Adventure`,
        summary: "A carefully curated journey through Jharkhand's most stunning landscapes and vibrant tribal culture.",
        days: [
          {
            day: 1,
            title: "Arrival in Ranchi - Cultural Immersion",
            activities: [
              { time: "10:00 AM", activity: "Arrival and hotel check-in", location: "Ranchi" },
              { time: "2:00 PM", activity: "Visit Tribal Research Institute Museum", location: "Ranchi" },
              { time: "5:00 PM", activity: "Local market exploration and handicraft shopping", location: "Main Road" },
              { time: "7:00 PM", activity: "Traditional dinner with cultural performance", location: "Hotel" }
            ]
          },
          {
            day: 2,
            title: "Netarhat - Queen of Chotanagpur",
            activities: [
              { time: "6:00 AM", activity: "Early morning departure to Netarhat", location: "Ranchi" },
              { time: "10:00 AM", activity: "Sunrise viewpoint visit", location: "Netarhat" },
              { time: "2:00 PM", activity: "Tribal village visit and interaction", location: "Local Village" },
              { time: "6:00 PM", activity: "Photography session at sunset point", location: "Netarhat Hill" }
            ]
          },
          {
            day: 3,
            title: "Betla National Park - Wildlife Adventure",
            activities: [
              { time: "6:00 AM", activity: "Morning wildlife safari", location: "Betla National Park" },
              { time: "10:00 AM", activity: "Nature walk and bird watching", location: "Park Trails" },
              { time: "3:00 PM", activity: "Visit to Palamau Fort ruins", location: "Palamau" },
              { time: "6:00 PM", activity: "Return journey preparation", location: "Betla" }
            ]
          }
        ],
        budget: {
          accommodation: "₹4,500",
          transportation: "₹2,800",
          activities: "₹3,200",
          meals: "₹2,100",
          total: "₹12,600"
        },
        includes: ["AI Guide Assistant", "Cultural Interpreter", "Emergency Support", "Photo Documentation"]
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Itinerary Planner</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let our intelligent system create a personalized travel experience based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Planning Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Plan Your Journey
              </CardTitle>
              <CardDescription>
                Fill in your preferences and let AI create the perfect itinerary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Destination & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Preferred Region</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ranchi">Ranchi & Surroundings</SelectItem>
                      <SelectItem value="netarhat">Netarhat Hills</SelectItem>
                      <SelectItem value="betla">Betla National Park</SelectItem>
                      <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
                      <SelectItem value="deoghar">Deoghar</SelectItem>
                      <SelectItem value="custom">Custom Route</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Trip Duration</Label>
                  <Select value={formData.travelers} onValueChange={(value) => setFormData(prev => ({...prev, travelers: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="14">2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    type="date" 
                    id="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    type="date" 
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>

              {/* Budget & Group Size */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (₹5,000-10,000)</SelectItem>
                      <SelectItem value="mid">Mid-range (₹10,000-25,000)</SelectItem>
                      <SelectItem value="luxury">Luxury (₹25,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo</SelectItem>
                      <SelectItem value="2">Couple</SelectItem>
                      <SelectItem value="3-5">Small Group (3-5)</SelectItem>
                      <SelectItem value="6+">Large Group (6+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <Label>Interests & Activities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea 
                  id="specialRequests"
                  placeholder="Any specific requirements, dietary restrictions, accessibility needs..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({...prev, specialRequests: e.target.value}))}
                />
              </div>

              <Button 
                onClick={generateItinerary} 
                className="w-full bg-gradient-hero hover:opacity-90"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating Your Perfect Trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Itinerary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Itinerary */}
          <div className="space-y-6">
            {generatedItinerary ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{generatedItinerary.title}</CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                    <CardDescription>{generatedItinerary.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {generatedItinerary.days.map((day) => (
                        <Card key={day.day} className="border-l-4 border-l-primary">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Day {day.day}: {day.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {day.activities.map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                                  <Badge variant="outline" className="mt-0.5 text-xs">
                                    {activity.time}
                                  </Badge>
                                  <div className="flex-1">
                                    <p className="font-medium">{activity.activity}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {activity.location}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Budget Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(generatedItinerary.budget).filter(([key]) => key !== 'total').map(([category, amount]: [string, string]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="capitalize">{category}</span>
                          <Badge variant="secondary">{amount}</Badge>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between items-center font-semibold">
                        <span>Total Estimated Cost</span>
                        <Badge className="bg-primary">{generatedItinerary.budget.total}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Includes */}
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {generatedItinerary.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your Perfect Itinerary Awaits</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to get a personalized travel plan crafted by AI
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;