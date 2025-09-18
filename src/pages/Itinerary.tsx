import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Users, DollarSign, Clock, Sparkles, Download, FileText } from "lucide-react";
import jsPDF from 'jspdf';

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

  const downloadItinerary = () => {
    if (!generatedItinerary) return;

    // Create HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${generatedItinerary.title}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #10b981;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #10b981;
              margin-bottom: 10px;
            }
            .summary {
              font-size: 16px;
              color: #666;
              font-style: italic;
            }
            .day-section {
              margin-bottom: 30px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
            }
            .day-header {
              background-color: #10b981;
              color: white;
              padding: 15px;
              font-size: 18px;
              font-weight: bold;
            }
            .activity {
              padding: 15px;
              border-bottom: 1px solid #f3f4f6;
            }
            .activity:last-child {
              border-bottom: none;
            }
            .time {
              font-weight: bold;
              color: #10b981;
              display: inline-block;
              width: 80px;
            }
            .activity-name {
              font-weight: 500;
              margin-bottom: 5px;
            }
            .location {
              color: #666;
              font-size: 14px;
            }
            .budget-section {
              background-color: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .budget-title {
              font-size: 20px;
              font-weight: bold;
              color: #10b981;
              margin-bottom: 15px;
            }
            .budget-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .budget-total {
              border-top: 2px solid #10b981;
              padding-top: 10px;
              font-weight: bold;
              font-size: 16px;
            }
            .includes-section {
              margin-top: 20px;
            }
            .includes-title {
              font-size: 18px;
              font-weight: bold;
              color: #10b981;
              margin-bottom: 10px;
            }
            .includes-list {
              list-style: none;
              padding: 0;
            }
            .includes-list li {
              padding: 5px 0;
              padding-left: 20px;
              position: relative;
            }
            .includes-list li:before {
              content: "✓";
              color: #10b981;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${generatedItinerary.title}</div>
            <div class="summary">${generatedItinerary.summary}</div>
          </div>

          ${generatedItinerary.days.map(day => `
            <div class="day-section">
              <div class="day-header">Day ${day.day}: ${day.title}</div>
              ${day.activities.map(activity => `
                <div class="activity">
                  <div class="activity-name">
                    <span class="time">${activity.time}</span>
                    ${activity.activity}
                  </div>
                  <div class="location">📍 ${activity.location}</div>
                </div>
              `).join('')}
            </div>
          `).join('')}

          <div class="budget-section">
            <div class="budget-title">💰 Budget Breakdown</div>
            ${Object.entries(generatedItinerary.budget).filter(([key]) => key !== 'total').map(([category, amount]) => `
              <div class="budget-item">
                <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span>${amount}</span>
              </div>
            `).join('')}
            <div class="budget-item budget-total">
              <span>Total Estimated Cost</span>
              <span>${generatedItinerary.budget.total}</span>
            </div>
          </div>

          <div class="includes-section">
            <div class="includes-title">✨ What's Included</div>
            <ul class="includes-list">
              ${generatedItinerary.includes.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="footer">
            <p>Generated by Jharkhand Yatra AI • ${new Date().toLocaleDateString()}</p>
            <p>For support, contact: support@jharkhandyatra.ai</p>
          </div>
        </body>
      </html>
    `;

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedItinerary.title.replace(/\s+/g, '_')}_Itinerary.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!generatedItinerary) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12, isBold: boolean = false) => {
      doc.setFontSize(fontSize);
      if (isBold) {
        doc.setFont(undefined, 'bold');
      } else {
        doc.setFont(undefined, 'normal');
      }
      
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Header
    doc.setFillColor(16, 185, 129); // Primary green color
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    yPosition = addText(generatedItinerary.title, 20, 20, pageWidth - 40, 18, true);
    
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    yPosition = addText(generatedItinerary.summary, 20, yPosition, pageWidth - 40, 12);
    yPosition += 15;

    // Days
    generatedItinerary.days.forEach((day, dayIndex) => {
      checkNewPage(50);
      
      // Day header
      doc.setFillColor(16, 185, 129);
      doc.rect(20, yPosition - 5, pageWidth - 40, 15, 'F');
      doc.setTextColor(255, 255, 255);
      yPosition = addText(`Day ${day.day}: ${day.title}`, 25, yPosition, pageWidth - 50, 14, true);
      
      doc.setTextColor(0, 0, 0);
      yPosition += 10;

      // Activities
      day.activities.forEach((activity) => {
        checkNewPage(25);
        
        // Time
        doc.setFillColor(240, 240, 240);
        doc.rect(25, yPosition - 3, 30, 8, 'F');
        yPosition = addText(activity.time, 27, yPosition, 26, 10, true);
        
        // Activity name
        yPosition = addText(activity.activity, 60, yPosition, pageWidth - 70, 12, true);
        
        // Location
        yPosition = addText(`📍 ${activity.location}`, 60, yPosition, pageWidth - 70, 10);
        yPosition += 5;
      });
      
      yPosition += 10;
    });

    // Budget section
    checkNewPage(80);
    yPosition = addText('💰 Budget Breakdown', 20, yPosition, pageWidth - 40, 16, true);
    yPosition += 10;

    Object.entries(generatedItinerary.budget).forEach(([category, amount]) => {
      checkNewPage(15);
      const categoryText = category === 'total' ? 'Total Estimated Cost' : category.charAt(0).toUpperCase() + category.slice(1);
      const isTotal = category === 'total';
      
      if (isTotal) {
        doc.setDrawColor(16, 185, 129);
        doc.line(20, yPosition - 5, pageWidth - 20, yPosition - 5);
        yPosition += 5;
      }
      
      yPosition = addText(categoryText, 25, yPosition, pageWidth - 100, isTotal ? 14 : 12, isTotal);
      yPosition = addText(amount as string, pageWidth - 60, yPosition, 40, isTotal ? 14 : 12, isTotal);
      yPosition += 5;
    });

    // Includes section
    checkNewPage(60);
    yPosition += 10;
    yPosition = addText('✨ What\'s Included', 20, yPosition, pageWidth - 40, 16, true);
    yPosition += 10;

    generatedItinerary.includes.forEach((item) => {
      checkNewPage(15);
      yPosition = addText(`✓ ${item}`, 25, yPosition, pageWidth - 50, 12);
      yPosition += 5;
    });

    // Footer
    checkNewPage(30);
    yPosition += 20;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;
    
    yPosition = addText(`Generated by Jharkhand Yatra AI • ${new Date().toLocaleDateString()}`, 20, yPosition, pageWidth - 40, 10);
    yPosition = addText('For support, contact: support@jharkhandyatra.ai', 20, yPosition, pageWidth - 40, 10);

    // Save the PDF
    doc.save(`${generatedItinerary.title.replace(/\s+/g, '_')}_Itinerary.pdf`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading">AI-Powered Itinerary Planner</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Let our intelligent system create a personalized travel experience based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Planning Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Sparkles className="h-5 w-5 text-primary" />
                Plan Your Journey
              </CardTitle>
              <CardDescription className="font-body">
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
                      <CardTitle className="text-2xl font-heading">{generatedItinerary.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={downloadPDF}>
                          <FileText className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadItinerary}>
                          <Download className="h-4 w-4 mr-2" />
                          HTML
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="font-body">{generatedItinerary.summary}</CardDescription>
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