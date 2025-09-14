import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Star,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  Users,
  Send
} from "lucide-react";

const Feedback = () => {
  const [newReview, setNewReview] = useState({
    location: "",
    rating: 0,
    title: "",
    review: "",
    category: ""
  });

  const reviews = [
    {
      id: 1,
      user: "Priya Sharma",
      location: "Netarhat",
      rating: 5,
      title: "Absolutely breathtaking sunrise!",
      review: "The sunrise at Netarhat is truly magical. The local guides were very helpful and the tribal village visit was an eye-opening cultural experience.",
      date: "2 days ago",
      helpful: 23,
      category: "Nature",
      sentiment: "positive",
      verified: true
    },
    {
      id: 2,
      user: "Rajesh Kumar",
      location: "Betla National Park",
      rating: 4,
      title: "Great wildlife experience",
      review: "Saw tigers and various birds. The safari was well organized. Only complaint is the road condition to reach the park could be better.",
      date: "1 week ago",
      helpful: 18,
      category: "Wildlife",
      sentiment: "positive",
      verified: true
    },
    {
      id: 3,
      user: "Anita Das",
      location: "Ranchi",
      rating: 3,
      title: "Good cultural experience",
      review: "The tribal museum was informative but could use more interactive exhibits. The local handicraft market was impressive though.",
      date: "2 weeks ago",
      helpful: 12,
      category: "Culture",
      sentiment: "neutral",
      verified: false
    },
    {
      id: 4,
      user: "Michael Johnson",
      location: "Hundru Falls",
      rating: 5,
      title: "Perfect for photography enthusiasts",
      review: "As a photographer, I was amazed by the natural beauty. The waterfall during monsoon is spectacular. Local people are very friendly.",
      date: "3 weeks ago",
      helpful: 31,
      category: "Nature",
      sentiment: "positive",
      verified: true
    }
  ];

  const sentimentStats = {
    positive: 68,
    neutral: 22,
    negative: 10
  };

  const categoryRatings = [
    { category: "Nature & Landscapes", rating: 4.6, reviews: 156 },
    { category: "Wildlife Experiences", rating: 4.4, reviews: 89 },
    { category: "Cultural Heritage", rating: 4.2, reviews: 134 },
    { category: "Local Food", rating: 4.5, reviews: 98 },
    { category: "Accommodation", rating: 4.1, reviews: 76 },
    { category: "Transportation", rating: 3.8, reviews: 112 }
  ];

  const trendingTopics = [
    { topic: "Tribal Villages", mentions: 45, trend: "up" },
    { topic: "Netarhat Sunrise", mentions: 38, trend: "up" },
    { topic: "Wildlife Safari", mentions: 32, trend: "down" },
    { topic: "Handicrafts", mentions: 28, trend: "up" },
    { topic: "Local Food", mentions: 24, trend: "stable" }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.title || !newReview.review) {
      alert("Please fill all required fields");
      return;
    }
    console.log("Submitting review:", newReview);
    // Reset form
    setNewReview({
      location: "",
      rating: 0,
      title: "",
      review: "",
      category: ""
    });
  };

  const markHelpful = (reviewId: number) => {
    console.log("Marked helpful:", reviewId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Reviews & Feedback Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your experiences and explore insights from fellow travelers
          </p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics Dashboard
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              User Reviews
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Write Review
            </TabsTrigger>
          </TabsList>

          {/* Analytics Dashboard */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Sentiment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Positive</span>
                      <span className="text-sm font-medium text-green-600">{sentimentStats.positive}%</span>
                    </div>
                    <Progress value={sentimentStats.positive} className="h-2 bg-green-100" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Neutral</span>
                      <span className="text-sm font-medium text-yellow-600">{sentimentStats.neutral}%</span>
                    </div>
                    <Progress value={sentimentStats.neutral} className="h-2 bg-yellow-100" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Negative</span>
                      <span className="text-sm font-medium text-red-600">{sentimentStats.negative}%</span>
                    </div>
                    <Progress value={sentimentStats.negative} className="h-2 bg-red-100" />
                  </div>
                </CardContent>
              </Card>

              {/* Category Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Category Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryRatings.slice(0, 4).map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{category.category}</p>
                          <p className="text-xs text-muted-foreground">{category.reviews} reviews</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{category.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(topic.trend)}
                          <span className="text-sm font-medium">{topic.topic}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {topic.mentions} mentions
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Review Trends</CardTitle>
                  <CardDescription>Review volume and average ratings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold">Interactive Chart</p>
                      <p className="text-sm text-muted-foreground">Monthly trends and patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Reviews by popular destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold">Heat Map</p>
                      <p className="text-sm text-muted-foreground">Popular destinations overview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Reviews */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Recent Reviews</h2>
                <p className="text-muted-foreground">Latest feedback from travelers</p>
              </div>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                  <SelectItem value="rating-high">Highest Rating</SelectItem>
                  <SelectItem value="rating-low">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.title}</h3>
                          <Badge className={getSentimentColor(review.sentiment)}>
                            {review.sentiment}
                          </Badge>
                          {review.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{review.user}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {review.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <Badge variant="secondary">{review.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{review.review}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markHelpful(review.id)}
                          className="text-muted-foreground hover:text-green-600"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground hover:text-red-600"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Submit Review */}
          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>
                  Help fellow travelers by sharing your authentic experience in Jharkhand
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location Visited</label>
                    <Select value={newReview.location} onValueChange={(value) => setNewReview(prev => ({...prev, location: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="netarhat">Netarhat</SelectItem>
                        <SelectItem value="betla">Betla National Park</SelectItem>
                        <SelectItem value="ranchi">Ranchi</SelectItem>
                        <SelectItem value="hundru">Hundru Falls</SelectItem>
                        <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={newReview.category} onValueChange={(value) => setNewReview(prev => ({...prev, category: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nature">Nature & Landscapes</SelectItem>
                        <SelectItem value="wildlife">Wildlife</SelectItem>
                        <SelectItem value="culture">Cultural Heritage</SelectItem>
                        <SelectItem value="food">Local Food</SelectItem>
                        <SelectItem value="accommodation">Accommodation</SelectItem>
                        <SelectItem value="transport">Transportation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview(prev => ({...prev, rating: star}))}
                        className="transition-colors"
                      >
                        <Star 
                          className={`h-8 w-8 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {newReview.rating > 0 && `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Review Title</label>
                  <Input 
                    placeholder="Summarize your experience in a few words"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({...prev, title: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea 
                    placeholder="Share your detailed experience, what you loved, and any tips for other travelers..."
                    rows={6}
                    value={newReview.review}
                    onChange={(e) => setNewReview(prev => ({...prev, review: e.target.value}))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleSubmitReview}
                    className="bg-gradient-hero hover:opacity-90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setNewReview({location: "", rating: 0, title: "", review: "", category: ""})}
                  >
                    Clear Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Feedback;